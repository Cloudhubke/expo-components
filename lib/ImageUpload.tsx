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
  const { CONFIG } = React.useContext(ThemeContext);
  const error = meta.touched && meta.error;

  return (
    <Block flex={false}>
      <Block flex={false}>
        <MediaUpload
          mediaType={['photo']}
          endpoint={`${CONFIG.API_ENDPOINT}/fileapi/media/upload/image`}
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
