// UserList.js
import React from 'react';
import styled from 'styled-components';
import User from './User';

const UserListWrapper = styled.div`
  max-width: 550px;
  margin: 0 auto;
  padding: 20px;
  height: 470px; /* Фиксированная высота */
  overflow-y: auto; /* Добавление полосы прокрутки */
`;

const UserList = ({ users, update }) => {
  return (
    <UserListWrapper>
      {users.map(user => (
        <User update={update} key={user.email} user={user} />
      ))}
    </UserListWrapper>
  );
};

export default UserList;
