import React from 'react';
import { Platform, ViewStyle } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Block from '../Block';

const android = Platform.OS === 'android';

const ActionModal = ({
  children,
  containerStyle = {},
  showHandle = false,
  props,
}: {
  children: any;
  containerStyle?: ViewStyle;
  showHandle?: boolean;
  props?: typeof BottomSheet;
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = React.useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={snapPoints.length - 1}
      snapPoints={snapPoints}
      {...props}
    >
      <Block color="cyan">{children}</Block>
    </BottomSheet>
  );
};

export default ActionModal;
