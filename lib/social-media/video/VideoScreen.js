import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  NativeModules,
} from 'react-native';
import { Audio } from 'expo-av';

import { Camera } from 'expo-camera';

import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import ToolBar from './ToolBar';
import SideBar from './SideBar';
import Block from '../../Block';
import sizes from '../../theme/Sizes';
import StatusBar from '../../StatusBar';

const { StatusBarManager } = NativeModules;

const statusHeight = StatusBarManager.HEIGHT;

const VideoScreen = ({
  onCancel = () => {},
  onSelectOne = () => {},
  navigation,
  ...props
}) => {
  const CameraRef = React.useRef();
  const VideoPlayerRef = React.useRef();

  const [hasCameraPermission, sethasCameraPermission] = React.useState(false);
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );
  const [flashMode, setFlashMode] = React.useState('off');
  const [captures, setCaptures] = React.useState([]);
  const [recordedVideo, setRecordedVideo] = React.useState(null);
  const [capturing, setCapturing] = React.useState(null);
  const [recorded, setRecorded] = React.useState(0);

  const { height } = useWindowDimensions();
  const width = Math.round((height * 9) / 16);

  const onDone = async () => {
    if (recordedVideo) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        alert('Denied CAMERA permissions!');
      }

      const newasset = await MediaLibrary.createAssetAsync(recordedVideo.uri);
      onSelectOne(newasset);
      onCancel();
    } else {
      // alert('No photos to save!');
      onCancel();
    }
  };

  const handleCaptureOut = () => {
    if (capturing) CameraRef.current.stopRecording();
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
      const camera = await Camera.requestCameraPermissionsAsync();
      const audio = await Audio.requestPermissionsAsync();

      const hasCameraPermission =
        camera.status === 'granted' && audio.status === 'granted';

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
  }, [recordedVideo]);

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
            onPress={() => navigation.goBack()}
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
          onLongCapture={handleLongCapture}
          // onShortCapture={handleShortCapture}
          navigation={navigation}
          onDelete={() => setRecordedVideo(null)}
        />
      </Block>
    </View>
  );
};

export default VideoScreen;
