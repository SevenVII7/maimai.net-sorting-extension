// filter
export const newFilterElement = $(`<div class="m_5 f_15"></div>`)
export const newFilterOption = (name, value, text, src) => $(`
  <label class="p_r m_5" style="display: inline-block">
    <input type="checkbox" name="${name}" value="${value}" data-custom-filter="1" checked="">
    <span>
      ${ text ? text : '' }
      ${ src ? `<img src="${src}" style="height: 22px">` : ''}
    </span>
  </label>
`)
export const filters = {
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