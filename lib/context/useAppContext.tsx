import React from 'react';
import create from 'zustand';
import shallow from 'zustand/shallow';
import isEqual from 'lodash/isEqual';
import appStore from './appStore';

export const useStore = create(appStore);

export default function useAppStore<S>() {
  return function (callBack: (store: S) => Partial<S>) {
    const state = useStore<S>(callBack as any, shallow);

    (state as any).getState = appStore.getState;

    return state;
  };
}

// export default function useAppStore<S>() {
//   return function (selector: (store: S) => Partial<S>) {
//     const [state, setState] = React.useState<Partial<S>>(
//       selector((appStore as any).getState())
//     );

//     React.useEffect(
//       () =>
//         (appStore as any).subscribe((state: S) => {
//           console.log('====================================');
//           console.log('update', state, state.Error);
//           console.log('====================================');

//           setState(selector(state));
//         }),
//       []
//     );

//     return {
//       ...state,
//       getState: (appStore as any).getState,
//     };
//   };
// }
