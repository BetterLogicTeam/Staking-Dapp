import  React,{useEffect, useState} from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Flexible from "../Flexible/Flexible";
import Lockestake from "../Lockestak/Lockestake";
import Flextabs from "../Flextabs/Flextabs";
import Connent from "../Connent/Connent";
import './Tab_style.css'
import Mylock from "../myLock/Mylock";
import Web3 from "web3";
import { Staking, Staking_Abi } from "../../utilies/constant";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({setShoww,totalUserAmount}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <Box sx={{ width: "100%" }} className="text-light">
      <Box sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="tab-css"
          centered
        >
          <Tab
            className="text-light mak_flxx_bttn"
            label="Stake"
            {...a11yProps(0)}
          />
          <Tab
            className="text-light mak_flxx_bttn"
            label="Staked History"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={1}>
        {/* <Flexible/> */}
        {/* <div className="my-4">
        <h2 class="staking__heading">Flexible Staking</h2>
        <div class="staking__apy"><span class="staking__tvl_text">APY:</span><span class="staking__tvl_value" style={{color: "rgb(136, 209, 242)", fontWeight: "700"}}>12%</span></div>
        <div class="staking__tvl"><span class="staking__tvl_text">Total $IBAT in Flexible Staking</span><span class="staking__tvl_value" style={{color: "rgb(136, 209, 242)", fontWeight: "700"}}>606,080,547.086 IBAT</span></div>
        </div> */}
        {/* <Flextabs setShoww={setShoww} /> */}
        <Mylock setShoww={setShoww}/>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <div class="staking">
          <h2 class="staking__heading">Locked Staking</h2>
          <div class="staking__tvl">
            <span class="staking__tvl_text">Total $IBAT in Locked Staking</span>
            <span
              class="staking__tvl_value"
              style={{ color: "rgb(136, 209, 242)", fontWeight: "700" }}
            >
              {totalUserAmount} IBAT
            </span>
          </div>
        </div>
        {/* <div className="my-4">
          <h4 className="fw-bold">LOCKED STAKING</h4>

          <p className="fs-5 p-0">Total $IBAT in Flexible Staking</p>
          <p className="fs-5 text-info p-0">605,472,665.394 IBAT</p>
        </div> */}
        <Lockestake setShoww={setShoww}  />
      </TabPanel>
    </Box>
  );
}
