import React from "react";

function CarouselForRest({ item }) {
  return (
    <div id="carouselRest" className="carousel slide carousel-dark slide my-3 ">
      <div className="carousel-inner p-3">
        {item.data.map((items, index) => {
          return (
            <div
              key={index}
              className={`carousel-item  ${index === 0 ? "active" : ""}`}
            >
              <ul className="list-group list-group-horizontal justify-content-center">
                {items.menuItems.map((img, index) => {
                  return (
                    <li className="list-group-item " key={index}>
                      <img
                        src={img.imageURL}
                        className="d-block w-100"
                        alt={`Slide ${index + 1}`}
                        width={90}
                        height={180}
                      />
                    </li>
                  );
                })}
              </ul>
              <h1 className="">{items.restaurantName}</h1>
              <h4>{items.description}</h4>
              <h3>{items.cuisineType}</h3>
              <ul className="list-group list-group-horizontal justify-content-center forRest">
                {items.menuItems.map((img, index) => {
                  return (
                    <li className="list-group-item " key={index}>
                      {" "}
                      {img.name}
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
        data-bs-target="#carouselRest"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselRest"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default CarouselForRest;
