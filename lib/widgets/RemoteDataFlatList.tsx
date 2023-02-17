import React from 'react';

import Alert from '../Alert';
import AnimatableManager from '../AnimatableManager';
import Block from '../Block';
import Text from '../Text';

import * as Animatable from 'react-native-animatable';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Colors, SkeletonView } from '@expocraft/rnuilib';
import Header from '../Header';
import SearchComponent from '../SearchComponent';
import useDebounce from '../customhooks/useDebounce';

const RemoteDataFlatList = React.forwardRef(
  (
    {
      Graphqlmodel,
      errors,
      loadingModels,
      setErrors,
      params = {},
      title = '',
      onBack = () => {},
      renderItem = () => null,
      actionButton = null,
      showHeader = true,
      showSearch = true,
    }: {
      Graphqlmodel: any;
      params: any;
      errors: any;
      loadingModels: any;
      setErrors: any;
      title: string;
      onBack?: () => void;
      renderItem: (params: { item: any; index: number }) => any;
      actionButton?: any;
      showHeader?: boolean;
      showSearch?: boolean;
    },
    ref
  ) => {
    const listRef = React.useRef({
      data: [],
    });
    const [refreshing, setRefreshing] = React.useState(false);
    const [updatedAt, setUpdatedAt] = React.useState(Date.now());
    const [searchTerm, setSearchTerm] = React.useState('');

    const filterText = useDebounce(searchTerm, 500);

    const listData = listRef.current.data;

    const getData = async (reset = false) => {
      if (loadingModels[`${Graphqlmodel().globalId}Loading`]) return;

      setRefreshing(true);
      const data = await Graphqlmodel()
        .find({
          sort: { createdAt: -1 },
          limit: 10,
          ...(filterText ? { filter: filterText } : {}),
          ...params,
          ...(reset ? {} : { id: { $nin: listData.map((t) => t.id) } }),
        })
        .toJson();

      setRefreshing(false);

      if (data && data.items) {
        listRef.current.data = reset
          ? data.items
          : [...listRef.current.data, ...data.items];
        setUpdatedAt(Date.now());
      }
    };

    React.useEffect(() => {
      getData(true);
    }, [filterText]);

    React.useImperativeHandle(ref, () => ({
      reload: () => {
        getData(true);
      },
    }));

    if (!errors || !loadingModels || !setErrors) {
      return null;
    }

    const renderMyItem = ({ item, index }: { item: any; index: number }) => {
      const animationProps = AnimatableManager.getEntranceByIndex(index);

      return (
        <Animatable.View {...animationProps}>
          {renderItem({ item, index })}
        </Animatable.View>
      );
    };

    return (
      <Block>
        {showHeader && (
          <Block
            flex={false}
            style={{
              borderBottomColor: Colors.grey40,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <Header
              hasHeight
              onBack={onBack}
              middleComponent={() => (
                <Block flex={false}>
                  <Text title bold>
                    {title}
                  </Text>
                </Block>
              )}
              rightComponent={actionButton}
            />
          </Block>
        )}
        {showSearch && (
          <Block
            flex={false}
            padding
            style={{ height: 65 }}
            color={Colors.grey50}
          >
            <SearchComponent
              style={{
                backgroundColor: Colors.white,
              }}
              autoFocus={false}
              onChange={(text) => setSearchTerm(text)}
            />
          </Block>
        )}
        <Alert
          error
          message={errors[`${Graphqlmodel().globalId}Error`]}
          onClose={() =>
            setErrors({
              [`${Graphqlmodel().globalId}Error`]: '',
            })
          }
        />
        <FlatList
          data={listData}
          renderItem={renderMyItem}
          keyExtractor={(item, index) => `index-${item.id || item._key}`}
          ListEmptyComponent={() => (
            <SkeletonView
              template={SkeletonView.templates.LIST_ITEM}
              showContent={true}
              renderContent={() => (
                <Block center middle padding>
                  <Text gray> There are is no data yet</Text>
                </Block>
              )}
              times={10}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor="transparent"
              colors={['transparent']}
              onRefresh={() => getData(true)}
            />
          }
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 0) return;
            getData();
          }}
        />
      </Block>
    );
  }
);

export default RemoteDataFlatList;
