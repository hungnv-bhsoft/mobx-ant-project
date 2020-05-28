import React from 'react';
import Content from '../../layout/Content';

import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    let { pId } = useParams();
    return (
        <Content>
            Product Detail - {pId}
        </Content>
    )
}

export default ProductDetail
