"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const SubmitHandle = async (e: any) => {
    e.preventDefault();
    const { fname, lname, email, password, cpassword } = data;
    
    const URL = `${process.env.NEXT_PUBLIC_NODEJSUSER_URL}api/auth/register`;
    try {
      const res = await axios.post(URL, { fname, lname, email, password, cpassword });

      if (res.data.error) {
        toast.error(res.data.error);
        console.log(res.data.error);
      } else {
        toast.success(res.data.message);
        setData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          cpassword: "",
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.warning("Data not submit");
    }
  };
  return (
    <div className="containers md:mt-40 mt-8 mx-auto">
      <h2> Register User</h2>
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
        <input
          placeholder="Enter your password here...."
          onChange={(e) => setData({ ...data, password: e.target.value })}
          value={data.password}
          type="password"
        />
        <input
          placeholder="Enter your confirm password here...."
          onChange={(e) => setData({ ...data, cpassword: e.target.value })}
          value={data.cpassword}
          type="password"
        />

        <button
          name="submit"
          type="submit"
          id="contact-submit"
          className="btn btn--form"
          data-submit="...Sending"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Page;
