export type city = {
  id: number;
  title: string;
};

export type storage = {
  cityId: number;
  storage: {
    id: number;
    qty: number;
  }[];
};

export type cityStorage = {
  cityId: number;
  storage: {
    id: number;
    priceStats: number[];
    maxStep: number;
    minPrice: number;
    maxPrice: number;
  }[];
};

export type good = {
  id: number;
  title: string;
};
