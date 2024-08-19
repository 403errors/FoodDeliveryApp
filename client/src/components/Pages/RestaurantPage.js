// RestaurantPage.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../ConnectionServer";
import CardsGroup from "../util/CardsGroup";
import useOwnerData from "../../hooks/useOwnerData";

function RestaurantPage() {
  const { id } = useParams();
  const { setCart } = useOwnerData();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/owner/${id}`);
        if (response.data.status) {
          setRestaurant(response.data.owner);
        } else {
          console.log("restaurant not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  });

  return (
    <div className="container mt-5">
      {restaurant.menuItems && restaurant.menuItems.length > 0 && (
        <div className="row">
        
          <div className="col-md-6">
            <img className="card-img" src={restaurant.menuItems[0].imageURL} alt="Restaurant" width={150} height={400} />
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{restaurant && restaurant.restaurantName}</h5>
                <p className="card-text">
                  <strong>Cuisine:</strong> {restaurant && restaurant.cuisineType}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {restaurant && restaurant.description}
                </p>
                <p className="card-text">
                <i className="fa fa-address-book " /> {restaurant && restaurant.address} | <strong>   <i className="fa fa-phone" /></strong> {restaurant && restaurant.phone} | 
                </p>
          
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  <span style={{ color: restaurant && restaurant.status === "Open" ? "green" : "red" }}>
                    {restaurant && restaurant.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-12 mt-4">
            <div className="">
              <div className="">
                <h5 className="">Menu</h5>
                <div className="d-flex flex-wrap">
                  {restaurant.menuItems.map((item, key) => (
                    <CardsGroup
                      key={key}
                      item={item}
                      restId={restaurant._id}
                      restName={restaurant.restaurantName}
                      setCart={setCart}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantPage;
