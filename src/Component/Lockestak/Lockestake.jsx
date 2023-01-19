import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3";
import {
  Staking,
  Staking_Abi,
  TokenAddress,
  Token_Abi,
  ArchieMetaNFT,
  nftTokenAddress,
  nftToken_Abi
} from "../../utilies/constant";
import Connent from "../Connent/Connent";
import "./Lockestake.css";
import Countdown from "react-countdown";
import moment from "moment/moment";
import { Button, Popover } from "antd";
import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function Lockestake({ setShoww,selectedCard }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const [selectDays, setselectDays] = useState(0);
  const [getValue, setgetValue] = useState(0);
  const [Active, setActive] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [balance, setbalance] = useState(0);

  const staking_Amount = async () => {
    alert(selectedCard)
    try {
      if (selectDays == 1) {
        toast.error("Please Select Days");
        setspinner(false);
      } else {
        if (getValue == null) {
          toast.error("Please Enter Amount First!");
        } else {
          if (getValue < 100) {
            toast.error("Minimum Staking Amount 100!");
          } else {
            setspinner(true);
            let stakingContractOf = new web3.eth.Contract(Staking_Abi, Staking);
            let tokenContractOf = new web3.eth.Contract(
              nftToken_Abi,
              nftTokenAddress
            );
            let stakingValue = web3.utils.toWei(getValue);

            console.log("stakingValue", stakingValue);
            await tokenContractOf.methods.approve(Staking, stakingValue).send({
              from: acc,
            });
            toast.success("Approve Confirmed");
            await stakingContractOf.methods
              .farm(stakingValue, selectDays,selectedCard)
              .send({
                from: acc,
              });
            toast.success("Transaction Confirmed");
            setspinner(false);
          }
        }
      }
    } catch (e) {
      console.log("Error", e);
      setspinner(false);
    }
  };
  const checkBalance = async () => {
    const webSupply = new Web3(
        "https://bsc-testnet.public.blastapi.io"
    );

    let tokenContractOf = new webSupply.eth.Contract(Token_Abi, TokenAddress);
    let stakingContractOf = new webSupply.eth.Contract(Staking_Abi, Staking);

    if (acc != null) {
        let blanceOf = await tokenContractOf.methods.balanceOf(acc).call();

        blanceOf = blanceOf.slice(0, 12);
        // console.log("blanceOf", blanceOf);
        setbalance(blanceOf);

       
    }
};

useEffect(() => {
    checkBalance();
});

  return (
    <>
      {acc == null ? (
        <Connent setShoww={setShoww} />
      ) : (
        <>
          <div className="container-fluid p-0">
            <div className="row justify-content-center">
              <div className="col-lg-5 all_main p-0">
                <h3 class="staking__selector__heading">Stake IBAT</h3>

                <div className="first_box mt-4  px-2">
                  <div className="munt_box d-flex justify-content-between">
                    <span className="">Amount</span>
                    <p className="my_balnc ">
                      <span> ~My balance:</span> <span>{balance} </span>
                    </p>
                  </div>
                  <div className="typ_area border ">
                    <div className="mx_buttn str_tp_dollar text-cenetr ">
                      $IBAT
                    </div>
                    <input
                      className="ariia"
                      type="number"
                      inputMode="decimal"
                      placeholder="0"
                      autoComplete="off"
                      autoCorrect="off"
                      aria-aria-valuemin="0"
                      aria-valuemax="9007199254740991"
                      onChange={(e) => setgetValue(e.target.value)}
                      value={getValue}
                    />
                

                    <button type="button" className="mx_buttn text-white "  onClick={()=>setgetValue(balance)}>
                      Max
                    </button>
                  
                  </div>
                </div>

                <div className="second_box mt-3 px-2">
                  <p className="text-start">Locking Time</p>
                  <div className="time_table">
                    <div className="dan_gtr text-white">
                      <div
                        className=" border des_tw p-0 "
                        style={{
                          background:
                            Active == 1
                              ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                              : "rgb(24, 22, 82)",
                        }}
                      >
                        <button
                          className="btn btn-md dates"
                          onClick={() => (setselectDays(30), setActive(1))}
                        >
                          30 Days
                        </button>
                        <div className="arp border-top">14% ARP</div>
                      </div>
                      <div
                        className=" border des_tw p-0"
                        style={{
                          background:
                            Active == 2
                              ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                              : "rgb(24, 22, 82)",
                        }}
                      >
                        <button
                          className="btn btn-md dates"
                          onClick={() => (setselectDays(90), setActive(2))}
                        >
                          90 Days
                        </button>
                        <div className="arp border-top">17% ARP</div>
                      </div>
                      <div
                        className=" border des_tw p-0"
                        style={{
                          background:
                            Active == 3
                              ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                              : "rgb(24, 22, 82)",
                        }}
                      >
                        <button
                          className="btn btn-md dates"
                          onClick={() => (setselectDays(180), setActive(3))}
                        >
                          180 Days
                        </button>
                        <div className="arp border-top">20% ARP</div>
                      </div>
                      <div
                        className=" border des_tw p-0"
                        style={{
                          background:
                            Active == 4
                              ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                              : "rgb(24, 22, 82)",
                        }}
                      >
                        <button
                          className="btn btn-md dates"
                          onClick={() => (setselectDays(360), setActive(4))}
                        >
                          360 Days
                        </button>
                        <div className="arp border-top">25% ARP</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-md lst_btnn mt-3 text-white"
                  onClick={() => staking_Amount()}
                >
                  {spinner == true ? (
                    <>
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </>
                  ) : (
                    " Enable Staking"
                  )}
                </button>

                <div className="last mt-4">
                  <p className="fon m-0 py-2">
                    Locking {getValue} IBAT for {selectDays} Days
                  </p>
                </div>
              </div>
            </div>

         
          </div>
        </>
      )}
    </>
  );
}

export default Lockestake;
