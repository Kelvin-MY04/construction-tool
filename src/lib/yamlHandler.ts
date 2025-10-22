'use server';

import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export const checkYamlExist = async (filename: string): void => {
  const filePath = path.join(
    process.cwd(),
    'public/configs',
    `${filename}.yaml`
  );

  return fs.existsSync(filePath);
};

export const createYaml = async (filename: string, data: any): boolean => {
  try {
    const yamlStr = yaml.dump(data);
    fs.writeFileSync(`public/configs/${filename}.yaml`, yamlStr, 'utf8');

    return true;
  } catch (err: any) {
    console.error(err);
    return false;
  }
};

export const readYaml = async (filename: string): void => {
  const filePath = path.join(
    process.cwd(),
    'public/configs',
    `${filename}.yaml`
  );
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents);

  return data;
};
