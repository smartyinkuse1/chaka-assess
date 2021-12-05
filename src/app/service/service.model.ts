export interface News {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

export interface Quote {
  c: number;
  h: number;
  d: number;
  dp: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface Candle {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: number[];
  t: number[];
}
