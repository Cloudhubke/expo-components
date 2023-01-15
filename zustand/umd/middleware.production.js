!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).zustandMiddleware={})}(this,(function(t){"use strict";function e(){return e=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},e.apply(this,arguments)}function n(t,e){if(null==t)return{};var n,r,i={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(i[n]=t[n]);return i}var r=function(t,n){return function(r,i,o){return o.dispatch=function(e){return r((function(n){return t(n,e)}),!1,e),e},o.dispatchFromDevtools=!0,e({dispatch:function(){var t;return(t=o).dispatch.apply(t,arguments)}},n)}},i=["enabled","anonymousActionType","store"],o=["connection"],a=new Map,u=function(t){var e=a.get(t);return e?Object.fromEntries(Object.entries(e.stores).map((function(t){return[t[0],t[1].getState()]}))):{}},s=function(t,r){return void 0===r&&(r={}),function(s,f,l){var d,v=r,p=v.enabled,g=v.anonymousActionType,y=v.store,m=n(v,i);try{d=null!=p&&p&&window.__REDUX_DEVTOOLS_EXTENSION__}catch(t){}if(!d)return t(s,f,l);var h=function(t,n,r){if(void 0===t)return{type:"untracked",connection:n.connect(r)};var i=a.get(r.name);if(i)return e({type:"tracked",store:t},i);var o={connection:n.connect(r),stores:{}};return a.set(r.name,o),e({type:"tracked",store:t},o)}(y,d,m),S=h.connection,b=n(h,o),O=!0;l.setState=function(t,n,r){var i,o=s(t,n);if(!O)return o;var a=void 0===r?{type:g||"anonymous"}:"string"==typeof r?{type:r}:r;return void 0===y?(null==S||S.send(a,f()),o):(null==S||S.send(e({},a,{type:y+"/"+a.type}),e({},u(m.name),((i={})[y]=l.getState(),i))),o)};var w=function(){var t=O;O=!1,s.apply(void 0,arguments),O=t},I=t(l.setState,f,l);if("untracked"===b.type?null==S||S.init(I):(b.stores[b.store]=l,null==S||S.init(Object.fromEntries(Object.entries(b.stores).map((function(t){var e=t[0],n=t[1];return[e,e===b.store?I:n.getState()]}))))),l.dispatchFromDevtools&&"function"==typeof l.dispatch){var T=l.dispatch;l.dispatch=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];T.apply(void 0,e)}}return S.subscribe((function(t){switch(t.type){case"ACTION":return"string"!=typeof t.payload?void console.error("[zustand devtools middleware] Unsupported action format"):c(t.payload,(function(t){if("__setState"!==t.type)l.dispatchFromDevtools&&"function"==typeof l.dispatch&&l.dispatch(t);else{if(void 0===y)return void w(t.state);1!==Object.keys(t.state).length&&console.error('\n                    [zustand devtools middleware] Unsupported __setState action format. \n                    When using \'store\' option in devtools(), the \'state\' should have only one key, which is a value of \'store\' that was passed in devtools(),\n                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }\n                    ');var e=t.state[y];if(null==e)return;JSON.stringify(l.getState())!==JSON.stringify(e)&&w(e)}}));case"DISPATCH":switch(t.payload.type){case"RESET":return w(I),void 0===y?null==S?void 0:S.init(l.getState()):null==S?void 0:S.init(u(m.name));case"COMMIT":return void 0===y?void(null==S||S.init(l.getState())):null==S?void 0:S.init(u(m.name));case"ROLLBACK":return c(t.state,(function(t){if(void 0===y)return w(t),void(null==S||S.init(l.getState()));w(t[y]),null==S||S.init(u(m.name))}));case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return c(t.state,(function(t){void 0!==y?JSON.stringify(l.getState())!==JSON.stringify(t[y])&&w(t[y]):w(t)}));case"IMPORT_STATE":var e,n=t.payload.nextLiftedState,r=null==(e=n.computedStates.slice(-1)[0])?void 0:e.state;if(!r)return;return w(void 0===y?r:r[y]),void(null==S||S.send(null,n));case"PAUSE_RECORDING":return O=!O}return}})),I}},c=function(t,e){var n;try{n=JSON.parse(t)}catch(t){console.error("[zustand devtools middleware] Could not parse the received json",t)}void 0!==n&&e(n)},f=function(t){return function(e,n,r){var i=r.subscribe;return r.subscribe=function(t,e,n){var o=t;if(e){var a=(null==n?void 0:n.equalityFn)||Object.is,u=t(r.getState());o=function(n){var r=t(n);if(!a(u,r)){var i=u;e(u=r,i)}},null!=n&&n.fireImmediately&&e(u,u)}return i(o)},t(e,n,r)}};function l(t){var e;try{e=t()}catch(t){return}return{getItem:function(t){var n,r=function(t){return null===t?null:JSON.parse(t)},i=null!=(n=e.getItem(t))?n:null;return i instanceof Promise?i.then(r):r(i)},setItem:function(t,n){return e.setItem(t,JSON.stringify(n))},removeItem:function(t){return e.removeItem(t)}}}var d=function t(e){return function(n){try{var r=e(n);return r instanceof Promise?r:{then:function(e){return t(e)(r)},catch:function(t){return this}}}catch(e){return{then:function(t){return this},catch:function(n){return t(n)(e)}}}}},v=function(t,n){return"getStorage"in n||"serialize"in n||"deserialize"in n?function(t,n){return function(r,i,o){var a,u=e({getStorage:function(){return localStorage},serialize:JSON.stringify,deserialize:JSON.parse,partialize:function(t){return t},version:0,merge:function(t,n){return e({},n,t)}},n),s=!1,c=new Set,f=new Set;try{a=u.getStorage()}catch(t){}if(!a)return t((function(){console.warn("[zustand persist middleware] Unable to update item '"+u.name+"', the given storage is currently unavailable."),r.apply(void 0,arguments)}),i,o);var l=d(u.serialize),v=function(){var t,n=u.partialize(e({},i())),r=l({state:n,version:u.version}).then((function(t){return a.setItem(u.name,t)})).catch((function(e){t=e}));if(t)throw t;return r},p=o.setState;o.setState=function(t,e){p(t,e),v()};var g,y=t((function(){r.apply(void 0,arguments),v()}),i,o),m=function(){if(a){s=!1,c.forEach((function(t){return t(i())}));var t=(null==u.onRehydrateStorage?void 0:u.onRehydrateStorage(i()))||void 0;return d(a.getItem.bind(a))(u.name).then((function(t){if(t)return u.deserialize(t)})).then((function(t){if(t){if("number"!=typeof t.version||t.version===u.version)return t.state;if(u.migrate)return u.migrate(t.state,t.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}})).then((function(t){var e;return g=u.merge(t,null!=(e=i())?e:y),r(g,!0),v()})).then((function(){null==t||t(g,void 0),s=!0,f.forEach((function(t){return t(g)}))})).catch((function(e){null==t||t(void 0,e)}))}};return o.persist={setOptions:function(t){u=e({},u,t),t.getStorage&&(a=t.getStorage())},clearStorage:function(){var t;null==(t=a)||t.removeItem(u.name)},getOptions:function(){return u},rehydrate:function(){return m()},hasHydrated:function(){return s},onHydrate:function(t){return c.add(t),function(){c.delete(t)}},onFinishHydration:function(t){return f.add(t),function(){f.delete(t)}}},m(),g||y}}(t,n):function(t,n){return function(r,i,o){var a=e({storage:l((function(){return localStorage})),partialize:function(t){return t},version:0,merge:function(t,n){return e({},n,t)}},n),u=!1,s=new Set,c=new Set,f=a.storage;if(!f)return t((function(){console.warn("[zustand persist middleware] Unable to update item '"+a.name+"', the given storage is currently unavailable."),r.apply(void 0,arguments)}),i,o);var v=function(){var t=a.partialize(e({},i()));return f.setItem(a.name,{state:t,version:a.version})},p=o.setState;o.setState=function(t,e){p(t,e),v()};var g,y=t((function(){r.apply(void 0,arguments),v()}),i,o),m=function(){if(f){u=!1,s.forEach((function(t){return t(i())}));var t=(null==a.onRehydrateStorage?void 0:a.onRehydrateStorage(i()))||void 0;return d(f.getItem.bind(f))(a.name).then((function(t){if(t){if("number"!=typeof t.version||t.version===a.version)return t.state;if(a.migrate)return a.migrate(t.state,t.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}})).then((function(t){var e;return g=a.merge(t,null!=(e=i())?e:y),r(g,!0),v()})).then((function(){null==t||t(g,void 0),u=!0,c.forEach((function(t){return t(g)}))})).catch((function(e){null==t||t(void 0,e)}))}};return o.persist={setOptions:function(t){a=e({},a,t),t.storage&&(f=t.storage)},clearStorage:function(){var t;null==(t=f)||t.removeItem(a.name)},getOptions:function(){return a},rehydrate:function(){return m()},hasHydrated:function(){return u},onHydrate:function(t){return s.add(t),function(){s.delete(t)}},onFinishHydration:function(t){return c.add(t),function(){c.delete(t)}}},m(),g||y}}(t,n)};t.combine=function(t,e){return function(){return Object.assign({},t,e.apply(void 0,arguments))}},t.createJSONStorage=l,t.devtools=s,t.persist=v,t.redux=r,t.subscribeWithSelector=f}));
