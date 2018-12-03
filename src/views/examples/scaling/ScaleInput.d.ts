export interface ScaleItem {
  scale: () => number,
  name: string,
  domain: number[] | string[],
  range: number[] | string[]
}
