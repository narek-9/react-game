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
