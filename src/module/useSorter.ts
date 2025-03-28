import $ from 'jquery'

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
  ORIGIN = 'origin'
}
export type SortedItem = {
  element: JQuery<HTMLElement>
  lvValue: number
  originIndex: number
}

export default function useSorter(){

  // 创建新的 sorting option 元素
  const sortSelectorElement = $(`
    <tr>
      <th class="col5 f_16">Sub sort</th>
      <td class="t_c">
        <select name="subsort" class="m_5 w_320"></select>
      </td>
    </tr>
  `)
  const sortSelector = $(sortSelectorElement).find('select')

  // option 生產器
  const newSortOption = (value: string, text: string): JQuery<HTMLElement> => $('<option>', { value, text })

  // main function
  const sorting = (elementList: JQuery<HTMLElement>, order: SortOrderEnum): SortedItem[] => {
    let originIndex = 0

    const items: SortedItem[] = elementList
      .toArray()
      .map(function(element: HTMLElement) {
        const $element = $(element);
        const lvText = $element.find('.music_lv_block').text().trim();

        // 将lv转为可排序的数值，考虑'+'的影响
        const lvValue = parseFloat(lvText) + (lvText.includes('+') ? 0.5 : 0);

        // 記錄原始排序
        originIndex++

        return {
          element: $element,
          lvValue: lvValue,
          originIndex
        }
      })

    if (order === SortOrderEnum.ASC) {
      // 根据lvValue排序
      items.sort((a, b) => a.lvValue - b.lvValue)
    } else if (order === SortOrderEnum.DESC) {
      items.sort((a, b) => b.lvValue - a.lvValue)
    } else if (order === SortOrderEnum.ORIGIN) {
      items.sort((a, b) => a.originIndex - b.originIndex)
    }

    return items
  }

  // 定義 sorter
  const sorter: Record<string, JQuery<HTMLElement>> = {
    sortOriginOption: newSortOption('origin', 'Origin sort'),
    sortAscOption: newSortOption('asc', 'Sort by Level (Ascending)'),
    sortDescOption: newSortOption('desc', 'Sort by Level (Descending)')
  }

  // 將新 option 添加到 select 元素中
  Object.keys(sorter).forEach(key => {
    const value = sorter[key];
    sortSelector.append(value)
  })

  // 监听 select 元素的变化事件
  function startListenSorter(elementList: JQuery<HTMLElement>): void {
    sortSelector.on('change', function() {
      let result: SortedItem[] = []
      const val = $(this).val()

      if (val === SortOrderEnum.ASC) {
        result = sorting(elementList, SortOrderEnum.ASC)
      } else if (val === 'desc') {
        result = sorting(elementList, SortOrderEnum.DESC)
      } else if (val === 'origin') {
        result = sorting(elementList, SortOrderEnum.ORIGIN)
      }

      const footer = $('.wrapper.main_wrapper footer') // 網站上的 footer, 以此為基準往前插入排序後的 DOM
      result.forEach(item => {
        item.element.insertBefore(footer)
      })
    })
  }

  return {
    sortSelectorElement,
    sortSelector,
    sorter,
    startListenSorter
  }
}