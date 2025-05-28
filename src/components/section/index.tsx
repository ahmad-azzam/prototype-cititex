import type { FC } from 'react';
import Tabs from './tabs';
import Description from './description';

const Section: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Tabs />
      <Description />
    </div>
  );
};

export default Section;
