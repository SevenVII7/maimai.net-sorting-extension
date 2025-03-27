/* 成績 UI HTML 結構示例
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

import $ from 'jquery'
import useSorter from '@/module/sorter'
import { newFilterElement, filters } from '@/module/filter'

console.log($)

const { sortSelectorElement, startListenSorter } = useSorter()

const songScoreDiv = $('.w_450.m_15.p_3.f_0');
const sortingElement = $('.town_area.p_10').find('table tbody')
const filterElement = $('.town_area.p_10').find('table ~ .m_5.f_15')

// 有一個以上的歌曲元素才出現選單
if(songScoreDiv.length > 1){
  sortingElement.append(sortSelectorElement)

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

  startListenSorter(songScoreDiv)
}


console.log('7 maimai sorting tool loaded')
