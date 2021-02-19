import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Tabs, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { CaretRightOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;

const serviceBlueGreenStart = () => {
 const [visible, setVisible] = useState(false);
 // 开始
 const start = () => {

 }

 return (
  <>
     <Space>
      <Button icon={<CaretRightOutlined />}
       onClick={() => {
        start();
       }}
      >开始</Button>
     </Space>
  </>
 );
};

export default serviceBlueGreenStart;
