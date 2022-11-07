import React from 'react';
import Dialog from './bread/Components/Dialog';

const ConfirmDialog = ({
  message,
  visible,
  style,
  onCancel = () => {},
  onConfirm = () => {},
  canceltext,
  confirmtext,
  onClose = () => {},
}) => {
  const cancelAction = onCancel
    ? {
        text: canceltext || 'Cancel',
        onPress: () => {
          onCancel();
        },
      }
    : null;

  const confirmAction = onConfirm
    ? {
        text: confirmtext || 'OK',
        onPress: () => onConfirm(),
      }
    : null;

  return (
    <Dialog
      visible={visible}
      onTouchOutside={() => onClose()}
      supportingText={message}
      style={{ width: 280, ...style }}
      actionItems={[cancelAction, confirmAction].filter((a) => !!a)}
    />
  );
};

export default ConfirmDialog;
