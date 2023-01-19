import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import {
  ArchieMetaNFT,
  ArchieMetaNFT_Abi,
  Staking,
  Staking_Abi,
} from "../../utilies/constant";
import Tab from "../Tab/Tab";
import "./nftStking.css";
import logo from "../../Component/Accets/V9.png";

export default function NftStaking({ setShoww }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );

  const [selectedCard, setselectedCard] = useState();
  const [cradShow, setcradShow] = useState([]);
  const [stakeddata, setstakeddata] = useState();

  const SelectedCard = async (id) => {
    try {
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
        console.log("UserNFTs", UserNFTs_Length);
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
          console.log("nftLink", nftLink.config.url);
          array = [...array, { imgurl: imgurl, tokenid: UserNFTs[i] }];
          setcradShow(array);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    TotalAmount();
  }, [acc]);

  return (
    <div>
      <div className="container">
        <div className="row">
          {cradShow?.map((items, index) => {
            return (
              <>
                <div
                  className="col-lg-3 mt-3"
                  onClick={() => SelectedCard(index)}
                >
                  <div
                  // className={stakeddata==index ? "overlay game-item":"game-item"}
                    class="game-item contain"
                    style={{
                      border:
                      selectedCard == index
                      ? "5px solid rgb(56, 195, 207)"
                      : "none",
                      border: stakeddata == index ? "10px solid red" : "none",
                    }}
                  >
                    <div class="game-inner">
                      <div class="game-item__thumb">
                        <img
                          src={items.imgurl}
                          alt="game"
                          style={{ zIndex: "100000" }}
                        />
                        <div class="game-item__content">
                          <h4 class="title">{items.tokenid}</h4>
                        </div>
                      </div>
                    </div>
                    <div class="mask"> </div>
                    <div class="ball"> </div>
                  <div
                  className="middle"
                  //  className={stakeddata==index ? "middle":""} 
                   style={{ display: stakeddata == index ? "block" : "none",}}>This NFt is stake</div>

                  </div>
                  {/* <img src={items} alt="" width="100%" className="border" /> */}
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="container">
        <div className="row  text-white">
          <div className="text-center m-auto">
            <Tab setShoww={setShoww} selectedCard={selectedCard} />
          </div>
        </div>
      </div>
    </div>
  );
}
