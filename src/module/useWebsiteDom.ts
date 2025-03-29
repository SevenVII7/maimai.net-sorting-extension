import $ from 'jquery'
import type { ExtensionItem } from '@/types/types'

export const songScoreDiv = $('.w_450.m_15.p_3.f_0');
export const sortingElement = $('.town_area.p_10').find('table tbody')
export const filterElement = $('.town_area.p_10').find('table ~ .m_5.f_15')

export default function useWebsiteDom() {

  const extensionItemList: ExtensionItem[] = songScoreDiv
    .toArray()
    .map((e: HTMLElement, index) => {
      const element = $(e);

      // 将 lv 转为可排序的数值，考虑 '+' 的影响
      const lvText = element.find('.music_lv_block').text().trim();
      const lvValue = parseFloat(lvText) + (lvText.includes('+') ? 0.5 : 0);

      // % 數
      const gamerScoreText = element.find('.music_score_block.w_112').text().trim();
      const gamerScore = parseFloat(gamerScoreText.replace('%', ''))

      // DX 分
      const gamerDxPointText = element.find('.music_score_block.w_190').text().split('/')[0].trim();
      const gamerDxPoint = parseFloat(gamerDxPointText.replace(/,/g, ''))

      return {
        element,
        lvValue,
        gamerScore,
        gamerDxPoint,
        originIndex: index
      }
    })

  return {
    extensionItemList
  }
}