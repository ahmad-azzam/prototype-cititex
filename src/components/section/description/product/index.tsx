import type { FC } from 'react';
import { DATA_COLORS } from '../../../../constant';
import { useFabric } from '../../../../provider/fabric';

const Product: FC = () => {
  const { handleChangeColor } = useFabric();

  return (
    <div className="p-3 flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="font-bold text-xl">Urban Essential Tee 9001</div>
        <div className="text-sm font-light">Designed for Comfort and Versatility</div>
      </div>

      <div className="flex gap-4">
        {DATA_COLORS.map((item) => (
          <div
            key={item.id}
            onClick={() => handleChangeColor(item.color)}
            className="w-5 h-5 cursor-pointer"
          >
            <img src={item.image} alt="" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray-500 font-bold">Sizes</div>
        <div className="text-sm">XS - S - M - L - XL - XXL - 3XL</div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray-500 font-bold">Fabric</div>
        <ul className="text-sm list-disc list-inside marker:text-black gap-2 flex flex-col">
          <li>Soft-touch premium cotton blend</li>
          <li>Breathable and lightweight material</li>
          <li>Durable stitching for long-lasting wear</li>
          <li>180 gsm fabric weight</li>
          <li>Comfortable ribbed collar</li>
        </ul>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray-500 font-bold">Description</div>
        <div className="text-sm">
          The Urban Essential Tee 9001 is your go-to shirt for any occasion. With a modern fit and
          soft fabric, it keeps you comfortable all day, whether you're at work or relaxing with
          friends.
        </div>
      </div>
    </div>
  );
};

export default Product;
