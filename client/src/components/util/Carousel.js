import React from "react";
import { Link } from "react-router-dom";

function Carasoul({ item }) {
  // console.log(item,"object");
  return (
    <div id="carouselExample" className="carousel slide carousel-dark slide">
      <div className="carousel-inner">
        {item.data.map((items, index) => {
          return (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <ul className="list-group list-group-horizontal justify-content-center">
            
                {items.menuItems.map((img, index) => {
                  return (
                    <li className="list-group-item " key={index}>
                        <Link to={`/resturant/${items._id}`} style={{ textDecoration: "none" }}>
                      <img
                        src={img.imageURL}
                        className="d-block w-100"
                        alt={`Slide ${index + 1}`}
                        width={90}
                        height={180}
                      />  </Link>
                    </li>
                  );
                })}
              
              </ul>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carasoul;
