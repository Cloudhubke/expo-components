import React from 'react';

const FormWizzardStep = ({
  id: string,
  render,
}: {
  id: string;
  render: (props?: {
    onBack?: () => void;
    onNext?: () => void;
    jumpToStep?: (params: { id: string }) => void;
    values?: any;
    form?: any;
    actionButtons?: any;
    [key: string]: any;
  }) => any;
}) => {
  const [] = React.useState(0);

  return render();
};

export default FormWizzardStep;
