import React, { useEffect, useMemo, useState } from "react";
import del from "../../assets/deleteIcon.png";
import dashboard from "../../assets/dashboard.png";
import style from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";
import edit from "../../assets/edit.png";
import group from "../../assets/group.png";
import axios from "axios";
import EditDetails from "../editModal/EditDetails";
import UpdateTable from "../updateTable/UpdateTable";
import dropdown from "../../assets/dropdown.png";
import dropup from "../../assets/dropup.png";
import logouticon from "../../assets/logouticon.png";
import user from "../../assets/user.png";
import admin from "../../assets/admin.png";
import menuicon from "../../assets/menuicon.png";
import navclose from "../../assets/navclose.png";
import navopen from "../../assets/navopen.png";
import SignUp from "../signin/SignUp";

const DashBoard = () => {
  // *-------------------DashBoard Menu Items--------------------------
  const menu = {
    dashboard: "DASHBOARD",
    admin: ["User", { users: "All Users" }, "Log Out"],
  };
  // * ---------------------page,PageSize,Search Hooks----------------------
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(null);
  // *---------------------Pop up ----------------------------
  const [popDetails, setPopDetails] = useState(false);
  const [editDataPop, setEditDataPop] = useState(false);
  const [signUpPop, setSignUpPop] = useState(false);
  const [deleteConfirmPop, setDeleteConfirmPop] = useState(false);
  const [userData, setUserData] = useState({
    full_name: "",
    username: "",
    email: "",
  });
  // *----------------------expand side bar-----------------------
  const [expandSideBar, setExpandSideBar] = useState(false);
  const [miniAdminDrop, setMiniAdminDrop] = useState(false);
  // *----------------------Drop down menu----------------------
  const [adminDrop, setAdminDrop] = useState(false);

  // *---------------------select background-------------------------
  const [adminBg, setAdminBg] = useState(false);
  
  const [allUserBg, setAllUserBg] = useState(true);
  // *---------------------Data Props--------------------------------
  const [data, setData] = useState(null); //* this is then sent to memo hook

  const handleEditClick = (detail) => {
    setEditDataPop(true);
    setUserData(detail);
  };
  const handleDeleteClick = (detail) => {
    setUserData(detail);
    setDeleteConfirmPop(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Email ID",
        accessor: "email",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Name",
        accessor: "full_name",
      },
      {
        Header: "Update",
        Cell: ({ row }) => (
          <>
            <button
              className={style.UpdateBtns}
              onClick={() => handleEditClick(row.original)}
            >
              <img src={edit} className={style.editIcon} />
            </button>
            <button
              className={style.UpdateBtns}
              onClick={() => handleDeleteClick(row.original)}
            >
              <img src={del} className={style.delIcon} />
            </button>
          </>
        ),
      },
    ],
    []
  );

  // *---------------------memo hook-------------------------------
  const DataToUse = useMemo(() => data, [data]);
  // *---------------------memo hook-------------------------------
  useEffect(() => {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .get(
        `http://122.165.75.213:8000/adminpanel/v1?page=${page}&page_size=${pageSize}&search=${search}`,
        { headers }
      )
      .then((Response) => {
        setData(Response.data.data);
        setPageCount(Response.data.data_count);
        setPopDetails(true)
      })
      .catch((error) => {
        nav_to("/login");
      });
  }, [search, page, pageSize, deleteConfirmPop, editDataPop, userData]);
  let nav_to = useNavigate();
  // *------------------functions for the events------------

  const adminDropDown = () => {
    setAdminDrop(adminDrop === true ? false : true);
    setAdminBg(adminBg === true ? false : true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav_to("/login");
  };
  //*------------------open Edit PopUp-----------------------
  const editPopUp = () => {
    nav_to("/userdetails");
    setPopDetails(true);
    setAllUserBg(true);
  };
  return (
    <div id={style.Dbody}>
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
              <div className={allUserBg ? style.miniMembMenu : null}>
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
            style={popDetails ? { width: "15.2%" } : { width: "15%" }}
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
                      className={allUserBg ? style.membMenu : null}
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
      {/* //*--------------------Edit PopUp elements-------------- */}

      {popDetails && (
        <>
          <article className={style.mainPopUp}>
            <UpdateTable
              columns={columns}
              data={DataToUse}
              setSearch={setSearch}
              setPage={setPage}
              setPageSize={setPageSize}
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              setDeleteConfirmPop={setDeleteConfirmPop}
              deleteConfirmPop={deleteConfirmPop}
              userData={userData}
              signUpPop={signUpPop}
              editDataPop={editDataPop}
              setSignUpPop={setSignUpPop}
            />
            {signUpPop && <SignUp setSignUpPop={setSignUpPop} />}
            {editDataPop && (
              <EditDetails
                editDataPop={editDataPop}
                userData={userData}
                setEditDataPop={setEditDataPop}
                setUserData={setUserData}
              />
            )}
          </article>
        </>
      )}
    </div>
  );
};

export default DashBoard;
