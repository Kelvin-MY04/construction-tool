'use client';

import { JSX, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, LogOut, Boxes } from 'lucide-react';
import { useStudio } from '@/stores';
import Cookies from 'js-cookie';
import { start } from '@/lib/script';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Navigator = (): JSX.Element => {
  const router = useRouter();
  const user = Cookies.get('user');
  const { jsonData, index, dataList, setIndex, setImgSrc, setJsonSrc } =
    useStudio();
  const [isAllocating, setIsAllocating] = useState<boolean>(false);

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

  const handleAllocate = async (): void => {
    setIsAllocating(true);
    const isAllocated = await start();
    if (isAllocated) {
      toast.success('Dataset is allocated successfully!');
    } else {
      toast.error('Failed to allocate the Dataset');
    }
    setIsAllocating(false);
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
          <LogOut />
        </Button>
      </div>
      {(user === 'andy' || user === 'kelvin') && (
        <Button
          size="icon"
          onClick={handleAllocate}
          className="absolute top-5 left-5 cursor-pointer rounded-full"
        >
          <Boxes />
        </Button>
      )}
      {isAllocating && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center bg-black/70">
          <div className="flex flex-col gap-y-2 justify-center items-center">
            <Loader2 className="animate-spin text-white" />
            <span className="text-white font-medium">Allocating...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigator;
