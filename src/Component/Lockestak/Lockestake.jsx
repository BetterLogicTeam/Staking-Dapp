import React from 'react'
import "./Lockestake.css"

function Lockestake() {
    return (
        <div className='container-fluid p-0'>
            <div className="row justify-content-center">
                <div className="col-lg-5 all_main p-0">
                    <div className="fsst_heading text-center">Stake IBAT</div>

                    <div className="first_box mt-4  px-2">
                        <div className="munt_box d-flex justify-content-between">
                            <span className=''>Amount</span>
                            <p className='my_balnc '><span> ~My balance:</span> <span>0.000 </span></p>
                        </div>
                        <div className='typ_area border'>
                            <div className='mx_buttn str_tp_dollar text-cenetr'>$IBAT</div>
                            <input className='ariia' type="text" inputMode='decimal' placeholder='0' autoComplete='off' autoCorrect='off' aria-aria-valuemin="0" aria-valuemax="9007199254740991" />
                            <button type='button' className='mx_buttn text-white'>Max</button>
                        </div>
                    </div>

                    <div className="second_box mt-3 px-2">
                        <p className='text-start'>Locking Time</p>
                        <div className='time_table'>
                            <div className="dan_gtr text-white">
                                <div className=" border des_tw p-0 ">
                                    <button className='btn btn-md dates'>30 Days</button>
                                    <div className="arp border-top">14% ARP</div>
                                </div>
                                <div className=" border des_tw p-0">
                                <button className='btn btn-md dates'>90 Days</button>
                                    <div className="arp border-top">17% ARP</div>
                                </div>
                                <div className=" border des_tw p-0">
                                <button className='btn btn-md dates'>180 Days</button>
                                    <div className="arp border-top">20% ARP</div>
                                </div>
                                <div className=" border des_tw p-0">
                                <button className='btn btn-md dates'>360 Days</button>
                                    <div className="arp border-top">25% ARP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className='btn btn-md lst_btnn mt-3 text-white'>Enable Staking</button>

                    <div className="last mt-4">
                        <p className='fon m-0 py-2'>Locking 0 IBAT for 1 Days</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Lockestake