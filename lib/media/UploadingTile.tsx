import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NoImage from './assets/no_available_image.png';
import Image from '../Image';

class UploadingTile extends PureComponent {
  static defaultProps = {
    asset: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderImage = () => {
    const { asset } = this.props;

    if (!asset) {
      return null;
    }

    if (asset.Location) {
      return (
        <View
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            alignSelf: 'stretch',
          }}
        >
          <Image
            source={{ uri: asset.Location }}
            resizeMode="cover"
            style={styles.maybeRenderImage}
          />
        </View>
      );
    }

    if (asset.uri) {
      return (
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: asset.uri }}
            resizeMode="contain"
            style={styles.maybeRenderImage}
          />
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ color: '#FFF' }}>Uploading...</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{ position: 'relative' }}>
        <View style={styles.maybeRenderNoImage}>
          <Text />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.props.asste.uri,
      title: 'Check out this photo',
      url: this.props.asste.uri,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.props.asste.uri);
    console.log('Copied image URL to clipboard');
  };

  render() {
    return <View>{this.renderImage()}</View>;
  }
}

const styles = StyleSheet.create({
  maybeRenderImage: {
    height: '100%',
    width: 'auto',
    margin: 2,
    borderRadius: 8,
  },
  maybeRenderNoImage: {
    height: '100%',
    width: 'auto',
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.4)',
  },
});

export default UploadingTile;
