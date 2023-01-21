import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Colors,
  ListItem as UiLibListItem,
  Avatar,
  AvatarHelper,
} from '@expocraft/rnuilib';
import AnimatableManager from '../AnimatableManager';
import * as Animatable from 'react-native-animatable';
import ThemeContext from '../theme/ThemeContext';
import Block from '../Block';
import Text from '../Text';

const randomColor = () => {
  const BACKGROUND_COLORS = [
    Colors.red70,
    Colors.yellow70,
    Colors.purple70,
    Colors.green70,
    Colors.cyan70,
    Colors.purple70,
    Colors.blue70,
    Colors.red70,
    Colors.green70,
    Colors.purple70,
  ];
  const int = Math.floor(Math.random() * 10 + 1);

  return BACKGROUND_COLORS[int];
};

const ListItem = ({
  index,
  primaryText,
  secondaryText,
  actionComponent,
  Image = {},
  onPress = () => null,
}) => {
  const { sizes } = React.useContext(ThemeContext);

  const initials = AvatarHelper.getInitials(primaryText);
  const animationProps = AnimatableManager.getEntranceByIndex(index);

  return (
    <Animatable.View {...animationProps}>
      <UiLibListItem key={index} onPress={onPress}>
        <UiLibListItem.Part left>
          <Avatar
            source={Image.Location ? { uri: Image.Location } : null}
            label={initials}
            badgeProps={{
              backgroundColor:
                Number(index) % 3 === 0 ? Colors.green30 : undefined,
            }}
            backgroundColor={randomColor()}
            containerStyle={{ marginHorizontal: sizes.margin }}
          />
        </UiLibListItem.Part>
        <UiLibListItem.Part
          middle
          containerStyle={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: Colors.white,
            paddingRight: 15,
          }}
        >
          <UiLibListItem.Part>
            <Block row flex={false}>
              <Block>
                <Text bold>{`${primaryText}`}</Text>
                {/* <Text text70>{Member.MemberNo}</Text> */}
                <Text size={12}>{`${secondaryText}`}</Text>
              </Block>
              {actionComponent && <Block flex={false}>{actionComponent}</Block>}
            </Block>
          </UiLibListItem.Part>
        </UiLibListItem.Part>
      </UiLibListItem>
    </Animatable.View>
  );
};

export default ListItem;
