/* 結構示例
<div class="music_master_score_back pointer w_450 m_15 p_3 f_0" style="">
  <form action="https://maimaidx-eng.com/maimai-mobile/record/musicDetail/" method="get" accept-charset="utf-8">
    <img src="https://maimaidx-eng.com/maimai-mobile/img/diff_master.png" class="h_20 f_l">
    <img src="https://maimaidx-eng.com/maimai-mobile/img/music_dx.png" class="music_kind_icon f_r">
    <div class="clearfix"></div>
    <div class="music_lv_block f_r t_c f_14">11</div>
    <div class="music_name_block t_l f_13 break">アイドル</div>
    <div class="music_score_block w_112 t_r f_l f_12">100.7916%</div>
    <div class="music_score_block w_190 t_r f_l f_12">
      <img src="https://maimaidx-eng.com/maimai-mobile/img/deluxscore.png" class="v_b f_l">
      1,697 / 1,887
    </div>
    <img src="https://maimaidx-eng.com/maimai-mobile/img/music_icon_sync.png?ver=1.50" class="h_30 f_r">
    <img src="https://maimaidx-eng.com/maimai-mobile/img/music_icon_fc.png?ver=1.50" class="h_30 f_r">
    <img src="https://maimaidx-eng.com/maimai-mobile/img/music_icon_sssp.png?ver=1.50" class="h_30 f_r">
    <div class="clearfix"></div>
    <input type="hidden" name="idx" value="d7745f119d4dda46be9469c6fb74595d93556aeaeebb38863bc814f1dbb9bc8201caa797a0d70fda9df13afdff0b560bcecd2eb72ff1f0e85dbd5a92bbaaae587bA/U0Z7O1B4SXWHSsK13rqo4BEbELUPDGM7LY0UsE4=">
  </form>
</div>
*/

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
const newFilterOption = (name, value, text, src) => $(`
  <label class="p_r m_5" style="display: inline-block">
    <input type="checkbox" name="${name}" value="${value}" data-custom-filter="1" checked="">
    <span>
      ${ text ? text : '' }
      ${ src ? `<img src="${src}" style="height: 22px">` : ''}
    </span>
  </label>
`)
const filters = {
  selectAll: newFilterOption('selectAll', 'all', 'Toggle All', null),
  sssPlus: newFilterOption('SSS+', 100.5, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sssp.png'),
  sss: newFilterOption('SSS', 100, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sss.png'),
  ssPlus: newFilterOption('SS+', 99.5, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ssp.png'),
  ss: newFilterOption('SS', 99, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ss.png'),
  sPlus: newFilterOption('S+', 98, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sp.png'),
  s: newFilterOption('S', 97, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_s.png'),
  aaa: newFilterOption('AAA', 90, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aaa.png'),
  aa: newFilterOption('AA', 85, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aa.png'),
  a: newFilterOption('A', 80, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_a.png'),
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

  // 全选功能
  newFilterElement.find('input[name="selectAll"]').on('change', function() {
    const isChecked = $(this).prop('checked');
    newFilterElement.find('input[data-custom-filter="1"]:not([name="selectAll"])').prop('checked', isChecked);
    // 触发 change 事件以更新显示
    newFilterElement.find('input[data-custom-filter="1"]:not([name="selectAll"])').first().trigger('change');
  });

  // 监听 filter 的变化
  newFilterElement.on('change', 'input[type="checkbox"]', function() {
    const selectedFilters = newFilterElement.find('input[type="checkbox"]:checked:not([name="selectAll"])').map(function() {
      return {
        name: $(this).attr('name'),
        value: parseFloat($(this).val())
      };
    }).get();

    songScoreDiv.each(function() {
      const $element = $(this);
      const scoreText = $element.find('.music_score_block.w_112').text().trim();
      const score = parseFloat(scoreText);
      let shouldShow = false;

      // 检查分数是否在选中的范围内
      selectedFilters.forEach(filter => {
        switch(filter.name) {
          case 'SSS+':
            if (score >= 100.5) shouldShow = true;
            break;
          case 'SSS':
            if (score >= 100 && score < 100.5) shouldShow = true;
            break;
          case 'SS+':
            if (score >= 99.5 && score < 100) shouldShow = true;
            break;
          case 'SS':
            if (score >= 99 && score < 99.5) shouldShow = true;
            break;
          case 'S+':
            if (score >= 98 && score < 99) shouldShow = true;
            break;
          case 'S':
            if (score >= 97 && score < 98) shouldShow = true;
            break;
          case 'AAA':
            if (score >= 90 && score < 97) shouldShow = true;
            break;
          case 'AA':
            if (score >= 85 && score < 90) shouldShow = true;
            break;
          case 'A':
            if (score >= 80 && score < 85) shouldShow = true;
            break;
        }
      });

      if (shouldShow) {
        $element.show();
      } else {
        $element.hide();
      }
    });
  });

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
