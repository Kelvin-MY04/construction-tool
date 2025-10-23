'use client';

import { JSX, useState, useEffect } from 'react';
import { useFetchDataList } from '@/lib/queries';
import { useStudio } from '@/stores';
import { listFiles } from '@/lib/googleCloudStorage';
import Cookies from 'js-cookie';
import { checkYamlExist, readYaml } from '@/lib/yamlHandler';
import dynamic from 'next/dynamic';

const ImageViewer = dynamic(() => import('./ImageViewer'), { ssr: false });
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

const Main = (): JSX.Element => {
  const user = Cookies.get('user');

  const {
    index,
    imgSrc,
    jsonSrc,
    setImgSrc,
    setJsonSrc,
    setDataList,
    doneList,
    setDoneList,
  } = useStudio();

  const isSTR_PNG = (item: any): boolean =>
    item.name.includes('STR') && item.name.includes('PNG');

  const getName = (name: string): string =>
    name.split('/')[name.split('/').length - 1];

  useEffect(() => {
    const loadData = async () => await listFiles('saved');

    loadData().then((res) =>
      setDoneList(
        res.map((item) => item.name.split('/')[item.name.split('/').length - 1])
      )
    );
  }, [index]);

  useEffect(() => {
    if (user) {
      const check = async () => {
        const res = await checkYamlExist(user);
        if (res) {
          const loadData = await readYaml(user);
          fetchData(loadData.files);
        } else {
          const loadData = await listFiles('data');
          fetchData(loadData);
        }
      };

      check();
    }

    const fetchData = (data: any) => {
      const filteredData = data.filter((item: any) => isSTR_PNG(item));
      setDataList(filteredData);

      if (imgSrc === '') setImgSrc(filteredData[0].url);
      const name = `${getName(filteredData[0].name).split('.PNG')[0]}.json`;
      if (jsonSrc === '') {
        console.log(doneList);
        if (doneList?.includes(name)) {
          setJsonSrc(
            `https://storage.googleapis.com/decora-alpha-deno/floor_plans/saved/${name}`
          );
        } else {
          setJsonSrc(
            filteredData[0].url
              .replace('images', 'jsons')
              .replace('PNG', 'json')
          );
        }
      }
    };
  }, [doneList]);

  return (
    <div className="w-full flex flex-row gap-x-5">
      <ImageViewer />
      <Sidebar />
    </div>
  );
};

export default Main;
