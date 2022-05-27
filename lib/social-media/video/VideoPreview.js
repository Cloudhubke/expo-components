import React from 'react';
import { Video, Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Block from '../../Block';
import Text from '../../Text';
import Button from '../../Button';
import colors from '../../theme/Colors';
import StatusBar from '../../StatusBar';
import SafeAreaView from '../../SafeAreaView';

const styles = {
  iconStyle: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
    color: '#fff',
  },
};

const VideoPreview = ({ route, navigation, endpoint, onBack }) => {
  const VideoPlayerRef = React.useRef();
  const { recordedVideo } = route.params || {};

  return (
    <Block>
      <Video
        source={{
          uri: recordedVideo.uri,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        isLooping
        style={{ width: 'auto', height: '100%' }}
        ref={VideoPlayerRef}
        shouldPlay
      />
      <Block absolute>
        <SafeAreaView bottom>
          <StatusBar hasHeight />
          <Block flex={false} row padding>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="chevron-left"
                size={28}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          </Block>
          <Block />
          <Block flex={false} padding row color={colors.dark}>
            <Button
              color={colors.mistyWhite}
              style={{ flex: 1, marginHorizontal: 2.5, borderRadius: 8 }}
            >
              <Text button dark fullWidth center>
                Post to status
              </Text>
            </Button>

            <Button
              color={colors.accent}
              style={{ flex: 1, marginHorizontal: 2.5, borderRadius: 8 }}
              onPress={() =>
                navigation.navigate('VideoUpload', {
                  recordedVideo,
                })
              }
            >
              <Text button dark mistyWhite center fullWidth bold>
                Next
              </Text>
            </Button>
          </Block>
        </SafeAreaView>
      </Block>
    </Block>
  );
};

export default VideoPreview;
