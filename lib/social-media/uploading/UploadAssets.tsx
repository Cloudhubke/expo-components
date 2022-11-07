/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Image, Dimensions, View } from 'react-native';
import { ProgressBar, Colors, Spacings } from 'react-native-ui-lib';
import axios from 'axios';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Block from '../../Block';
import Text from '../../Text';
import colors from '../../theme/Colors';
import hextToRgb from '../../theme/hextToRgb';
import uploadAssetAsync from './Uploader';
import Button from '../../Button';
import UploadingContext from '../UploadingContext';
import ThemeContext from '../../theme/ThemeContext';

const UploadAsset = ({ assets, onChange = () => null }) => {
  const { sizes } = React.useContext(ThemeContext);
  const { endpoint, width, resize, signUrlEndpoint, directory, axiosinstance } =
    React.useContext(UploadingContext);
  const [uploadingAsset, setUploadingAsset] = React.useState({});
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState('');

  const strs = assets.map((a) => a.Location).join(', ');

  const uploadAsset = React.useMemo(
    () => async (uploadingAsset) => {
      try {
        setError('');
        const uploadedasset = await uploadAssetAsync({
          asset: uploadingAsset,
          endpoint: uploadingAsset.signedUrl || endpoint,
          resize,
          width,
          onProgress: (progress) => {
            setProgress(progress.percent || 0);
          },
          signUrlEndpoint,
          axiosinstance,
          directory,
        });

        if (uploadedasset && uploadedasset.Location) {
          onChange(
            assets.map((a) =>
              a.uri === uploadingAsset.uri
                ? {
                    ...uploadedasset,
                    mediaType: a.mediaType,
                  }
                : a
            )
          );
        }
      } catch (error) {
        setError(error.toString());
      }
    },
    []
  );

  React.useEffect(() => {
    const selected = assets.filter((a) => !a.Location)[0];

    if (selected) {
      const ind = assets.findIndex((a) => a.uri === selected.uri);
      setUploadingAsset({
        ...selected,
        index: ind + 1,
      });
    } else {
      setUploadingAsset({
        ...assets[assets.length - 1],
        selected: true,
        index: assets.length,
      });
    }
  }, [strs]);

  React.useEffect(() => {
    if (uploadingAsset.uri && !uploadingAsset.Location) {
      uploadAsset(uploadingAsset);
    }
  }, [uploadingAsset.uri]);

  const uploadCompleted =
    assets.filter((a) => Boolean(a.Location)).length === assets.length;

  return (
    <Block>
      {uploadingAsset.mediaType === 'photo' && (
        <Image
          source={{
            uri:
              uploadingAsset.localUri ||
              uploadingAsset.uri ||
              uploadingAsset.Location ||
              './assets/no_available_image.png',
          }}
          style={{ width: 'auto', height: width }}
        />
      )}

      {uploadingAsset.mediaType === 'video' && (
        <Video
          source={{
            uri:
              uploadingAsset.localUri ||
              uploadingAsset.uri ||
              uploadingAsset.Location,
          }}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode="cover"
          style={{ width: 'auto', height: width }}
          shouldPlay={false}
        />
      )}

      <Block
        flex={false}
        style={{
          position: 'absolute',
          bottom: 15,
          right: 0,
          left: 0,
        }}
        row
        middle
        space="between"
      >
        {Boolean(uploadingAsset.uri || uploadingAsset.Location) && !error && (
          <Block
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 5,
            }}
          >
            {uploadCompleted ? (
              <Block flex={false}>
                <Block flex={false} row middle>
                  <MaterialIcons
                    size={24}
                    name="check"
                    color={colors.success}
                  />
                  <Text size={14} success>
                    Upload completed
                  </Text>
                </Block>
              </Block>
            ) : (
              <Block flex={false} row space="between" padding={[sizes.padding]}>
                <Text white>
                  {`Uploading ${uploadingAsset.index} of ${assets.length} `}
                </Text>
                <Text white>{`${progress}%`}</Text>
              </Block>
            )}
          </Block>
        )}

        {Boolean(error) && (
          <Block
            flex={false}
            row
            middle
            color={`rgba(${hextToRgb(Colors.red50)}, 0.7)`}
            style={{ borderRadius: 8 }}
            padding
          >
            <Block>
              <Text size={14} error>
                {error}
              </Text>
            </Block>

            <Block flex={false}>
              <Button small rounded color={colors.success}>
                <Text
                  button
                  milkyWhite
                  onPress={() => uploadAsset(uploadingAsset)}
                >
                  Try Again
                </Text>
              </Button>
            </Block>
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default UploadAsset;
