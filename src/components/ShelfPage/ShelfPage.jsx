import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

function ShelfPage() {
  const shelfItems = useSelector((store) => store.shelf);
  // console.log(shelfItems, typeof shelfItems, "shelfItems from store")
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    // console.log("dispatch FETCH_Items")
    dispatch({
      type: "FETCH_Items",
    });
  };
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    //  function is sending the new item details to the store..
    dispatch({
      type: "ADD_item",
      payload: { description: description, image_url: imageLink },
    });
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form>
        <input type="text" placeholder="Enter item description" />
        <input type="text" placeholder="Paste image link" />
        <button onClick={(e) => addItem(e)}>Add Item</button>
      </form>
      <ul>
        {shelfItems &&
          shelfItems.map((item) => {
            return (
              <div key={item.id} className="itemObject">
                <li>{item.description}</li>
                <img src={item.image_url} />
              </div>
            );
          })}
      </ul>
      <p>{}</p>
    </div>
  );
}

export default ShelfPage;
