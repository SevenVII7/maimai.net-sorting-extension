import $ from 'jquery'
import { ExtensionItem, RankEnum, RankScoreEnum } from '@/types/types'

export default function(){
  // filter
  const filterCheckboxElement = $(`
    <div>
      <div>Filter</div>
    </div>
  `)

  const newFilterCheckbox = (name: string, value: string | number, text: string | null, src: string | null) => $(`
    <label class="p_r m_5" style="display: inline-block">
      <input type="checkbox" id="${`extension_rank_checkbox_${name}`}" name="extension_rank_checkbox" value="${value}" data-custom-filter="1">
      <span>
        ${ text ? text : '' }
        ${ src ? `<img src="${src}" style="height: 22px">` : ''}
      </span>
    </label>
  `)

  const filters: Record<string, JQuery<HTMLElement>> = {
    //selectAll: newFilterCheckbox('selectAll', 'all', 'Toggle All', null),
    sssPlus: newFilterCheckbox(RankEnum.SSSplus, RankEnum.SSSplus, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sssp.png'),
    sss: newFilterCheckbox(RankEnum.SSS, RankEnum.SSS, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sss.png'),
    ssPlus: newFilterCheckbox(RankEnum.SSplus, RankEnum.SSplus, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ssp.png'),
    ss: newFilterCheckbox(RankEnum.SS, RankEnum.SS, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_ss.png'),
    sPlus: newFilterCheckbox(RankEnum.Splus, RankEnum.Splus, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_sp.png'),
    s: newFilterCheckbox(RankEnum.S, RankEnum.S, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_s.png'),
    aaa: newFilterCheckbox(RankEnum.AAA, RankEnum.AAA, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aaa.png'),
    aa: newFilterCheckbox(RankEnum.AA, RankEnum.AA, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_aa.png'),
    a: newFilterCheckbox(RankEnum.A, RankEnum.A, null, 'https://maimaidx-eng.com/maimai-mobile/img/music_icon_a.png'),
  }

  function rankScoreRange(rank: string | number){
    switch (rank){
      case RankEnum.SSSplus:
        return (number: number) => { return number >= RankScoreEnum.SSSplus ? true : false }
      case RankEnum.SSS:
        return (number: number) => { return number < RankScoreEnum.SSSplus && number >= RankScoreEnum.SSS ? true : false }
      case RankEnum.SSplus:
        return (number: number) => { return number < RankScoreEnum.SSS && number >= RankScoreEnum.SSplus ? true : false }
      case RankEnum.SS:
        return (number: number) => { return number < RankScoreEnum.SSplus && number >= RankScoreEnum.SS ? true : false }
      case RankEnum.Splus:
        return (number: number) => { return number < RankScoreEnum.SS && number >= RankScoreEnum.Splus ? true : false }
      case RankEnum.S:
        return (number: number) => { return number < RankScoreEnum.Splus && number >= RankScoreEnum.S ? true : false }
      case RankEnum.AAA:
        return (number: number) => { return number < RankScoreEnum.S && number >= RankScoreEnum.AAA ? true : false }
      case RankEnum.AA:
        return (number: number) => { return number < RankScoreEnum.AAA && number >= RankScoreEnum.AA ? true : false }
      case RankEnum.A:
        return (number: number) => { return number < RankScoreEnum.AA && number >= RankScoreEnum.A ? true : false }
      default:
        return () => false
    }
  }

  // 插入自訂 filter
  Object.keys(filters).forEach(key => {
    const value = filters[key];
    filterCheckboxElement.append(value)
  })

  function startListenFilter(list: ExtensionItem[]){

    // 监听 filter 的变化
    filterCheckboxElement.on('change', 'input[name="extension_rank_checkbox"]', function() {
      const selectedValues = $('input[name="extension_rank_checkbox"]:checked')
        .map(function () {
          return $(this).val()
        })
        .get()

      if (selectedValues.length) {
        list.forEach((item) => {
          let isHide = true
  
          selectedValues.forEach(val => {
            if (rankScoreRange(val)(item.gamerScore)) { isHide = false }
          })
  
          if (isHide) {
            item.element.hide()
          } else {
            item.element.show()
          }
        })
      } else {
        list.forEach((item) => {
          item.element.show()
        })
      }
    });
  }

  return {
    filterCheckboxElement,
    startListenFilter
  }
}