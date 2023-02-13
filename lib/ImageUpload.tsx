import React from 'react';

import Text from './Text';
import Block from './Block';
import MediaUpload from './media/MediaUpload';
import ThemeContext from './theme/ThemeContext';
import Metrics from './theme/Metrics';

const ImageUpload = ({
  placeholder,
  meta,
  style,
  width = Metrics.width,
  height = Metrics.width,
  ...props
}: {
  mediaType?: 'photo' | 'video';
  endpoint?: string;
  allowRemove?: boolean;
  showAddButton?: true;
  value?: any;
  onChange?: () => any;
  limit?: number;
  placeholderImage?: any;
  resize?: boolean;
  width?: number;
  height?: number;
  [key: string]: any;
}) => {
  let CONFIG = React.useContext(ThemeContext).CONFIG || {};

  const getConfig = React.useContext(ThemeContext).getConfig;

  if (typeof getConfig === 'function') {
    CONFIG = getConfig();
  }

  const error = meta.touched && meta.error;

  return (
    <Block flex={false}>
      <Block flex={false}>
        <MediaUpload
          mediaType={['photo']}
          endpoint={`${CONFIG.API_ENDPOINT}/fileapi/media/upload/image`}
          headers={{
            merchantcode:
              CONFIG.MerchantCode || CONFIG.merchantCode || CONFIG.merchantcode,
          }}
          width={width}
          height={height}
          {...props}
        />
      </Block>

      <Block flex={false} style={styles.error}>
        <Text small error>
          {error && meta.error}
        </Text>
      </Block>
    </Block>
  );
};

ImageUpload.defaultProps = {
  meta: {},
};

const styles = {
  error: {
    marginTop: 2.5,
    height: 14,
    marginBottom: 2.5,
  },
};

export default ImageUpload;
