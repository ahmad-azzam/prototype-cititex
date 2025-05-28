import type { FC } from 'react';
import { LuZoomIn, LuZoomOut } from 'react-icons/lu';
import { useFabric } from '../../../provider/fabric';

const Toolbar: FC = () => {
  const { handleZoom } = useFabric();

  return (
    <div className="w-max flex flex-col gap-5 whitespace-nowrap">
      <div
        onClick={() => handleZoom('in')}
        className="flex flex-col justify-center items-center cursor-pointer"
      >
        <LuZoomIn className="text-2xl" />
        <div className="text-[9px]">Zoom In</div>
      </div>
      <div
        onClick={() => handleZoom('out')}
        className="flex flex-col justify-center items-center cursor-pointer"
      >
        <LuZoomOut className="text-2xl" />
        <div className="text-[9px]">Zoom Out</div>
      </div>
    </div>
  );
};

export default Toolbar;
