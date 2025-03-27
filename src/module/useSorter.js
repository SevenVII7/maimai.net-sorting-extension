import $ from 'jquery'
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
  const newSortOption = (value, text) => $('<option>', { value, text })

  // 定義 sorter
  const sorter = {
    sortOriginOption: newSortOption('origin', 'Origin sort'),
    sortAscOption: newSortOption('asc', 'Sort by Level (Ascending)'),
    sortDescOption: newSortOption('desc', 'Sort by Level (Descending)')
  }

  // 将新 option 添加到 select 元素中
  sortSelector.append(sorter.sortOriginOption)
  sortSelector.append(sorter.sortAscOption)
  sortSelector.append(sorter.sortDescOption)

  // main function
  function sorting(elementList, order) {
    let originIndex = 0

    const items = elementList.toArray().map(function(element) {
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

    if (order === 'asc') {
      // 根据lvValue排序
      items.sort((a, b) => a.lvValue - b.lvValue)
    } else if (order === 'desc') {
      items.sort((a, b) => b.lvValue - a.lvValue)
    } else if (order === 'origin') {
      items.sort((a, b) => a.originIndex - b.originIndex)
    }

    return items
  }

  // 监听 select 元素的变化事件
  function startListenSorter(elementList){
    sortSelector.on('change', function() {
      let result
      const val = $(this).val()
      if (val === 'asc') {
        result = sorting(elementList, 'asc')
      } else if (val === 'desc') {
        result = sorting(elementList, 'desc')
      } else if (val === 'origin') {
        result = sorting(elementList, 'origin')
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