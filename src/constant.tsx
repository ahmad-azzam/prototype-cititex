import { EColorClothes, EImageBlackClothes, EImageRedClothes, EImageWhiteClothes } from './enum';
import { v4 as uuidv4 } from 'uuid';
import type { TColor, TDataClothes, TTab } from './type';
import { PiTShirtLight } from 'react-icons/pi';
import { FaRegImages, FaRegSave } from 'react-icons/fa';
import { LuLetterText } from 'react-icons/lu';

export const DATA_CLOTHES: TDataClothes = {
  black: [
    {
      id: uuidv4(),
      image: EImageBlackClothes.FRONT,
      type: 'front',
    },
    {
      id: uuidv4(),
      image: EImageBlackClothes.LEFT,
      type: 'left',
    },
    {
      id: uuidv4(),
      image: EImageBlackClothes.BACK,
      type: 'back',
    },
    {
      id: uuidv4(),
      image: EImageBlackClothes.RIGHT,
      type: 'right',
    },
    {
      id: uuidv4(),
      image: EImageBlackClothes.NECK,
      type: 'neck',
    },
  ],
  red: [
    {
      id: uuidv4(),
      image: EImageRedClothes.FRONT,
      type: 'front',
    },
    {
      id: uuidv4(),
      image: EImageRedClothes.LEFT,
      type: 'left',
    },
    {
      id: uuidv4(),
      image: EImageRedClothes.BACK,
      type: 'back',
    },
    {
      id: uuidv4(),
      image: EImageRedClothes.RIGHT,
      type: 'right',
    },
    {
      id: uuidv4(),
      image: EImageRedClothes.NECK,
      type: 'neck',
    },
  ],
  white: [
    {
      id: uuidv4(),
      image: EImageWhiteClothes.FRONT,
      type: 'front',
    },
    {
      id: uuidv4(),
      image: EImageWhiteClothes.LEFT,
      type: 'left',
    },
    {
      id: uuidv4(),
      image: EImageWhiteClothes.BACK,
      type: 'back',
    },
    {
      id: uuidv4(),
      image: EImageWhiteClothes.RIGHT,
      type: 'right',
    },
    {
      id: uuidv4(),
      image: EImageWhiteClothes.NECK,
      type: 'neck',
    },
  ],
};

export const DATA_COLORS: TColor[] = [
  {
    id: uuidv4(),
    color: 'black',
    image: EColorClothes.BLACK,
  },
  {
    id: uuidv4(),
    color: 'white',
    image: EColorClothes.WHITE,
  },
  {
    id: uuidv4(),
    color: 'red',
    image: EColorClothes.RED,
  },
];

export const TABS: TTab[] = [
  {
    id: uuidv4(),
    type: 'product',
    title: 'Product',
    icon: <PiTShirtLight className="text-3xl" />,
  },
  {
    id: uuidv4(),
    type: 'add-image',
    title: 'Add Image',
    icon: <FaRegImages className="text-3xl" />,
  },
  {
    id: uuidv4(),
    type: 'add-text',
    title: 'Add Text',
    icon: <LuLetterText className="text-3xl" />,
  },
  {
    id: uuidv4(),
    type: 'save',
    title: 'Save',
    icon: <FaRegSave className="text-3xl" />,
  },
];
