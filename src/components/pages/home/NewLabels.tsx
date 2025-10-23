'use client';

import { JSX, useState, useEffect } from 'react';
import { useStudio } from '@/stores';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { readYaml, createYaml } from '@/lib/yamlHandler';

interface NewLabelsProps {
  labels: string[];
  calculatePercent: () => number;
  setPercent: Dispatch<SetStateAction<number>>;
  setLabels: Dispatch<SetStateAction<string[]>>;
  filteredData: any;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  activeIndex: number;
}

const NewLabels = ({
  labels,
  calculatePercent,
  setLabels,
  setPercent,
  filteredData,
  setActiveIndex,
  activeIndex,
}: NewLabelProps): JSX.Element => {
  const { setJsonData } = useStudio();
  const [activeLabel, setActiveLabel] = useState<string>('');

  const handleLabelSelection = (value: string): void => {
    setActiveLabel(value);
    filteredData[activeIndex].attributes['구조_벽체'] = value;
    setActiveIndex(activeIndex + 1);

    const res = calculatePercent();
    setPercent(res);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="font-bold text-xl">New Labels</h3>
      <AddNewLabel setLabels={setLabels} />
      <ul className="flex flex-col border border-solid border-gray-300 rounded-sm divide-y divide-gray-300 h-fit max-h-[30vh] overflow-auto">
        {labels.map((item: string, index: number) => (
          <li
            key={index}
            onClick={() => handleLabelSelection(item)}
            className={`flex flex-row justify-between py-2 px-3 cursor-pointer ${activeLabel === item ? 'font-semibold hover:text-white hover:bg-black bg-black text-white' : 'font-regular hover:font-semibold hover:bg-gray-100'}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface AddNewLabelProps {
  setLabels: Dispatch<SetStateAction<string[]>>;
}

const addNewLabelSchema = z.object({
  label: z.string().min(2, { message: 'Label must be at least 2 character' }),
});

const AddNewLabel = ({ setLabels }: AddNewLabelPros): JSX.Element => {
  const {
    register,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof addNewLabelSchema>>({
    resolver: zodResolver(addNewLabelSchema),
    defaultValues: {
      label: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof addNewLabelSchema>) => {
    const config = await readYaml('config');
    config.labels.push(data.label);

    const isCreated = await createYaml('config', config);

    if (!isCreated) {
      setError('label', {
        type: 'manual',
        message: 'Label is invalid!',
      });
    }

    setLabels(config.labels);
    setValue('label', '');
  };

  return (
    <div className="flex flex-col gap-y-1">
      <form
        action={handleSubmit(onSubmit)}
        className="flex flex-row items-center gap-x-2"
      >
        <Input
          placeholder="Enter Name"
          {...register('label')}
          className="flex-1"
        />
        <Button type="submit" className="cursor-pointer">
          Add
        </Button>
      </form>
      {errors.label && (
        <span className="text-red-500 font-regular">
          {errors.label.message}
        </span>
      )}
    </div>
  );
};

export default NewLabels;
