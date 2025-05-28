import { useRef, useState, type ChangeEvent, type FC } from 'react';
import Clipart from './clipart';
import YourImages from './your-images';

const AddImage: FC = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result as string;
        setImageList((prev) => [...prev, dataUrl]);
      };

      reader.readAsDataURL(file);
    });

    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="text-xl font-semibold border-b border-gray-200 pb-2">Clipart</div>
        <Clipart />
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-semibold border-b border-gray-200 pb-2">Your Images</div>
        <YourImages imageList={imageList} />
        <button
          onClick={() => fileInputRef?.current?.click()}
          className="bg-black w-max text-white px-3 py-2 cursor-pointer rounded-sm"
        >
          Upload Image
        </button>

        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleUpload}
          className="hidden"
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-black w-max text-white px-3 py-2 cursor-pointer rounded-sm">
          Add Image
        </button>
      </div>
    </div>
  );
};

export default AddImage;
