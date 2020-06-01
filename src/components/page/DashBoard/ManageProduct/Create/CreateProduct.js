import React, { useState } from 'react';
import Dashboard from '../../Dashboard';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button , Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import { observer } from 'mobx-react';
import { useStores } from '../../../../../hooks/useStores';

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



const H3 = styled.h3`
    text-align: center;
    margin-bottom: 2rem;
`;

const CreateProduct = observer(() => {
    const { productStore } = useStores();
    const [fileList,setFileList] = useState([]);
    const [jwt,setJwt] = useState(null);
    React.useEffect(() => {
        const getToken = JSON.parse(window.sessionStorage.getItem('admin')) || null;
        if (getToken) {
            setJwt(getToken.jwt);
        } else {
            setJwt(null);
        }
    },[]);


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


    const onFinish = values => {
        console.log(values);
        console.log(fileList);

        const newPro = {
            name : values.product.name,
            description : values.product.description,
            price : values.product.price,
            quantity : values.product.quantity,
            status : values.product.status,
            cover : fileList
        };
        console.log(newPro);
        productStore.createProduct(newPro);

    };
    console.log(jwt);

    return (
        <Dashboard>
            <H3>Create new product</H3>
            <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}>
            <Form.Item
                name={['product', 'name']}
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
                name={['product', 'price']}
                label="Price"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                name={['product', 'quantity']}
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
            <Form.Item name={['product', 'status']} label="Status">
                <Input />
            </Form.Item>
            <Form.Item name={['product', 'description']} label="Description">
                <Input.TextArea />
            </Form.Item>
            <Form.Item name={['product', 'cover']} label="Cover">
            <ImgCrop rotate>
                <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    multiple={true}
                    headers={{
                        'Authorization': `Bearer ${jwt}`,
                        'Content-Type': 'multipart/form-data'
                    }}
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
