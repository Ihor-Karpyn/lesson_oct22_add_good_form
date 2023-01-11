import { FC, FormEvent, useState } from 'react';
import {
  findColorById,
  getGoodsWithColoros,
  getNewId,
} from './helpers/helpers';

import './App.scss';
import { colors } from './data';
import { GoodWithColor } from './type/types';
import cn from 'classnames';

export const App: FC = () => {
  const [goods, setGoods] = useState(getGoodsWithColoros);

  const [newGoodName, setNewGoodName] = useState('');
  const [newColorId, setNewColorId] = useState(0);

  const [newGoodNameErrorMessage, setNewGoodNameErrorMessage] = useState('');
  const [newColorIdErrorMessage, setNewColorIdErrorMessage] = useState('');

  const reset = () => {
    setNewGoodName('');
    setNewColorId(0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newGoodName || !newColorId) {
      setNewGoodNameErrorMessage(!newGoodName ? 'Field required' : '');
      setNewColorIdErrorMessage(!newColorId ? 'Field required' : '');

      return;
    }

    if (newGoodName.length < 3) {
      setNewGoodNameErrorMessage('Min length 3 sy');

      return;
    }

    setGoods(prev => {
      const newGood: GoodWithColor = {
        id: getNewId(prev),
        name: newGoodName,
        colorId: newColorId,
        color: findColorById(newColorId),
      };

      return [...prev, newGood];
    });

    reset();
  };

  const handleChangeNewGoodName = (value: string) => {
    setNewGoodName(value);
    setNewGoodNameErrorMessage('');
  };

  const handleChangeNewColorId = (value: string) => {
    setNewColorId(+value);
    setNewColorIdErrorMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Good name"
            value={newGoodName}
            onChange={(event) => handleChangeNewGoodName(event.target.value)}
            className={cn('input', {
              inputError: Boolean(newGoodNameErrorMessage),
            })}
          />
          <p
            className={cn('errorMessage', {
              errorMessageVisible: Boolean(newGoodNameErrorMessage),
            })}
          >
            {newGoodNameErrorMessage}
          </p>
        </div>

        <div>

          <select
            onChange={(event) => handleChangeNewColorId(event.target.value)}
            value={newColorId}
            className={cn('input', {
              inputError: Boolean(newColorIdErrorMessage),
            })}
          >
            <option value={0} disabled> Select a color </option>
            {colors.map(color => (
              <option
                key={color.id}
                value={color.id}
              >
                {color.name}
              </option>
            ))}
          </select>
          <p
            className={cn('errorMessage', {
              errorMessageVisible: Boolean(newColorIdErrorMessage),
            })}
          >
            {newColorIdErrorMessage}
          </p>
        </div>

        <button type="submit">Add good</button>
      </form>

      <ul>
        {goods.map(good => (
          <li key={good.id} style={{ color: good.color?.name || 'black' }}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
