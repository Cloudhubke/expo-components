import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import Block from '../Block';
import Text from '../Text';
import Selector from './Selector';

const StaticSelector: React.FC<{
  input?: any;
  meta?: any;
  isMulti?: boolean;
  displayField?: string;
  returnkeys?: string[];
  showError?: boolean;
  onSelectChange?: (item?: any, index?: number) => any;
  valueExtractor?: (item?: any, index?: number) => any;
  labelExtractor?: (item?: any, index?: number) => any;
  keyExtractor?: (item?: any, index?: number) => string;
  showIcon?: boolean;
  iconStyle?: any;
  textStyle?: any;
  placeholder?: string;
  iconSize?: number;
  onRemove?: (val: any) => void;
  options?: any[];
}> = React.forwardRef(
  (
    {
      input = {
        value: null,
        onChange: () => {},
        onBlur: () => {},
      },
      meta = {},
      isMulti = false,
      displayField,
      returnkeys,
      showError = true,
      keyExtractor = (item: any, index: number) => item.id || item,
      labelExtractor = (item: any, index: number) => item.id || item,
      valueExtractor = (item: any, index: number) => item,
      options = [],
      ...rest
    },
    ref
  ) => {
    let modifiedlabelExtractor: any = labelExtractor;
    let modifiedvalueExtractor: any = valueExtractor;

    if (returnkeys) {
      if (Array.isArray(returnkeys)) {
        modifiedvalueExtractor = (item: any) => {
          const obj: any = {};
          returnkeys.forEach((k) => {
            obj[k] = item[k];
          });
          return obj;
        };
      }
    }
    if (displayField) {
      modifiedlabelExtractor = (item: any) =>
        isPlainObject(item) ? item[displayField] : item;
    }

    return (
      <Block>
        <Block flex={false}>
          <Selector
            ref={ref}
            value={input.value}
            meta={meta}
            isMulti={isMulti}
            {...rest}
            onChange={(val: any) => {
              input.onChange(val);
              input.onBlur();
            }}
            options={options}
            keyExtractor={keyExtractor}
            labelExtractor={modifiedlabelExtractor}
            valueExtractor={modifiedvalueExtractor}
          />
        </Block>
        {showError && (
          <Block flex={false}>
            <Text small error>
              {meta.touched && meta.error ? meta.error : ''}
            </Text>
          </Block>
        )}
      </Block>
    );
  }
);

export default StaticSelector;
