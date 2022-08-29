/* eslint-disable class-methods-use-this */
import { TemporaryDirectoryPath, copyFile } from 'react-native-fs';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

interface ConverterEngine {
  convert(arg0: string): Promise<string>;
}

class AndroidImageConverter implements ConverterEngine {
  async convert(ImageUri: string, index = 0, width = 720): Promise<string> {
    let fileUri = ImageUri;

    if (ImageUri.startsWith('content://')) {
      try {
        fileUri = await this.createFileUriFromContentUri(ImageUri);
      } catch (e) {
        throw new Error('Failed to create file uri from content uri');
      }
    }

    const outputImageName = `output${index}.png`;
    const outputImageUri = `file://${TemporaryDirectoryPath}/${outputImageName}`;

    try {
      const session = await FFmpegKit.execute(
        `-y -i ${fileUri} -vf scale=-2:${width} -format png ${outputImageUri}`
      );

      const returnCode = await session.getReturnCode();

      if (`${returnCode.toString()}` !== '0') {
        return '';
      }

      return outputImageUri;
    } catch (e) {
      throw new Error('Failed to convert the video');
    }
  }

  async createFileUriFromContentUri(contentUri: string): Promise<string> {
    const fileUri = contentUri.replace(
      'com.android.providers.media.documents/document/video%3A',
      'media/external/video/media/'
    );
    const uriComponents = fileUri.split('/');
    const fileName = uriComponents[uriComponents.length - 1];
    const newFilePath = `${TemporaryDirectoryPath}/${fileName}`;
    await copyFile(contentUri, newFilePath);

    return `file://${newFilePath}`;
  }
}

export default AndroidImageConverter;
