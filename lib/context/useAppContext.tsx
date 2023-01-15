import React from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';
import isEqual from 'lodash/isEqual';
import uniqueId from 'lodash/uniqueId';
import appStore from './appStore';

export const useStore = create(appStore);

// export default function <S>(selector: (store: S) => Partial<S>) {
//   // return function (callBack: (store: S) => Partial<S>) {
//   const state = useStore<S>(selector as any, (state, nextState) =>
//     isEqual(state, nextState)
//   );

//   (state as any).getState = appStore.getState;

//   return {
//     ...state,
//   };
// }

export default function <S>(selector: (store: S) => Partial<S>) {
  const [state, setState] = React.useState<Partial<S>>({
    ...selector((appStore as any).getState()),
    Timestamp: uniqueId(),
  });

  // const state = React.useRef<Partial<S>>(
  //   selector((appStore as any).getState())
  // );

  // React.useEffect(
  //   () =>
  //     (appStore as any).subscribe((state: S) => {
  //       console.log('====================================');
  //       console.log('update', state.merchantAuthContext.OtherProp);
  //       console.log('====================================');

  //       state.current = {
  //         ...selector(state),
  //       };
  //     }),
  //   []
  // );

  React.useEffect(
    () =>
      (appStore as any).subscribe((storeState: S) => {
        console.log('====================================');
        console.log(
          'update',
          storeState.merchantAuthContext.OtherProp,
          storeState.merchantAuthContext.isAuthenticated
        );
        console.log('====================================');

        setState({
          ...selector(storeState),
          Timestamp: uniqueId(),
        });
      }),
    []
  );

  // const state = useSyncExternalStore(appStore.subscribe, () =>
  //   selector((appStore as any).getState())
  // );

  console.log('====================================');
  console.log('state', { ...state });
  console.log('====================================');

  return {
    ...state,
    getState: (appStore as any).getState,
  };
}
