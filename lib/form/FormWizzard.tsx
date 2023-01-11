import React from 'react';
import Form from './Form';
import { Block } from '@expocraft/core';
import { Wizard } from 'react-native-ui-lib';
import Button from '../Button';
import Text from '../Text';
import SafeAreaView from '../SafeAreaView';
import { MaterialIcons } from '@expo/vector-icons';

const FormWizzard = ({
  onSubmit = () => null,
  initialValues = {},
  steps = [],
  children,
}: {
  onSubmit: (values: any, form?: any) => any;
  steps: Array<{
    label: string;
  }>;
  initialValues: any;
  children: any;
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const completedStepIndex = steps.length - 1;

  const getStepState = (index: number) => {
    let state = Wizard.States.DISABLED;
    if (completedStepIndex > index - 1) {
      state = Wizard.States.COMPLETED;
    } else if (activeIndex === index || completedStepIndex === index - 1) {
      state = Wizard.States.ENABLED;
    }

    return state;
  };

  const renderCurrentStep = (props: any) => {
    let node = null;
    React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        node = React.cloneElement(child, {
          ...child.props,
          render: () =>
            child.props.render({
              ...props,
            }),
        });
      }
    });

    return node;
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, values, form, ...formProps }) => {
        return (
          <SafeAreaView bottom>
            <Wizard
              testID={'uilib.wizardAllTypes'}
              activeIndex={activeIndex}
              onActiveIndexChanged={(index: number) => setActiveIndex(index)}
            >
              {steps.map((step, index) => {
                return (
                  <Wizard.Step
                    key={`${index}`}
                    label={(steps[index] || {}).label || `${index + 1}`}
                  />
                );
              })}
            </Wizard>
            <Block>
              <Block margin padding card>
                {renderCurrentStep({
                  onBack: () => setActiveIndex((i) => (i > 0 ? i - 1 : i)),
                  onNext: () =>
                    setActiveIndex((i) => (i < steps.length - 1 ? i + 1 : i)),
                  handleSubmit,
                  values,
                  form,
                  ...formProps,
                  actionButtons: () => (
                    <Block flex={false} row>
                      <Block left>
                        {activeIndex > 0 && (
                          <Button
                            small
                            rounded
                            dark
                            onPress={() => setActiveIndex((i) => i + 1)}
                          >
                            <MaterialIcons
                              name="arrow-back"
                              size={24}
                              color="white"
                            />
                            <Text white>Back</Text>
                          </Button>
                        )}
                      </Block>
                      <Block row right>
                        {activeIndex < steps.length - 1 && (
                          <Button
                            small
                            rounded
                            dark
                            onPress={() => setActiveIndex((i) => i + 1)}
                          >
                            <Text white>Next</Text>
                            <MaterialIcons
                              name="arrow-forward"
                              size={24}
                              color="white"
                            />
                          </Button>
                        )}
                        {activeIndex === steps.length - 1 && (
                          <Button small rounded success onPress={handleSubmit}>
                            <Text white>Submit</Text>
                            <MaterialIcons
                              name="chevron-right"
                              size={24}
                              color="white"
                            />
                          </Button>
                        )}
                      </Block>
                    </Block>
                  ),
                })}
              </Block>
            </Block>
          </SafeAreaView>
        );
      }}
    />
  );
};

export default FormWizzard;
