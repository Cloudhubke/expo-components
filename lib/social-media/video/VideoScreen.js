import React from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  Linking,
} from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncherAndroid from 'expo-intent-launcher';

import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import ToolBar from './ToolBar';
import SideBar from './SideBar';
import Block from '../../Block';
import Text from '../../Text';
import Button from '../../Button';
import sizes from '../../theme/Sizes';
import StatusBar from '../../StatusBar';
import UploadingContext from '../UploadingContext';
import ThemeContext from '../../theme/ThemeContext';

const VideoScreen = ({ navigation, ...props }) => {
  const { colors } = React.useContext(ThemeContext);

  const { mediaType, onClose } = React.useContext(UploadingContext);
  const CameraRef = React.useRef();

  const [hasCameraPermission, sethasCameraPermission] = React.useState(true);
  const [hasmediaaccess, setHasMediaAccess] = React.useState(true);
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );
  const [flashMode, setFlashMode] = React.useState('off');

  const [recordedVideo, setRecordedVideo] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const [capturing, setCapturing] = React.useState(null);
  const [recorded, setRecorded] = React.useState(0);

  const { height } = useWindowDimensions();
  const width = Math.round((height * 9) / 16);

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }

    if (Platform.OS === 'android') {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ActivityAction.APPLICATION_SETTINGS
      );
    }
  };

  const handleCaptureOut = () => {
    if (capturing) CameraRef.current.stopRecording();
  };

  const handleShortCapture = async () => {
    const photoData = await CameraRef.current.takePictureAsync();

    setCapturing(false);
    setPicture(photoData);
  };

  const handleLongCapture = async () => {
    setCapturing(true);
    setRecorded(0);
    setRecordedVideo(null);

    const interval = setInterval(() => {
      setRecorded({ recorded: recorded + 1 });
    }, 1000);

    const recordedVideo = await CameraRef.current.recordAsync({
      maxDuration: 120,
    });

    clearInterval(interval);
    setCapturing(false);
    setRecordedVideo(recordedVideo);
  };

  React.useEffect(() => {
    async function checkCemeraAccess() {
      const cameraroll = await MediaLibrary.requestPermissionsAsync();
      const camera = await Camera.requestCameraPermissionsAsync();
      const audio = await Audio.requestPermissionsAsync();

      const hasCameraPermission =
        camera.status === 'granted' && audio.status === 'granted';

      setHasMediaAccess(cameraroll.status === 'granted');

      sethasCameraPermission(hasCameraPermission);
    }

    checkCemeraAccess();
  }, []);

  React.useEffect(() => {
    if (recordedVideo && recordedVideo.uri) {
      navigation.navigate('VideoPreview', {
        recordedVideo,
      });

      setRecordedVideo(null);
    }

    if (picture && picture.uri) {
      navigation.navigate('PicturePreview', {
        picture,
      });

      setPicture(null);
    }
  }, [recordedVideo, picture]);

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return (
      <Block>
        <StatusBar hasHeight />
        <Block middle center>
          <Text>Please authorize access to Camera</Text>
        </Block>
      </Block>
    );
  }

  if (hasmediaaccess === false) {
    return (
      <Block center middle>
        <Block flex={false} padding>
          <Text bold center size={16}>
            This app requires you to grant access to camera and media library
          </Text>
        </Block>
        <Button
          small
          color={colors.dark}
          style={{ borderRadius: 5, alignSelf: 'center' }}
          onPress={openSettings}
        >
          <Text color={colors.milkyWhite}>Grant access to photos</Text>
        </Button>
      </Block>
    );
  }

  const videoProps = mediaType.includes('video')
    ? {
        onLongCapture: handleLongCapture,
      }
    : {};

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {!recordedVideo && (
        <Camera
          style={{
            height,
            width,
          }}
          type={cameraType}
          flashMode={flashMode}
          ratio="16:9"
          resizeMode="cover"
          ref={CameraRef}
        />
      )}

      <Block absolute>
        <StatusBar hasHeight />
        <Block
          row
          flex={false}
          style={{
            padding: sizes.padding,
            marginHorizontal: sizes.margin,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (navigation && typeof navigation.goBack === 'function') {
                navigation.goBack();
                onClose();
              }
            }}
            style={{ padding: sizes.padding }}
          >
            <MaterialIcons name="close" color="#fff" size={28} />
          </TouchableOpacity>
          <Block />
        </Block>
        <Block>
          <Block
            flex={false}
            style={{
              position: 'absolute',
              right: sizes.margin,
            }}
          >
            <SideBar
              recorded={recorded}
              recordedVideo={recordedVideo}
              capturing={capturing}
              flashMode={flashMode}
              cameraType={cameraType}
              setFlashMode={(mode) => setFlashMode(mode)}
              setCameraType={(type) => setCameraType(type)}
            />
          </Block>
        </Block>
        <ToolBar
          recorded={recorded}
          recordedVideo={recordedVideo}
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          onCaptureOut={handleCaptureOut}
          {...videoProps}
          onShortCapture={handleShortCapture}
          navigation={navigation}
          onDelete={() => setRecordedVideo(null)}
        />
      </Block>
    </View>
  );
};

export default VideoScreen;
