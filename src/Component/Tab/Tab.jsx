import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Flexible from '../Flexible/Flexible';
import Lockestake from '../Lockestak/Lockestake';
import Flextabs from "../Flextabs/Flextabs";
import Connent from '../Connent/Connent';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="text-light">
      <Box sx={{ }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='tab-css'centered>
          <Tab className="text-light mak_flxx_bttn" label="Flexible" {...a11yProps(0)} />
          <Tab className="text-light mak_flxx_bttn" label="Locked" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* <Flexible/> */}
        <div className="my-4">
<h4 className="fw-bold">FLEXIBLE STAKING</h4>
<h5 className="">APY: <span className='text-info'>12%</span></h5>
<p className="fs-5">Total $IBAT in Flexible Staking</p>
<p className="fs-5  text-info">605,472,665.394 IBAT</p>
          </div>
        <Flextabs/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="my-4">
<h4 className="fw-bold">LOCKED STAKING</h4>

<p className="fs-5 p-0">Total $IBAT in Flexible Staking</p>
<p className="fs-5 text-info p-0">605,472,665.394 IBAT</p>
          </div>
        <Lockestake/>
        <Connent/>
     
      </TabPanel>
      
    </Box>
  );
}