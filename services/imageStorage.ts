import {
  documentDirectory,
  getInfoAsync,
  makeDirectoryAsync,
  copyAsync,
} from 'expo-file-system/legacy';
import { CapturedImage, ImageSource } from '../types/camera';

const IMAGE_DIR = `${documentDirectory}food-images/`;

export async function ensureImageDirectory(): Promise<void> {
  const dirInfo = await getInfoAsync(IMAGE_DIR);
  if (!dirInfo.exists) {
    await makeDirectoryAsync(IMAGE_DIR, { intermediates: true });
  }
}

export async function saveImage(
  sourceUri: string,
  source: ImageSource
): Promise<CapturedImage> {
  await ensureImageDirectory();

  const id = generateUUID();
  const filename = `${id}.jpg`;
  const destinationUri = `${IMAGE_DIR}${filename}`;

  await copyAsync({
    from: sourceUri,
    to: destinationUri,
  });

  return {
    id,
    uri: destinationUri,
    source,
    timestamp: Date.now(),
  };
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
