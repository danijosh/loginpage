import React, { useEffect, useState } from "react";
import style from "./signup.module.css";
import axios from "axios";
import add from "../../assets/add.png";
import hide from "../../assets/hide.png";
import view from "../../assets/view.png";
import { useNavigate } from "react-router-dom";

const SignUp = ({setSignUpPop}) => {
  // * Sign up form state
  const [state, setState] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  // * Sign up error state

  const [error, setError] = useState({
    namerror: null,
    userror: null,
    perror: null,
    p2error: null,
    emerror: null,
  });

  // * Sign up pwd type state
  const [type, setType] = useState({
    pwdType: "password",
    pwd2Type: "password",
  });
  // * Sign up checkbox state
  const [isChecked, setCheck] = useState(false);

  //*
  const [ready, setReady] = useState(false);

  console.log(state, "state", error, "error");
  // *--------------------------------------- ----
  useEffect(() => {
    
    if (
      error.namerror === null &&
      error.userror === null &&
      error.perror === null &&
      error.p2error === null &&
      error.emerror === null &&
      isChecked === true
    ) {
      console.log(true);
      setReady(true);
    }
    if (
      state.full_name === "" ||
      state.email === "" ||
      state.username === "" ||
      state.password === "" ||
      state.password2 === "" ||
      isChecked === false
    ) {
      setReady(false);
    }
  }, [isChecked, state, error]);

  // *-------------------------------------------
  const nav_log = useNavigate();

  // *-------------posting Data Event------------------------------
  const postData = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(
        `http://122.165.75.213:8000/adminpanel/v1/`,
        {
          username: state.username,
          full_name: state.full_name,
          email: state.email,
          password: state.password,
          is_active: true,
          role: "Super Admin",
          location: "all",
        },
        { headers }
      )
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
    alert("account created successfully");
    setSignUpPop(false)

  };

  // *-----------form submission Event--------------------------------
  const formSubmit = (eve) => {
    if (
      state.full_name === "" ||
      state.email === "" ||
      state.username === "" ||
      state.password === "" ||
      state.password2 === ""
    ) {
      if (state.full_name === "") {
        setError((prevState) => ({
          ...prevState,
          namerror: "ⓘ Name required",
        }));
      }
      if (state.username === "") {
        setError((prevState) => ({
          ...prevState,
          userror: "ⓘ Username required",
        }));
      }
      if (state.email === "") {
        setError((prevState) => ({
          ...prevState,
          emerror: "ⓘ Email required",
        }));
      }

      if (state.password === "") {
        setError((prevState) => ({
          ...prevState,
          perror: "ⓘ Password required",
        }));
      }
      if (state.password2 === "") {
        setError((prevState) => ({
          ...prevState,
          p2error: "ⓘ Password required",
        }));
      }
    }
    // *-------------------pwd match check--------------
    if (state.password !== state.password2) {
      eve.preventDefault();
      setError((prevState) => ({
        ...prevState,
        p2error: "ⓘ password do not match",
      }));
    }
    if (isChecked === false) {
      eve.preventDefault();
    }
  };

  //*-----------------Name Event----------------------------
  const nameEvent = (eve) => {
    setState({
      ...state,
      full_name: eve.target.value,
    });
    setError({
      ...error,
      namerror: null,
    });
  };
  //*-----------------User Event----------------------------
  const userEvent = (eve) => {
    setState({
      ...state,
      username: eve.target.value,
    });
    setError({
      ...error,
      userror: null,
    });
  };
  // *----------------Email Event---------------------------
  const emailEvent = (eve) => {
    setState({
      ...state,
      email: eve.target.value,
    });
    if (
      /^[a-zA-Z0-9@#$%^&_]+@(gmail|protonmail|yahoo|tutanota)\.(com|gov|edu|org|net|info)$/.test(
        eve.target.value
      ) === true
    ) {
      setError(() => ({
        ...error,
        emerror: null,
      }));
    } else {
      setError(() => ({
        ...error,
        emerror: "Enter a valid email",
      }));
    }
  };
  // *----------------terms Event---------------------------

  const terms = () => {
    // setCheck(isChecked == false ? true : false);
    // console.log(eve.target.checked);

    isChecked === false ? setCheck(true):setCheck(false)
  };

  // *----------------pwd Event---------------------------
  const pwdEvent = (eve) => {
    setState((prevState) => ({
      ...prevState,
      password: eve.target.value,
    }));

    // *----------------pwd pattern validation---------------------------
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+!]).{8,}$/;
    if (pattern.test(eve.target.value)) {
      setError(() => ({
        ...error,
        perror: null,
      }));
    }
    // *----------------pwd length check---------------------------
    if (eve.target.value.length < 8) {
      setError(() => ({
        ...error,
        perror: "minimum 8 character",
      }));
    }
    // *----------------pwd lowercase check---------------------------
    else if (/^(?=.*[a-z])/.test(eve.target.value) === false) {
      setError(() => ({
        ...error,
        perror: "atleast one lowercase character",
      }));
    }
    // *----------------pwd uppercase check---------------------------
    else if (/^(?=.*[A-Z])/.test(eve.target.value) === false) {
      setError(() => ({
        ...error,
        perror: "atleast one uppercase character",
      }));
    }
    // *----------------pwd digit check---------------------------
    else if (/^(?=.*\d)/.test(eve.target.value) === false) {
      setError(() => ({
        ...error,
        perror: "atleast one digit character",
      }));
    }
    // *----------------pwd special character check---------------------------
    else if (/^(?=.*[@#$%^&*()_+!])/.test(eve.target.value) === false) {
      setError(() => ({
        ...error,
        perror: "atleast one special character",
      }));
    }
  };

  // *---------------pwd2 Event----------------------------
  const pwd2Event = (eve) => {
    setState((prevState) => ({
      ...prevState,
      password2: eve.target.value,
    }));
    setError((prevState) => ({
      ...prevState,
      p2error: null,
    }));
  };
  // *---------------pwd2 eye event----------------------------
  const show2 = () => {
    setType((prevType) => ({
      ...prevType,
      pwd2Type: prevType.pwd2Type === "password" ? "text" : "password",
    }));
  };
  // *--------------pwd eye Event-----------------------------

  const show = () => {
    setType((prevType) => ({
      ...prevType,
      pwdType: prevType.pwdType === "password" ? "text" : "password",
    }));
  };
  // *-------------------------------------------
  return (
    <div id={style.Sbody}>
      <button onClick={()=>setSignUpPop(false)} id={style.SignUpClose}>X</button>
      <section className={style.main_container}>
        <div id={style.log}>
          <img id={style.LogIcon} src={add} alt="" />
          <h1>Sign Up</h1>
        </div>
        <article className={style.container}>
          {/* // *--------------input area-------------* //   */}
          <form className={style.form} onSubmit={postData}>
            {/* // *--------------full_name input area-------------* //   */}
            <div className={style.label}>
              <label htmlFor="">Name</label>
            </div>
            <div className={[null,""].includes(error.namerror)  ? null : style.nameBox}>
              <input type="text" name="full_name" onChange={nameEvent} />
            </div>
            <div id={style.nErCont}>
              <p id={style.namerror}>{error.namerror}</p>
            </div>
            {/* // *--------------userName input area-------------* //   */}
            <div className={style.label}>
              <label htmlFor="">Username</label>
            </div>
            <div
              id={style.usCont}
              className={[null,""].includes(error.userror) ? null : style.userBox}
            >
              <input
                type="text"
                name="username"
                id={style.username}
                onChange={userEvent}
              />
            </div>
            <div id={style.uErCont}>
              <p id={style.userror}>{error.userror}</p>
            </div>
            {/* // *--------------email input area-------------* //   */}
            <div className={style.label}>
              <label htmlFor="">Email</label>
            </div>
            <div id={style.eCont}>
              <input
                type="email"
                name="email"
                id={style.email}
                onChange={emailEvent}
                className={[null,""].includes(error.emerror) ? null : style.email1Box}
              />
            </div>
            <div id={style.eErCont}>
              <p id={style.emerror}>{error.emerror}</p>
            </div>

            {/* // *--------------pwd input area-------------* //   */}
            <div className={style.label}>
              <label htmlFor="">Password</label>
            </div>
            <div
              id={style.pCont}
              className={[null,""].includes(error.perror) ? null : style.passBox}
            >
              <input
                type={type.pwdType}
                name="pwd"
                id={style.pass}
                onChange={pwdEvent}
              />
              <section id={style.show} onClick={show}>
                {type.pwdType === "password" ? (
                  <img id={style.pwdVisibility} src={view} alt="" />
                ) : (
                  <img id={style.pwdVisibility} src={hide} alt="" />
                )}
              </section>
            </div>
            <div id={style.pErCont}>
              <p id={style.perror}>{error.perror}</p>
            </div>

            {/* // *--------------pwd2 input area-------------* //   */}
            <div className={style.label}>
              <label htmlFor="">Confirm password</label>
            </div>
            <div
              id={style.p2Cont}
              className={[null,""].includes(error.p2error) ? null : style.pass2Box}
            >
              <input
                type={type.pwd2Type}
                name="pwd"
                id={style.pass2}
                onChange={pwd2Event}
              />
              <section id={style.show2} onClick={show2}>
                {type.pwd2Type === "password" ? (
                  <img id={style.pwd2Visibility} src={view} alt="" />
                ) : (
                  <img id={style.pwd2Visibility} src={hide} alt="" />
                )}
              </section>
            </div>
            <div id={style.p2ErCont}>
              <p id={style.p2error}>{error.p2error}</p>
            </div>

            <div className={style.checkBoxCont}>
              <section>
              <input
                id={style.checkBox}
                type="checkbox"
                name="terms"
                checked={isChecked}
                onChange={terms}
              />
              <span>I agree to terms and condition</span>
              </section>
              <br />
            </div>

            <button
              className={ready ? style.submitIn : style.submitDim}
              disabled={!ready}
              onClick={formSubmit}
            >
              Sign Up
            </button>

          </form>
        </article>
      </section>
    </div>
  );
};
export default SignUp;
