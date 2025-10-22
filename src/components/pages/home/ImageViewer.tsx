'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import { useStudio } from '@/stores';
import { Loader2 } from 'lucide-react';
import { CanvasSegmentation, Navigator } from '.';

const ImageViewer = (): JSX.Element => {
  const { segmentation, jsonData, imgSrc } = useStudio();
  const [segmentationPoints, setSegmentationPoints] = useState<any[]>([]);

  useEffect(() => {
    let x = 0,
      points = [];
    if (segmentation && segmentation.length > 0) {
      segmentation[0].forEach((item: any, index: number) => {
        if (index % 2 === 0) {
          x = (1200 / +jsonData?.images[0]?.width) * item;
        } else {
          points.push({
            x: x,
            y: (900 / +jsonData?.images[0]?.height) * item,
            color: 'red',
          });
        }
      });
      setSegmentationPoints(points);
    }
  }, [segmentation]);

  return (
    <div className="w-3/4 h-fit h-screen bg-neutral-100 flex items-center justify-center relative">
      {imgSrc !== '' ? (
        <>
          <CanvasSegmentation
            points={segmentationPoints}
            imageUrl={imgSrc}
            width={1200}
            height={900}
          />
          <Navigator />
        </>
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </div>
  );
};

export default ImageViewer;
