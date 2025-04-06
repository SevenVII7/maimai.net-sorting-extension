import $ from 'jquery'
import { ExtensionItem, SortOrderEnum } from '@/types/types'

export default function useSorter(){

  // 创建新的 sorting option 元素
  const sortSelectorElement = $(`
    <div>
      <div style="margin-bottom: 5px;">Sub sort</div>
      <div>
        <select name="subsort" style="width: 100%"></select>
      </div>
    </div>
  `)
  const sortSelector = $(sortSelectorElement).find('select')

  // option 生產器
  const newSortOption = (value: string, text: string): JQuery<HTMLElement> => $('<option>', { value, text })

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
  function startListenSorter(list: ExtensionItem[]): void {
    sortSelector.on('change', function() {
      const val = $(this).val()

      if (val === SortOrderEnum.ASC) {
        list.sort((a, b) => a.lvValue - b.lvValue)
      } else if (val === 'desc') {
        list.sort((a, b) => b.lvValue - a.lvValue)
      } else if (val === 'origin') {
        list.sort((a, b) => a.originIndex - b.originIndex)
      }

      const footer = $('.wrapper.main_wrapper footer') // 網站上的 footer, 以此為基準往前插入排序後的 DOM
      list.forEach(item => {
        item.element.insertBefore(footer)
      })
    })
  }

  return {
    sortSelectorElement,
    startListenSorter
  }
}