import type { FC } from 'react';
import { useFabric } from '../../../../../provider/fabric';

const Clipart: FC = () => {
  const { handleAddImage } = useFabric();

  return (
    <div className="flex gap-4 py-2">
      <div
        onClick={() => handleAddImage('/cat.png')}
        className="w-[8rem] h-[8rem] cursor-pointer hover:bg-gray-200 duration-300"
      >
        <img src="/cat.png" />
      </div>
      <div
        onClick={() => handleAddImage('/bat.png')}
        className="w-[8rem] h-[8rem] cursor-pointer hover:bg-gray-200 duration-300"
      >
        <img src="/bat.png" />
      </div>
    </div>
  );
};

export default Clipart;
