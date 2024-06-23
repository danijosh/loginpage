import React from 'react'
// import style from '../dashboard/dashboard.module.css'
import style from './sidebar.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import navopen from "../../assets/navopen.png"
import menuicon from "../../assets/menuicon.png"
import dashboard from "../../assets/dashboard.png"
import admin from "../../assets/admin.png"
import group from "../../assets/group.png"
import logouticon from "../../assets/logouticon.png"
import navclose from "../../assets/navclose.png"

import dropdown from "../../assets/dropdown.png"
import dropup from "../../assets/dropup.png"
import user from "../../assets/user.png"




const SideBar = () => {

const [expandSideBar, setExpandSideBar] = useState(false);
  const [miniAdminDrop, setMiniAdminDrop] = useState(false);
  const [adminDrop, setAdminDrop] = useState(false);

    
    const [adminBg,setAdminBg]=useState()

    const menu = {
        dashboard: "DASHBOARD",
        admin: ["User", { users: "All Users" }, "Log Out"],
      };



  const editPopUp = () => {
    nav_to("/userdetails");
    
  };
  let nav_to = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav_to("/login");
  };

  const adminDropDown = () => {
    setAdminDrop(adminDrop === true ? false : true);
    setAdminBg(adminBg === true ? false : true);
  };

  return (
    <div className={style.sidebarbody}>
        <aside className={style.miniSideBar}>
        <div
          onClick={() => setExpandSideBar(true)}
          className={style.navopenicon}
        >
          <img src={navopen} alt="" />
        </div>
        <section className={style.miniMenuContainer}>
          <div>
            <img src={menuicon} alt="" />
          </div>
          <div>
            <img src={dashboard} alt="" />
          </div>

          <div>
            <img
              onClick={() =>
                miniAdminDrop ? setMiniAdminDrop(false) : setMiniAdminDrop(true)
              }
              src={admin}
              alt=""
            />
          </div>
          {miniAdminDrop && (
            <>
              <div >
                <img onClick={editPopUp} src={group} alt="" />
              </div>
            </>
          )}
        </section>
        <section className={style.miniSideBarLogout}>
          <div>
            <img onClick={logout} src={logouticon} alt="" />
          </div>
        </section>
      </aside>

      {expandSideBar && (
        <>
          <section
            id={style.navBar}
          >
            <div
              onClick={() => setExpandSideBar(false)}
              className={style.navcloseicon}
            >
              <img src={navclose} alt="" />
            </div>
            <div className={style.menuHead}>
              <h1>Menu</h1>
            </div>
            {/* //*-------------all menu------------------------ */}
            <aside className={style.sideMenu}>
              <div className={style.menuContainer}>
                <section id={style.menu}>
                  <img id={style.etrIcn} src={dashboard} alt="" />
                  <div className={style.menuAlignContainer}>
                    <p>{menu.dashboard}</p>
                  </div>
                </section>

                <section id={style.menu}>
                  <img id={style.etrIcn} src={admin} alt="" />
                  <div className={style.menuAlignContainer}>
                    <p>{menu.admin[0]}</p>
                    <img
                      onClick={adminDropDown}
                      id={style.etrIcn}
                      src={adminDrop ? dropup : dropdown}
                      alt=""
                    />
                  </div>
                </section>

                {adminDrop && (
                  <>
                    <div
                      id={style.submenu}
                      onClick={editPopUp}
                    >
                      <img id={style.editIcn} src={group} alt="" />
                      <p>{menu.admin[1].users}</p> {/*//* Members */}
                    </div>
                  </>
                )}
              </div>

              <div>
                <section className={style.logOut} onClick={logout}>
                  <img id={style.etrIcn} src={user} alt="" />
                  <p>{menu.admin[2]}</p> {/*//* Log out */}
                  <img id={style.etrIcn} src={logouticon} alt="" />
                </section>
              </div>
            </aside>
          </section>
        </>
      )}
    </div>
  )
}

export default SideBar