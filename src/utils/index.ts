import type { TFabricObject } from '../type';

export const handleMovingAreaFrontBack = (
  obj: TFabricObject,
  area: TFabricObject,
  guide: TFabricObject
) => {
  const objLeft = obj.left!;
  const objTop = obj.top!;
  const objWidth = obj.width! * obj.scaleX!;
  const objHeight = obj.height! * obj.scaleY!;

  const areaLeft = area.left!;
  const areaTop = area.top!;
  const areaRight = area.left! + area.width!;
  const areaBottom = area.top! + area.height!;

  let isOutOfBounds = false;

  let newLeft = objLeft;
  let newTop = objTop;

  if (objLeft < areaLeft) {
    newLeft = areaLeft;
    isOutOfBounds = true;
  } else if (objLeft + objWidth > areaRight) {
    newLeft = areaRight - objWidth;
    isOutOfBounds = true;
  }

  if (objTop < areaTop) {
    newTop = areaTop;
    isOutOfBounds = true;
  } else if (objTop + objHeight > areaBottom) {
    newTop = areaBottom - objHeight;
    isOutOfBounds = true;
  }

  obj.set({ left: newLeft, top: newTop });
  guide.set({ visible: isOutOfBounds });
};
