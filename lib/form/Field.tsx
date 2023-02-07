/* eslint-disable react/require-default-props */
import React from 'react';
import { Field as FinalFormField } from 'react-final-form';
import isEmpty from 'lodash/isEmpty';
import FieldBlock from '../FieldBlock';
import Text from '../Text';
import Block from '../Block';

const notEmptyField = (value) => (!isEmpty(value) ? undefined : 'Required');
const requiredField = (value) => {
  if (typeof value === 'object') {
    return isEmpty(value) ? 'Required' : undefined;
  }

  if (typeof value === 'number') {
    return `${value}` ? undefined : 'Required';
  }

  return value ? undefined : 'Required';
};

const mustBeNumber = (value) => {
  const n = Number(value);

  if (isNaN(n)) {
    return 'Must be a number';
  }

  if (`${value}`.includes('.')) {
    const d = `${value}`.split('.')[1];

    if (!d || Number(d) === 0) {
      return "Must be a number. Remove 0's";
    }
  }

  return undefined;
};

const minFieldValue = (min) => (value) => {
  if (Number(value) < Number(min)) {
    return `Min is ${min}`;
  }
  return undefined;
};

const maxFieldValue = (max) => (value) => {
  if (Number(value) > Number(max)) {
    return `Max is ${max}`;
  }
  return undefined;
};

const minFieldLength = (min) => (value) => {
  if (`${value}`.length < Number(min) || !value) {
    return `Should be more than ${min} characters`;
  }
  return undefined;
};
const maxFieldLength = (max) => (value) => {
  if (`${value}`.length > Number(max) || !value) {
    return `Should be less than ${max} characters`;
  }
  return undefined;
};

const validateEmail = (value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = re.test(value);
  if (value && !valid) {
    return 'Should be a valid email address';
  }
  return undefined;
};

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const Field = ({
  required,
  notEmpty,
  number,
  email,
  min,
  max,
  minValue,
  maxValue,
  minLength,
  maxLength,
  label,
  showLabel = true,
  row,
  component: Component,
  type,
  flex = false,
  containerStyle,
  props,
  ...rest
}: {
  [x: string]: any;
  required?: boolean;
  notEmpty?: boolean;
  number?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  label?: any;
  showLabel?: boolean;
  row?: boolean;
  component?: any;
  type?: any;
  flex?: boolean;
  containerStyle?: React.CSSProperties;
  props?: any;
}) => {
  let validators: any[] = [];

  if (notEmpty) {
    validators = [...validators, notEmptyField];
  }
  if (required) {
    validators = [...validators, requiredField];
  }

  if (number) {
    validators = [...validators, mustBeNumber];
  }

  if (email) {
    validators = [...validators, validateEmail];
  }

  if (min || min === 0) {
    validators = [...validators, minFieldValue(min)];
  }
  if (max || max === 0) {
    validators = [...validators, maxFieldValue(max)];
  }

  if (minValue || minValue === 0) {
    validators = [...validators, minFieldValue(minValue)];
  }
  if (maxValue || maxValue === 0) {
    validators = [...validators, maxFieldValue(maxValue)];
  }

  if (minLength) {
    validators = [...validators, minFieldLength(minLength)];
  }
  if (maxLength) {
    validators = [...validators, maxFieldLength(maxLength)];
  }
  let requiredlabel = label || '';

  if (required && label) {
    requiredlabel = (
      <Block flex={false} row middle padding={[2.5, 0]}>
        {typeof label === 'string' ? <Text>{label}</Text> : label}
        <Text>*</Text>
      </Block>
    );
  }

  const parseFn = (value) => {
    if (number && value) {
      if (isNaN(value)) {
        return '';
      }

      if (`${value}`.includes('.')) {
        const d = `${value}`.split('.')[1];

        if (!d || Number(d) === 0) {
          return value;
        }
      }
      return Number(value);
    }

    if (email) {
      return `${value || ''}`.toLocaleLowerCase().trim();
    }

    return value;
  };

  // const FieldComponent = fieldprops => <Component {...fieldprops} {...props} />;

  return (
    <FieldBlock
      row={row}
      style={containerStyle}
      label={showLabel ? requiredlabel : ''}
      flex={flex}
    >
      <FinalFormField
        validate={composeValidators(...validators)}
        parse={parseFn}
        name={rest.name}
        render={(props) => (
          <Component
            keyboardType={number ? 'numeric' : 'default'}
            label={label}
            type={type}
            {...props}
            {...rest}
          />
        )}
      />
    </FieldBlock>
  );
};

export default Field;
