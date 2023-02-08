import React from 'react';
import Form from './Form';
import Block from '../Block';
import { Wizard } from '@expocraft/rnuilib';
import Button from '../Button';
import Text from '../Text';
import SafeAreaView from '../SafeAreaView';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

interface IStep {
  id: string;
  label?: string;
}

const FormWizzard = ({
  onSubmit = () => null,
  initialValues = {},
  children,
  showSteps = true,
  cardProps = {},
  keyboardAvoiding = Platform.OS === 'android',
}: {
  onSubmit: (values: any, form?: any) => any;
  initialValues?: any;
  children?: any;
  showSteps?: boolean;
  cardProps?: any;
  keyboardAvoiding?: boolean;
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState<IStep>({} as any);

  React.useEffect(() => {
    setActiveStep(steps[activeIndex]);
  }, [activeIndex]);

  const steps = React.useMemo(() => {
    const steps: any = [];
    React.Children.map(children, (child, index) => {
      if (child) {
        steps.push({
          id: child.props.id,
          label: child.props.label || '',
        });
      }
    });

    setActiveStep(steps[activeIndex]);

    return steps;
  }, [children]);

  const renderCurrentStep = (props: any) => {
    let node = null;
    React.Children.map(children, (child, index) => {
      if (child) {
        if (child.props.id === (activeStep || {}).id) {
          node = React.cloneElement(child, {
            ...child.props,
            render: () =>
              child.props.render({
                id: child.props.id,
                ...props,
              }),
          });
        }
      }
    });

    return node;
  };

  const jumpToStep = ({ id }: { id: string }) => {
    const index = steps.findIndex((step: IStep) => step.id === id);
    if (index > -1) {
      setActiveIndex(index);
      setActiveStep(steps[index]);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, values, form, ...formProps }) => {
        return (
          <SafeAreaView bottom>
            {showSteps && (
              <Wizard
                testID={'uilib.wizardAllTypes'}
                activeIndex={activeIndex}
                onActiveIndexChanged={(index: number) => {
                  setActiveIndex(index);
                }}
              >
                {steps.map((step: IStep, index: number) => {
                  return (
                    <Wizard.Step
                      key={`${step.id}`}
                      label={(steps[index] || {}).label || `${index + 1}`}
                    />
                  );
                })}
              </Wizard>
            )}

            <Block keyboardAvoiding={keyboardAvoiding} padding {...cardProps}>
              {renderCurrentStep({
                onBack: () => setActiveIndex((i) => (i > 0 ? i - 1 : i)),
                onNext: () =>
                  setActiveIndex((i) => (i < steps.length - 1 ? i + 1 : i)),
                jumpToStep: jumpToStep,
                values,
                form,
                handleSubmit,
                activeStep,
                ...formProps,
                actionButtons: () => (
                  <Block flex={false} row>
                    <Block left>
                      {activeIndex > 0 && (
                        <Button
                          small
                          rounded
                          dark
                          onPress={() => setActiveIndex((i) => i - 1)}
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
          </SafeAreaView>
        );
      }}
    />
  );
};

export default FormWizzard;
