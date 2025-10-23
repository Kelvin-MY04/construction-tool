'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import { useStudio } from '@/stores';
import Cookies from 'js-cookie';
import { start } from '@/lib/script';
import { useRouter } from 'next/navigation';

const Navigator = (): JSX.Element => {
  const router = useRouter();
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

  const handleLogOutBtn = (): void => {
    Cookies.remove('user');
    router.replace('/login');
  };

  return (
    <>
      <div className="flex flex-row gap-x-3 justify-center absolute top-5 w-full max-w-[1200px]">
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
      <div className="absolute top-5 right-5 flex flex-row gap-x-2 items-center">
        <span className="font-medium">{user}</span>
        <Button
          size="icon"
          className="rounded-full cursor-pointer"
          onClick={handleLogOutBtn}
        >
          <LogOut className="text-white" />
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
