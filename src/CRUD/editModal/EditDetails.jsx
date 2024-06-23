import React, { useEffect, useState } from "react";
import style from "./editdetails.module.css";
import axios from "axios";
const EditDetails = ({ setUserData, userData,editDataPop,setEditDataPop }) => {
  const [editConfirmPop, setEditConfirmPop] = useState(false);
  const [changeCheck,setChangeCheck] = useState(userData)
  const [discardPop,setDiscardPop] =useState(false)

  // * cnfUpdate button------------------
  const cnfUpdatePop = (e) => {
    e.preventDefault();
    if (
      changeCheck.email !== userData.email ||
      changeCheck.username !== userData.username ||
      changeCheck.full_name !== userData.full_name
    ) {
      setEditConfirmPop(true);
    }
    else{
      alert("no changes")
    }
  };
  const clsSureBox = () => {
    //* this is used to cancel the sure box
    setEditConfirmPop(false);
  };
  const updatePopCls = (e) => {
    e.preventDefault()
    //*this function closing the update popUp
    if (
      changeCheck.email !== userData.email ||
      changeCheck.username !== userData.username ||
      changeCheck.full_name !== userData.full_name
      ) {
      setDiscardPop(true)
    }
    else{
      setEditDataPop(false);
    }
  };

  // * ------------new data updating functions---------
  const newName = (e) => {
    console.log(e.target.value);
    setUserData(() => ({
      ...userData,
      full_name: e.target.value,
    }));
  };

  const newUserName = (e) => {
    setUserData(() => ({
      ...userData,
      username: e.target.value,
    }));
  };

  const newEmail = (e) => {
    setUserData(() => ({
      ...userData,
      email: e.target.value,
    }));
  };
  const sureCnfEdit = () => {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .put(
        `http://122.165.75.213:8000/adminpanel/v1/${userData.id}/`,
        userData,
        { headers }
      )
      .then((Response) => {
        setEditConfirmPop(false);
        setEditDataPop(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={style.EditbgFade}>
      {/*//*this is the update details pop up */}
      <div>
        <article className={style.editDetails}>
          <form className={style.editForm}>
            <div>
              <label className={style.lab} htmlFor="">
                Name
              </label>
              <input
                onChange={newName}
                className={style.Editinput}
                type="text"
                defaultValue={userData.full_name}
              />
            </div>
            <div>
              <label className={style.lab} htmlFor="">
                Username
              </label>
              <input
                onChange={newUserName}
                className={style.Editinput}
                type="text"
                defaultValue={userData.username}
              />
            </div>
            <div>
              <label className={style.lab} htmlFor="">
                Email
              </label>
              <input
                onChange={newEmail}
                className={style.Editinput}
                type="email"
                defaultValue={userData.email}
              />
            </div>
            <div className={style.DataUpdateBtnsCont}>
              <button className={style.DataUpdateBtn} onClick={updatePopCls}>
                Close
              </button>
              <button className={style.DataUpdateBtn} onClick={cnfUpdatePop}>
                Update
              </button>
            </div>
          </form>
        </article>
      </div>
      {/*//*this is the confirm pop up */}
      {editConfirmPop && (
        <section className={style.cnfPopUpCont}>
          <div className={style.cnfPopUp}>
            <h6>Are you sure you want to update?</h6>
            <div className={style.cnfBtnsCont}>
              <button className={style.cnfBtns} onClick={clsSureBox}>
                Cancel
              </button>
              <button className={style.cnfBtns} onClick={sureCnfEdit}>
                Confirm
              </button>
            </div>
          </div>
        </section>
      )}
      {discardPop && (
        <section className={style.cnfPopUpCont}>
          <div className={style.cnfPopUp}>
            <h6>Discard update?</h6>
            <div className={style.cnfBtnsCont}>
              <button className={style.cnfBtns} onClick={()=>{
                setEditDataPop(false)
                setDiscardPop(false)
              }}>
                Yes
              </button>
              <button className={style.cnfBtns} onClick={()=>{
                setDiscardPop(false)
              }}>
                No
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EditDetails;
