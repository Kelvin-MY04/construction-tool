import { createYaml } from './yamlHandler';
import { listFiles } from './googleCloudStorage';

const users = ['andy', 'thaileangsung', 'leejihae', 'kelvin'];
const version = 'dummy';
const type = 'STR';

export const start = async (): void => {
  const files = await listFiles(`data/${version}/images/${type}`);

  const share = files.length / users.length;

  for (let i = 0; i < users.length; i++) {
    let sharedFiles = [];
    if (i < files.length - 1) {
      sharedFiles = files.slice(i * share, i * share + (share - 1));
    } else {
      sharedFiles = files.slice(i * share, files.length - 1);
    }

    const isCreated = await createYaml(users[i], {
      files: sharedFiles,
    });

    if (isCreated) console.log('Done!');
  }

  console.log(files);
};
