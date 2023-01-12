import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import Block from '../Block';
import Text from '../Text';
import AsyncSelector from './AsyncSelector';

const MuiRemoteSelector: React.FC<{
  input?: any;
  Graphqlmodel?: any;
  meta?: any;
  isMulti?: boolean;
  displayField?: string;
  returnkeys?: string[];
  showError?: boolean;
  onSelectChange?: (item?: any, index?: number) => any;
  valueExtractor?: (item?: any, index?: number) => any;
  labelExtractor?: (item?: any, index?: number) => any;
  keyExtractor?: (item?: any, index?: number) => string;
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
      keyExtractor = (item, index) => item.id || item,
      ...rest
    },
    ref
  ) => {
    let labelExtractor: any = rest.labelExtractor || null;
    let valueExtractor = rest.valueExtractor || null;

    if (returnkeys) {
      if (Array.isArray(returnkeys)) {
        valueExtractor = (item) => {
          const obj = {};
          returnkeys.forEach((k) => {
            obj[k] = item[k];
          });
          return obj;
        };
      }
    }
    if (displayField) {
      labelExtractor = (item) =>
        isPlainObject(item) ? item[displayField] : item;
    }

    return (
      <Block>
        <Block flex={false}>
          <AsyncSelector
            ref={ref}
            value={input.value}
            meta={meta}
            isMulti={isMulti}
            {...rest}
            onChange={(val: any) => {
              input.onChange(val);
              input.onBlur();
            }}
            keyExtractor={keyExtractor}
            labelExtractor={labelExtractor}
            valueExtractor={valueExtractor}
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

export default MuiRemoteSelector;
