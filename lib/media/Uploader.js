import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';

export const uploadAssetAsync = async ({
  asset,
  endpoint,
  resize,
  manipulate = true,
  onProgress,
}) => {
  // manipulate the image through expo's image manipulator
  let manipulatedImage = {};
  let m = [];

  let resizeImage = {
    width: 720,
  };

  if (asset.width && asset.height) {
    if (asset.height > asset.width && asset.height > 720) {
      resizeImage = {
        height: 720,
      };
    }

    if (asset.width < 720) {
      resizeImage = {
        width: asset.width,
      };
    }
  }

  if (resize) {
    m = [{ resize: resizeImage }];
  }

  if (manipulate && asset.mediaType === 'photo') {
    manipulatedImage = await manipulateAsync(asset.localUri || asset.uri, m, {
      compress: 0,
      format: SaveFormat.PNG,
    });
  }

  manipulatedImage = {
    // ...asset,
    ...manipulatedImage,
  };

  // console.log('====================================');
  // console.log('MANIPULATED', manipulatedImage);
  // console.log('====================================');

  const apiUrl =
    endpoint ||
    'https://file-upload-example-backend-dkhqoilqqn.now.sh/imagesupload';

  const uriParts = manipulatedImage.uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  formData.append('file', {
    uri: manipulatedImage.uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  const options = {
    url: apiUrl,
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress(progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress({
        ...asset,
        percent: percentCompleted,
      });
    },
  };
  // console.log('Uploading ', asset.uri, 'to :', apiUrl);
  // const response = await fetch(apiUrl, options);

  // const uploadResult = await response.json();

  // return uploadResult;

  const { data } = await axios.request(options);

  return data;
};

export default uploadAssetAsync;
