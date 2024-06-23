import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import axios from "axios";
import enter from "../../assets/enter.png";
import hide from "../../assets/hide.png";
import view from "../../assets/view.png";
import {useNavigate } from "react-router-dom";

const Log_in = () => {
  const [filled, setFilled] = useState(false);
  const [state, setState] = useState({
    username: "",
    password: "",

    perror: "",
    userror: "",
    notAtho: "",

    pwdType: "password",
  });


  useEffect(() => {
    if (state.username!=="" && state.password!=="") {
      setFilled(true);
      }
      else{
      setFilled(false);

    }
  }, [state]);

  const nav_dash = useNavigate();

  // *-------------LogIn process------------------------------
  const postData = (e) => {
    e.preventDefault();
    axios
      .post("http://122.165.75.213:8000/adminlogin/", {
        username: state.username,
        password: state.password,
      })
      .then((Response) => {
        localStorage.setItem("token", Response.data.session.token);
        console.log(Response);
        nav_dash("/sidebar");
      })
      .catch((error) => {
        localStorage.clear();
        setState(() => ({
          ...state,
          notAtho: `ⓘ ${error.response.data.status.message}`,
        }));
      });
  };
  // *-------------------------------------------

  const formSubmit = (eve) => {
    if (state.username === "" || state.password === "") {
      eve.preventDefault();
      if (state.username === "") {
        setState((prevState) => ({
          ...prevState,
          userror: "ⓘ Username required",
        }));
      }

      if (state.password === "") {
        setState((prevState) => ({
          ...prevState,
          perror: "ⓘ Password required",
        }));
      }
    }
  };
  // *-------------------------------------------
  const userEvent = (eve) => {
    setState({
      ...state,
      username: eve.target.value,
      userror: null,
    });
  };
  // *-------------------------------------------
  const pwdEvent = (eve) => {
    setState({
      ...state,
      password: eve.target.value,
      perror: null,
    });
  };
  // *-------------------------------------------
  const show = () => {
    setState((prevState) => ({
      ...prevState,
      pwdType: prevState.pwdType === "password" ? "text" : "password",
    }));
  };
  return (
    <div id={style.Lbody}>
      <section className={style.main_container}>
        <div id={style.log}>
          <img id={style.LogIcon} src={enter} alt="" />
          <h1>Log In</h1>
        </div>
        <article className={style.container}>
          <form className={style.form} onSubmit={postData}>
            <div id={style.eCont}>
              {/* // *--------------username input area-------------* //   */}

              <label htmlFor="username">Username</label>
              <br />
              <div
                id={style.inputUser}
                className={
                  [null, ""].includes(state.userror) ? null : style.userBox
                }
              >
                <input
                  type="text"
                  name="username"
                  id={style.username}
                  onChange={userEvent}
                />
              </div>
            </div>
            <div id={style.uErCont}>
              <p id={style.userror}>{state.userror}</p>
            </div>

            <div id={style.pCont}>
              {/* // *--------------pwd input area-------------* //   */}
              <label htmlFor="pass">Password</label>
              <br />
              <div
                id={style.inputShow}
                className={
                  [null, ""].includes(state.perror) ? null : style.passBox
                }
              >
                <input
                  type={state.pwdType}
                  name="pwd"
                  id={style.pass}
                  onChange={pwdEvent}
                />
                <section id={style.show} onClick={show}>
                  {state.pwdType === "password" ? (
                    <img id={style.pwdVisibility} src={view} alt="" />
                  ) : (
                    <img id={style.pwdVisibility} src={hide} alt="" />
                  )}
                </section>
              </div>
            </div>
            <div id={style.pErCont}>
              <p id={style.perror}>{state?.perror}</p>
            </div>

            <button
              disabled={!filled}
              id={filled ? style.submit : style.subFade}
              onClick={formSubmit}
            >
              Log In
            </button>
            {/* // *--------------invalid athorization-------------* //   */}
            <div id={style.notAtho}>
              <p>{state.notAtho}</p>
            </div>
          </form>
        </article>
      </section>
    </div>
  );
};
export default Log_in;
