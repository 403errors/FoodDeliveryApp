import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";



function Login() {
  const auth = useAuthContext();
  const [login, setLogin] = useState({});
  const [selectedOption, setSelectedOption] = useState("Customer");
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(true);

  const handleChange = (e) => {
    if (e.target.type === "radio") {
      setSelectedOption(e.target.value);
    }

    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(login,"Login Submit");
    auth.login(login);
    setIsOffcanvasVisible(false); // Set the visibility state to false
 
  };

  function handleVisible() {
    setIsOffcanvasVisible(false);
  }


  return (
    <div
    className={`offcanvas offcanvas-end ${isOffcanvasVisible ?"show": ""  }`}
    tabIndex={-1}
    id="offcanvasLogin"
    aria-labelledby="offcanvasLoginLabel"
    data-bs-dismiss={isOffcanvasVisible ?"offcanvas" : undefined} // Set or remove the attribute based on visibility state
  >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLoginLabel">
          <div className="row">
            <div className="col-6">Login</div>
            <div className="col-6">
              <button
                className="btn "
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSignup"
                aria-controls="offcanvasSignup"
              >
                {" "}
                Signup
              </button>
            </div>
          </div>
        </h5>

        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          onClick={handleVisible}
        />
      </div>
      <div className="offcanvas-body">
        <hr />
        <form>
          <div className="mb-3">
            <h3>Login</h3>
            <div className="mb-3 d-flex">
              <label>
                <input
                  type="radio"
                  value="Customer"
                  name="role"
                  checked={selectedOption === "Customer"}
                  onChange={handleChange}
                  
                />
                Customer
              </label>
              <label className="mx-3">
                <input
                  type="radio"
                  value="Owner"
                  name="role"
                  checked={selectedOption === "Owner"}
                  onChange={handleChange}
                />
               {"  "} Owner
              </label>
              <br />
            </div>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              id="EmailLogin"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="form-control"
              id="Password1"
              placeholder="Enter Password"
            />
          </div>

          <button type="submit"  onClick={handleSubmit} className="btn btn-danger w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
