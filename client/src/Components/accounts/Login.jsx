import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../redux/actions/User";
import "./Login.css";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const Login = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataSubmit = (e) => {
    e.preventDefault();
    dispatch(UserLogin(email, password, navigate));
  };

  useEffect(() => {
    if (isLoading === true) {
      Loading.standard("Loading Plaese Wait");
    } else {
      Loading.remove();
    }
  }, [isLoading]);

  return (
    <div className="bg-color3 w-full flex justify-center place-items-center py-10 min-h-[100vh]">
      <div class="login-box">
        <h2 className="">Login to your account</h2>
        <form onSubmit={dataSubmit}>
          <div class="user-box">
            <input
              type="email"
              name=""
              required=""
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email address"
              className="mt-3"
            />
            <label className="!text-[18px] !text-color5">Email Address</label>
          </div>
          <div class="user-box my-3">
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              name=""
              required=""
              placeholder="Enter your password"
              className="mt-3"
            />
            <label className="!text-[18px] mb-2 !text-color5">Password</label>
          </div>
          <button
            type="submit"
            className="w-full border-[1px] border-color2 text-color2 py-3 rounded-md my-3 px-2 cursor-pointer
          hover:bg-color4 hover:border-color4
          "
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Login
          </button>
          <NavLink to="/registration">
            <p className="text-center text-color5 mt-2 cursor-pointer">
              Dont have an account? <span className="">Signup</span>
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
