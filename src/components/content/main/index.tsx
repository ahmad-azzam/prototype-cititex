import type { FC } from 'react';
import { useFabric } from '../../../provider/fabric';

const Main: FC = () => {
  const { canvasRef, containerCanvasRef } = useFabric();

  return (
    <div ref={containerCanvasRef} className="h-[35rem] w-full rounded-lg">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Main;
