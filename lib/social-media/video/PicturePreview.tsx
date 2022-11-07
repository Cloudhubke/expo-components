import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Block from '../../Block';
import Text from '../../Text';
import Button from '../../Button';
import colors from '../../theme/Colors';
import StatusBar from '../../StatusBar';
import SafeAreaView from '../../SafeAreaView';
import UploadingContext from '../UploadingContext';

const styles = {
  iconStyle: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
    color: '#fff',
  },
};

const PicturePreview = ({ route, navigation, endpoint, onBack }) => {
  const { addCaptionToAssets } = React.useContext(UploadingContext);
  const { picture } = route.params || {};

  return (
    <Block>
      <Image
        source={{
          uri: picture.uri,
        }}
        style={{ width: 'auto', height: '100%' }}
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
              onPress={() => {
                if (addCaptionToAssets) {
                  navigation.navigate('AddCaptionScreen', {
                    selectedAssets: [
                      {
                        ...picture,
                        mediaType: 'photo',
                      },
                    ],
                  });
                } else {
                  navigation.navigate('MediaUploadScreen', {
                    selectedAssets: [
                      {
                        ...picture,
                        mediaType: 'photo',
                      },
                    ],
                  });
                }
              }}
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

export default PicturePreview;
