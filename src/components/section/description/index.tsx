import type { FC } from 'react';
import { useFabric } from '../../../provider/fabric';
import Product from './product';
import AddImage from './add-image';
import AddText from './add-text';
import Save from './save';

const Description: FC = () => {
  const { tab } = useFabric();

  const showDescription = () => {
    switch (tab) {
      case 'product':
        return <Product />;

      case 'add-image':
        return <AddImage />;

      case 'add-text':
        return <AddText />;

      case 'save':
        return <Save />;

      default:
        return <></>;
    }
  };

  return <div className="bg-white border border-gray-200 rounded-lg p-4">{showDescription()}</div>;
};

export default Description;
