const songScoreDiv = $('.w_450.m_15.p_3.f_0');
const sortingElement = $('.town_area.p_10').find('table tbody')
const filterElement = $('.town_area.p_10').find('table ~ .m_5.f_15')

// 创建新的 sorting option 元素
const newSelectorElement = $(`
<tr>
  <th class="col5 f_16">Sub sort</th>
  <td class="t_c">
    <select name="subsort" class="m_5 w_320"></select>
  </td>
</tr>
`)
const newSelector = $(newSelectorElement).find('select')
const newOption = (value, text) => $('<option>', { value, text })

// option
const sortOriginOption = newOption('origin', 'Origin sort')
const sortAscOption = newOption('asc', 'Sort by Level (Ascending)')
const sortDescOption = newOption('desc', 'Sort by Level (Descending)')

// filter
const newFilterElement = $(`<div class="m_5 f_15"></div>`)
const newFilterOption = (name, text, src) => $(`
  <label class="p_r m_5" style="display: inline-block">
    <input type="checkbox" name="${name}" data-custom-filter="1" checked="">
    <span>
      ${ text ? text : '' }
      ${ src ? `<img src="${src}" style="height: 22px">` : ''}
    </span>
  </label>
`)
const filters = {
  sssPlus: newFilterOption('SSS+', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sssp.png'),
  sss: newFilterOption('SSS', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sss.png'),
  ssPlus: newFilterOption('SS+', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ssp.png'),
  ss: newFilterOption('SS', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ss.png'),
  sPlus: newFilterOption('S+', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sp.png'),
  s: newFilterOption('S', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_s.png'),
  aaa: newFilterOption('AAA', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aaa.png'),
  aa: newFilterOption('AA', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aa.png'),
  a: newFilterOption('A', null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_a.png'),
}



// 有一個以上的歌曲元素才出現選單
if(songScoreDiv.length > 1){
  // 将新 option 添加到 select 元素中
  newSelector.append(sortOriginOption)
  newSelector.append(sortAscOption)
  newSelector.append(sortDescOption)
  sortingElement.append(newSelectorElement)

  // 插入自訂 filter
  Object.keys(filters).forEach(key => {
    const value = filters[key];
    newFilterElement.append(value)
  })
  newFilterElement.insertBefore(filterElement)

  // 监听 select 元素的变化事件
  newSelector.on('change', function() {
    if ($(this).val() === 'asc') {
      subSort('asc');  // 调用排序函数
    } else if ($(this).val() === 'desc') {
      subSort('desc');  // 调用排序函数
    } else if ($(this).val() === 'origin') {
      subSort('origin');
    }
  });
}

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

console.log('7 maimai sorting tool loaded')
