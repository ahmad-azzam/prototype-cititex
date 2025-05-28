import type { FC } from 'react';
import Tab from './tab';
import { TABS } from '../../../constant';

const Tabs: FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {TABS.map((item) => (
        <Tab key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Tabs;
