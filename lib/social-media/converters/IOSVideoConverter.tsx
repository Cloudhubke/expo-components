/* eslint-disable class-methods-use-this */
import { TemporaryDirectoryPath } from 'react-native-fs';
import { FFmpegKit } from 'ffmpeg-kit-react-native';

interface ConverterEngine {
  convert(arg0: string): Promise<string>;
}

class IOSVideoConverter implements ConverterEngine {
  async convert(videoUri: string, index = 0, width = 720): Promise<string> {
    const outputVideoName = `output${index}.mp4`;
    const outputVideoUri = `file://${TemporaryDirectoryPath}/${outputVideoName}`;

    try {
      const session = await FFmpegKit.execute(
        `-y -i ${videoUri} -vcodec mpeg4 -vf scale=-2:${width} -b:v 1.5M -format mp4 ${outputVideoUri}`
      );
      const returnCode = await session.getReturnCode();

      if (`${returnCode.toString()}` !== '0') {
        return '';
      }

      return outputVideoUri;
    } catch (e) {
      throw new Error('Failed to convert the video');
    }
  }
}

export default IOSVideoConverter;
