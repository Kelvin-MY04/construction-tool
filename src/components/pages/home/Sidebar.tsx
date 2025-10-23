'use client';

import { JSX, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { useStudio } from '@/stores';
import { readYaml } from '@/lib/yamlHandler';
import { mutate } from 'swr';
import { uploadFile } from '@/lib/googleCloudStorage';
import dynamic from 'next/dynamic';

const List = dynamic(() => import('./List'), { ssr: false });
const NewLabels = dynamic(() => import('./NewLabels'), { ssr: false });
const DataLabels = dynamic(() => import('./DataLabels'), { ssr: false });

const Sidebar = (): JSX.Element => {
  const {
    jsonSrc,
    jsonData,
    dataList,
    index,
    setIndex,
    setImgSrc,
    setJsonSrc,
  } = useStudio();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [labels, setLabels] = useState<string[]>([]);
  const [percent, setPercent] = useState<number>(0);

  const filteredData = jsonData?.annotations.filter(
    (item) =>
      item.attributes['구조_벽체'] === '기타벽' ||
      labels.includes(item.attributes['구조_벽체'])
  );

  useEffect(() => {
    const loadLabels = async () => await readYaml('config');

    loadLabels().then((res) => setLabels(res.labels));
  }, []);

  useEffect(() => {
    const res = calculatePercent();
    setPercent(res || 0);
  }, [filteredData]);

  const handleClearBtn = (): void => mutate(jsonSrc);

  const handleSaveBtn = async (): void => {
    const filename = jsonSrc.split('/')[jsonSrc.split('/').length - 1];

    const url = await uploadFile(
      jsonData,
      `floor_plans/saved/${filename}`,
      'application/json'
    );

    const indexNo = index + 1;
    if (dataList[indexNo]) {
      setIndex(indexNo);
      setImgSrc(dataList[indexNo].url);
      setJsonSrc(
        dataList[indexNo].url.replace('images', 'jsons').replace('PNG', 'json')
      );
      setActiveIndex(0);
    }
  };

  const calculatePercent = (): number => {
    const done = filteredData?.filter(
      (item) => item.attributes['구조_벽체'] !== '기타벽'
    ).length;
    const total = filteredData?.length;

    console.log(done, total);

    return (done / total) * 100;
  };

  return (
    <>
      <div className="w-1/4 relative p-5 flex flex-col gap-y-4 h-screen">
        <DataLabels
          percent={percent}
          labels={labels}
          filteredData={filteredData}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
        />
        <NewLabels
          calculatePercent={calculatePercent}
          labels={labels}
          setPercent={setPercent}
          setLabels={setLabels}
          setActiveIndex={setActiveIndex}
          filteredData={filteredData}
          activeIndex={activeIndex}
        />
        <List />
        <div className="absolute bottom-0 left-0 w-full py-5 pr-5 flex flex-row gap-x-3">
          <Button
            variant="secondary"
            className="flex-1 cursor-pointer"
            onClick={handleClearBtn}
          >
            Clear
          </Button>
          <Button className="flex-1 cursor-pointer" onClick={handleSaveBtn}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
