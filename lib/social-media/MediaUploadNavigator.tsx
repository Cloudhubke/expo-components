import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'react-native';
import VideoScreen from './video/VideoScreen';
import PlayerScreen from './video/VideoPreview';
import PicturePreview from './video/PicturePreview';
import AddCaptionScreen from './video/AddCaptionScreen';
import MediaUploadScreen from './uploading/MediaUploadScreen';
import Block from '../Block';

import UploadingContext from './UploadingContext';

// ...

const Stack = createStackNavigator();

function MediaUploadNavigator({
  endpoint,
  onSave,
  limit,
  mediaType = ['photo', 'video'],
  resize = true,
  width = 720,
  maxVideoDuration = 180,
  signUrlEndpoint,
  directory,
  axiosinstance,
  addCaptionToAssets = false,
  onClose = () => null,
  navigation,
}) {
  return (
    <UploadingContext.Provider
      value={{
        endpoint,
        onSave,
        limit: limit || 1,
        resize,
        width,
        mediaType,
        signUrlEndpoint,
        directory,
        axiosinstance,
        maxVideoDuration,
        addCaptionToAssets,
        onClose,
        rootNavigator: navigation,
      }}
    >
      <Block>
        <NavigationContainer independent>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home"
            mode="modal"
          >
            <Stack.Screen name="Home" component={VideoScreen} />
            <Stack.Screen name="VideoPreview" component={PlayerScreen} />
            <Stack.Screen name="PicturePreview" component={PicturePreview} />
            <Stack.Screen
              name="AddCaptionScreen"
              component={AddCaptionScreen}
            />
            <Stack.Screen
              name="MediaUploadScreen"
              component={MediaUploadScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Block>
    </UploadingContext.Provider>
  );
}

export default MediaUploadNavigator;
