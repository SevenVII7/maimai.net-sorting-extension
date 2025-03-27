import $ from 'jquery'

export default function(){
  // filter
  const filterCheckboxElement = $(`<div class="m_5 f_15"></div>`)

  const newFilterCheckbox = (name, value, text, src) => $(`
    <label class="p_r m_5" style="display: inline-block">
      <input type="checkbox" name="${name}" value="${value}" data-custom-filter="1" checked="">
      <span>
        ${ text ? text : '' }
        ${ src ? `<img src="${src}" style="height: 22px">` : ''}
      </span>
    </label>
  `)

  const filters = {
    selectAll: newFilterCheckbox('selectAll', 'all', 'Toggle All', null),
    sssPlus: newFilterCheckbox('SSS+', 100.5, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sssp.png'),
    sss: newFilterCheckbox('SSS', 100, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sss.png'),
    ssPlus: newFilterCheckbox('SS+', 99.5, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ssp.png'),
    ss: newFilterCheckbox('SS', 99, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ss.png'),
    sPlus: newFilterCheckbox('S+', 98, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sp.png'),
    s: newFilterCheckbox('S', 97, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_s.png'),
    aaa: newFilterCheckbox('AAA', 90, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aaa.png'),
    aa: newFilterCheckbox('AA', 85, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aa.png'),
    a: newFilterCheckbox('A', 80, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_a.png'),
  }

  // 插入自訂 filter
  Object.keys(filters).forEach(key => {
    const value = filters[key];
    filterCheckboxElement.append(value)
  })

  function startListenFilter(elementList){
    // 全选功能
    filterCheckboxElement.find('input[name="selectAll"]').on('change', function() {
      const isChecked = $(this).prop('checked');
      filterCheckboxElement.find('input[data-custom-filter="1"]:not([name="selectAll"])').prop('checked', isChecked);
      // 触发 change 事件以更新显示
      filterCheckboxElement.find('input[data-custom-filter="1"]:not([name="selectAll"])').first().trigger('change');
    });
  
    // 监听 filter 的变化
    filterCheckboxElement.on('change', 'input[type="checkbox"]', function() {
      const selectedFilters = filterCheckboxElement
        .find('input[type="checkbox"]:checked:not([name="selectAll"])')
        .map(() => ({
          name: $(this).attr('name'),
          value: parseFloat($(this).val())
        }))
        .get()
  
      elementList.each(function() {
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
  }

  return {
    filterCheckboxElement,
    startListenFilter
  }
}