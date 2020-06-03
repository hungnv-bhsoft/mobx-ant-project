import React, { useEffect, useState} from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import {  Modal, Form, Input, Button,notification} from 'antd';
import { useStores } from '../../../../../hooks/useStores';
import styled from 'styled-components';

const CreateIcon = styled(PlusCircleOutlined)`
    font-size: 3rem;
    margin: 1.5rem 0;
`;

const validateMessages = {
  required: '${label} is required!',
  types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
  },
  number: {
      range: '${label} must be between ${min} and ${max}',
  },
};
const createTrue = () => {
  notification.success({
    message: 'Create Success',
    duration : 2,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const CreateCategorie = () => {
    const { categoriesStore } = useStores();
    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
      setVisible(true);
      // console.log(toJS(cate));
    };
    const handleCancel = e => {
      // console.log(e);
      setVisible(false);
    };
    const onFinish = values => {

      // console.log(values);
      categoriesStore.createCategorie(values);
      setVisible(false);
      createTrue();
    };
  return (
      <div>
            <CreateIcon onClick={showModal}/>
            <Modal
              title="Edit Categorie name"
              visible={visible}
              onCancel={handleCancel}
              footer={null}
            >
            <Form
              form={form}
              layout="inline"
              name="categorie-form"
              onFinish={onFinish}
              validateMessages={validateMessages}>
            <Form.Item
                name="name"
                label="Name"
                style={{ width: '70%'}}
                rules={[
                  {
                      minx: 3,
                      max: 500,
                      required: true,
                  },
                ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                  Create
              </Button>
            </Form.Item>
            </Form>
            </Modal>
      </div>
  )
}

export default CreateCategorie
