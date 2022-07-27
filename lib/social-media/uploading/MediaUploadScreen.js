import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Block from '../../Block';
import SafeAreaView from '../../SafeAreaView';
import Text from '../../Text';
import Button from '../../Button';
import ThemeContext from '../../theme/ThemeContext';
import PreviewTile from './PreviewTile';
import UploadAssets from './UploadAssets';
import UploadingContext from '../UploadingContext';

const MediaUploadScreen = ({ navigation, route }) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const { onSave, rootNavigator, limit } = React.useContext(UploadingContext);
  const params = route.params || {};

  const [selectedAssets, setSelectedAssets] = React.useState(
    params.selectedAssets
  );

  const saveHandler = () => {
    navigation.goBack();
    if (limit === 1) {
      onSave({
        Asset: selectedAssets[0],
        ...(params.Extras || {}),
      });
    } else {
      onSave({
        Assets: selectedAssets,
        ...(params.Extras || {}),
      });
    }
    if (rootNavigator && typeof rootNavigator.goBack === 'function') {
      rootNavigator.goBack();
    }
    // navigation.goBack();
  };

  const renderImageTile = ({ item, index }) => (
    <PreviewTile item={item} index={index} uploaded={Boolean(item.Location)} />
  );

  const uploadCompleted =
    selectedAssets.filter((a) => Boolean(a.Location)).length ===
    selectedAssets.length;

  return (
    <SafeAreaView bottom>
      <Block>
        <Block style={{ position: 'relative' }}>
          <UploadAssets
            assets={selectedAssets}
            onChange={(assets) => {
              setSelectedAssets(assets);
            }}
          />
          <Block style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <SafeAreaView top />
            <Block flex={false} row padding={sizes.padding}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="close"
                  color="#FFFCFF"
                  size={28}
                  style={{
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowRadius: 10,
                    textShadowOffset: { width: 0, height: 0 },
                  }}
                />
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
        <Block color={colors.gray2} padding={2.5}>
          <FlatList
            data={selectedAssets}
            numColumns={4}
            renderItem={renderImageTile}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.5}
            initialNumToRender={24}
          />
          {uploadCompleted && (
            <Block
              flex={false}
              row
              right
              padding={sizes.padding}
              color={colors.gray4}
            >
              <Button small color={colors.success} onPress={saveHandler}>
                <Text button milkyWhite>
                  Save
                </Text>
              </Button>
            </Block>
          )}
        </Block>
      </Block>
    </SafeAreaView>
  );
};

export default MediaUploadScreen;
