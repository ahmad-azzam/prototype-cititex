import type { FC } from 'react';
import { BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from 'react-icons/bs';
import { useFabric } from '../../../../provider/fabric';
import jsPDF from 'jspdf';

const Save: FC = () => {
  const { canvas } = useFabric();

  const downloadURI = (uri: string, name: string) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJPG = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'jpeg',
      quality: 1,
      multiplier: 1,
    });

    downloadURI(dataURL, 'canvas-export.jpg');
  };

  const exportToPNG = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });

    downloadURI(dataURL, 'canvas-export.png');
  };

  const exportToPDF = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.getWidth(), canvas.getHeight()],
    });

    pdf.addImage(dataURL, 'PNG', 0, 0, canvas.getWidth(), canvas.getHeight());
    pdf.save('canvas-export.pdf');
  };

  return (
    <div className="flex gap-4">
      <div
        onClick={exportToJPG}
        className="flex flex-col justify-center items-center p-3 w-32 h-32 border border-gray-200 rounded-lg cursor-pointer gap-2 hover:bg-gray-200 duration-300"
      >
        <BsFiletypeJpg className="text-2xl" />
        <div className="text-sm">Save to JPG</div>
      </div>
      <div
        onClick={exportToPNG}
        className="flex flex-col justify-center items-center p-3 w-32 h-32 border border-gray-200 rounded-lg cursor-pointer gap-2 hover:bg-gray-200 duration-300"
      >
        <BsFiletypePng className="text-2xl" />
        <div className="text-sm">Save to PNG</div>
      </div>
      <div
        onClick={exportToPDF}
        className="flex flex-col justify-center items-center p-3 w-32 h-32 border border-gray-200 rounded-lg cursor-pointer gap-2 hover:bg-gray-200 duration-300"
      >
        <BsFiletypePdf className="text-2xl" />
        <div className="text-sm">Save to PDF</div>
      </div>
    </div>
  );
};

export default Save;
