import {
  useEffect,
  type Dispatch,
  type FC,
  type ReactElement,
  type RefObject,
  type SetStateAction,
} from 'react';
import { Canvas, FabricImage } from 'fabric';

interface ContentProps {
  wrapperRef: RefObject<null>;
  canvasRef: RefObject<null>;
  setFabricCanvas: Dispatch<SetStateAction<Canvas | null>>;
}

const Content: FC<ContentProps> = ({ canvasRef, wrapperRef, setFabricCanvas }): ReactElement => {
  useEffect(() => {
    if (canvasRef.current && wrapperRef.current) {
      const canvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        selection: false,
      });

      FabricImage.fromURL('./images/t-shirt-black.jpg')
        .then((img) => {
          img.scale(canvas.height / img.height!);

          img.set({
            originX: 'left',
            originY: 'top',

            left: (canvas.width - img.getScaledWidth()) / 2,
            top: (canvas.height - img.getScaledHeight()) / 2,
            selectable: false, // Tornar a imagem não selecionável
            evented: false,
          });
          canvas.add(img);

          setFabricCanvas(canvas);

          canvas.renderAll();
        })
        .catch((error) => console.log(error));

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="canvas-wrapper"
      className="h-full w-full flex justify-center items-center"
    >
      <canvas ref={canvasRef} className="aspect-[16/9] w-[90%] " />
    </div>
  );
};

export default Content;
