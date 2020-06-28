import React from 'react';
import './collection-item.styles.scss'

const CollectionItem = ({ItemName, ImgUrl, Price, Description}) => (
    <div className='collectionItemContainer'>
        <div className='img' style={{backgroundImage: `url(${ImgUrl})`}}></div>
        <div className='collectionItemFooterContainer'>
            <div className='collectionItemName'>{ItemName}</div>
            <div className='collectionItemPrice'>{Price}</div>
            <div className='collectionItemDescription'>{Description}</div>
        </div>
    </div>
)

export default CollectionItem;