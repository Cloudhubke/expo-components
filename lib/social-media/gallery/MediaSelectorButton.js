import React from 'react';
import { TouchableOpacity } from 'react-native';
import MediaSelector from '../MediaSelector';
import Button from '../../Button';
import Block from '../../Block';
import Text from '../../Text';
import StatusBar from '../../StatusBar';
import Modal from '../../modal/Modal';

const MediaSelectorButton = ({
  anchorComponent: AnchorComponent,
  onNext = () => null,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const Anchor = React.useMemo(
    () => () => {
      if (!AnchorComponent) {
        return (
          <Block flex={false}>
            <Text size={24}>🏞</Text>
            <Text small white>
              Gallery
            </Text>
          </Block>
        );
      }
      if (typeof AnchorComponent === 'function') {
        return AnchorComponent();
      }

      return React.cloneElement(AnchorComponent, {
        ...AnchorComponent.props,
      });
    },
    [AnchorComponent]
  );

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Anchor />
      </TouchableOpacity>

      <Modal
        // fill
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        // swipeDirection={[]}
      >
        <StatusBar hasHeight />

        <Block>
          <MediaSelector
            onCancel={() => setIsVisible(false)}
            onNext={(props) => onNext(props)}
          />
        </Block>
      </Modal>
    </React.Fragment>
  );
};

export default MediaSelectorButton;
