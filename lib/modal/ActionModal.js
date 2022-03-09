import React from 'react';
import { Platform } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Block from '../Block';
import Text from '../Text';
import sizes from '../theme/Sizes';
import metrics from '../theme/Metrics';

const android = Platform.OS === 'android';

const ActionModal = ({ children, containerStyle = {}, props }) => {
  const renderContent = () => (
    <Block
      style={{
        backgroundColor: 'white',
        padding: sizes.padding,
        borderRadius: 10,
        height: metrics.height * 0.8,

        ...containerStyle,
      }}
      shadow
      flex={false}
    >
      <Block flex={false} row center top style={{ marginTop: -8 }}>
        <Text size={32} style={{ lineHeight: 5 }} color="#555">
          __
        </Text>
      </Block>
      {children}
    </Block>
  );

  const sheetRef = React.useRef(null);

  React.useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.snapTo(2);
    }
  }, [sheetRef]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[metrics.height * 0.8, 300, 100, 1]}
      borderRadius={10}
      renderContent={renderContent}
      {...props}
    />
  );
};

export default ActionModal;
