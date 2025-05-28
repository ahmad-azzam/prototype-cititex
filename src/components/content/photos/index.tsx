import type { FC } from 'react';
import Photo from './photo';
import { useFabric } from '../../../provider/fabric';

const Photos: FC = () => {
  const { detailClothes } = useFabric();

  return (
    <div className="flex justify-around gap-4">
      {detailClothes.map((item) => (
        <Photo key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Photos;
