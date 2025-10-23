'use client';

import { JSX, Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useFetchJsonData } from '@/lib/queries';
import { useStudio } from '@/stores';
import { Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DataLabelsProps {
  filteredData: any;
  labels: string[];
  percent: number;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

const DataLabels = ({
  filteredData,
  percent,
  labels,
  activeIndex,
  setActiveIndex,
}: DataLabelsProps): JSX.Element => {
  const { jsonSrc, jsonData, setJsonData, setSegmentation } = useStudio();
  const { data, error, isLoading } = useFetchJsonData(jsonSrc);
  const isData = data && data.annotations && data.annotations.length > 0;

  const handleClick = (item: any, index: number): void => {
    setSegmentation(item.segmentation);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isData) {
      setJsonData(data);
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (isData) {
      setSegmentation(
        data.annotations.filter(
          (item) =>
            item.attributes['구조_벽체'] === '기타벽' ||
            labels.includes(item.attributes['구조_벽체'])
        )[activeIndex].segmentation
      );
    }
  }, [isLoading, data, activeIndex]);

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="font-bold text-xl">Data Labels</h3>
      <div className="flex flex-row items-center gap-x-2">
        <span className="font-semibold" suppressHydrationWarning>
          {Math.round(percent)}%
        </span>
        <Progress value={percent} />
      </div>
      <ul className="flex flex-col border border-solid border-gray-300 rounded-sm divide-y divide-gray-300 h-fit max-h-[20vh] overflow-auto">
        {isData &&
          filteredData &&
          filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item, index)}
              className={`py-2 px-3 cursor-pointer flex flex-row items-center justify-between ${activeIndex === index ? 'font-semibold hover:text-white hover:bg-black bg-black text-white' : item.attributes['구조_벽체'] !== '기타벽' ? 'fonr-regular text-green-900 bg-green-100 hover:text-green-900 hover:bg-green-100' : 'font-regular hover:font-semibold hover:bg-gray-100'}`}
            >
              {item.attributes['구조_벽체']}
              {item.attributes['구조_벽체'] !== '기타벽' && (
                <Check
                  className={`${activeIndex === index ? 'text-white' : 'text-green-900'} size-4`}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DataLabels;
