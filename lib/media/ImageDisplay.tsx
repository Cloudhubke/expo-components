import React, { Component } from 'react';
import { View, Text } from 'react-native';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import UploadingTile from './UploadingTile';
import uploadAssetAsync from './Uploader';
import Block from '../Block';

class ImageDisplay extends Component {
  static defaultProps = {
    assets: [],
    endpoint: '/fileapi/upload/image',
    onUpload: () => {},
    onProgress: () => {},
    headers: {},
    resize: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      assets: [],
    };

    this.onProgress = debounce(this.onProgress, 500);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(prevState.assets, nextProps.assets)) {
      return { ...prevState, assets: [...nextProps.assets] };
    }
    return { ...prevState };
  }

  componentDidMount() {
    this.uploadFiles();
  }

  onProgress = (item) => {
    const { assets } = this.state;
    const newassets = assets.map((asset) => {
      if (asset.id === item.id) {
        return item;
      }
      return asset;
    });

    this.setState({ asset: newassets });

    this.props.onProgress(newassets);
  };

  uploadFiles = () => {
    const { assets } = this.state;
    const { resize } = this.props;

    const uploadedAssets = assets
      .filter((f) => Boolean(f.uri))
      .map(
        (asset) =>
          new Promise(async (resolve) => {
            const newasset = await uploadAssetAsync({
              asset,
              endpoint: this.props.endpoint,
              headers: this.props.headers || {},
              resize,
              onProgress: this.onProgress,
            });
            resolve(newasset[0] || {});
          })
      );

    if (uploadedAssets.length > 0) {
      Promise.all(uploadedAssets).then((uploadedassets) => {
        this.setState({ assets: [...uploadedassets] });
        this.props.onUpload(uploadedassets);
      });
    }
  };

  renderOne = () => {
    const asset = this.state.assets[0] || {};
    return (
      <Block
        style={{
          alignSelf: 'stretch',
        }}
      >
        <UploadingTile asset={asset} />
      </Block>
    );
  };

  renderTwo = () => {
    const first = this.state.assets[0] || {};
    const second = this.state.assets[1] || {};
    return (
      <Block style={{ width: '100%' }}>
        <Block row margin={[5, 0, 0, 0]}>
          <Block style={{ flex: 1, marginBottom: 2 }}>
            <UploadingTile asset={first} />
          </Block>
          <Block style={{ flex: 1 }}>
            <UploadingTile asset={second} />
          </Block>
        </Block>
        <Block></Block>
      </Block>
    );
  };

  renderThree = () => {
    const first = this.state.assets[0] || {};
    const second = this.state.assets[1] || {};
    const third = this.state.assets[2] || {};
    return (
      <Block style={{ width: '100%' }}>
        <Block>
          <UploadingTile asset={first} />
        </Block>
        <Block row margin={[5, 0, 0, 0]}>
          <Block style={{ flex: 1, marginBottom: 2 }}>
            <UploadingTile asset={second} />
          </Block>
          <Block style={{ flex: 1 }}>
            <UploadingTile asset={third} />
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    const { assets } = this.state;
    if (assets.length === 1) {
      return this.renderOne();
    }
    if (assets.length === 2) {
      return this.renderTwo();
    }
    if (assets.length >= 3) {
      return this.renderThree();
    }
    return null;
  }
}

const styles = {
  single: {
    flex: 1,
    backgroundColor: 'red',
  },
  dual: {
    flex: 1,
  },
  tripple: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
};
export default ImageDisplay;
