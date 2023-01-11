import React from 'react';

const FormWizzardStep = ({
  render,
}: {
  render: (props?: {
    onBack?: () => void;
    onNext?: () => void;
    values?: any;
    form?: any;
    actionButtons?: React.ReactNode;
    [key: string]: any;
  }) => any;
}) => {
  const [] = React.useState(0);

  return render();
};

export default FormWizzardStep;
