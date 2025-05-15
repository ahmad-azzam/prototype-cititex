import { useRef, useState, type FC } from 'react';
import Toolbar from './components/toolbar';
import Content from './components/content';
import { useFabricText } from './hooks/useFabricText';
import type { Canvas } from 'fabric';

const App: FC = () => {
  const [textTool, setTextTool] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useFabricText(fabricCanvas, textTool, text, () => {});

  return (
    <div className="bg-gray-200 min-h-screen p-10">
      <div className=" bg-white rounded-lg p-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
          <div className="xl:col-span-2">
            <Toolbar />
          </div>
          <div className="xl:col-span-10">
            <Content
              canvasRef={canvasRef}
              wrapperRef={wrapperRef}
              setFabricCanvas={setFabricCanvas}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-3">
            <input
              className="focus:outline-none py-4"
              placeholder="Please input your text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <div className="cursor-pointer" onClick={() => setTextTool(true)}>
              Add Text
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
