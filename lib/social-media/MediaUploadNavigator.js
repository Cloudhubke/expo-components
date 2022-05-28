import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'react-native';
import VideoScreen from './video/VideoScreen';
import PlayerScreen from './video/VideoPreview';
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
  signUrlEndpoint,
  directory,
  axiosinstance,
}) {
  return (
    <UploadingContext.Provider
      value={{
        endpoint,
        onSave,
        limit: limit || 1,
        signUrlEndpoint,
        directory,
        axiosinstance,
      }}
    >
      <Block>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
          mode="modal"
        >
          <Stack.Screen name="Home" component={VideoScreen} />
          <Stack.Screen name="VideoPreview" component={PlayerScreen} />
          <Stack.Screen name="AddCaptionScreen" component={AddCaptionScreen} />
          <Stack.Screen
            name="MediaUploadScreen"
            component={MediaUploadScreen}
          />
        </Stack.Navigator>
      </Block>
    </UploadingContext.Provider>
  );
}

export default MediaUploadNavigator;
