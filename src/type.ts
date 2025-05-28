import type { FabricObject, FabricObjectProps, ObjectEvents, SerializedObjectProps } from 'fabric';
import type { ReactNode } from 'react';

export type TFabricObject = FabricObject<
  Partial<FabricObjectProps>,
  SerializedObjectProps,
  ObjectEvents
> &
  Record<string, any>;

export type TColorClothes = 'black' | 'white' | 'red';

export type TDetailClothes = {
  id: string;
  image: string;
  type: 'front' | 'left' | 'right' | 'back' | 'neck';
};

export type TDataClothes = Record<TColorClothes, TDetailClothes[]>;

export type TZoomDirection = 'in' | 'out';

export type TTabType = 'product' | 'add-image' | 'add-text' | 'save';

export type TTab = {
  id: string;
  type: TTabType;
  title: string;
  icon: ReactNode;
};

export type TPayloadText = {
  value: string;
  fontFamily: string;
};

export type TColor = {
  id: string;
  color: TColorClothes;
  image: string;
};
