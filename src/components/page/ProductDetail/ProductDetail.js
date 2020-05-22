import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    let { pId } = useParams();
    return (
        <div>
            Product Detail - {pId}
        </div>
    )
}

export default ProductDetail
