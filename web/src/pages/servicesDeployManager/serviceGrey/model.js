import { message } from 'antd';

const Model = {
  namespace: 'serviceGray',
  state: {
    // 新建-全局配置
    gobal: {},
    // 灰度条件
    condition: {},
    version: 0
  },
  effects: {
    *updateVersion({ payload }, { call, put, select }) {
      yield put({
        type: 'changeVersion'
      })
    },
    *new({ payload }, { call, put }) {
      console.log(payload)
      yield put.resolve({
        type: 'changeGobal',
        payload: payload
      })
      yield put({ type: 'changeVersion' })
    },
    *add({ payload }, { call, put, select }) {
      const gobal = yield select(state => state.serviceGray.gobal)
      console.log(gobal)
      let name = payload.arrange.name
      !gobal.arrange && (gobal.arrange = [])
      if (gobal.subscribeInstanceKey.name == name || gobal.arrange.find(i => i.name == name)) {
        message.error(`${name} 已经有了`);
      } else {
        let _gobal = Object.assign({}, gobal)
        _gobal.arrange.push(payload.arrange)
        yield put.resolve({
          type: 'changeGobal',
          payload: _gobal
        })
        yield put({ type: 'changeVersion' })
      }
    },
    *edit({ payload }, { call, put, select }) {
      const gobal = yield select(state => state.serviceGray.gobal)
      let name = payload.arrange.name
      if (gobal.subscribeInstanceKey.name == name) {
        return
      }
      let index = 0
      let _arrange = gobal.arrange.find((i, _index) => {
        if (i.name == name) {
          index = _index
          return true
        } else {
          return false
        }
      })
      if (!_arrange) {
        message.error(`${name} 还没有添加`);
      } else {
        let _gobal = Object.assign({}, gobal)
        _gobal.arrange[index] = payload.arrange
        yield put.resolve({
          type: 'changeGobal',
          payload: _gobal
        })
        yield put({ type: 'changeVersion' })
      }
    },
    // 更新灰度条件
    *updateCondition({ payload }, { call, put, select }) {
      console.log(payload)
      const condition = yield select(state => state.serviceGray.condition)
      let _condition = Object.assign({}, condition)
      _condition[payload.type] = payload.value
      console.log(_condition)
      yield put({
        type: 'changeCondition',
        payload: _condition
      })
    },
  },
  reducers: {
    changeGobal(state, { payload }) {
      return { ...state, gobal: payload };
    },
    changeCondition(state, { payload }) {
      return { ...state, condition: payload };
    },
    changeVersion(state, { payload }) {
      const oldVersion = state.version
      let newVersion = oldVersion + 1
      newVersion = newVersion % 10
      console.log(newVersion)
      return { ...state, version: newVersion };
    }
  }
}
export default Model;