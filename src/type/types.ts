export interface Color {
  id: number;
  name: string;
}

export interface Good {
  id: number;
  colorId: number;
  name: string;
}

export interface GoodWithColor extends Good {
  color?: Color;
}
