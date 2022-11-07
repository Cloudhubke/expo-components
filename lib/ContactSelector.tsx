import React, { useState } from 'react';
import { StyleSheet, FlatList, Platform, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import * as IntentLauncherAndroid from 'expo-intent-launcher';

import * as Animatable from 'react-native-animatable';
import {
  Colors,
  BorderRadiuses,
  ListItem,
  Avatar,
  AvatarHelper,
} from 'react-native-ui-lib';
import AnimatableManager from './AnimatableManager';

import Fuse from 'fuse.js';

import Block from './Block';
import Text from './Text';
import Button from './Button';
import SearchComponent from './SearchComponent';
import ThemeContext from './theme/ThemeContext';

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

const ContactSelector = React.forwardRef(
  (
    {
      onSelectContact = () => null,
      ...props
    }: {
      onChangeText?: (text: string) => void;
      onSelectContact: (contact: any) => void;
      input: {
        onChange: () => any;
        onBlur: () => any;
        value: any;
      };
      onPhoneChanged: () => {};
      value: any;
    },
    ref: any
  ) => {
    const { colors, sizes } = React.useContext(ThemeContext);
    const [contacts, setContacts] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [permissions, setPermissions] = useState<boolean>(true);

    const phonevalue = props.input.value || props.value;

    const [val, setVal] = useState(phonevalue);

    const thisFlatlist = React.useRef<any>();
    const inputRef = React.useRef<any>();

    const getContacts = async () => {
      try {
        const { status } = await Permissions.askAsync(Permissions.CONTACTS);
        if (status !== 'granted') {
          setPermissions(false);
        }
      } catch (error) {
        // do nothing
        setPermissions(false);
      }

      if (permissions) {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contacts = data
            .map((c) => {
              const phone = [...(c.phoneNumbers || [])][0] || {};
              return {
                id: c.id,
                Name: c.name,
                Phone: phone.number,
              };
            })
            .filter((f) => Boolean(f.Phone));

          setContacts(contacts);
          setFiltered(contacts);
        }
      }
    };

    const thisfuse = React.useMemo(() => {
      const options = {
        // includeScore: true,
        useExtendedSearch: true,
        keys: ['Name'],
      };

      return new Fuse(contacts, options);
    }, [contacts.length]);

    const handleFilterChange = (value) => {
      const str = `${value}`
        .split(' ')
        .filter((i) => Boolean(i))
        .map((str) => `'${str}`)
        .join(' ');
      // const filtered = thisfuse.search(str || '');
      const filtered = !value ? contacts : thisfuse.search(str || '');
      if (thisFlatlist) {
      }

      setFiltered(filtered.map((i) => i.item || i));
    };

    const openSettings = () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      }

      if (Platform.OS === 'android') {
        IntentLauncherAndroid.startActivityAsync(
          IntentLauncherAndroid.ActivityAction.APPLICATION_SETTINGS
        );
      }
    };

    React.useEffect(() => {
      getContacts();
    }, []);

    React.useEffect(() => {
      if (props.onChangeText && typeof props.onChangeText === 'function') {
        props.onChangeText(val);
      }
    }, [val]);

    const renderRow = ({ item, index }: any) => {
      const initials = AvatarHelper.getInitials(item.name);
      const animationProps = AnimatableManager.getEntranceByIndex(index);

      return (
        <Animatable.View {...animationProps}>
          <ListItem key={index} onPress={() => onSelectContact(item)}>
            <ListItem.Part left>
              <Avatar
                source={item.thumbnail ? { uri: item.thumbnail } : null}
                label={initials}
                accessibilityLabel={initials}
                badgeProps={{
                  backgroundColor:
                    Number(index) % 3 === 0 ? Colors.green30 : undefined,
                }}
                backgroundColor={randomColor()}
                containerStyle={{ marginHorizontal: 18 }}
                size={sizes.avatarSize}
              />
            </ListItem.Part>
            <ListItem.Part middle containerStyle={styles.border}>
              <Block>
                <Text semibold>{`${item.Name}`}</Text>
                <Text text70>{item.Phone}</Text>
              </Block>
            </ListItem.Part>
          </ListItem>
        </Animatable.View>
      );
    };

    React.useImperativeHandle(ref, () => ({
      clearInput: () => {
        inputRef.current.clearInput();
      },
    }));

    return (
      <Block flex={false} padding={sizes.padding} pointerEvents="box-none">
        <Block color={colors.milkyWhite} flex={false} style={{ height: 45 }}>
          <SearchComponent onChange={handleFilterChange} />
        </Block>
        {!permissions && (
          <Block
            color={colors.milkyWhite}
            card
            shadow
            padding={sizes.padding}
            flex={false}
          >
            <Block flex={false}>
              <Text error>Please enable permission to access contacts</Text>
            </Block>

            <Block row right padding={[sizes.padding / 2, 0]} flex={false}>
              <Button onPress={openSettings}>
                <Text cropped milkyWhite>
                  grant permissions
                </Text>
              </Button>
            </Block>
          </Block>
        )}
        <FlatList
          data={filtered}
          renderItem={renderRow}
          keyExtractor={(item: any, index: number) =>
            `index-${item.id}-${index}`
          }
          ref={thisFlatlist}
          keyboardShouldPersistTaps="always"
        />
      </Block>
    );
  }
);

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark70,
  },
});

export default ContactSelector;
