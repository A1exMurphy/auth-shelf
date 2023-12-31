import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import React from "react";

function ShelfPage() {
  const shelfItems = useSelector((store) => store.shelf);
  // console.log(shelfItems, typeof shelfItems, "shelfItems from store")
  console.log("mounting ShelfPage")
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItems();
  }, [shelfItems.length]);

  const fetchItems = () => {
    // console.log("dispatch FETCH_Items")
    dispatch({
      type: "FETCH_ITEMS",
    });
  };
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    //  function is sending the new item details to the store..
    dispatch({
      type: "ADD_ITEM",
      payload: { description: description, image_url: imageLink },
    });
    setDescription('');
    setImageLink('');
  };

  const deleteItem = ({item}) => {
    console.log(item, "item from  delete button")
    dispatch({
      type: "DELETE_ITEM",
      payload: `${item.id}`
    })
  }

  const editItem = ({item}) => {
    console.log(item, "item selected for update")
    dispatch({
      type: "EDIT_ITEM",
      payload: `${item.id}`
    })
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form>
        <input type="text" placeholder="Enter item description" onChange={(e) => setDescription(e.target.value)} value={description}/>
        <input type="text" placeholder="Paste image link" onChange={(e) => setImageLink(e.target.value)} value={imageLink}/>
        <button onClick={(e) => addItem(e)}>Add Item</button>
      </form>
      <ul className="gallery">
        {shelfItems &&
          shelfItems.map((item) => {
            return (
              <div key={item.id} className="itemObject">
                <li>{item.description}</li>
                <img src={item.image_url} />
                <button onClick={() => deleteItem({item})}>Remove</button>
                <span><button onClick={() => editItem({item})}>Edit</button></span>
              </div>
            );
          })}
      </ul>
      <p>{}</p>
    </div>
  );
}

export default ShelfPage;
