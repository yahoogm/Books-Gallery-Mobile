type VolumeInfo = {
  title: string;
  publishedDate: string;
  description: string;
  author: Array<string>;
  publisher: string;
  imageLinks: {smallThumbnail: string; thumbnail: string; large?: string};
};

export type BookItem = {
  id: string;
  volumeInfo: VolumeInfo;
};
