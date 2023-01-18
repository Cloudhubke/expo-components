import create from '../../zustand/vanilla';
import appReducer, { INITIAL_STATE } from './appReducer';

const appStore = create<any>(
  (set) =>
    ({
      ...INITIAL_STATE,
      dispatch: (args: (state: any) => void) => {
        if (typeof args === 'function') {
          set((state: any) => appReducer(state, args(state)));
        } else {
          console.log(
            `DEPRECATION WARNING:use Callback function instead of object to update state: Check ${JSON.stringify(
              args
            )}`
          );
          set((state: any) => appReducer(state, args));
        }
      },
    } as any)
);

export default appStore;
