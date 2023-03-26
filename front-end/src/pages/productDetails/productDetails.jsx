import React, { useRef, useState } from "react";
import { useGetoneproductsByNameQuery } from "../../Redux/products";
import { useParams } from "react-router-dom";
import './productDetails.css';
import DetailsThumb from "./productDetailsThumb";

export default function ProductDetails() {
  let userId = useParams();
  const { data, error, isLoading } = useGetoneproductsByNameQuery(
    Number(userId.id)
  );
  const [index, setIndex] = useState(0);
  const myRef = useRef(null)
  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  if (data) {
    return (
      <div className="app productdetails">
          <div className="details" key={data.id}>
            <div className="big-img">
              <img src={data.imageLink[index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{data.productname}</h2>
                <span>${data.price}</span>
              </div>
              {/* <Colors colors={data.colors} /> */}

              <p>{data.description}</p>

              <DetailsThumb images={data.imageLink} tab={handleTab} myRef={myRef} />
              <button className="cart">Add to cart</button>
            </div>
          </div>
        
      </div>
    );
  }
}
