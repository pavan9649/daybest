import React, { useState, Fragment } from 'react'
import "./FlightPlan.css"
import { Link } from 'react-router-dom'

// images
import edit from "../../../images/Edit.png"
import add from "../../../images/Add.png"
import axios from 'axios'
import { ReadOnlyRow } from './Comp/ReadOnlyRow'
import { EditableRow } from './Comp/EditableRow'


export const FlightPlan = () => {

    const [date, setDate] = useState()
    const [allDetails, setAllDetails] = useState();

    const [District, setDistrict] = useState("")
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
    
    const [dataEdit, setDataEdit] = useState(false)

    const editData = () => {
        setDataEdit(true)
    }

    const editData2 = () => {
        setDataEdit(!dataEdit)
    }

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
                setDistrict(response.data.District)
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
                // console.log(error)
                console.log("Data Not found for Particular Date. Please Select Valid date")
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
                    <button className='my-flex' onClick={editData}>
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
                <div className='fp-cd-flex mydate'>
                    <input type="date" data-date-inline-picker="true" name="myDate" onChange={onChange} onSelect={submitDate} />
                    {/* <button type='submit'><img className='calendarimg' src={calendar} alt="calendar" /></button> */}
                </div>


                <Fragment>
                    {
                        dataEdit ?
                            <EditableRow
                                date ={date}
                                District={District}
                                crewName={crewName}
                                rIncharge={rIncharge}
                                fsuper={fsuper}
                                pilotName={pilotName}
                                crewId={crewId}
                                dest={dest}
                                fSuperId={fSuperId}
                                pilotId={pilotId}
                                uin={uin}
                                mobile={mobile}
                                authBy={authBy}
                                editData2 = {editData2} 
                                submitDate={submitDate}
                                />

                            : <ReadOnlyRow
                                District={District}
                                crewName={crewName}
                                rIncharge={rIncharge}
                                fsuper={fsuper}
                                pilotName={pilotName}
                                crewId={crewId}
                                dest={dest}
                                fSuperId={fSuperId}
                                pilotId={pilotId}
                                uin={uin}
                                mobile={mobile}
                                authBy={authBy}
                            />
                    }


                </Fragment>

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
                            <th>Remarks</th>
                            { <th className='end'>Attached File</th> }
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
                                            { <td id="img"><a href={val.Image} >Click here</a></td> }
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
