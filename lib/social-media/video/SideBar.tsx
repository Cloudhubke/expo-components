import React from 'react';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import Block from '../../Block';
import Text from '../../Text';
import colors from '../../theme/Colors';
import sizes from '../../theme/Sizes';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

const styles = {
  iconStyle: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
};

export default ({
  capturing = false,
  cameraType = CameraTypes.back,
  flashMode = CameraFlashModes.off,
  setFlashMode,
  setCameraType,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture,
  onDelete,
  recordedVideo,
}) => (
  <Block flex={false} center shadow>
    <TouchableOpacity
      onPress={() =>
        setFlashMode(
          flashMode === CameraFlashModes.on
            ? CameraFlashModes.off
            : CameraFlashModes.on
        )
      }
      style={{ margin: sizes.margin }}
    >
      <MaterialIcons
        name={flashMode === CameraFlashModes.on ? 'flash-on' : 'flash-off'}
        color={colors.white}
        style={styles.iconStyle}
        size={24}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() =>
        setCameraType(
          cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
        )
      }
    >
      <MaterialIcons
        style={styles.iconStyle}
        name="flip-camera-ios"
        color={colors.white}
        size={24}
      />
      <Text small white center>
        flip
      </Text>
    </TouchableOpacity>
  </Block>
);
