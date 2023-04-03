'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var getHashParams = function getHashParams(keys) {
  var hashParams = new URLSearchParams(window.location.hash.slice(1));
  return keys.reduce(function (prev, cur) {
    var _extends2;
    var strKey = String(cur);
    var value = hashParams.get(strKey);
    return _extends({}, prev, (_extends2 = {}, _extends2[strKey] = value != null ? value : void 0, _extends2));
  }, {});
};

var useHashState = function useHashState(_ref) {
  var keys = _ref.keys;
  var _useState = react.useState(getHashParams(keys)),
    state = _useState[0],
    setHookState = _useState[1];
  var onChangeHash = react.useCallback(function () {
    var hashParams = new URLSearchParams(window.location.hash.slice(1));
    var newState = keys.map(function (key) {
      var _ref2;
      var strKey = String(key);
      var value = hashParams.get(strKey);
      return _ref2 = {}, _ref2[strKey] = value, _ref2;
    }).reduce(function (prev, cur) {
      return _extends({}, prev, cur);
    }, {});
    setHookState(function (prevState) {
      return _extends({}, prevState, newState);
    });
  }, [keys]);
  react.useEffect(function () {
    window.addEventListener('hashchange', onChangeHash);
    return window.removeEventListener('hashchange', onChangeHash);
  }, [onChangeHash]);
  var setState = function setState(newState) {
    var updateState = _extends({}, state, newState);
    setHookState(updateState);
    var url = new URL(window.location.href);
    url.hash = Object.entries(updateState).map(function (_ref3) {
      var key = _ref3[0],
        value = _ref3[1];
      return key + "=" + value;
    }).join('&');
    window.history.pushState(null, '', url.toString());
  };
  return [state, setState];
};

exports.default = useHashState;
//# sourceMappingURL=react-hash-state-hook.cjs.development.js.map
