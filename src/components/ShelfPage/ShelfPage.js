import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




import React from 'react';

function ShelfPage() {
  const shelfItems = useSelector(store => store.shelf)
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItems()
  }, []);

  const fetchItems = () => {
    dispatch({
      type: "FETCH_Items"
  });

  }
  return (
    <div className="container">
      <h2>Shelf</h2>
      <ul>
      {shelfItems && shelfItems.map((item) => {
        return(
          <div key={item.id} className='itemObject'>
            <li>{item.description}</li>
            <img src={item.image_url} />
          </div>
        )
      })}</ul>
      <p>{}</p>
    </div>
  );
}

export default ShelfPage;
