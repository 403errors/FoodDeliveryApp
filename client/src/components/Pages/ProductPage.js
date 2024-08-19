// ProductPage.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../ConnectionServer";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]); 

  useEffect(() => {
    // Check if running on the server
    if (typeof window === "undefined") {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/owner/food/${id}`);
        // console.log(response);
        if (response.data.status) {
          setProduct(response.data);
        } else {
          console.log("product not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

//   console.log(product.foodItem, "product");
  return (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100%", height: "100%", marginTop: "3%" }}
    >
      <div className="card prd mb-3" style={{ width: "100%", height: "100%" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              className="card-img  "
              src={product.foodItem && product.foodItem.imageURL}
              alt="Card cap"
            />
          </div>
   
      <div class="col-md-8">
        <div class="card-body">
          <div className="card-body text-start">
            <h5 className="card-title">
            <h5>   Name: {product.foodItem && product.foodItem.name}</h5>
            </h5>
            <p className="card-text">
            <h5>  Restaurant Name: {product.foodItem && product.rest.restaurantName}</h5>
            </p>
            <p className="card-text">
            <h5>  Cuisine: {product.foodItem && product.rest.cuisineType}</h5>
            </p>
            <p className="card-text">
            <h5>  Address: {product.foodItem && product.rest.address}</h5>
            </p>
            <p className="card-text">
            <h5>  Description: {product.foodItem && product.rest.description}</h5>
            </p>
            <p className="card-text">
            <h5>   Phone: {product.foodItem && product.rest.phone}</h5>
            </p>
            <p className="card-text">
            <h5>   Status: <span style={{ color:product.rest && product.rest.status==='Open'?"green":"red"}} >{product.foodItem && product.rest.status}</span></h5>
            </p>
            <p className="card-text">
             <h5> Price: {product.foodItem && product.foodItem.price}</h5>
            </p>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ProductPage;
