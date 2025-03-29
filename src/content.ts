import useWebsiteDom, { songScoreDiv, sortingElement, filterElement } from '@/module/useWebsiteDom'
import useSorter from '@/module/useSorter'
import useFilter from '@/module/useFilter'

const { sortSelectorElement, startListenSorter } = useSorter()
const { filterCheckboxElement, startListenFilter } = useFilter()
const { extensionItemList } = useWebsiteDom()

// 有一個以上的歌曲元素才出現選單
if(songScoreDiv.length > 1){
  sortingElement.append(sortSelectorElement)
  filterCheckboxElement.insertBefore(filterElement)

  startListenSorter(extensionItemList)
  startListenFilter(songScoreDiv)
}


console.log('7 maimai sorting tool loaded')
