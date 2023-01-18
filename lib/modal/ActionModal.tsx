import React from 'react';
import { Platform } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
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

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  React.useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(2);
    }
  }, [bottomSheetRef]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[metrics.height * 0.8, 300, 100, 1]}
      borderRadius={10}
      renderContent={renderContent}
      {...props}
    />
  );
};

export default ActionModal;
