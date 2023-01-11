import React from "react";
import "./Total_value.css";
import Tab from "../Tab/Tab"
function Total_value() {
  return (
    <div className="">
      <div className="total_baxk"
    
      >
        <div >
          <div class="text-center fs-4 fw-bold">Total Value Locked</div>
          <div class="">
            <p class=" fs-2 fw-bold text-center">$0</p>
          </div>
          <div class="">
            <p class="text-center " style={{fontSize:"13px"}}>$ 0.00178 = 1 IBAT</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row  text-white">
            <div className="text-center m-auto" >
          <Tab/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Total_value;
