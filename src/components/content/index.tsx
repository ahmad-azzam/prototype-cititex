import type { FC } from 'react';
import Toolbar from './toolbar';
import Main from './main';
import Photos from './photos';

const Content: FC = () => {
  return (
    <div className="flex gap-3 w-full">
      <Toolbar />
      <div className="flex flex-col gap-3 w-full">
        <Main />
        <Photos />
      </div>
    </div>
  );
};

export default Content;
