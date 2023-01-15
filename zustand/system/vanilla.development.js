System.register([], (function (exports) {
  'use strict';
  return {
    execute: (function () {

      const createStoreImpl = (createState) => {
        let state;
        const listeners = /* @__PURE__ */ new Set();
        const setState = (partial, replace) => {
          const nextState = typeof partial === "function" ? partial(state) : partial;
          if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener) => listener(state, previousState));
          }
        };
        const getState = () => state;
        const subscribe = (listener) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        };
        const destroy = () => {
          {
            console.warn(
              "[DEPRECATED] The destroy method will be unsupported in the future version. You should use unsubscribe function returned by subscribe. Everything will be garbage collected if store is garbage collected."
            );
          }
          listeners.clear();
        };
        const api = { setState, getState, subscribe, destroy };
        state = createState(setState, getState, api);
        return api;
      };
      const createStore = exports('createStore', (createState) => createState ? createStoreImpl(createState) : createStoreImpl);
      var vanilla = exports('default', (createState) => {
        {
          console.warn(
            "[DEPRECATED] default export is deprecated, instead import { createStore } ..."
          );
        }
        return createStore(createState);
      });

    })
  };
}));
