"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddTask = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const SubmitHandle = async (e: any) => {
    e.preventDefault();
    const { email, password } = data;
    
    const URL = `${process.env.NEXT_PUBLIC_NODEJSUSER_URL}api/auth/login`;
    try {
      const res = await axios.post(URL, { email, password });

      if (res.data.error) {
        toast.error(res.data.error);
        console.log(res.data.error);
      } else {
        toast.success(res.data.message);
        setData({
          email: "",
          password: "",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.warning("Login not");
    }
  };
  return (
    <div className="containers mt-40 mx-auto">
      <h2> Login User</h2>
      <form onSubmit={SubmitHandle}>
        <input
          placeholder="Your Email Address"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          value={data.email}
          type="email"
        />
        <input
          placeholder="Enter your password here...."
          onChange={(e) => setData({ ...data, password: e.target.value })}
          value={data.password}
          type="password"
        />

        <button
          name="submit"
          type="submit"
          id="contact-submit"
          className="btn btn--form"
          data-submit="...Sending"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AddTask;
