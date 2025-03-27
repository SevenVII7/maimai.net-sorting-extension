import $ from 'jquery'
import useSorter from '@/module/useSorter'
import useFilter from '@/module/useFilter'

const { sortSelectorElement, startListenSorter } = useSorter()
const { filterCheckboxElement, startListenFilter } = useFilter()

const songScoreDiv = $('.w_450.m_15.p_3.f_0');
const sortingElement = $('.town_area.p_10').find('table tbody')
const filterElement = $('.town_area.p_10').find('table ~ .m_5.f_15')

// 有一個以上的歌曲元素才出現選單
if(songScoreDiv.length > 1){
  sortingElement.append(sortSelectorElement)
  filterCheckboxElement.insertBefore(filterElement)

  startListenSorter(songScoreDiv)
  startListenFilter(songScoreDiv)
}


console.log('7 maimai sorting tool loaded')
