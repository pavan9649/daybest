import React, { useState } from 'react'
import "./FlightPlan.css"
import { Link } from 'react-router-dom'

// images
import calendar from "../../../images/Calendar.png"
import edit from "../../../images/Edit.png"
import add from "../../../images/Add.png"
import axios from 'axios'


export const FlightPlan = () => {

    const [date, setDate] = useState()

    const [allDetails, setAllDetails] = useState();

    const [crewName, setCrewName] = useState("")
    const [rIncharge, setRIncharge] = useState("")
    const [fsuper, setFsuper] = useState("")
    const [pilotName, setPilotName] = useState("")
    const [crewId, setCrewId] = useState("")
    const [dest, setDest] = useState("")
    const [fSuperId, setFSuperId] = useState("")
    const [pilotId, setPilotId] = useState("")
    const [uin, setUin] = useState("")
    const [mobile, setMobile] = useState("")
    const [authBy, setauthBy] = useState("")


    const options = {
        headers: { "Content-Type": "application/json", 'x-auth-token': localStorage.getItem("token") }
    }
    // console.log(header)
    const onChange = (e) => {
        setDate(e.target.value)
    }

    const submitDate = () => {
        axios.post('/operation_Log/Find_Details', {
            "Date": date,
            "User_Id": localStorage.getItem("User_Id")
        }, options)
            .then((response) => {
                setAllDetails(response.data)
                setCrewName(response.data.Crew_name)
                setRIncharge(response.data.Raider_Incharge_name)
                setFsuper(response.data.Flight_Supervisor)
                setPilotName(response.data.Pilot_name)
                setCrewId(response.data.Crew_id)
                setDest(response.data.Designation)
                setFSuperId(response.data.Flight_Supervisor_id)
                setPilotId(response.data.Pilot_id)
                setUin(response.data.Uin_DAN)
                setMobile(response.data.Mobile_Number)
                setauthBy(response.data.Authorized_By)
            })
            .catch((error) => {
                alert("Data Not found for Particular Date. Please Select Valid date")
            });
    }

    // console.log(date)
    // console.log(allDetails)

    return (
        <>
            <div className='fp-topbox'>
                <div>
                    <h4 className='fp-heading'>Operation Log for Bihar Excise</h4>
                </div>
                <div className='my-flex'>
                    <button className='my-flex'>
                        <img className='editimg' src={edit} alt="" />
                        <p>Edit Detail</p>
                    </button>
                    <Link className='my-flex' to="/flightplan/adddetails">
                        <img className='editimg' src={add} alt="" />
                        <p>Add Detail</p>
                    </Link>
                </div>
            </div>

            <div className="fp-crewdata row">
                <div className="col-md-4 first">
                    <div className='fp-cd-flex mydate'>
                        <input type="date" data-date-inline-picker="true" name="myDate" onChange={onChange} />
                        <button type='submit' onClick={submitDate}><img className='calendarimg' src={calendar} alt="calendar" /></button>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Crew Name</b>
                        <span>: <input type="text" value={crewName} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Raider In-charge Name </b>
                        <span>: <input type="text" value={rIncharge} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Flight Supervisor</b>
                        <span>: <input type="text" value={fsuper} /></span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='fp-cd-flex'>
                        <b>Pilot Name</b>
                        <span>: <input type="text" value={pilotName} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Crew ID</b>
                        <span>: <input type="text" value={crewId} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Designation</b>
                        <span>: <input type="text" value={dest} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Flight Supervisor ID</b>
                        <span>: <input type="text" value={fSuperId} /></span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='fp-cd-flex'>
                        <b>Pilot ID</b>
                        <span>: <input type="text" value={pilotId} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>UIN/DAN</b>
                        <span>: <input type="text" value={uin} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Mobile</b>
                        <span>: <input type="text" value={mobile} /></span>
                    </div>
                    <div className='fp-cd-flex'>
                        <b>Authorized by</b>
                        <span>: <input type="text" value={authBy} /></span>
                    </div>
                </div>

            </div>

            <div className='fplan-table'>
                <table className='fptable'>
                    <thead>
                        <tr className='table-head'>
                            <th className='start'>Flight Log No.</th>
                            <th>Drone ID</th>
                            <th>Payload Type</th>
                            <th>Take Off Site (Lat- Long)</th>
                            <th>Operation Start Time</th>
                            <th>Operation End Time</th>
                            <th>Distance Covered</th>
                            <th>Duration </th>
                            <th className='end'>Remarks</th>
                        </tr>
                    </thead>
                    {allDetails &&
                        <tbody>
                            {
                                allDetails.Flight_Details.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className='logno'>{val.Flight_Log_NO}</td>
                                            <td>{val.Drone_Id}</td>
                                            <td>{val.Payload_Type}</td>
                                            <td>{val.Take_Off_site}</td>
                                            <td>{val.Operation_Start_Time}</td>
                                            <td>{val.Operation_End_Time} </td>
                                            <td>{val.Distance_Covered} </td>
                                            <td>{val.Duration} </td>
                                            <td>{val.Remarks} </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    }
                </table>
            </div>
        </>
    )
}
