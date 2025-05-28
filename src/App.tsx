import { type FC } from 'react';
import { FabricProvider } from './provider/fabric';
import Content from './components/content';
import Section from './components/section';

const App: FC = () => {
  return (
    <FabricProvider>
      <div className="bg-gray-100 p-10 w-full min-h-screen flex justify-center items-center">
        <div className="grid grid-cols-12 gap-3 w-[70vw]">
          <div className="col-span-5 h-full">
            <Content />
          </div>
          <div className="col-span-7">
            <Section />
          </div>
        </div>
      </div>
    </FabricProvider>
  );
};

export default App;
