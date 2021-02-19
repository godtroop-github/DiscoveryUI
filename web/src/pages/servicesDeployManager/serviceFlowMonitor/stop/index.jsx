import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Tabs, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { PauseOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;

const serviceBlueGreenStop = () => {
 const [visible, setVisible] = useState(false);
 // 停止
 const stop = () => {

 }

 return (
  <>
     <Space>
      <Button icon={<PauseOutlined /> }
       onClick={() => {
         stop();
       }}
      >停止</Button>
     </Space>
  </>
 );
};

export default serviceBlueGreenStop;
