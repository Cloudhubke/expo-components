import React from 'react';

import Alert from '../Alert';
import AnimatableManager from '../AnimatableManager';
import Block from '../Block';
import Text from '../Text';

import * as Animatable from 'react-native-animatable';
import { FlatList, RefreshControl } from 'react-native';
import { SkeletonView } from '@expocraft/rnuilib';

const RemoteDataFlatList = ({
  Graphqlmodel,
  errors,
  loadingModels,
  setErrors,
  params = {},
  renderItem = () => null,
}: {
  Graphqlmodel: any;
  params: any;
  errors: any;
  loadingModels: any;
  setErrors: any;
  renderItem: (params: { item: any; index: number }) => any;
}) => {
  const [listData, setListData] = React.useState([]);

  const getData = async (reset = false) => {
    const data = await Graphqlmodel()
      .find({
        sort: { createdAt: -1 },
        limit: 10,
        ...params,
        ...(reset ? {} : { id: { $nin: listData.map((t) => t.id) } }),
      })
      .toJson();

    if (data && data.items) {
      setListData(data.items);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

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
            showContent={!loadingModels[`${Graphqlmodel().globalId}Loading`]}
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
            refreshing={loadingModels[`${Graphqlmodel().globalId}Loading`]}
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
};

export default RemoteDataFlatList;
