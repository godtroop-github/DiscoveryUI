import { constant } from 'lodash';
import { Select, Space, Row, Col, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';

import { RedoOutlined, EditOutlined } from '@ant-design/icons';

const settingArgs = (props) => {

  const args = props.args

  // 蓝绿条件
  const [argsExpress, setArgsExpress] = useState("");

  const updateArgs = () => {
    props.update({
      content: argsExpress
    })
  }

  useEffect(() => {
    if (args) {
      setArgsExpress(args.map(item => item.key + '=' + item.value).join(';'))
    }
  }, [args])

 return (
  <>
   <Space direction="vertical" style={{ width: "100%" }}>
    <Row>
     <Col flex="40px">参数</Col>
     <Col flex="350px">
      <Input placeholder="Basic usage" value={argsExpress} onChange={(e) => {
              setArgsExpress(e.target.value)
            }}/>
     </Col>
    </Row>
    <Row>
     <Col>
      <Button type="primary" shape="round" icon={<EditOutlined />} onClick={updateArgs} >
       修改
                  </Button>
     </Col>
    </Row>
   </Space>
  </>
 )
}

export default settingArgs;