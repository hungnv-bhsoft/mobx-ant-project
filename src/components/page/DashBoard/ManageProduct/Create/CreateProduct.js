import React, { useState } from 'react';
import Dashboard from '../../Dashboard';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button , Upload, Select , notification} from 'antd';
import ImgCrop from 'antd-img-crop';
import { observer } from 'mobx-react';
import { useStores } from '../../../../../hooks/useStores';

import { toJS } from 'mobx';
const { Option } = Select;


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

//Notification
const createTrue = () => {
  notification.success({
    message: 'Create Product Success',
    duration : 2,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const createFalse = () => {
  notification.warn({
    message: 'Create Product Failed',
    duration : 2,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};


const H3 = styled.h3`
    text-align: center;
    margin-bottom: 2rem;
`;

const CreateProduct = observer(() => {
    const { productStore , categoriesStore } = useStores();
    React.useEffect(() => {
      categoriesStore.getCategories();
    },[]);

    const categories = categoriesStore.categories;
    //handle Field, files
    const [form] = Form.useForm();
    const [fileList,setFileList] = useState([]);
    //Handle File

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    //handle Selected
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
        if(errorInfo !== null) {
          createFalse();
        }
    };

    const onFinish = values => {
        // console.log(values);
        // console.log(fileList);
        const formData = new FormData();
        const newProduct = {
            name: values.name,
            description: values.description,
            price : values.price,
            categories : values.categories,
            quantity : values.quantity,
            status : values.status
        };

        formData.append('data', JSON.stringify(newProduct));
        if (fileList.length === 1) {
            const sFile = fileList[0].originFileObj;
            formData.append(`files.cover`, sFile, sFile.name);
        } else {
            for(let i = 0; i < fileList.length; i++ ) {
                const mFile = fileList[i].originFileObj;
                formData.append(`files.cover`, mFile, mFile.name);
            }
        }
        // console.log(newProduct);
        productStore.createProduct(formData);
        //reset form after submit
        setFileList([]);
        form.resetFields();
        createTrue();


    };

    // console.log(signleFile);
    return (
        <Dashboard>

            <H3>Create new product</H3>
            <Form
            {...layout}
            form={form}
            name="product-form"
            initialValues={{
              name : '',
              price : 0,
              quantity : 0,
              status : '',
              description : ''
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="categories"
                label="Categories"
                rules={[
                    {
                        required: true,
                    }
                ]}
            >
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select categorie"
                onChange={handleChange}
            >
                {categories !== undefined && categories.map( cate => (
                    <Option key={cate.id}>{cate.name}</Option>
                ))}
            </Select>
            </Form.Item>
            <Form.Item
                name="price"
                label="Price"
                rules={[
                {
                    type: 'number',
                    min: 1,
                    max: 99999999,
                    required: true
                },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                {
                    type: 'number',
                    min: 1,
                    max: 1000,
                    required: true
                },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item name="status" label="Status">
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                        required: true,
                        min: 30,
                        max : 5000
                    }
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Cover">
            <ImgCrop rotate>
                <Upload
                    multiple={true}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </ImgCrop>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            </Form>
        </Dashboard>
    );
});

export default CreateProduct;
