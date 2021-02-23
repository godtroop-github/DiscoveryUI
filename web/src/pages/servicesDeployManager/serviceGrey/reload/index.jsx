import { Button, Result, Space, Radio, Modal, Divider, Row, Col, Typography, Menu, Dropdown, Tabs, Input } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { ReloadOutlined } from '@ant-design/icons';
import { constant } from 'lodash';
const { Title, Text, Link } = Typography;

const service = () => {
 const [visible, setVisible] = useState(false);
 // 新建 - 确定
 const save = () => {

 }

 return (
  <>
     <Space>
      <Button icon={<ReloadOutlined />}
       onClick={() => {
        save();
       }}
      >重置</Button>
     </Space>
  </>
 );
};

export default service;
