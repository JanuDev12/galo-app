export interface ImageItem {
  id: number;
  name: string;
  src: string;
  createdDate: number;
  lastModified: number;
  artist: string;
  tags: string[];
  type: "image" | "video" | "gif";
}


export interface Collection {
  id: number;
  name: string;
  imagesCollected: ImageItem[];
}