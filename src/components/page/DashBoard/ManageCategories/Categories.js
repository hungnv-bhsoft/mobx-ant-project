import React, { useEffect, useState} from 'react';
import { EditOutlined ,DeleteOutlined } from '@ant-design/icons';
import { Table, Space , Popconfirm, message, Modal, Form, Input, Button} from 'antd';
// import Update from './Update';
import DashBoard from '../Dashboard';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useStores } from '../../../../hooks/useStores';

const layout = {
  labelCol: {
      span: 4,
  },
  wrapperCol: {
      span: 16,
  },
};
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
const Categories = observer(() => {
    const { categoriesStore } = useStores();
    const [visible,setVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
      categoriesStore.getCategories();
    },[]);

    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }

    const showModal = () => {
      setVisible(true);
    };
    const handleCancel = e => {
      console.log(e);
      setVisible(false);
    };
    const onFinish = values => {
      console.log(values);
    };


    // console.log(toJS(categoriesStore.categories));
    const categories = categoriesStore.categories;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <p>{text}</p>,
      },
      {
        title: 'Action',
        dataIndex : 'id',
        key: 'action',
        render: id => (
          <Space size="middle">
            <EditOutlined  onClick={showModal}/>
            <Modal
              title="Edit Categorie name"
              visible={visible}
              onCancel={handleCancel}
            >
            <Form
            {...layout}
            form={form}
            name="categorie-form"
            initialValues={{
              name : '',
              price : 0,
              quantity : 0,
              status : '',
              description : ''
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}>
            <Form.Item
                name="name"
                label="Name"
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
            <Form.Item style={{ width : '50%', margin : '0 auto' }}>
              <Button type="primary" htmlType="submit">
                  Submit
              </Button>
            </Form.Item>
            </Form>
            </Modal>

            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={()=> {
                categoriesStore.deleteCategorie(id);
                // alert(id);
                message.success(`Delete success`);
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined/>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    const data = [];
    for(let i = 0; i < categories.length; i++) {
        data.push({
          key: i,
          id: categories[i].id,
          name: categories[i].name
        });

    }

    return (
        <DashBoard>
            <h3>List Categories</h3>
            <Table columns={columns} dataSource={data} />
        </DashBoard>
    )
});

export default Categories;
