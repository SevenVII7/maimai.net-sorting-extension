const songScoreDiv = $('.w_450.m_15.p_3.f_0');
const sortingElement = $('.town_area.p_10').find('table tbody')

// 创建新的 option 元素
const newSelectorElement = $(`<tr>
  <th class="col5 f_16">Extension</th>
  <td class="t_c">
    <select name="subsort" class="m_5 w_320">
      <option value="">---</option>
    </select>
  </td>
</tr>`)
const newSelector = $(newSelectorElement).find('select')

// option
const sortAscOption = $('<option>', {
  value: 'asc',
  text: 'Sort by Level (Ascending)'
});
const sortDescOption = $('<option>', {
  value: 'desc',
  text: 'Sort by Level (Descending)'
});

// 有一個以上的歌曲元素才出現選單
if(songScoreDiv.length > 1){
  // 将新 option 添加到 select 元素中
  newSelector.append(sortAscOption)
  newSelector.append(sortDescOption)
  sortingElement.append(newSelectorElement)

  // 监听 select 元素的变化事件
  newSelector.on('change', function() {
    if ($(this).val() === 'asc') {
      sortByLv('asc');  // 调用排序函数
    } else if ($(this).val() === 'desc') {
      sortByLv('desc');  // 调用排序函数
    }
  });
}

// main function
function sortByLv(order) {
  console.log('start')

  const items = songScoreDiv.toArray().map(function(element) {
    const $element = $(element);
    const lvText = $element.find('.music_lv_block').text().trim();
    
    // 将lv转为可排序的数值，考虑'+'的影响
    const lvValue = parseFloat(lvText) + (lvText.includes('+') ? 0.5 : 0);

    return {
      element: $element,
      lvValue: lvValue
    }
  })

  if (order === 'asc') {
    // 根据lvValue排序
    items.sort((a, b) => a.lvValue - b.lvValue)
  } else if (order === 'desc') {
    items.sort((a, b) => b.lvValue - a.lvValue)
  } else {
    location.reload()
  }

  // 重新排列DOM
  const footer = $('.wrapper.main_wrapper footer')
  items.forEach(item => {
    item.element.insertBefore(footer);
  })
}

console.log('7 maimai sorting tool loaded')
