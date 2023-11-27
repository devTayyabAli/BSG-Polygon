import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import m1 from "../Assets/m1.png"
import { MdArrowBackIos } from 'react-icons/md'
import "./Withdraw_m.css"
import ReactLoading from 'react-loading';
import { financeAppContractAddress, financeAppContract_Abi } from '../../utilies/Contract';
import { loadWeb3 } from '../../apis/api';
import { toast } from 'react-toastify';


function Withdraw_m(props) {
    const [modalShow1, setModalShow1] = React.useState(false);
    const [available_withdraw, setAvailableWithdraw] = React.useState(0);
    const [rewardinfo, setRewardInfo] = React.useState({});
    const getDetail = async () => {

        let acc = await loadWeb3();

        if (acc == "No Wallet") {
            // toast.error("No Wallet Connected")
        }
        else if (acc == "Wrong Network") {
            // toast.error("Wrong Newtwork please connect to Polygon Mainnet  ")

        } else {
            try {
                let obj = {}
                const web3 = window.web3;
                let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);


                let reward_info = await financeAppcontractOf.methods.rewardInfo(acc).call();
                
                let capitals = web3.utils.fromWei(reward_info.capitals)
                let reward_info_static = reward_info.statics
                let freez1 = (parseInt(web3.utils.fromWei(reward_info_static)) * 25 / 100)
                let freez2 = (parseInt(web3.utils.fromWei(reward_info.directs)) + parseInt(web3.utils.fromWei(reward_info.level4Released)) + parseInt(web3.utils.fromWei(reward_info.level5Released)) + parseInt(web3.utils.fromWei(reward_info.luck)) + parseInt(web3.utils.fromWei(reward_info.top))) * 25 / 100
                let all_val = (parseInt(web3.utils.fromWei(reward_info.directs)) + parseInt(web3.utils.fromWei(reward_info.level4Released)) + parseInt(web3.utils.fromWei(reward_info.level5Released)) + parseInt(web3.utils.fromWei(reward_info.luck)) + parseInt(web3.utils.fromWei(reward_info.top)))
                all_val = all_val * 75 / 100
              

                reward_info_static = web3.utils.fromWei(reward_info_static) * 75 / 100
                let avail_withdrw = (reward_info_static + all_val)
                avail_withdrw = parseInt(capitals) + parseInt(avail_withdrw)
                setAvailableWithdraw(Number(avail_withdrw).toFixed(2))

            


                obj['directs'] = web3.utils.fromWei(reward_info.directs)
                obj['statics'] = Number(web3.utils.fromWei(reward_info.statics)).toFixed(2)
                obj['capitals'] = Number(reward_info_static + all_val).toFixed(2)
                obj['level4Released'] = Number(web3.utils.fromWei(reward_info.level4Released)).toFixed(2)
                obj['level5Freezed'] = Number(web3.utils.fromWei(reward_info.level5Freezed)).toFixed(2)
                obj['level4Freezed'] = Number(freez1 + freez2).toFixed(2)
                obj['luck'] = Number(web3.utils.fromWei(reward_info.luck)).toFixed(2)
                obj['star'] = Number(web3.utils.fromWei(reward_info.star)).toFixed(2)
                obj['top'] = Number(web3.utils.fromWei(reward_info.top)).toFixed(2)
                obj['unlock'] = Number(capitals).toFixed(2)

                setRewardInfo(obj)


            } catch (e) {
                console.log(e.message);
            }

        }
    }
    useEffect(() => {
        getDetail()

    }, []);

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modal_bg'>
                    {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 p-o">
                                <div className="d-flex">
                                    <div className="icons_m">
                                        <Button onClick={() => props.onHide()} className='color-black' style={{ backgroundColor: "#ffbf00", border: "1px solid #ffbf00" }}><MdArrowBackIos ></MdArrowBackIos></Button>
                                    </div>
                                    <h4 className='ms-5 modal_h4'>Withdraw</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className='body_m_bg bb'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Unlock principal</p>
                                    <p className='witddraw_p'>{rewardinfo.unlock} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Cycle reward</p>
                                    <p className='witddraw_p'>{rewardinfo.statics} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>1st level</p>
                                    <p className='witddraw_p'>{rewardinfo.capitals} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>2-4 level</p>
                                    <p className='witddraw_p'>{rewardinfo.level4Released} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>5-25 level</p>
                                    <p className='witddraw_p'>{rewardinfo.level5Freezed} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Freezing</p>
                                    <p className='witddraw_p'>{rewardinfo.level4Freezed} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Lucky reward</p>
                                    <p className='witddraw_p'>{rewardinfo.luck} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>4 star reward</p>
                                    <p className='witddraw_p'>{rewardinfo.star} DAI</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Top player reward</p>
                                    <p className='witddraw_p'>{rewardinfo.top} DAI</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer className='footer_m_bg'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between">
                                    <p className='text-white'>Available withdrawal</p>
                                    <p className='witddraw_p'>{available_withdraw} DAI</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button className='s_d_Ws  w-100' onClick={() => { props.withdrawAmount() }}>{props.loader ? <ReactLoading type="spin" color="#ffffff" className='mb-2 mx-auto' height={30} width={30} /> : "Withdraw"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Withdraw_m
