import React from 'react'
import style from './create.module.css'
import { Link } from 'react-router-dom';
const Main_page = () => {
  
  return (
    <div id={style.Cbody}>
      <section id={style.map_cont}>
        <div id={style.wlcm} ><h1><u>W</u></h1><h4>elcome</h4></div>
        <div id={style.UpBtn} >

        <Link  className={style.lnk} to='/login' ><button className={style.Cbutton}>Log In</button></Link>
        </div>
        <div id={style.DwnBtn} >
        </div>
      </section>
    </div>
  );
};
export default Main_page;
