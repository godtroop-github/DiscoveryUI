import { Button, Space, Radio, Modal, Divider, Row, Col, Typography, Tabs, Input, Select, message } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { PlusOutlined, MinusOutlined, SettingOutlined, CaretRightOutlined, EditOutlined } from '@ant-design/icons';

import { validateExpression } from '@/services/console';

const serviceBlueGreenSettingCondition = () => {

 // 蓝绿条件运算条件
 const [conditionRow, setConditionRow] = useState([{
  symbol: "==",
  relation: "&&"
 }]);
 // 蓝绿运算聚合结果
 const [conditionExpress, setConditionExpress] = useState("");
 const [validation, setValidation] = useState("");

 // 下一行增加运算条件
 const addCondition = (item, index) => {

  let row = {
   symbol: "==",
   relation: "&&"
  }
  let conditionRowBak = conditionRow.concat()
  conditionRowBak.splice(index + 1, 0, row);
  setConditionRow(conditionRowBak)
 }

 // 删除当前这一行
 const removeCondition = (item, index) => {

  if (conditionRow.length <= 1) {
   message.error("至少得要有一行")
  }

  let conditionRowBak = conditionRow.concat()
  conditionRowBak.splice(index)
  setConditionRow(conditionRowBak)
 }

 // 根据当前的运算条件生成 spring spel表达式
 // 参考 http://nepxion.gitee.io/discovery/#/?id=%e5%85%a8%e9%93%be%e8%b7%af%e7%89%88%e6%9c%ac%e6%9d%a1%e4%bb%b6%e5%8c%b9%e9%85%8d%e8%93%9d%e7%bb%bf%e5%8f%91%e5%b8%83
 const generatorCondition = () => {
  var expression = "#H['#{$0}'] #{$1} '#{$2}' #{$3} "
  var expressionList = []
  conditionRow.forEach((item, index) => {

   let exoressAggregation = expression
     .replace('#{$0}', item.args)
     .replace('#{$1}', item.symbol)
     .replace('#{$2}', item.val)

   if (index != conditionRow.length - 1) {
    exoressAggregation = exoressAggregation.replace('#{$3}', item.relation)
   } else {
    exoressAggregation = exoressAggregation.replace('#{$3}', '')
   }
    
   expressionList.push(exoressAggregation)
 })

 setConditionExpress(expressionList.join(''))
}

// 校验规则
const validCondition = () => {
 let parms = {
  condition: conditionExpress,
  validation: validation,
 }
 validateExpression(parms).then((res) => {
  if (res) {
   message.info('校验结果: true');
  } else {
   message.warn('校验结果: false');
  }
 })
}

 return (
  <>
   <Space direction="vertical">
    <Row>
     <Col flex="90px">参数</Col>
     <Col flex="60px">运算</Col>
     <Col flex="90px">值</Col>
     <Col flex="120px">关系</Col>
    </Row>
    {
     conditionRow.map((item, index) => {
      return (
       <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
        <Col flex="90px">
         <Input placeholder="Basic usage" value={item.args} onChange={(e) => {
          item.args = e.target.value;
          setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
         }} />
        </Col>
        <Col flex="60px">
         <Select defaultValue="==" style={{ width: 60 }} value={item.symbol}
          onChange={(value) => {
           item.symbol = value;
           setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
          }}
         >
          <Select.Option key={1} value="==">==</Select.Option>
          <Select.Option key={2} value="!=">!=</Select.Option>
          <Select.Option key={3} value=">">
           &gt;
                  </Select.Option>
          <Select.Option key={4} value=">=">
           &gt;=
                  </Select.Option>
          <Select.Option key={5} value="<">
           &lt;
                  </Select.Option>
          <Select.Option key={6} value="<=">
           &lt;=
                  </Select.Option>
          <Select.Option key={7} value="matches">
           matches
                  </Select.Option>
         </Select>
        </Col>
        <Col flex="90px">
         <Input placeholder="Basic usage" value={item.val} onChange={(e) => {
          item.val = e.target.value;
          setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
         }}/>
        </Col>
        <Col flex="70px">
         {
          index != conditionRow.length - 1 &&
          <Select defaultValue={"&&"} style={{ width: 70 }} value={item.relation}
          
          onChange={(value) => {
           item.relation = value;
           setConditionRow(conditionRow.map((_item, _index) => _index == index ? item : _item))
          }}>
           <Select.Option key={1} value={"&&"}>&&</Select.Option>
           <Select.Option key={2} value={"||"}>||</Select.Option>
          </Select>
         }

        </Col>
        <Col flex={1}>
         <Space>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => { addCondition(item, index) }} />
          <Button type="primary" shape="circle" icon={<MinusOutlined />} onClick={() => { removeCondition(item, index) }} />
         </Space>
        </Col>
       </Row>
      )
     })
    }

    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">条件</Col>
     <Col flex="310px">
      <Input placeholder="Basic usage" value={conditionExpress} onChange={(e) => {
          setConditionExpress(e.target.value)
         }}/>
     </Col>
     <Col flex={1}>
      <Button type="primary" shape="circle" icon={<SettingOutlined />} onClick={() => {
       generatorCondition()
      }}/>
     </Col>
    </Row>
    <Row gutter={{ xs: 1, sm: 2, md: 3 }}>
     <Col flex="40px">校验</Col>
     <Col flex="310px">
      <Input placeholder="校验参数,格式示例: a=1;b=2" value={validation} onChange={(e) => {
          setValidation(e.target.value)
         }}/>
     </Col>
     <Col flex={1}>
      <Button type="primary" shape="circle" icon={<CaretRightOutlined />} onClick={validCondition}/>
     </Col>
    </Row>
    <Row>
     <Col>
      <Button type="primary" shape="round" icon={<EditOutlined />} >
       修改
                  </Button>
     </Col>
    </Row>
   </Space>

  </>
 )
}

export default serviceBlueGreenSettingCondition;