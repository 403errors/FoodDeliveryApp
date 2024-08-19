import React, { useState } from "react";
import useOwnerData from "../../hooks/useOwnerData";
import CardsGroup from "../util/CardsGroup";
import Carousel from "../util/Carousel";
import CarouselForRest from "../util/CarouselForRest";
import CardsGroupSort from "../util/CardsGroupSort";
import { Link } from "react-router-dom";

function Homepage() {
  const { ownerData, loading, error, setCart } = useOwnerData();
  const [sortingOption, setSortingOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  function handleChange(e) {
    const value = e.target.dataset.value;
    setSortingOption(value);
  
  }
  

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSortingOption(""); // Reset sorting option when search is performed
  }
  const allMenuItems = ownerData.data.flatMap((restaurant) =>
  restaurant.menuItems.map((menuItem) => ({
    restaurantId: restaurant._id,
    restaurantName: restaurant.restaurantName,
    ...menuItem,
  }))
);

const filteredData = allMenuItems.filter((menuItem) => {
  const searchTermLower = searchTerm.toLowerCase();

  const menuItemMatched = menuItem.name.toLowerCase().includes(searchTermLower);

  const restaurantDetailsMatched =
    menuItem.restaurantName.toLowerCase().includes(searchTermLower) ||
    ownerData.data.some((restaurant) =>
      restaurant.restaurantName.toLowerCase().includes(searchTermLower) ||
      restaurant.cuisineType.toLowerCase().includes(searchTermLower) ||
      restaurant.address.toLowerCase().includes(searchTermLower) && restaurant._id
    );

  return menuItemMatched || restaurantDetailsMatched;
});


  let sortedFilteredData = [...filteredData];

  if (sortingOption === "lowToHigh") {
    sortedFilteredData.sort((a, b) => a.price - b.price);
  } else if (sortingOption === "highToLow") {
    sortedFilteredData.sort((a, b) => b.price - a.price);
  }
  


  return (
    <div className="container my-3">
   
      <h2 className="text-start fw-bold">Restaurants in Pune</h2>
      <CarouselForRest item={ownerData}></CarouselForRest>
      <div className="filter">
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item">
            <div className="dropdown">
              <button
                className="btn btn-secondary text-black dropdown-toggle text"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ marginBottom: "10px" }}
              >
                Filter
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link
                  className="dropdown-item"
                  data-value="lowToHigh"
                  name="lowToHigh"
                  onClick={handleChange}
                >
                  Sort(Low to High)
                </Link>
                <Link
                  className="dropdown-item"
                  data-value="highToLow"
                  name="highToLow"
                  onClick={handleChange}
                >
                  Sort(High to Low)
                </Link>
              </div>
            </div>
          </li>
          <li className="list-group-item ">
          <form className="d-flex" onSubmit={handleSearchSubmit}>
        <input
          className="form-control"
          type="search"
          placeholder="Search Dish"
          aria-label="Search Dish"
          style={{ width: "70%" }}
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>
          </li>
        </ul>
      </div>

      <div className="d-flex  flex-wrap justify-content-center">
  {sortedFilteredData.map((menuItem, index) => (
    <div key={index} className=" justify-content-center">
      <CardsGroup
        key={index}
        item={menuItem}
        restId={menuItem.restaurantId} // Assuming 'restaurantId' is the correct property for restaurant ID
        restName={menuItem.restaurantName} // Assuming 'restaurantName' is the correct property for restaurant name
        setCart={setCart}
      />
    </div>
  ))}
</div>


  
      <Carousel item={ownerData}></Carousel>
      <hr />
    </div>
  );
}

export default Homepage;
