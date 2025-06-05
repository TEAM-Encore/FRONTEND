import {PostPresignedUrl} from '@/api/image.api';
import generateId from './generateId';

async function getPresignedUrl(name: string) {
  try {
    const url = await PostPresignedUrl(name);

    return url;
  } catch (err) {
    console.error(`[FILE UPLOAD] Err Get Presigned Url : ${err}`);
  }
}

async function getImageBlob(url: string) {
  try {
    const res = await fetch(url);
    return res.blob();
  } catch (err) {
    console.error(`[FILE UPLOAD] Err Transfer Blob : ${err}`);
  }
}

type Params = {
  uri: string;
  name?: string;
  type?: string;
};

export default async function uploadImageByPresignedUrl(params: Params) {
  try {
    const url = params.uri;
    const name = params.name ?? generateId();
    const type = params.type ?? 'image/jpeg';

    const [presignedUrl, blob] = await Promise.all([
      getPresignedUrl(name),
      getImageBlob(url),
    ]);
    if (!presignedUrl || !blob) return;

    await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': type,
      },
      body: blob,
    });

    const uploadedUrl = presignedUrl.split('?')[0];

    return uploadedUrl;
  } catch (err) {
    console.error(`[FILE UPLOAD] Err Fetch Image Upload : ${err}`);
  }
}
