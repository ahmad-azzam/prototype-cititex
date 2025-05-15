import { Canvas, FabricText } from 'fabric';
import type { TPointerEvent, TPointerEventInfo } from 'fabric';
import { useEffect, useState } from 'react';

export const useFabricText = (
  canvas: Canvas | null,
  isActive: boolean,
  textValue: string,
  handleDrawingFinish: () => void
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentText, setCurrentText] = useState<FabricText | null>(null);

  useEffect(() => {
    if (!canvas || !isActive) return;

    const onMouseDown = (o: TPointerEventInfo<TPointerEvent>) => {
      if (isDrawing && currentText) {
        canvas.discardActiveObject();
        canvas.renderAll();

        if (currentText.text.trim() !== '') {
          handleDrawingFinish();
        }

        disable();
        setIsDrawing(false);
        setCurrentText(null);
        return;
      }

      const pointer = canvas.getViewportPoint(o.e);
      const text = new FabricText(textValue, {
        left: pointer.x,
        top: pointer.y,
        fontSize: 24,
        fontFamily: 'Nunito Sans',
        fill: 'white',
        backgroundColor: 'transparent',
        hasControls: true,
        cornerColor: 'white',
        cornerSize: 8,
        transparentCorners: false,
        padding: 8,
        centeredScaling: false,
        lockUniScaling: false,
        selectable: true,
        hasRotatingPoint: true,
        borderColor: 'white',
        objectCaching: false,
        strokeWidth: 1,
        strokeUniform: true,
      });

      // Set additional properties after creation
      text.setControlsVisibility({
        mt: true,
        mb: true,
        ml: true,
        mr: true,
        bl: true,
        br: true,
        tl: true,
        tr: true,
        mtr: true,
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      setCurrentText(text);
      setIsDrawing(true);
    };

    const onKeyDown = (e: any) => {
      if (e.key === 'Enter' && !e.shiftKey && currentText) {
        canvas.discardActiveObject();
        canvas.renderAll();

        if (currentText.text.trim() !== '') {
          handleDrawingFinish();
        } else {
          canvas.remove(currentText);
        }

        disable();
        setIsDrawing(false);
        setCurrentText(null);
      }
    };

    const enable = () => {
      canvas.selection = true;
      canvas.on('mouse:down', onMouseDown);
      window.addEventListener('keydown', onKeyDown);
      canvas.renderAll();
    };

    const disable = () => {
      canvas.selection = true;
      canvas.off('mouse:down', onMouseDown);
      window.removeEventListener('keydown', onKeyDown);
    };

    if (isActive) {
      enable();
    } else {
      disable();
    }

    return () => {
      disable();
    };
  }, [canvas, isActive, isDrawing, currentText, handleDrawingFinish]);
};
