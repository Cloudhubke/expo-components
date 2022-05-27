import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
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
        <Image
          style={{ flex: 1, resizeMode: 'cover' }}
          source={{ uri: item.uri || item.Location }}
        />
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
        {item.mediaType === 'video' && (
          <View
            style={{
              position: 'absolute',
              bottom: 2,
              right: 2,
              justifyContent: 'flex-end',
            }}
          >
            <Text style={{ fontSize: 9, color: '#FFFCFF' }}>
              {Number(item.duration).toFixed(2)}
            </Text>
          </View>
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
