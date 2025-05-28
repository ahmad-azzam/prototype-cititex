import { Rect } from 'fabric';
import { EIdObjectFabric } from './enum';

export const validAreaFrontBack = new Rect({
  id: EIdObjectFabric.VALID_AREA_FRONT_BACK,
  top: 100,
  left: 150,
  width: 200,
  height: 300,
  fill: 'transparent',
  selectable: false,
  evented: false,
});

export const guideBorderFrontBack = new Rect({
  id: EIdObjectFabric.GUIDE_BORDER_FRONT_BACK,
  top: validAreaFrontBack.top,
  left: validAreaFrontBack.left,
  width: validAreaFrontBack.width,
  height: validAreaFrontBack.height,
  fill: 'transparent',
  stroke: 'red',
  strokeWidth: 1,
  selectable: false,
  evented: false,
  visible: false,
  strokeDashArray: [5, 5],
});
