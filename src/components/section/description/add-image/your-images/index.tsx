import type { FC } from 'react';
import { useFabric } from '../../../../../provider/fabric';

interface YourImagesProps {
  imageList: string[];
}

const YourImages: FC<YourImagesProps> = ({ imageList }) => {
  const { handleAddImage } = useFabric();

  return (
    <div className="flex gap-4 py-2">
      {imageList.map((item, index) => (
        <div
          key={index}
          className="w-[8rem] h-[8rem] cursor-pointer hover:bg-gray-200 duration-300 flex items-center justify-center overflow-hidden rounded-md"
          onClick={() => handleAddImage(item)}
        >
          <img src={item} alt={`Your image ${index + 1}`} className="object-cover w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default YourImages;
