export type ImageSource = 'camera' | 'gallery';

export type CapturedImage = {
  id: string;
  uri: string;
  source: ImageSource;
  timestamp: number;
  width?: number;
  height?: number;
};

export type CameraError =
  | 'permission_denied'
  | 'camera_unavailable'
  | 'camera_in_use'
  | 'storage_error'
  | 'gallery_empty';
