import React from "react";
import styled from "styled-components";

const NotificationWrapper = styled.div`
  background: lightgray;
  position: absolute;
  color: green;
  bottom: 10px;
  left: 10px;
  right: 10px;
  padding: 5px;
  border: 3px solid;
  border-radius: 3px;
  border-color: green;
`;

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  return <NotificationWrapper>{message}</NotificationWrapper>;
};

export default Notification;
