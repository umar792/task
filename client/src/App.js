import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Components/accounts/Login";
import Navebar from "./Components/layout/Navebar";
import Registration from "./pages/Registration";
import Footer from "./Components/layout/Footer";
import Tickets from "./pages/Tickets";
import UserLocation from "./pages/UserLocation";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEvents } from "./redux/actions/Events";
import TicketDetails from "./pages/TicketDetails";
import GroupDetails from "./pages/GroupDetails";
// import Location from "./pages/UserLocation";
import { Toaster } from "react-hot-toast";
import { TokenVerify } from "./redux/actions/User";
import { ScrollToTop } from "react-router-scroll-to-top";
import Category from "./pages/Category";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("instapass_user_token");
  const Allevents = useSelector((state) => state.events.AllEvents);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (Allevents && Allevents?.length === 0) {
      const page = 1;
      dispatch(GetAllEvents(page));
    }
    if (token) {
      dispatch(TokenVerify());
    }
  }, []);
  return (
    <BrowserRouter>
      <Navebar />
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/details/:id" element={<TicketDetails />} />
        <Route path="/tickets/group.details/:id" element={<GroupDetails />} />
        <Route path="/location" element={<UserLocation />} />
        <Route path="/tickets/:name" element={<Category />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
