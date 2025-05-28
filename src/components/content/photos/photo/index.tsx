import type { FC } from 'react';
import type { TDetailClothes } from '../../../../type';
import { useFabric } from '../../../../provider/fabric';

interface PhotoProps extends TDetailClothes {}

const Photo: FC<PhotoProps> = ({ image }) => {
  const { setSelectedImage } = useFabric();

  return (
    <div
      onClick={() => setSelectedImage(image)}
      className="w-16 h-20 border border-gray-200 rounded-sm bg-white p-1 cursor-pointer"
    >
      <img src={image} alt="" />
    </div>
  );
};

export default Photo;
