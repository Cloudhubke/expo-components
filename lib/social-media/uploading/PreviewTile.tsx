import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import Block from '../../Block';
import Text from '../../Text';

const { width, height } = Dimensions.get('window');

const PreviewTile = ({ item, index, selected, ...props }) => {
  if (!item) return null;

  return (
    <View
      style={{
        position: 'relative',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <View
        style={{
          width: width / 4,
          height: width / 4,
          justifyContent: 'center',
          position: 'relative',
          margin: 2.5,
        }}
      >
        {item.mediaType === 'photo' && (
          <Image
            style={{ flex: 1, resizeMode: 'cover' }}
            source={{ uri: item.localUri || item.uri || item.Location }}
          />
        )}
        {item.mediaType === 'video' && (
          <Video
            source={{
              uri: item.localUri || item.uri || item.Location,
            }}
            rate={1.0}
            volume={1.0}
            isMuted
            resizeMode="cover"
            isLooping
            style={{ width: 'auto', height: '100%' }}
            shouldPlay={false}
          />
        )}

        {selected && (
          <AntDesign
            name="check"
            color="#FFFCFF"
            size={32}
            style={{
              position: 'absolute',
              left: 'auto',
              top: 'auto',
              marginLeft: 'auto',
            }}
          />
        )}

        {Boolean(item.Location) && (
          <Block
            flex={false}
            style={{
              position: 'absolute',
              left: 'auto',
              top: 'auto',
              marginLeft: 'auto',
              alignSelf: 'center',
            }}
            center
          >
            <MaterialIcons
              name="check"
              color="#FFFCFF"
              size={32}
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowRadius: 10,
                textShadowOffset: { width: 0, height: 0 },
              }}
            />
            <Text small white>
              Uploaded
            </Text>
          </Block>
        )}
      </View>
    </View>
  );
};
export default PreviewTile;
