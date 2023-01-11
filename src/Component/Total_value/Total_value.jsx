import React from "react";
import "./Total_value.css";
import Tab from "../Tab/Tab";
function Total_value({setShoww}) {
  return (
    <div className="">
      <div
        class="chakra-stat css-16fwhjm"
        style={{
          padding: "1rem 2rem 0.5rem",
          width: "max-content",
          minWidth: "265px",
          margin: "1rem auto",
          boxShadow: "rgb(116, 54, 128) 0px 0px 50px 0px",
         height:"8rem"
        }}
      >
        <dl>
          <dt class="chakra-stat__label css-1mqe0od">Total Value Locked</dt>
          <dd class="chakra-stat__number css-1snxiwx">
            <p class="chakra-text css-0 text-white">$2,683,488.62</p>
          </dd>
          <div class="css-je7iwd  text-white" style={{marginTop:"-1rem"}}>
            <p class="chakra-text css-1veligu">$ 0.00180 = 1 IBAT</p>
          </div>
        </dl>
      </div>

      <div className="container">
        <div className="row  text-white">
          <div className="text-center m-auto">
            <Tab setShoww={setShoww}  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Total_value;
