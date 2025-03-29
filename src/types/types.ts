export type ExtensionItem = {
  element: JQuery<HTMLElement>
  lvValue: number
  gamerScore: number
  gamerDxPoint: number
  originIndex: number
}
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