import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { clearSuccessMessage } from "../app/user/userSlice";
import { notify } from "../common";

const ProtectedLayout = () => {
  const { user, successMessage, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // check errors, if any notify user
  if (error) notify("error", error);

  // clear accout deletion success message and notify user
  useEffect(() => {
    if (successMessage) {
      notify("success", successMessage);
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 5000);

      return () => setTimeout(timer);
    }
  }, [successMessage]);

  return <>{user ? <Outlet /> : <Navigate to="/sign-in" />}</>;
};

export default ProtectedLayout;
