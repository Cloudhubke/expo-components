import React from 'react';
import create from '../../zustand';
// import shallow from '../../zustand/shallow';
// import uniqueId from 'lodash/uniqueId';
import appStore from './appStore';

export const useStore = create(appStore);

// export default function <S>(selector: (store: S) => Partial<S>) {
//   // return function (callBack: (store: S) => Partial<S>) {
//   const state = useStore<S>(selector as any, shallow);

//   (state as any).getState = appStore.getState;

//   return {
//     ...state,
//   };
// }

export default function <S>(selector: (store: S) => Partial<S>) {
  const [state, setState] = React.useState<Partial<S>>({
    ...selector((appStore as any).getState()),
  });

  React.useEffect(
    () =>
      (appStore as any).subscribe((storeState: S) => {
        setState({
          ...selector(storeState),
        });
      }),
    []
  );

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // FOR rect 18 and above
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // const state = useSyncExternalStore(appStore.subscribe, () =>
  //   selector((appStore as any).getState())
  // );

  return {
    ...state,
    getState: (appStore as any).getState,
  };
}
