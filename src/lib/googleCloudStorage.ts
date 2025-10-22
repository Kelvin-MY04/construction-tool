'use server';

import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;
const bucket = storage.bucket(bucketName);
const folder = 'floor_plans';

// Upload file
export async function uploadFile(data, filename, contentType) {
  const jsonStr = JSON.stringify(data, null, 2);
  const buffer = Buffer.from(jsonStr, 'utf-8');

  const blob = bucket.file(filename);
  const blobStream = blob.createWriteStream({
    resumable: false,
    metadata: { contentType },
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => reject(err));
    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
      resolve(publicUrl);
    });
    blobStream.end(buffer);
  });
}

// Delete file
export async function deleteFile(filename) {
  await bucket.file(filename).delete();
  return { success: true };
}

// List files
export async function listFiles(prefix: string) {
  const [files] = await bucket.getFiles({
    prefix: `${folder}/${prefix}`,
  });
  return files.map((file) => ({
    name: file.name,
    size: file.metadata.size,
    updated: file.metadata.updated,
    url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
  }));
}

// Get signed URL (for private files)
export async function getSignedUrl(filename, expiresIn = 3600) {
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + expiresIn * 1000, // expires in seconds
  };

  const [url] = await bucket.file(filename).getSignedUrl(options);
  return url;
}
