import React from 'react';
import { TouchableOpacity, Keyboard, Platform } from 'react-native';
// import MovToMp4 from 'react-native-mov-to-mp4';
import Block from '../../Block';
import Input from '../../Input';
import Text from '../../Text';
import SafeAreaView from '../../SafeAreaView';
import Header from '../../Header';
import sizes from '../../theme/Sizes';
import Form from '../../form/Form';
import Field from '../../form/Field';
import CoverThumbnail from './CoverThumbnail';
import Button from '../../Button';
import ThemeContext from '../../theme/ThemeContext';
import AndroidVideoConverter from '../converters/AndroidVideoConverter';
import IOSVideoConverter from '../converters/IOSVideoConverter';
import AndroidImageConverter from '../converters/AndroidImageConverter';
import IOSImageConverter from '../converters/IOSImageConverter';

import UploadingContext from '../UploadingContext';

function getVideoConverterInstance() {
  if (Platform.OS === 'android') {
    return new AndroidVideoConverter();
  }
  return new IOSVideoConverter();
}

function getImageConverterInstance() {
  if (Platform.OS === 'android') {
    return new AndroidImageConverter();
  }
  return new IOSImageConverter();
}

const videoConverter = getVideoConverterInstance();
const imageConverter = getImageConverterInstance();

// function convertMovToMp4(uri) {
//   return new Promise((resolve) => {
//     MovToMp4.convertMovToMp4(uri.replace('file://', ''), 'output')
//       .then((results) => {
//         // here you can upload the video...
//         resolve(results);
//       })
//       .catch((error) => {
//         console.log(error);
//         resolve(null);
//       });
//   });
// }

const AddCaptionScreen = ({ navigation, route }) => {
  const params = route.params || {};
  const [keyboardVisible, setKeyBoardVisible] = React.useState(false);
  const [converting, setConverting] = React.useState(false);
  const [error, setError] = React.useState('');
  const { colors } = React.useContext(ThemeContext);
  const { width, resize, maxVideoDuration } =
    React.useContext(UploadingContext);
  const onPost = async (values) => {
    const selectedAsset =
      params.selectedAsset || params.selectedAssets[0] || {};

    if (selectedAsset.mediaType === 'video') {
      let convertedVideoUri = selectedAsset.uri;

      if (selectedAsset.duration > maxVideoDuration) {
        setError(
          `Video duration cannot be greater than ${maxVideoDuration} seconds`
        );
        return;
      }

      setConverting(true);

      convertedVideoUri = await videoConverter.convert(
        selectedAsset.uri,
        0,
        width
      );
      setConverting(false);

      if (!convertedVideoUri) {
        setError('Unable to upload this file. Please try a different file.');
      }

      const filename = `${convertedVideoUri}`.split('/').pop();

      navigation.navigate('MediaUploadScreen', {
        ...params,
        selectedAsset: {
          filename,
          duration: selectedAsset.duration || '',
          id: selectedAsset.id || '',
          uri: convertedVideoUri,
          mediaType: 'video',
        },
        selectedAssets: [
          {
            filename,
            duration: selectedAsset.duration || '',
            id: selectedAsset.id || '',
            uri: convertedVideoUri,
            mediaType: 'video',
          },
        ],
        Extras: {
          ...values,
        },
      });
    }
    let convertedImageUri = selectedAsset.uri;

    if (resize && selectedAsset.width > width) {
      setConverting(true);
      convertedImageUri = await imageConverter.convert(
        selectedAsset.uri,
        0,
        width
      );
      setConverting(false);
    }

    if (convertedImageUri) {
      const filename = `${convertedImageUri}`.split('/').pop();

      navigation.navigate('MediaUploadScreen', {
        ...params,
        selectedAsset: {
          filename,
          id: selectedAsset.id || '',
          uri: convertedImageUri,
          mediaType: 'photo',
        },
        selectedAssets: [
          {
            filename,
            id: selectedAsset.id || '',
            uri: convertedImageUri,
            mediaType: 'photo',
          },
        ],
        Extras: {
          ...values,
        },
      });
    } else {
      setError('Unable to upload this file. Please try a different file.');
    }
  };

  const pressContainer = () => {
    Keyboard.dismiss();
  };

  React.useEffect(() => {
    const keyboardDidShow = () => {
      setKeyBoardVisible(true);
    };

    const keyboardDidHide = () => {
      setKeyBoardVisible(false);
    };

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  return (
    <SafeAreaView top bottom>
      <Header
        onBack={() => {
          navigation.goBack();
        }}
        rightComponent={
          <TouchableOpacity style={{ padding: sizes.padding }}>
            <Text size={14}>Cancel</Text>
          </TouchableOpacity>
        }
        style={{
          borderBottomColor: '#e6e6e6',
          borderBottomWidth: 1,
        }}
      >
        <Block flex={false} center>
          <Text bold dark size={16}>
            Post
          </Text>
        </Block>
      </Header>
      <Block>
        <Form
          onSubmit={onPost}
          render={({ handleSubmit, form }) => (
            <Block>
              <Block>
                <Block
                  flex={false}
                  row
                  middle
                  padding={[0, sizes.padding, 0, 0]}
                >
                  <Field
                    name="Description"
                    placeholder="Add descrption"
                    component={Input}
                    multiline
                    flex
                    numberOfLines={3}
                    style={{
                      height: 120,
                      textAlignVertical: 'top',
                      padding: 5,
                    }}
                    required
                  />

                  <Block flex={false}>
                    <CoverThumbnail size={120} assets={params.selectedAssets} />
                  </Block>
                </Block>
                <Block>
                  {keyboardVisible && (
                    <Block
                      absolute
                      color="rgba(0,0,0,0.2)"
                      ripple
                      rippleColor={colors.gray2}
                      onPress={pressContainer}
                    />
                  )}
                </Block>
              </Block>
              {Boolean(error) && (
                <Block flex={false} padding center>
                  <Text size={14} color={colors.error}>
                    {error}
                  </Text>
                </Block>
              )}
              {converting && (
                <Block flex={false} padding center>
                  <Text size={14} color={colors.gray}>
                    Please wait as we prepare for upload...
                  </Text>
                </Block>
              )}
              <Block flex={false} padding row right>
                <Block />
                <Button
                  color={colors.primary}
                  small
                  style={{ flex: 1 }}
                  onPress={handleSubmit}
                  disabled={converting}
                >
                  <Text mistyWhite bold size={14} fullWidth center>
                    {`${converting ? 'Preparing assets...' : 'Post'}`}
                  </Text>
                </Button>
              </Block>
            </Block>
          )}
        />
      </Block>
    </SafeAreaView>
  );
};

export default AddCaptionScreen;
