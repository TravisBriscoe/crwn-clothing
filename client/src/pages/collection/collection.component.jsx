import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

// import './collection.styles.scss';

import { CollectionContainer, CollectionItems, CollectionTitle } from './collection.styles';

const CollectionPage = () => {
  const { collectionId } = useParams();
  const collection = useSelector(selectCollection(collectionId));
  const { title, items } = collection;
  
  return  (
    <CollectionContainer className='collection-page'>
      <CollectionTitle className='title'>{title}</CollectionTitle>
      <CollectionItems className='items'>
        {
          items.map(item => (<CollectionItem key={item.id} item={item} />))
        }
      </CollectionItems>
    </CollectionContainer>
  )
};

export default CollectionPage;