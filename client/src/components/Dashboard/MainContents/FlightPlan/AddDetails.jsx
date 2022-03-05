import React from 'react';
import "./AddDetails.css";
import { useState } from 'react';
import axios from 'axios';

const options = {
  headers: { "Content-Type": "application/json", 'x-auth-token': localStorage.getItem("token") }
}

export const AddDetails = () => {

  // const [images,setImages] = useState([]);

  const userTemplate = {
    Flight_Log_NO: "",
    Drone_Id: "",
    Payload_Type: "",
    Take_Off_site: "",
    Operation_Start_Time: "",
    Operation_End_Time: "",
    Distance_Covered: "",
    Duration: "",
    Remarks: "",
  };

  const [users, setUsers] = useState([userTemplate])

  // add new row
  const addUser = () => {
    setUsers([...users, userTemplate])
  }


  const onChange = (e, index) => {
    const updatedUsers = users.map((user, i) => index === i
      ? Object.assign(user, { [e.target.name]: e.target.value })
      : user
    );
    setUsers(updatedUsers);
  }

  /*const imageHandler = (e) => {
    console.log(e.target.files[0]);
    setImages(e.target.files[0])
  }*/

  const [data, setData] = useState({
    date: "",
     District: "",
    crewName: "",
    rIncharge: "",
    fSupervisor: "",
    pilotName: "",
    crewID: "",
    destination: "",
    fSuperID: "",
    pilotID: "",
    uin: "",
    mobileNum: "",
    authBy: ""
  })

  const inputEvent = (event) => {
    const { value, name } = event.target;

    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      }
    })
  }


  const onSubmit = (event) => {
    event.preventDefault();
    
    axios.post("/operation_Log/Add_Details",
      {
        User_Id: localStorage.getItem("User_Id"),
        Date: data.date,
        District:data.District,
        Crew_name: data.crewName,
        Raider_Incharge_name: data.rIncharge,
        Flight_Supervisor: data.fSupervisor,
        Pilot_name: data.pilotName,
        Crew_id: data.crewID,
        Designation: data.destination,
        Flight_Supervisor_id: data.fSuperID,
        Pilot_id: data.pilotID,
        Uin_DAN: data.uin,
        Mobile_Number: data.mobileNum,
        Authorized_By: data.authBy,
        Flight_Details: users
      }, options
    ).then((response) => {
      console.log(response.data)
      alert("Form Submitted");
    })
  }
  


  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div className='fp-topbox'>
            <h4 className='fp-heading'>Operation Log for Bihar Excise</h4>
            <button className='logout-btn adetail-submit' type='submit'>Save</button>
          </div>

          <div className="fp-crewdata row">
            <h4 className='fp-heading'>Add Details</h4>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="date"
                  placeholder='Date'
                  className='adetail-input'
                  name="date"
                  value={data.date}
                  onChange={inputEvent}
                  required
                />
                <input
                  type="text"
                  placeholder='District'
                  className='adetail-input'
                  name="District"
                  value={data.District}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Crew Name'
                  className='adetail-input'
                  name="crewName"
                  value={data.crewName}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Raider In-charge Name '
                  className='adetail-input'
                  name="rIncharge"
                  value={data.rIncharge}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Flight Supervisor'
                  className='adetail-input'
                  name="fSupervisor"
                  value={data.fSupervisor}
                  onChange={inputEvent}
                  required
                />

              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder='Pilot Name'
                  className='adetail-input'
                  name="pilotName"
                  value={data.pilotName}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Crew ID'
                  className='adetail-input'
                  name="crewID"
                  value={data.crewID}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Designation'
                  className='adetail-input'
                  name="destination"
                  value={data.destination}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Flight Supervisor ID'
                  className='adetail-input'
                  name="fSuperID"
                  value={data.fSuperID}
                  onChange={inputEvent}
                  required
                />

              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder='Pilot ID'
                  className='adetail-input'
                  name="pilotID"
                  value={data.pilotID}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='UIN/DAN '
                  className='adetail-input'
                  name="uin"
                  value={data.uin}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Mobile Number'
                  className='adetail-input'
                  name="mobileNum"
                  value={data.mobileNum}
                  onChange={inputEvent}
                  required
                />

                <input
                  type="text"
                  placeholder='Authorized by'
                  className='adetail-input'
                  name="authBy"
                  value={data.authBy}
                  onChange={inputEvent}
                  required
                />

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
                  <th>Take Off Site (Lat-Long)</th>
                  <th>Operation Start Time</th>
                  <th>Operation End Time</th>
                  <th>Distance Covered</th>
                  <th>Duration </th>
                  <th>Remarks</th>
                  {/* <th className='end'>Attach File</th> */}
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user, index) => (
                    <tr key={index}>
                      <td className='logno'><input className='tab-inp' type="text" name='Flight_Log_NO' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="text" name='Drone_Id' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="text" name='Payload_Type' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="text" name='Take_Off_site' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="time" name='Operation_Start_Time' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="time" name='Operation_End_Time' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="text" name='Distance_Covered' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="text" name='Duration' onChange={e => onChange(e, index)} required /></td>
                      <td><input className='tab-inp' type="text" name='Remarks' onChange={e => onChange(e, index)} required /></td>
                      {/* <td><input className='tab-inp' type="file" name='Files' onChange={imageHandler} required multiple/></td> */}
                    </tr>
                  ))
                }
              </tbody>
            </table>

            <button type="button" class="btn btn-primary me-3 m-5" onClick={addUser} ><b> Add More &#8897; </b></button>
          </div>
        </form>
      </div>
    </>
  )
}
