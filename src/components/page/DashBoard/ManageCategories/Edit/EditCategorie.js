import React , { useState} from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, notification} from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '../../../../../hooks/useStores';


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

//Notification
const editTrue = () => {
  notification.success({
    message: 'Edit Success',
    duration : 2,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const EditCategorie = observer(({categories,id}) => {
  const { categoriesStore } = useStores();
  const [visible,setVisible] = useState(false);
  const [form] = Form.useForm();


  const showModal = (id) => {
    setVisible(true);
    const cate = categories !== undefined && categories.find( c => c.id === id);
    form.setFieldsValue({ name : cate.name });
    // console.log(toJS(cate));
  };
  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };
  const onFinish = id => {
    const values = form.getFieldValue(['name']);
    // console.log(values,id);
    const cateName = { name : values};
    categoriesStore.editCategorie(id,cateName);
    setVisible(false);
    editTrue();
  };
  return (
    <>
            <EditOutlined  onClick={() => showModal(id)}/>
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
              onFinish={() => onFinish(id)}
              validateMessages={validateMessages}>
            <Form.Item
                name="name"
                label="Name"
                style={{ width: '80%'}}
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
                  Edit
              </Button>
            </Form.Item>
            </Form>
            </Modal>
    </>
  )
});

export default EditCategorie
