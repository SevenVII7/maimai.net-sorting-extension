import useWebsiteDom, { songScoreDiv } from '@/module/useWebsiteDom'
import useSorter from '@/module/useSorter'
import useFilter from '@/module/useFilter'

const { sortSelectorElement, startListenSorter } = useSorter()
const { filterCheckboxElement, startListenFilter } = useFilter()
const { setup, extensionItemList } = useWebsiteDom()

// 有一個以上的歌曲元素才出現選單
if(songScoreDiv.length > 1){
  setup([sortSelectorElement, filterCheckboxElement])

  startListenSorter(extensionItemList)
  startListenFilter(extensionItemList)
}


console.log('7 maimai sorting tool loaded')
