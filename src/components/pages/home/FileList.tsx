'use client';

import { Dispatch, JSX, SetStateAction, useState, useEffect } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Search, Check } from 'lucide-react';
import { useStudio } from '@/stores';
import { ProgressBar } from '.';

const List = (): JSX.Element => {
  const {
    doneList,
    jsonSrc,
    dataList,
    imgSrc,
    setImgSrc,
    setJsonSrc,
    setIndex,
    index,
  } = useStudio();
  const [search, setSearch] = useState<string>('');
  const [filePercent, setFilePercent] = useState<number>(0);

  const isData = dataList && dataList.length > 0;

  const filteredFiles = dataList?.filter((item) => item.name.includes(search));

  const getName = (name: string): string =>
    name.split('/')[name.split('/').length - 1];

  const handleClick = (url: string, name: string, index: number): void => {
    setIndex(index);
    setImgSrc(url);

    if (doneList?.includes(name)) {
      setJsonSrc(
        `https://storage.googleapis.com/decora-alpha-deno/floor_plans/saved/${name}`
      );
    } else {
      setJsonSrc(url.replace('images', 'jsons').replace('PNG', 'json'));
    }
  };

  useEffect(() => {
    const done_list = doneList?.filter((item) => item != '');
    const done = done_list?.length || 0;
    const total = filteredFiles?.length || 0;

    setFilePercent((done / total) * 100);
  }, [doneList, filteredFiles]);

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="font-bold text-xl">Files </h3>
      <ProgressBar percent={filePercent} />
      <div className="flex flex-col gap-y-3">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {isData &&
              dataList.filter((item) => item.name.includes(search)).length}{' '}
            results
          </InputGroupAddon>
        </InputGroup>
        <ul className="h-fit max-h-[20vh] overflow-auto flex flex-col border border-solid border-gray-300 rounded-sm divide-y divide-gray-300">
          {isData &&
            filteredFiles.map((item: any, indexNo: number) => (
              <li
                key={indexNo}
                onClick={() =>
                  handleClick(
                    item.url,
                    `${getName(item.name).split('.PNG')[0]}.json`,
                    indexNo
                  )
                }
                className={`py-2 px-3 flex justify-between items-center ${
                  imgSrc === item.url
                    ? 'bg-black text-white hover:bg-black hover:text-white font-semibold'
                    : doneList?.includes(
                          `${getName(item.name).split('.PNG')[0]}.json`
                        )
                      ? 'font-regular hover:text-green-900 text-green-900 bg-green-100 hover:bg-green-100'
                      : 'font-regular hover:font-semibold hover:bg-gray-100'
                } cursor-pointer`}
              >
                {getName(item.name)}
                {doneList?.includes(
                  `${getName(item.name).split('.PNG')[0]}.json`
                ) && (
                  <Check
                    className={`size-4 text-green-900 ${imgSrc === item.url ? 'text-white' : 'text-green-900'}`}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
