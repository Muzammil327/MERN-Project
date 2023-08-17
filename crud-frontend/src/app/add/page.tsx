"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddTask = () => {
  const router = useRouter();

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    task: "",
  });

  const SubmitHandle = async (e: any) => {
    e.preventDefault();
    const { fname, lname, email, task } = data;
  
    const URL = `${process.env.NEXT_PUBLIC_NODEJSUSER_URL}api/crud/create`;
    try {
      const res = await axios.post(URL, data);

      if (res.data.error) {
        toast.error(res.data.error);
        console.log(res.data.error);
      } else {
        toast.success(res.data.message);
        setData({
          fname: "",
          lname: "",
          email: "",
          task: "",
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.warning("Error during Task Update");
    }
  };
  return (
    <div className="containers md:mt-40 mt-4 mx-auto">
      <h2> ADD CRUD</h2>
      <form onSubmit={SubmitHandle}>
        <input
          placeholder="First Name"
          value={data.fname}
          type="text"
          onChange={(e) => setData({ ...data, fname: e.target.value })}
          autoFocus
        />
        <input
          placeholder="Last Name"
          onChange={(e) => setData({ ...data, lname: e.target.value })}
          value={data.lname}
          type="text"
        />
        <input
          placeholder="Your Email Address"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          type="email"
        />
        <textarea
          placeholder="Type your message here...."
          tabIndex={5}
          value={data.task}
          onChange={(e) => setData({ ...data, task: e.target.value })}
        />

        <button
          name="submit"
          type="submit"
          id="contact-submit"
          className="btn btn--form"
          data-submit="...Sending"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;
