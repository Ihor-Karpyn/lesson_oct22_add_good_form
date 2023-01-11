import { colors, goodsFromServer } from '../data';
import { GoodWithColor } from '../type/types';

export const findColorById = (colorId: number) => (
  colors.find(color => color.id === colorId)
);

export const getGoodsWithColoros = (): GoodWithColor[] => (
  goodsFromServer.map(good => ({
    ...good,
    color: findColorById(good.colorId),
  }))
);

export const getNewId = (array: { id: number }[]) => (
  Math.max(...array.map(e => e.id)) + 1
);
