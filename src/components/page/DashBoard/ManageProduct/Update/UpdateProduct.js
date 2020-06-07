import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory, Link } from 'react-router-dom';
import Dashboard from '../../Dashboard';
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
const editTrue = () => {
  notification.success({
  message: 'Edit Success',
  duration : 2,
  onClick: () => {
    console.log('Notification Clicked!');
  },
  });
};
const editFalse = () => {
  notification.warn({
  message: 'Edit Failed',
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

// const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => resolve(reader.result);
//   reader.onerror = error => reject(error);
//   });
// }


const UpdateProduct = observer(() => {
  let { pId } = useParams();
  // const history = useHistory();
  const { productStore , categoriesStore } = useStores();
  //form hooks antd
  const [form] = Form.useForm();
   //files antd
  const [fileList,setFileList] = useState([]);
  //file src

  // const imageFile = [];
  const categories = categoriesStore.categories;
  const products = productStore.products;
  // console.log(toJS(products));
  //filter list array product if id === id in a  product => return obj of project
  const pro = products.length > 0 && products.filter( pro => pro.id === pId)[0];


  // console.log(toJS(imgDefault));

  React.useEffect(() => {
    productStore.getProducts();
    categoriesStore.getCategories();
  },[]);
  React.useEffect(() => {
    const getCateField = form.getFieldValue('categories');
    const cateDefault = pro.categories !== undefined ? pro.categories.map( cate => cate.id ) : [];
    const imgDefault = (pro.cover && pro.cover.length > 0) ? pro.cover.map( img => ({
      img,
      uid : img.id,
      url : 'http://localhost:1337'+img.url
    })): [];

    setFileList(imgDefault);
    form.setFieldsValue({
      name : pro.name,
      price : pro.price,
      categories : getCateField !== undefined ? getCateField : cateDefault,
      quantity : pro.quantity,
      status : pro.status,
      description : pro.description
    });
  },[]);


  //=============handle upload

  const onChange = ({ fileList: newFileList }) => {
    // setFileImg(file);
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
      editFalse();
    }
  };

  const onFinish = values => {
    console.log(values);
    const newImg = [];  //type new File or new Blob;
    const oldImg = []; //type string;
    // console.log(fileList);
    fileList.map( file => {
        switch (('img' in file)) {
          case true:
            oldImg.push(file);
            break;
          case false:
            newImg.push(file);
            break;
          default:
            break;
        }
    }); //phan loai file
    console.log(newImg);
    console.log(oldImg);
    const {
      name,
      price,
      categories,
      quantity,
      status,
      description
    } = values;
    const editProduct =  {
      name,
      price,
      quantity,
      categories,
      status,
      description,
      cover : oldImg && oldImg.map( cover => cover.img)
    }
    console.log(editProduct);
    const formData = new FormData();
    formData.append('data',JSON.stringify(editProduct));

    // console.log(fileList.img);
    if(newImg.length > 0) {
      if (newImg.length === 1) {
        const sFile = newImg[0].originFileObj;
        formData.append(`files.cover`, sFile, sFile.name);
      } else {
        for(let i = 0; i < newImg.length; i++ ) {
          const mFile = newImg[i].originFileObj;
          formData.append(`files.cover`, mFile, mFile.name);
        }
      }
    }
    for(let pair of formData.entries()) {
      console.log(pair);
    }
    productStore.editProduct(pId,formData);
    editTrue();
  };

  return (
    <Dashboard>

      <H3>Edit product</H3>
      <Form
      {...layout}
      form={form}
      name="product-form"
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
        placeholder="Please choose categories"
        onChange={handleChange}
      >
        {categories !== undefined && categories.map( cate => (
          <Option key={cate.id} value={cate.id}>{cate.name}</Option>
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
      <Form.Item label="Upload">
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button type="dashed">
          <Link to="/getproducts">Back</Link>
        </Button>
      </Form.Item>

      </Form>
    </Dashboard>
  );
});

export default UpdateProduct;
