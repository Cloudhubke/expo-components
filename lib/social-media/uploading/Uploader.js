/* eslint-disable no-param-reassign */
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import axios from 'axios';
import qs from 'qs';

const axInstance = () => axios.create({});

export const getBlob = async (fileUri) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const uploadAssetAsync = async ({
  asset,
  endpoint,
  resize,
  manipulate = true,
  onProgress,
  axiosinstance,
  signUrlEndpoint,
  directory,
}) => {
  async function uploadViaSignedUrl(file) {
    try {
      const fileData = await getBlob(file.localUri || file.uri);

      // get signed url
      const { data: signedFile } = await (axiosinstance || axInstance)().post(
        signUrlEndpoint,
        {
          file: {
            filename: `${file.filename || file.name}`.replace(
              /[^\w\d_\-.]+/gi,
              ''
            ),
            name: `${file.filename || file.name}`.replace(/[^\w\d_\-.]+/gi, ''),
            type: fileData.type,
            size: fileData.size,
          },
          dirname: directory,
          ACL: 'public-read',
        }
      );

      const qsParams = qs.parse(signedFile.signedUrl) || {};

      // upload now
      await axInstance().put(signedFile.signedUrl, fileData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': fileData.type,
          Expires: qsParams.Expires,
          'x-amz-acl': qsParams['x-amz-acl'] || 'public-read',
        },
        transformRequest: [
          (data, headers) => {
            delete headers.common.Authorization;
            return data;
          },
        ],
        onUploadProgress(progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress({
            ...asset,
            percent: percentCompleted,
          });
        },
      });

      const { signedUrl, ...uploadedFile } = signedFile;

      return uploadedFile;
    } catch (error) {
      throw error;
    }
  }

  // manipulate the image through expo's image manipulator
  let manipulatedImage = { ...asset };
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
    const manipulated = await manipulateAsync(asset.localUri || asset.uri, m, {
      compress: 0,
      format: SaveFormat.PNG,
    });
    manipulatedImage = {
      ...asset,
      ...manipulated,
    };
  }

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

  let result;

  if (signUrlEndpoint) {
    result = await uploadViaSignedUrl(manipulatedImage);
  } else {
    const { data } = await axios.request(options);
    result = data;
  }

  return result;
};

export default uploadAssetAsync;
