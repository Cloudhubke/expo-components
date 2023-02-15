import React from 'react';
import Block from '../Block';

const FormWizzardStep = ({
  id,
  label,
  render,
  ...props
}: {
  id: string;
  label: string;
  render: (props?: {
    onBack?: () => void;
    onNext?: () => void;
    jumpToStep?: (params: { id: string }) => void;
    values?: any;
    form?: any;
    actionButtons: (props: {
      onClickBack?: () => void;
      onClickNext?: () => void;
      onClickSubmit?: () => void;
    }) => any;
    [key: string]: any;
  }) => any;
}) => {
  const activeStep: any = (props as any).activeStep || {};

  return <Block>{activeStep.id === id && render({} as any)}</Block>;
};

export default FormWizzardStep;
