import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../ConnectionServer";
import { useParams } from "react-router-dom";

function Profile() {
  const auth = useAuthContext();
  
  const { id } = useParams();
    const[orderList,setOrderList]=useState();
async  function handleClick(e) {
 
        try {
            const token = auth.user.token;
            const response = await axios.get(`${BASE_URL}/order/user/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
            if(response.data.status){
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
        }

  }
  console.log(auth);
  return (
    <div>
      <div className="container-fluid bg-dark text-white">
        <div className="row">
          <div className="col text-start my-3 ">
            {/* ********************************** */}

            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <h4> {auth.isLogged ? auth.user.user.username : "name"}</h4>
                    <h5> {auth.isLogged ? auth.user.user.email : "email"}</h5>
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      onClick={handleClick}
                    >
                     Order History
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                        order 1
                        order2
                        order3
                  </div>
                </div>
              </div>
             
            </div>

            {/* *************************************** */}

         
          </div>
     
        </div>
      </div>
    </div>
  );
}

export default Profile;
