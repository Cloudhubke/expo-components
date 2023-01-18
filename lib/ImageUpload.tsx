import React from 'react';

import Text from './Text';
import Block from './Block';
import MediaUpload from './media/MediaUpload';
import ThemeContext from './theme/ThemeContext';

const ImageUpload = ({
  placeholder,
  meta,
  style,
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
