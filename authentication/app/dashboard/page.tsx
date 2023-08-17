"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DashBoard = () => {
  const [user, setUser] = useState();
  const sednRequest = async () => {
    const res = await axios
      .get(`${process.env.NEXT_PUBLIC_NODEJSUSER_URL}api/auth/user`)
      .catch((err) => console.log(err));
    const data = await res.;
    return data;
  };
 
  // useEffect(() => {
  //   const getAllData = async () => {
  //     const res = await axios.get(`${process.env.NEXT_PUBLIC_NODEJSUSER_URL}api/auth/user`);
  //     console.log(res.data);
  //     setUser(res.data);
  //   };

  //   getAllData();
  // }, [user]);

  return <div><h1>DashBoards</h1></div>;
};

export default DashBoard;
