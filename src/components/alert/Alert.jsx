import React, { useEffect } from "react";

import { useGlobalContextUser } from "../../context/context";

import "./alert.css";

const Alert = () => {
  const { alert, setAlert } = useGlobalContextUser();
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ isAlert: false, alertMessage: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [alert.isAlert]);

  return <>{alert.isAlert && <p className="alert">{alert.alertMessage}</p>}</>;
};

export default Alert;
