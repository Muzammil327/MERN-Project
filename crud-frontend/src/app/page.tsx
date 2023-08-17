"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";

const Page = () => {
  const [user, setUser] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    "Content-Type": "application/json",
  };
  const URL = `${process.env.NEXT_PUBLIC_NODEJSUSER_URL}api/crud/get`;
  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(URL, { headers });
      console.log(res.data);
      setUser(res.data);
    };

    getAllData();
  }, [URL, headers, user]);

  const handelDelete = async (id: any) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_NODEJSUSER_URL}api/crud/delete/${id}`
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.warning("Error during Delete");
    }
  };
  return (
    <div className="container mx-auto lg:px-16 md:px-12 sm:px-6 px-4">
      <div className="ml-8">
        <span className="flex items-center text-center text-2xl py-8 justify-center text-black">
          CRUD Operations
        </span>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Task</h2>
          <Link
            href="/add"
            className="btn btn--table py-2 px-6 flex items-center gap-2"
          >
            Add
          </Link>
        </div>
        <table className="table my-5">
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {user.map((task: any) => (
        <>
          <tr key={task._id}>
            <td>
              <span className="res-head">Id:</span>
              {task._id}
            </td>
            <td>
              <span className="res-head">Firstname:</span>
              {task.fname}
            </td>
            <td>
              <span className="res-head">Lastname:</span>
              {task.lname}
            </td>
            <td>
              <span className="res-head">Email:</span>
              {task.email}
            </td>
            <td>
              <span className="res-head">Task:</span> {task.task}
            </td>
            <td className="action">
              <Link
                href={`/update/${task._id}`}
                className="btn btn--table py-1 px-2 flex items-center gap-2 mr-2"
              >
                <span>
                  <BiEditAlt />
                </span>
                <span>Update</span>
              </Link>
              <button
                onClick={() => handelDelete(task._id)}
                className="btn btn--table py-1 px-2 flex items-center gap-2"
              >
                <span>
                  <BsTrash />
                </span>
                <span>Delete</span>
              </button>
            </td>
          </tr>
        </>
      ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
