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
  const sortSelector = $(newSelectorElement).find('select')
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
  function subSort(order) {
    console.log('start')

    let originIndex = 0

    const items = songScoreDiv.toArray().map(function(element) {
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

    // 重新排列DOM
    const footer = $('.wrapper.main_wrapper footer')
    items.forEach(item => {
      item.element.insertBefore(footer);
    })
  }

  // 监听 select 元素的变化事件
  sortSelector.on('change', function() {
    if ($(this).val() === 'asc') {
      subSort('asc');  // 调用排序函数
    } else if ($(this).val() === 'desc') {
      subSort('desc');  // 调用排序函数
    } else if ($(this).val() === 'origin') {
      subSort('origin');
    }
  });

  return {
    sortSelectorElement,
    sortSelector,
    sorter
  }
}