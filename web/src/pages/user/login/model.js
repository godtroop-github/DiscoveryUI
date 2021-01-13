import { history } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import { fakeAccountLogin, getFakeCaptcha } from './service';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // hard code
  // reload Authorized component

  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}
const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    * login({ payload }, { call, put }) {
      try {
        const response = yield call(fakeAccountLogin, payload);
        if (response) {
          yield put({
            type: 'changeLoginStatus',
            payload: 'admin',
          }); // Login successfully
          message.success('登录成功！');
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;
  
          if (redirect) {
            const redirectUrlParams = new URL(redirect);
  
            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);
  
              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = redirect;
              return;
            }
          }
  
          history.replace(redirect || '/');
        } else {
          message.error('密码错误');
          yield put({
            type: 'changeLoginStatus',
            payload: 'guest',
          }); // Login fail
        }
      } catch(e) {
        message.error('密码错误');
        yield put({
          type: 'changeLoginStatus',
          payload: 'guest',
        }); // Login fail
      }
      
    },

    * getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;