import React from 'react';
import { Image } from 'react-native';
import { Video } from 'expo-av';
import Block from '../../Block';
import Text from '../../Text';
import colors from '../../theme/Colors';

const CoverThumbnail = ({ size = 85, assets, ...props }) => {
  const [selectedAsset, setSelectedAsset] = React.useState(assets[0]);

  return (
    <Block
      color={colors.gray3}
      flex={false}
      style={{ height: size, width: size, borderRadius: 8 }}
    >
      {selectedAsset.mediaType === 'photo' && (
        <Image
          style={{ width: '100%', height: '100%', borderRadius: 8 }}
          source={{ uri: selectedAsset.uri }}
        />
      )}
      {selectedAsset.mediaType === 'video' && (
        <Video
          source={{
            uri:
              selectedAsset.localUri ||
              selectedAsset.uri ||
              selectedAsset.Location,
          }}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode="cover"
          style={{ width: 'auto', height: '100%', borderRadius: 8 }}
          shouldPlay={false}
        />
      )}
    </Block>
  );
};

export default CoverThumbnail;
