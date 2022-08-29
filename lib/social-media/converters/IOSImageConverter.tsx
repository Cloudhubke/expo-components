/* eslint-disable class-methods-use-this */
import { TemporaryDirectoryPath } from 'react-native-fs';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

interface ConverterEngine {
  convert(arg0: string): Promise<string>;
}

class IOSImageConverter implements ConverterEngine {
  async convert(ImageUri: string, index = 0, width = 720): Promise<string> {
    const outputImageName = `output${index}.png`;
    const outputImageUri = `file://${TemporaryDirectoryPath}/${outputImageName}`;

    try {
      const session = await FFmpegKit.execute(
        `-y -i ${ImageUri} -vf scale=-2:${width} -vframes 1 -format image2 ${outputImageUri}`
      );
      const returnCode = await session.getReturnCode();

      if (`${returnCode.toString()}` !== '0') {
        return '';
      }

      return outputImageUri;
    } catch (error) {
      throw new Error(`Failed to convert the image: ${error}`);
    }
  }
}

export default IOSImageConverter;
