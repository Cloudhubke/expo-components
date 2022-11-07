import React, { Component, Fragment } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Image,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import Toastr from '../Toastr';
import ImageViewer from './ImageViewer';
import MediaSelector from './MediaSelector';
import ImageDisplay from './ImageDisplay';
import CameraScreen from './CameraScreen';
import VideoScreen from './video/VideoScreen';
import Block from '../Block';
import BlockModal from '../modal/BlockModal';

import StatusBar from '../StatusBar';
import colors from '../theme/Colors';
import SafeAreaView from '../SafeAreaView';
import MediaUploadNavigator from './MediaUploadNavigator';

const { width } = Dimensions.get('window');

const VideoUpload = ({
  endpoint = '/fileapi/upload/image',
  allowRemove = true,
  showAddButton = true,
  value = {},
  onChange = () => {},
  limit = 1,
  placeholderImage = null,
  anchorComponent = null,
  resize = true,
  ...props
}) => {
  const [openselector, setOpenSelector] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState(null);

  const onSelectOne = (selectedAsset) => {
    setSelectedAsset(selectedAsset);
  };

  const onUploadProgress = (assets) => {
    if (selectedAsset) {
      this.props.onChange(selectedAsset);
      this.props.input.onChange(selectedAsset);
    }
  };

  const uploading = selectedAsset && !selectedAsset.url;

  return (
    <Block>
      {anchorComponent || (
        <TouchableOpacity onPress={() => setOpenSelector(true)}>
          <MaterialIcons name="add" size={24} />
        </TouchableOpacity>
      )}

      <BlockModal
        isVisible={openselector}
        onClose={() => setOpenSelector(false)}
        fill
      >
        <MediaUploadNavigator />
      </BlockModal>
    </Block>
  );
};

export default VideoUpload;
