import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




import React from 'react';

function ShelfPage() {
  const shelfItems = useSelector(store => store.shelf)
  // console.log(shelfItems, typeof shelfItems, "shelfItems from store")
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItems()
  }, []);

  const fetchItems = () => {
    // console.log("dispatch FETCH_Items")
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
