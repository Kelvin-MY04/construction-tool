'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useStudio } from '@/stores';
import Cookies from 'js-cookie';
import { start } from '@/lib/script';

const Navigator = (): JSX.Element => {
  const user = Cookies.get('user');
  const { jsonData, index, dataList, setIndex, setImgSrc, setJsonSrc } =
    useStudio();

  const handleClick = (indexNo: number): void => {
    if (dataList[indexNo]) {
      setIndex(indexNo);
      setImgSrc(dataList[indexNo].url);
      setJsonSrc(
        dataList[indexNo].url.replace('images', 'jsons').replace('PNG', 'json')
      );
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between absolute top-5 w-full max-w-[1200px]">
        <Button
          className="rounded-full cursor-pointer"
          size="icon"
          disabled={dataList[index - 1] === undefined}
          onClick={() => handleClick(index - 1)}
        >
          <ChevronLeft />
        </Button>
        <Badge variant="default" className="text-base px-5 py-1">
          {jsonData?.images[0]?.file_name}
        </Badge>
        <Button
          className="rounded-full cursor-pointer"
          size="icon"
          disabled={dataList[index + 1] === undefined}
          onClick={() => handleClick(index + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
      {(user === 'andy' || user === 'kelvin') && (
        <Button
          onClick={start}
          className="absolute bottom-5 left-auto right-auto cursor-pointer"
        >
          Start
        </Button>
      )}
    </>
  );
};

export default Navigator;
