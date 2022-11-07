import React from 'react';
import { View } from 'react-native';
import { Video, Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

const VideoPlayer = ({ source }) => {
  const videoPlayerRef = React.useRef();
  //   const [asset, setAsset] = React.useState({});

  //   React.useEffect(() => {
  //     async function loadVideo() {
  //       const asset = await MediaLibrary.getAssetInfoAsync(source.id);
  //       setAsset(asset);

  //       //   await videoPlayerRef.current.loadAsync(asset);
  //       //   await videoPlayerRef.current.playAsync();
  //     }

  //     if (source.uri) {
  //       loadVideo();
  //     }
  //   }, [source.uri]);

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Video
        source={{
          uri: source.localUri || source.uri,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        isLooping
        style={{ width: 'auto', height: '100%' }}
        ref={videoPlayerRef}
        shouldPlay
      />
    </View>
  );
};

export default VideoPlayer;
