import { message } from 'antd';

const Model = {
 namespace: 'serviceBlueGreen',
 state: {
  // 新建-全局配置
  gobal: {}
 },
 effects: {
  *new({ payload }, { call, put }) {
   console.log(payload)
   yield put({
    type: 'changeGobal',
    payload: payload
   })
  },
  *add({ payload }, { call, put, select }) {
   const gobal = yield select(state => state.serviceBlueGreen.gobal)
   console.log(gobal)
   let name = payload.subscribeInstance.name
   if (gobal.subscribeInstanceKey.name == name || gobal.subscribeInstance.find(i => i.name == name)) {
    message.error(`${name} 已经有了`);
   } else {
    let _gobal = Object.assign({}, gobal)
    !_gobal.arrange && (_gobal.arrange = []) 
    _gobal.arrange.push(payload.arrange)
    yield put({
     type: 'changeGobal',
     payload: _gobal
    })
   }
  }
 },
 reducers: {
  changeGobal(state, { payload }) {
   return { ...state, gobal: payload };
  }
 }
}
export default Model;