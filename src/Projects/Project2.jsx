import style from "./project2.module.css";
import { useState } from "react";
import enter from '../assets/enter.png'
import hide from '../assets/hide.png'
import view from '../assets/view.png'

const Log_in2 = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    perror: "",
    emerror: "",
    pwdType:"password"
  });
  // *-------------------------------------------

  const formSubmit = (eve) => {
    console.log(eve);
    if (state.email === "" || state.password === "") {
      eve.preventDefault();
      if (state.email === "") {
        setState((prevState) => ({
          ...prevState,
          emerror: "ⓘ Email required",
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
  const emailEvent = (eve) => {
    setState({
      ...state,
      email: eve.target.value,
      emerror: null,
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
  const show=()=>{
    setState((prevState) => ({
      ...prevState,
      pwdType: prevState.pwdType ==="password"?"text":"password"

    }))
  }
  return (
    <div>
      <section className={style.main_container}>
        <div id={style.log}><img id={style.LogIcon} src={enter} alt="" /><h1>Log In</h1></div>
        <article className={style.container}>
        <form className={style.form} onSubmit={formSubmit}>
          <div id={style.eCont}>
        
            <input
              type="email"
              placeholder="Email"
              name="email"
              id={style.email}
              onChange={emailEvent}
            />
            
          </div>
          <div id={style.eErCont}>
            <p id={style.emerror}>{state.emerror}</p>
          </div>

          <div id={style.pCont}>
        
            <input
              type={state.pwdType}
              placeholder="Password"
              name="pwd"
              id={style.pass}
              onChange={pwdEvent}
            />
            <section id={style.show} onClick={show}>{state.pwdType==="password"?<img id={style.pwdVisibility} src={view} alt="" />: <img id={style.pwdVisibility} src={hide} alt="" />}</section>


          </div>
          <div id={style.pErCont}>
          <p id={style.perror}>{state?.perror}</p> 
          </div>

          <button id={style.submit}>Log In</button>
        </form>
        </article>
      </section>
    </div>
  );
};
export default Log_in2;
