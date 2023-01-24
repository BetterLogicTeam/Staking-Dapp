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
  nftToken_Abi,
  ArchieMetaNFT_Abi,
  tokenStaking,
  tokenStaking_Abi,
} from "../../utilies/constant";
import Connent from "../Connent/Connent";
import "./Lockestake.css";
import Countdown from "react-countdown";
import moment from "moment/moment";
import { Button, Popover } from "antd";
import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

function Lockestake({ setShoww, check }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const [selectDays, setselectDays] = useState(0);
  const [getValue, setgetValue] = useState(0);
  const [Active, setActive] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [balance, setbalance] = useState(0);
  const [selectedCard, setselectedCard] = useState(null);
  const [cradShow, setcradShow] = useState([]);
  const [stakeddata, setstakeddata] = useState();
  const [cardIndex, setcardIndex] = useState([]);

  const staking_Amount = async () => {
    try {
      if (selectDays == 1) {
        toast.error("Please Select Days");
        setspinner(false);
      } else {
        if (getValue == null) {
          toast.error("Please Enter Amount First!");
          setspinner(false);
        } else {
          if (getValue < 100) {
            toast.error("Minimum Staking Amount 100!");
            setspinner(false);
          } else {
            if (acc == null) {
              toast.error("Please Connect Metamaske First!");
              setShoww(true);
            } else {
              setspinner(true);
              let stakingContractOf;
              let tokenContractOf;
              if (check == "one") {
                stakingContractOf = new web3.eth.Contract(
                  tokenStaking_Abi,
                  tokenStaking
                );
                tokenContractOf = new web3.eth.Contract(
                  Token_Abi,
                  TokenAddress
                );
              } else {
                stakingContractOf = new web3.eth.Contract(Staking_Abi, Staking);
                tokenContractOf = new web3.eth.Contract(
                 Token_Abi,
                  TokenAddress
                );
              }

              let stakingValue = web3.utils.toWei(getValue);

              console.log("stakingValue", stakingValue);

              if (check == "one") {
                await tokenContractOf.methods
                  .approve(tokenStaking, stakingValue)
                  .send({
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
              } else {
                if (selectedCard == null) {
                  toast.error("Please Select NFT First!");
                  setspinner(false);
                } else {
                  let min_Select = await stakingContractOf.methods
                    .minimumNFT()
                    .call();

                  let max_Select = await stakingContractOf.methods
                    .maximumNFT()
                    .call();

                  if (min_Select > cardIndex.length) {
                    toast.error(`Select Minimum NFT ${min_Select}`);
                    setspinner(false);
                  } else {
                    if (max_Select <cardIndex.length) {
                      toast.error(`Maximum NFT ${max_Select}`);

                      setspinner(false);
                    } else {
                      await tokenContractOf.methods
                        .approve(Staking, stakingValue)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed");
                      console.log("cardIndex",cardIndex);
                      await stakingContractOf.methods
                        .farm(stakingValue, selectDays, cardIndex)
                        .send({
                          from: acc,
                        });
                      toast.success("Transaction Confirmed");
                      setspinner(false);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.log("Error", e);
      setspinner(false);
    }
  };
  const checkBalance = async () => {
    const webSupply = new Web3("https://bsc-testnet.public.blastapi.io");

    let tokenContractOf = new webSupply.eth.Contract(Token_Abi, TokenAddress);
    let stakingContractOf = new webSupply.eth.Contract(
      tokenStaking_Abi,
      tokenStaking
    );

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

  const SelectedCard = async (id) => {
    try {
      let change_Color = document.getElementById(id);
      // console.log("change_Color",change_Color);
      change_Color.style.border = `5px solid rgb(56, 195, 207)`;
      change_Color.style.borderRadius = "35px";
      let check = [...cardIndex, id];
      let array_Length=check.length


      console.log("checkcheck", array_Length);
      check = check.map(Number);


      setcardIndex(check);

      setselectedCard(id);
    } catch (e) {
      console.log("Error while Selected Card", e);
    }
  };

  const TotalAmount = async () => {
    try {
      const webSupply = new Web3("https://bsc-testnet.public.blastapi.io");
      let stakingContractOf = new webSupply.eth.Contract(Staking_Abi, Staking);
      let nFTContractOf = new webSupply.eth.Contract(
        ArchieMetaNFT_Abi,
        ArchieMetaNFT
      );

      let array = [];
      if (acc != null) {
        let UserNFTs = await nFTContractOf.methods.walletOfOwner(acc).call();

        let UserNFTs_Length = UserNFTs.length;
        // console.log("UserNFTs", UserNFTs_Length);
        for (let i = 0; i < UserNFTs_Length; i++) {
          let nftLink = await axios.get(
            `https://teal-high-elephant-254.mypinata.cloud/ipfs/QmRN9mG46UtACjCmtwjnqz2pmDei2tUP6zB23NpFw8wk8C/${
              UserNFTs[i + 1]
            }.png`
          );
          let isNFTStaked = await stakingContractOf.methods
            .isNFTStaked(i)
            .call();

          if (isNFTStaked == true) {
            setstakeddata(i);
          }
          let imgurl = nftLink.config.url;
          // console.log("nftLink", nftLink.config.url);
          array = [
            ...array,
            { imgurl: imgurl, tokenid: UserNFTs[i], selecteddata: isNFTStaked },
          ];
          setcradShow(array);
        }
      }
    } catch (e) {
      console.log("error While calling function", e);
    }
  };

  useEffect(() => {
    TotalAmount();
  }, [acc]);

  return (
    <>
      {check == "one" ? (
        <>
          {/* {acc == null ? (
            <Connent setShoww={setShoww} />
          ) : ( */}
          <>
            <div className="container-fluid p-0  mt-5">
              <div className="row justify-content-center">
                <div className="col-lg-5 all_main p-0">
                  <h3 class="staking__selector__heading">Stake Archie</h3>

                  <div className="first_box mt-4  px-2">
                    <div className="munt_box d-flex justify-content-between">
                      <span className="">Amount</span>
                      <p className="my_balnc ">
                        <span> ~My balance:</span> <span>{balance} </span>
                      </p>
                    </div>
                    <div className="typ_area border ">
                      <div className="mx_buttn str_tp_dollar text-cenetr ">
                        $Archie
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

                      <button
                        type="button"
                        className="mx_buttn text-white "
                        onClick={() => setgetValue(balance)}
                      >
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
                      Locking {getValue} Archie for {selectDays} Days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
          {/* // )} */}
        </>
      ) : (
        <>
          <div className="container">
            <div className="row">
              {cradShow?.map((items, index) => {
                // console.log("items",items);
                return (
                  <>
                    <div className="col-lg-3 mt-3">
                      <div
                        className={
                          items.selecteddata == true
                            ? "contain game-item disabled"
                            : "game-item"
                        }
                        disabled={true}
                        // class="game-item contain"
                        style={{
                         
                          cursor:
                            items.selecteddata == true ? "default" : "pointer",
                        }}
                        id={index}
                        onClick={() => SelectedCard(index)}
                      >
                        <div class="game-inner">
                          <div class="game-item__thumb">
                            <img
                              src={items.imgurl}
                              alt="game"
                              style={{ zIndex: "100000" }}
                              className="image"
                            />
                            <div class="middle">
                              <div class="text">Staked</div>
                            </div>
                            <div class="game-item__content">
                              <h4 class="title">{items.tokenid}</h4>
                            </div>
                          </div>
                        </div>
                        <div class="mask"> </div>
                        <div class="ball"> </div>
                      </div>
                      {/* <img src={items} alt="" width="100%" className="border" /> */}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          {/* {acc == null ? (
            <Connent setShoww={setShoww} />
          ) : ( */}
          <>
            <div className="container-fluid p-0  mt-5">
              <div className="row justify-content-center">
                <div className="col-lg-5 all_main p-0">
                  <h3 class="staking__selector__heading">Stake Archie</h3>

                  <div className="first_box mt-4  px-2">
                    <div className="munt_box d-flex justify-content-between">
                      <span className="">Amount</span>
                      <p className="my_balnc ">
                        <span> ~My balance:</span> <span>{balance} </span>
                      </p>
                    </div>
                    <div className="typ_area border ">
                      <div className="mx_buttn str_tp_dollar text-cenetr ">
                        $Archie
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

                      <button
                        type="button"
                        className="mx_buttn text-white "
                        onClick={() => setgetValue(balance)}
                      >
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
                      Locking {getValue} Archie for {selectDays} Days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
          {/* )} */}
        </>
      )}
    </>
  );
}

export default Lockestake;
