const Model = {
 namespace: 'serviceGray',
 state: {
  // 新建-全局配置
  gobal: {}
 },
 effects: {
  *new({payload}, {call, put}) {
   yield put({
    type: 'changeGobal',
    payload: payload
   })
  }
 },
 reducers: {
  changeGobal(state, {payload}) {
   return { ...state, gobal: payload};
  }
 }
}
export default Model;