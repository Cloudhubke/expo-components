import React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import Block from '../../Block';
import Input from '../../Input';
import Text from '../../Text';
import SafeAreaView from '../../SafeAreaView';
import Header from '../../Header';
import sizes from '../../theme/Sizes';
import Form from '../../form/Form';
import Field from '../../form/Field';
import CoverThumbnail from './CoverThumbnail';
import Button from '../../Button';
import ThemeContext from '../../theme/ThemeContext';

const AddCaptionScreen = ({ navigation, route }) => {
  const params = route.params || {};
  const [keyboardVisible, setKeyBoardVisible] = React.useState(false);
  const { colors } = React.useContext(ThemeContext);

  const onPost = async (values) => {
    navigation.navigate('MediaUploadScreen', {
      ...params,
      Extras: {
        ...values,
      },
    });
  };

  const pressContainer = () => {
    Keyboard.dismiss();
  };

  React.useEffect(() => {
    const keyboardDidShow = () => {
      setKeyBoardVisible(true);
    };

    const keyboardDidHide = () => {
      setKeyBoardVisible(false);
    };

    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  return (
    <SafeAreaView top bottom>
      <Header
        onBack={() => {
          navigation.goBack();
        }}
        rightComponent={
          <TouchableOpacity style={{ padding: sizes.padding }}>
            <Text size={14}>Cancel</Text>
          </TouchableOpacity>
        }
        style={{
          borderBottomColor: '#e6e6e6',
          borderBottomWidth: 1,
        }}
      >
        <Block flex={false} center>
          <Text bold dark size={16}>
            Post
          </Text>
        </Block>
      </Header>
      <Block>
        <Form
          onSubmit={onPost}
          render={({ handleSubmit, form }) => (
            <Block>
              <Block>
                <Block
                  flex={false}
                  row
                  middle
                  padding={[0, sizes.padding, 0, 0]}
                >
                  <Field
                    name="Description"
                    placeholder="Add descrption"
                    component={Input}
                    multiline
                    flex
                    numberOfLines={3}
                    style={{
                      height: 120,
                      textAlignVertical: 'top',
                      padding: 5,
                    }}
                    required
                  />

                  <Block flex={false}>
                    <CoverThumbnail size={120} assets={params.selectedAssets} />
                  </Block>
                </Block>
                <Block>
                  {keyboardVisible && (
                    <Block
                      absolute
                      color="rgba(0,0,0,0.2)"
                      ripple
                      rippleColor={colors.gray2}
                      onPress={pressContainer}
                    />
                  )}
                </Block>
              </Block>
              <Block flex={false} padding row right>
                <Block />
                <Button
                  color={colors.primary}
                  small
                  style={{ flex: 1 }}
                  onPress={handleSubmit}
                >
                  <Text mistyWhite bold size={14} fullWidth center>
                    Post
                  </Text>
                </Button>
              </Block>
            </Block>
          )}
        />
      </Block>
    </SafeAreaView>
  );
};

export default AddCaptionScreen;
