import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3";
import {
  Staking,
  Staking_Abi,
  TokenAddress,
  Token_Abi,
} from "../../utilies/constant";
import Connent from "../Connent/Connent";
import "./Lockestake.css";

function Lockestake({ setShoww }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const [selectDays, setselectDays] = useState(1);
  const [getValue, setgetValue] = useState();
  const [Active, setActive] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [balance, setbalance] = useState(0);
  const [UserInformationStak, setUserInformationStak] = useState();

  const staking_Amount = async () => {
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
              Token_Abi,
              TokenAddress
            );
            let stakingValue = web3.utils.toWei(getValue);

            console.log("stakingValue", stakingValue);
            await tokenContractOf.methods.approve(Staking, stakingValue).send({
              from: acc,
            });
            toast.success("Approve Confirmed");
            await stakingContractOf.methods
              .farm(stakingValue, selectDays)
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
      "https://data-seed-prebsc-1-s1.binance.org:8545"
    );

    let tokenContractOf = new webSupply.eth.Contract(Token_Abi, TokenAddress);
    let stakingContractOf = new webSupply.eth.Contract(Staking_Abi, Staking);

    if (acc != null) {
      let blanceOf = await tokenContractOf.methods.balanceOf(acc).call();

      blanceOf = blanceOf.slice(0, 8);
      console.log("blanceOf", blanceOf);
      setbalance(blanceOf);

      let UserInformation = await stakingContractOf.methods
        .UserInformation(acc)
        .call();

        let array1=UserInformation[0]
        let array2=UserInformation[1]
        let array3=UserInformation[2]

        let newarray= array1.concat(array2)

      console.log("UserInformation",newarray);
      setUserInformationStak(UserInformation[0]);
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
                  <div className="typ_area border">
                    <div className="mx_buttn str_tp_dollar text-cenetr">
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
                    />
                    <button type="button" className="mx_buttn text-white">
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
                    Locking 0 IBAT for {selectDays} Days
                  </p>
                </div>
              </div>
            </div>

            <table class="table mt-5 text-white table-striped">
              <thead>
                <tr>
                  <th scope="col">Address</th>
                  <th scope="col">Stak Amount</th>
                  <th scope="col">Staking Time</th>
                  <th scope="col">Unstaking Time</th>
                  <th scope="col">Unstaking</th>
                </tr>
              </thead>
              <tbody>
                {UserInformationStak?.map((items, index) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default Lockestake;
