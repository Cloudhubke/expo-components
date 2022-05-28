/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import styles from './styles';
import Block from '../../Block';
import Text from '../../Text';
import colors from '../../theme/Colors';
import MediaSelectorButton from '../gallery/MediaSelectorButton';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default ({
  capturing = false,
  cameraType = CameraTypes.back,
  flashMode = CameraFlashModes.off,
  setFlashMode,
  setCameraType,
  navigation,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture,
  onDelete,
  recordedVideo,
}) => (
  <Grid style={styles.bottomToolbar}>
    {!recordedVideo ? (
      <Row>
        <Col style={styles.alignCenter}>
          <TouchableOpacity onPress={() => {}}>
            <Text size={24}>🥰</Text>
          </TouchableOpacity>
          <Text small white>
            Effects
          </Text>
        </Col>

        <Col size={2} style={styles.alignCenter}>
          <TouchableWithoutFeedback
            onPressIn={onCaptureIn}
            onPressOut={onCaptureOut}
            onLongPress={onLongCapture}
            onPress={onShortCapture}
          >
            <View
              style={[styles.captureBtn, capturing && styles.captureBtnActive]}
            >
              <Block
                color={colors.danger}
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 5,
                  bottom: 5,
                  right: 5,
                  borderRadius: 30,
                }}
              />
              {capturing && <View style={styles.captureBtnInternal} />}
            </View>
          </TouchableWithoutFeedback>
        </Col>

        {/* <Col style={styles.alignCenter}>
          <TouchableOpacity>
            <Text size={24}>🏞</Text>
          </TouchableOpacity>
          <Text small white>
            Upload
          </Text>
        </Col> */}

        <Col style={styles.alignCenter}>
          <MediaSelectorButton
            onNext={({ selectedAssets, selectedAsset }) =>
              navigation.navigate('MediaUploadScreen', {
                selectedAssets,
                selectedAsset,
              })
            }
          />
        </Col>
      </Row>
    ) : (
      <Row>
        <Col size={2} style={styles.alignCenter}>
          <TouchableWithoutFeedback onPress={onDelete}>
            <Text style={{ color: '#F00' }}>Delete</Text>
          </TouchableWithoutFeedback>
        </Col>
      </Row>
    )}
  </Grid>
);
