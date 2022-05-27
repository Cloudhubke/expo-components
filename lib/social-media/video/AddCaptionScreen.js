import React from 'react';
import { TouchableOpacity } from 'react-native';
import Block from '../../Block';
import Input from '../../Input';
import Text from '../../Text';
import SafeAreaView from '../../SafeAreaView';
import Header from '../../Header';
import sizes from '../../theme/Sizes';
import Form from '../../form/Form';
import Field from '../../form/Field';

const AddCaptionScreen = (props) => {
  const [] = React.useState(0);

  return (
    <SafeAreaView top bottom>
      <Header
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
          onSubmit={() => null}
          render={() => (
            <Block>
              <Block flex={false} row color="cyan">
                <Field
                  name="Description"
                  component={Input}
                  multiline
                  flex
                  numberOfLines={3}
                  style={{ height: 85 }}
                />
              </Block>
            </Block>
          )}
        />
      </Block>
    </SafeAreaView>
  );
};

export default AddCaptionScreen;
