import { useEffect, useState } from 'react';
import game from '../services/game';

const imagesImport = import.meta.glob('../assets/images/rewards/*.jpg', { as: 'url' });
const imagesThumbsImport = import.meta.glob('../assets/images/rewards/thumbnails/*.jpg', { as: 'url' });

const parseSourceImport = async (
  source: Record<string, () => Promise<string>>,
  targetArray: Multiplix.RewardPicture[],
  targetProp: 'src' | 'thumbnail'
) => {
  for (const item in source) {
    const url = await source[item]();
    const fileId = Number(url.split('/').splice(-1)[0].split('.')[0]);
    const dataIndex = targetArray.findIndex(({ id }) => fileId === id);
    if (dataIndex !== -1) targetArray[dataIndex][targetProp] = url;
  }
};

export const useImagesImport = () => {
  const [images, setImages] = useState<Multiplix.RewardPicture[]>(
    Array.from({ length: game.rewardsQuantity }, (_, index) => ({ id: index + 1, src: '', thumbnail: '' }))
  );

  useEffect(() => {
    const fetchImages = async () => {
      const tempData: Multiplix.RewardPicture[] = Array.from({ length: game.rewardsQuantity }, (_, index) => ({
        id: index + 1,
        src: '',
        thumbnail: ''
      }));
      await parseSourceImport(imagesImport, tempData, 'src');
      await parseSourceImport(imagesThumbsImport, tempData, 'thumbnail');
      setImages(tempData);
    };
    fetchImages();
  }, []);

  return images;
};
