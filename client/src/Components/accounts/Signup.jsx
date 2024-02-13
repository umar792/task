import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserSignUp } from "../../redux/actions/User";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    phoneNumber: null,
    email: "",
    password: "",
  });
  const [imagepreview, setImagePreview] = useState(null);
  const [image, setimage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   --- handle image
  const handleImageChanges = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // The result property contains the data URL for the image
        const imageDataUrl = reader.result;
        setImagePreview(imageDataUrl);
        setimage(file);

        // Now you can use imageDataUrl as the source for an image or store it as needed
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const dataSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("firstName", user.firstName);
    formdata.append("phoneNumber", user.phoneNumber);
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    formdata.append("file", image);

    dispatch(UserSignUp(formdata, navigate));
  };

  const isLoading = useSelector((state) => state.user.isLoading);
  useEffect(() => {
    if (isLoading === true) {
      Loading.standard("Loading Plaese Wait");
    } else {
      Loading.remove();
    }
  }, [isLoading]);

  return (
    // ================================
    <div className="bg-color3 w-full flex justify-center place-items-center py-10 min-h-[100vh]">
      <div class="login-box">
        <h2 className="">Create an account</h2>
        <form onSubmit={dataSubmit}>
          <div class="user-box">
            <input
              value={user.firstName}
              onChange={handlechange}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your ful name"
              className="mt-3 bg-transparent"
              autoComplete="off"
            />
            <label className="!text-[18px] !text-color5">Full Name</label>
          </div>
          <div class="user-box">
            <input
              type="email"
              name="email"
              required=""
              value={user.email}
              onChange={handlechange}
              placeholder="Enter your email address"
              className="mt-3"
              autoComplete="off"
            />
            <label className="!text-[18px] !text-color5">Email Address</label>
          </div>
          <div class="user-box my-3">
            <input
              value={user.password}
              onChange={handlechange}
              type="password"
              name="password"
              required=""
              placeholder="Enter your password"
              className="mt-3"
              autoComplete="off"
            />
            <label className="!text-[18px] mb-2 !text-color5">Password</label>
          </div>
          <div class="user-box my-3">
            <input
              value={user.phoneNumber}
              onChange={handlechange}
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your mobile number"
              className="mt-3"
              autoComplete="off"
            />
            <label className="!text-[18px] mb-2 !text-color5">
              Mobile Number
            </label>
          </div>
          <div class="relative py-2 my-3 border-b-[1px] border_b-color5">
            <label
              htmlFor="inputImage"
              className=" py-1 cursor-pointer rounded-sm !text-[18px] mb-2 !text-color5"
            >
              Select Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChanges}
              id="inputImage"
              name="phoneNumber"
              placeholder="Enter your mobile number"
              className="mt-3 hidden"
              autoComplete="off"
            />
            {imagepreview && (
              <img
                src={imagepreview}
                alt=""
                className="w-[45px] cursor-pointer h-[45px] object-contain border-[1px] border-color5 rounded-full
              absolute bottom-[4px] right-0
              "
              />
            )}
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
          <NavLink to="/login">
            <p className="text-center text-color5 mt-2 cursor-pointer">
              Have an account? <span className="">Login</span>
            </p>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Signup;
