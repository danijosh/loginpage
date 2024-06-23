import React, { useState } from "react";
import { useTable } from "react-table";
import style from "../updateTable/updatetable.module.css";
import axios from "axios";
import add from "../../assets/add.png";
const UpdateTable = ({
  columns,
  data,
  setPage,
  userData,
  page,
  pageCount,
  pageSize,
  setPageSize,
  setDeleteConfirmPop,
  deleteConfirmPop,
  setSearch,
  signUpPop,
  editDataPop,
  setSignUpPop,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const clsSureBox = () => {
    //* this is used to cancel the sure box
    setDeleteConfirmPop(false);
  };
  console.log(page.length);

  // *-----------------delete data sure function-----------------
  const sureCnfDelete = () => {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    console.log(userData);
    axios
      .delete(`http://122.165.75.213:8000/adminpanel/v1/${userData.id}`, {
        headers
      })
      .then((Response) => {
        console.log(Response);
        setDeleteConfirmPop(false);
        alert("Profile deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.tableBody} style={signUpPop|| editDataPop?{position: "fixed"}:{position: "absolute"}}>
      {/* //*--------search box------------------- */}
      <div className={style.tableContainer}>
        <div className={style.headSearchBoxCont}>
          <div className={style.headndPgLimit}>
            <h1>Members</h1>
            <div>
              <span>Set page limit: </span>
              <select
                className={style.selectLimit}
                onChange={(eve) => {
                  setPageSize(parseInt(eve.target.value));
                }}
                name="pgSize"
                id=""
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
          <div className={style.searchndAddUserBox}>
            <input
              type="text"
              onChange={(eve) => {
                setPage(1);
                setSearch(eve.target.value);
              }}
              placeholder="search...                                                     🔍"
            />

            <div id={style.addUserContainer} onClick={() => setSignUpPop(true)}>
              <img id={style.addusericon} src={add} alt="" />
              <p>Sign Up</p> {/*//* Sign Up */}
            </div>
          </div>
        </div>
        {/* //*-------------------Table values--------------------------- */}
        <table
          {...getTableProps()}
          className={style.table}
          cellSpacing={"0px"}
          cellPadding={"5px"}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <>
                    <th {...column.getHeaderProps()} className={style.th}>
                      {column.render("Header")}
                    </th>
                  </>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className={style.td}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <section className={style.TableNavCont}>
          <button
            onClick={() =>
              setPage((prevState) =>
                prevState === 1 ? prevState : prevState - 1
              )
            }
          >
            Prev Page
          </button>
          <button
            onClick={() =>
              setPage((prevState) =>
                prevState === Math.floor(pageCount / pageSize)
                  ? prevState
                  : prevState + 1
              )
            }
          >
            Next Page
          </button>
          <div>
            <span>Enter the page number: </span>
            <input
              style={{ width: "80px" }}
              type="number"
              value={page}
              min="1"
              max={Math.floor(pageCount / pageSize)}
              onChange={(e) => {
                setPage(Number(e.target.value));
              }}
            />
          </div>
        </section>
      </div>

      {deleteConfirmPop && (
        <section className={style.cnfPopUpCont}>
          <div className={style.cnfPopUp}>
            <h6>Are you sure you want to delete?</h6>
            <div className={style.cnfBtnsCont}>
              <button className={style.cnfBtns} onClick={clsSureBox}>
                Cancel
              </button>
              <button className={style.cnfBtns} onClick={sureCnfDelete}>
                Confirm
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UpdateTable;
