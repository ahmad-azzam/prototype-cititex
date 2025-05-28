import { useState, type FC } from 'react';
import type { TPayloadText } from '../../../../type';
import clsx from 'clsx';
import { useFabric } from '../../../../provider/fabric';

const AddText: FC = () => {
  const { handleAddText } = useFabric();

  const [text, setText] = useState<TPayloadText>({
    value: '',
    fontFamily: 'Nunito Sans',
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div>Enter your text below</div>
        <textarea
          className="border border-gray-200 focus:outline-none p-2"
          rows={5}
          onChange={(event) =>
            setText((prev) => {
              return {
                ...prev,
                value: event.target.value,
              };
            })
          }
        >
          {text.value}
        </textarea>
      </div>
      <div className="w-full flex justify-end">
        <button
          disabled={!text.value}
          className={clsx('bg-black text-white px-3 py-2 rounded-lg', {
            'cursor-pointer': text.value,
            'cursor-not-allowed': !text.value,
          })}
          onClick={() => handleAddText(text)}
        >
          Add Text
        </button>
      </div>
    </div>
  );
};

export default AddText;
