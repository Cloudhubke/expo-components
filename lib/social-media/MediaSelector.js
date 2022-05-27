import React, { PureComponent, Fragment } from 'react';
import { Video, Audio } from 'expo-av';

import * as MediaLibrary from 'expo-media-library';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import * as IntentLauncherAndroid from 'expo-intent-launcher';
import * as Animatable from 'react-native-animatable';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import includes from 'lodash/includes';

import Button from '../Button';
import Block from '../Block';
import Text from '../Text';

import AlbumSelector from './AlbumSelector';
import ImageTile from './ImageTile';
import { getAlbums as getDeviceAlbums } from './getAlbums';

import defaultsizes from '../theme/Sizes';
import defaultcolors from '../theme/Colors';
import AsyncStorage from '../storage/AsyncStorage';
import VideoPlayer from './gallery/VideoPlayer';
import SafeAreaView from '../SafeAreaView';
import ThemeContext from '../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const MediaSelector = ({
  mediaType = ['photo', 'video'],
  limit = 40,
  ...props
}) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const [galleryState, setGalleryState] = React.useState({
    hasCameraPermission: true,
    hasAudioPermission: true,
    albums: [],
    selectmultiple: false,
    openalbumselect: false,
    media: [],
    after: null,
    hasNextPage: true,
    selectedAlbum: null,
    selectedAsset: {},
    selectedVideo: {},
    selectedAssets: [],
    downloadingmedia: false,
  });

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }

    if (Platform.OS === 'android') {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ActivityAction.APPLICATION_SETTINGS
      );
    }
  };

  const getCache = async () => {
    const { mediaType } = props;
    const cache = await AsyncStorage.getItem(`@media:${mediaType}`);
    const uris = cache ? JSON.parse(cache) : [];
    if (Array.isArray(uris)) {
      setGalleryState({
        ...galleryState,
        media: uris,
        selectedAsset: { ...uris[0] },
      });
    } else {
      getPhotos();
    }
  };

  const getPermissions = async () => {
    const cameraroll = await MediaLibrary.requestPermissionsAsync();
    const audio = await Audio.requestPermissionsAsync();

    setGalleryState({
      ...galleryState,
      hasCameraPermission: cameraroll.status === 'granted',
      hasAudioPermission: audio.status === 'granted',
    });

    if (cameraroll.status === 'granted') {
      getAlbums();
    }
  };

  const getAlbums = async () => {
    const { selectedAlbum, albums } = galleryState;
    if (albums.length === 0) {
      const newalbums = await getDeviceAlbums();
      if (!selectedAlbum && newalbums.length > 0) {
        setGalleryState({
          ...galleryState,
          selectedAlbum: newalbums[0],
          albums: newalbums,
        });
        getPhotos();
      }
    }
  };

  const getPhotos = async () => {
    const selectedAlbum = galleryState.selectedAlbum || 'all';

    const params = {
      first: 12,
      mediaType,
    };

    if (selectedAlbum.id !== 'all' && selectedAlbum.id !== 'videos') {
      params.album = selectedAlbum.id;
    }
    if (selectedAlbum.id === 'videos' && includes(mediaType, 'video')) {
      params.mediaType = ['video'];
    }

    if (galleryState.after) params.after = galleryState.after;
    if (!galleryState.hasNextPage) return;
    MediaLibrary.getAssetsAsync(params).then(processPhotos);
  };

  const processPhotos = (r) => {
    if (galleryState.after === r.endCursor) return;

    const uris = r.assets.map((i) => ({
      id: i.id,
      filename: i.filename,
      uri: i.uri,
      mediaType: i.mediaType,
      width: i.width,
      height: i.height,
      duration: i.duration,
    }));

    if (galleryState.media.length < Math.min(12, uris.length)) {
      const { mediaType } = props;
      AsyncStorage.setItem(`@media:${mediaType}`, JSON.stringify(uris));
    }

    setGalleryState((state) => ({
      ...state,
      media: [...state.media, ...uris],
      after: r.endCursor,
      hasNextPage: r.hasNextPage,
      selectedAsset: { ...uris[0] },
    }));
  };

  const renderImageTile = ({ item, index }) => {
    let ind = -1;
    let itemtodisplay = item;
    if (galleryState.selectmultiple) {
      ind = galleryState.selectedAssets.findIndex((i) => i.id === item.id);
      if (ind !== -1) {
        itemtodisplay = galleryState.selectedAssets[ind];
      }
    }
    const selected = item.id === galleryState.selectedAsset.id || ind !== -1;

    return (
      <ImageTile
        item={itemtodisplay}
        index={index}
        camera={false}
        selected={selected}
        showCount={galleryState.selectmultiple && selected}
        onSelectImage={onSelectImage}
      />
    );
  };

  const onSelectAlbum = (selectedAlbum) => {
    const currentalbumname = galleryState.selectedAlbum.title;
    if (currentalbumname !== selectedAlbum.title) {
      setGalleryState({
        ...galleryState,
        selectedAlbum,
        openalbumselect: false,
        media: [],
        after: null,
        hasNextPage: true,
      });
      getPhotos();
    } else {
      setGalleryState({ ...galleryState, openalbumselect: false });
    }
  };

  const onCancel = () => {
    if (typeof props.onCancel === 'function') {
      props.onCancel();
    }
    setGalleryState({ ...galleryState, openalbumselect: false });
  };

  const onSelectImage = async (selectedAsset) => {
    setGalleryState({ ...galleryState, downloadingmedia: true, selectedAsset });

    let newasset = selectedAsset;

    // if (newasset.mediaType === 'video') {
    newasset = await MediaLibrary.getAssetInfoAsync(newasset.id);
    // }

    let selectedasset = {
      ...selectedAsset,
      uri: newasset.localUri || newasset.uri,
    };
    let selectedassets = [...galleryState.selectedAssets];
    const ind = selectedassets.findIndex((i) => i.id === selectedAsset.id);
    const unselect = ind !== -1;

    if (unselect) {
      selectedassets = selectedassets
        .filter((i) => i.id !== selectedAsset.id)
        .map((a, index) => ({ ...a, selectCount: index + 1 }));

      selectedasset = { ...(selectedassets[0] || galleryState.selectedAsset) };
    } else if (galleryState.selectmultiple) {
      selectedassets = [...selectedassets, selectedasset].map((a, index) => ({
        ...a,
        selectCount: index + 1,
      }));
    } else {
      selectedassets = [selectedasset].map((a, index) => ({
        ...a,
        selectCount: index + 1,
      }));
    }

    return setGalleryState({
      ...galleryState,
      downloadingmedia: false,
      selectedVideo: newasset,
      selectedAsset: selectedasset,
      selectedAssets:
        selectedassets.length > limit
          ? [...galleryState.selectedAssets]
          : [...selectedassets],
    });
  };

  const onSelectMultiple = () => {
    const { selectmultiple, selectedAsset } = galleryState;
    setGalleryState({
      ...galleryState,
      selectmultiple: !selectmultiple,
      selectedAssets: [selectedAsset].map((a, index) => ({
        ...a,
        selectCount: 1,
      })),
    });
  };

  const onNext = () => {
    const { selectedAsset, selectedAssets } = galleryState;

    if (typeof props.onNext === 'function') {
      props.onNext({ selectedAssets, selectedAsset });
    }

    onCancel();
  };

  const { openalbumselect, selectmultiple, downloadingmedia, selectedVideo } =
    galleryState;
  const selectedAsset = galleryState.selectedAsset || {};

  React.useEffect(() => {
    getCache();
    getPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Block
        flex={false}
        bottom
        row
        space="between"
        padding={defaultsizes.padding / 2}
        middle
        style={{
          borderBottomWidth: 0.5,
          borderColor: '#001529',
        }}
      >
        <TouchableOpacity style={{ padding: 2.5 }} onPress={onCancel}>
          <MaterialIcons name="close" size={24} />
        </TouchableOpacity>

        <Block
          ripple
          row
          center
          middle
          onPress={() =>
            setGalleryState({
              ...galleryState,
              openalbumselect: !openalbumselect,
            })
          }
          rippleColor={colors.white}
          style={{
            padding: 2.5,
          }}
        >
          <Block flex={false}>
            <Text
              button
              style={{
                color: '#333',
                fontWeight: 'bold',
              }}
            >
              {galleryState.selectedAlbum
                ? galleryState.selectedAlbum.title
                : 'All Photos'}
            </Text>
          </Block>
          {openalbumselect ? (
            <Animatable.View animation="flipInY">
              <MaterialIcons name="keyboard-arrow-up" size={24} />
            </Animatable.View>
          ) : (
            <Animatable.View animation="flipInY">
              <MaterialIcons name="keyboard-arrow-down" size={24} />
            </Animatable.View>
          )}
        </Block>
      </Block>
      <Block>
        <View style={{ height: width, marginBottom: 2, position: 'relative' }}>
          {downloadingmedia && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

          <Image
            source={{
              uri: selectedAsset.uri || './assets/no_available_image.png',
            }}
            style={{ width: 'auto', height: width }}
          />

          {selectedAsset.mediaType === 'video' && !downloadingmedia && (
            <VideoPlayer source={selectedVideo} />
          )}

          <View style={styles.optionsView}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectmultiple && { backgroundColor: '#3b5998' },
              ]}
              onPress={onSelectMultiple}
              disabled={limit === 1}
            >
              <AntDesign name="switcher" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <Block>
          {galleryState.media.length > 0 ? (
            <FlatList
              data={galleryState.media}
              numColumns={4}
              renderItem={renderImageTile}
              keyExtractor={(item, index) => item.id + index}
              onEndReached={() => {
                getPhotos();
              }}
              onEndReachedThreshold={0.5}
              initialNumToRender={24}
            />
          ) : (
            <Block center middle>
              {!galleryState.hasCameraPermission && (
                <Button
                  color={defaultcolors.success}
                  style={{ borderRadius: 5, alignSelf: 'center' }}
                  onPress={openSettings}
                >
                  <Text color={defaultcolors.milkyWhite}>
                    Grant access to photos
                  </Text>
                </Button>
              )}
              {galleryState.hasCameraPermission && (
                <Text color={defaultcolors.milkyWhite}>
                  No photos available
                </Text>
              )}
            </Block>
          )}

          <Block flex={false} row right padding={sizes.padding}>
            <Button small color={colors.primary} onPress={onNext}>
              <Text color={colors.white} size={14} bold>
                Next
              </Text>
            </Button>
          </Block>

          <SafeAreaView bottom />
        </Block>

        {openalbumselect && (
          <AlbumSelector
            albums={galleryState.albums}
            selectedAlbum={galleryState.selectedAlbum}
            onSelect={onSelectAlbum}
          />
        )}
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: 10,
    // height: 45,
    // borderBottomWidth: 0.5,
    // borderColor: '#001529',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
  },
  textStyle: {
    color: '#001529',
    fontSize: 18,
  },

  optionsView: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  optionButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  counter: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#001529',
  },
});

export default MediaSelector;
