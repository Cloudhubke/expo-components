import React from 'react';
import DropDownPicker from './react-native-dropdown-picker';
import ThemeContext from '../theme/ThemeContext';

function ContactsDropdown({ ...props }) {
  const { sizes } = React.useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{
        height: sizes.inputHeight,
      }}
      {...props}
    />
  );
}

export default ContactsDropdown;
