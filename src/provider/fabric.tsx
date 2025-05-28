import { Canvas, FabricImage, FabricText, Point, Rect } from 'fabric';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type FC,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react';
import type {
  TColorClothes,
  TDetailClothes,
  TFabricObject,
  TPayloadText,
  TTabType,
  TZoomDirection,
} from '../type';
import { DATA_CLOTHES } from '../constant';
import { EIdObjectFabric } from '../enum';
import { v4 as uuidv4 } from 'uuid';
import { handleMovingAreaFrontBack } from '../utils';

type TFabricContext = {
  canvas: Canvas | null;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  containerCanvasRef: RefObject<HTMLDivElement | null>;
  detailClothes: TDetailClothes[];

  selectedImage: string;
  setSelectedImage: Dispatch<SetStateAction<string>>;

  tab: TTabType;
  setTab: Dispatch<SetStateAction<TTabType>>;

  handleZoom: (direction: TZoomDirection) => void;
  handleAddText: (payload: TPayloadText) => void;
  handleAddImage: (url: string) => void;
  handleChangeColor: (color: TColorClothes) => void;
};

const FabricContext = createContext<TFabricContext | undefined>(undefined);

export const useFabric = () => {
  const ctx = useContext(FabricContext);

  if (!ctx) throw new Error('useFabric must be used within a FabricProvider');

  return ctx;
};

interface FabricProviderProps {
  children: ReactNode;
}

export const FabricProvider: FC<FabricProviderProps> = ({ children }) => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [sizeCanvas, setSizeCanvas] = useState<{ width: number; height: number }>({
    height: 0,
    width: 0,
  });
  const [colorClothes, setColorClothes] = useState<TColorClothes>('black');
  const [detailClothes, setDetailClothes] = useState<TDetailClothes[]>(DATA_CLOTHES[colorClothes]);
  const [selectedImage, setSelectedImage] = useState<string>(detailClothes[0].image);
  const [tab, setTab] = useState<TTabType>('product');

  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerCanvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerCanvasRef.current) {
        const containerWidth = containerCanvasRef.current.offsetWidth;
        const containerHeight = containerCanvasRef.current.offsetHeight;

        setSizeCanvas({
          width: containerWidth,
          height: containerHeight,
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: sizeCanvas.width,
        height: sizeCanvas.height,
      });

      initCanvas.backgroundColor = '#fff';

      FabricImage.fromURL(selectedImage)
        .then((img) => {
          img.scale(initCanvas.height / img.height!);

          img.set({
            originX: 'left',
            originY: 'top',
            left: (initCanvas.width - img.getScaledWidth()) / 2,
            top: (initCanvas.height - img.getScaledHeight()) / 2,
            selectable: false,
            evented: false,
          });

          initCanvas.add(img);

          const validAreaFrontBack = new Rect({
            id: EIdObjectFabric.VALID_AREA_FRONT_BACK,
            top: 110,
            left: 93,
            width: 200,
            height: 370,
            fill: 'transparent',
            selectable: false,
            evented: false,
          });

          initCanvas.add(validAreaFrontBack);

          const guideBorderFrontBack = new Rect({
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

          initCanvas.add(guideBorderFrontBack);

          initCanvas.renderAll();

          setCanvas(initCanvas);

          initCanvas.on('object:moving', (event) => {
            const obj = event.target as TFabricObject;
            const areaFrontBack = initCanvas
              .getObjects('rect')
              .find((obj: any) => obj.id === EIdObjectFabric.VALID_AREA_FRONT_BACK);
            const guideFrontBack = initCanvas
              .getObjects('rect')
              .find((obj: any) => obj.id === EIdObjectFabric.GUIDE_BORDER_FRONT_BACK);

            if (areaFrontBack && guideFrontBack && obj?.id.includes(EIdObjectFabric.TEXT))
              handleMovingAreaFrontBack(obj, areaFrontBack, guideFrontBack);
          });
        })
        .catch((error) => console.log(error));

      return () => {
        initCanvas.dispose();
      };
    }
  }, [sizeCanvas, selectedImage]);

  const handleChangeColor = (color: TColorClothes) => {
    setColorClothes(color);
    setDetailClothes(DATA_CLOTHES[color]);
    setSelectedImage(DATA_CLOTHES[color][0].image);
  };

  const handleZoom = (direction: TZoomDirection) => {
    if (canvas) {
      if (direction === 'in') {
        const newZoom = zoomLevel + 0.1;
        canvas.zoomToPoint(new Point(canvas.getWidth() / 2, canvas.getHeight() / 2), newZoom);
        setZoomLevel(newZoom);

        return;
      }

      const newZoom = Math.max(zoomLevel - 0.1, 1);
      canvas.zoomToPoint(new Point(canvas.getWidth() / 2, canvas.getHeight() / 2), newZoom);
      setZoomLevel(newZoom);
    }
  };

  const handleAddText = (payload: TPayloadText) => {
    if (!canvas) return;

    const area = canvas
      .getObjects('rect')
      .find((obj: any) => obj.id === EIdObjectFabric.VALID_AREA_FRONT_BACK);

    if (!area) return;

    const centerX = area.left + area.width / 2;
    const centerY = area.top + area.height / 2;

    const text = new FabricText(payload.value, {
      id: `${EIdObjectFabric.TEXT}__${uuidv4()}`,
      fontFamily: payload.fontFamily,
      fill: '#FFFFFF',
      fontSize: 30,
      left: centerX,
      top: centerY,
    });

    canvas.add(text);
  };

  const handleAddImage = async (url: string) => {
    if (!canvas) return;

    const area = canvas
      .getObjects('rect')
      .find((obj: any) => obj.id === EIdObjectFabric.VALID_AREA_FRONT_BACK);

    if (!area) return;

    const centerX = area.left + area.width / 2;
    const centerY = area.top + area.height / 2;

    const img = await FabricImage.fromURL(url);

    const scale = (area.height * 0.5) / img.height!;
    img.scale(scale);

    img.set({
      id: `${EIdObjectFabric.IMAGE}__${uuidv4()}`,
      left: centerX,
      top: centerY,
      originX: 'center',
      originY: 'center',
      selectable: true,
    });
    canvas.add(img);
    canvas.renderAll();
  };

  return (
    <FabricContext.Provider
      value={{
        canvas,
        canvasRef,
        containerCanvasRef,
        detailClothes,

        selectedImage,
        setSelectedImage,

        tab,
        setTab,

        handleZoom,
        handleAddText,
        handleAddImage,
        handleChangeColor,
      }}
    >
      {children}
    </FabricContext.Provider>
  );
};
