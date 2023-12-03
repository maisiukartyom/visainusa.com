// User.js
import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {toast} from 'react-toastify'
import axios from '../../api/axios';

const UserWrapper = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  flex: 1;
  max-width: 70%;
`;

const ActionButtons = styled.div`
  flex: 1;
  display: flex;
  gap: 3px;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background-color: #ff3333;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 8px;
`;

const UpdateButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: 8px 12px;
  cursor: pointer;
  margin-left: 8px;
`;

const User = ({ user, update }) => {
  const { email, level, isAdmin } = user;
  const [newLevel, setNewLevel] = useState(level);

  const handleDeleteClick = async () => {
    try{
      await axios.post("/users/delete", {
        email: email,
      },
      {headers: { 'Content-Type': 'application/json' }});

      toast.success(`Deleted user ${email}!`, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });

    }
    catch(err){
      toast.error(`Couldn't delete user ${email}!`, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
    update();
  };

  const handleLevelChange = (event) => {
    setNewLevel(event.target.value);
  };

  const handleUpdateClick = async () => {
    try{
      await axios.post("/users/update", {
        email: email,
        level: newLevel
      },
      {headers: { 'Content-Type': 'application/json' }})

      toast.success(`Updated ${email} level to ${newLevel}`, {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
    catch(err){
      toast.error("Couldn't update level!", {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }

    update();
  };

  return (
    <UserWrapper>
      <UserInfo>
        <p>Email: {email}</p>
        <p>Level:
          <select value={newLevel} onChange={handleLevelChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </p>
      </UserInfo>
      <ActionButtons>
        <UpdateButton onClick={handleUpdateClick}>Update Level</UpdateButton>
        <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
      </ActionButtons>
    </UserWrapper>
  );
};

export default User;
