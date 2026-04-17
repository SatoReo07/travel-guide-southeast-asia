export interface Spot {
  name: string;
  description: string;
}

export interface Country {
  slug: string;
  name: string;
  capital: string;
  flag: string;
  description: string;
  spots: Spot[];
  bestSeason: string;
}
