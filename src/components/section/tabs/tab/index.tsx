import type { FC } from 'react';
import type { TTab } from '../../../../type';
import clsx from 'clsx';
import { useFabric } from '../../../../provider/fabric';

interface TabProps extends TTab {}

const Tab: FC<TabProps> = ({ icon, title, type }) => {
  const { tab, setTab } = useFabric();

  return (
    <div
      className={clsx(
        'col-span-3 border border-gray-200 rounded-lg p-4 flex items-center justify-center flex-col cursor-pointer gap-3 hover:bg-gray-200 duration-300 hover:shadow-md',
        {
          'bg-gray-200 shadow-md': tab === type,
          'bg-white': tab !== type,
        }
      )}
      onClick={() => setTab(type)}
    >
      {icon}
      <div className="uppercase text-xs font-semibold">{title}</div>
    </div>
  );
};

export default Tab;
