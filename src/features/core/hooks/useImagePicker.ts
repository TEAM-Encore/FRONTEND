import {launchImageLibrary} from 'react-native-image-picker';

function useImagePicker() {
  const launchLibrary = async () => {
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      });

      const asset = assets?.at(0);

      if (!asset) throw new Error('Cancelled');

      return asset;
    } catch (err) {
      console.error(err);
    }
  };

  return {launchLibrary};
}

export default useImagePicker;
