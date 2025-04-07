export type ExtensionItem = {
  element: JQuery<HTMLElement>
  lvValue: number
  gamerScore: number
  gamerDxPoint: number
  originIndex: number
}
export type Rank = 'SSS+' | 'SSS' | 'SS+' | 'SS' | 'S+' | 'S' | 'AAA' | 'AA' | 'A'
export type RankScore = 100.5 | 100 | 99.5 | 99 | 98 | 97 | 95 | 90 | 80

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
  ORIGIN = 'origin'
}
export enum RankEnum {
  SSSplus = 'SSS+',
  SSS = 'SSS',
  SSplus = 'SS+',
  SS = 'SS',
  Splus = 'S+',
  S = 'S',
  AAA = 'AAA',
  AA = 'AA',
  A = 'A'
}
export enum RankScoreEnum {
  SSSplus = 100.5,
  SSS = 100,
  SSplus = 99.5,
  SS = 99,
  Splus = 98,
  S = 97,
  AAA = 95,
  AA = 90,
  A = 80
}