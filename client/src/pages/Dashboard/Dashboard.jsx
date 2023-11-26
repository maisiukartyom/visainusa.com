// Dashboard.js
import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import axios from '../../api/axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import TransactionList from './TransactionList';
import LevelList from './LevelList';
import ButtonBack from '../Admin/ButtonBack';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isVerified, setIsVerified] = useState(false)

  const navigate = useNavigate()

  const getUsers = async () => {
    try{
        const res = await axios.get('/users');
        setUsers(res.data);
    }
    catch{
        toast.error("Couldn't fetch users!",{
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          }
        );
    }
  }

  const getTransactions = async () => {
    try{
        const res = await axios.get('/payment/getTransactions');
        setTransactions(res.data);
    }
    catch{
        toast.error("Couldn't fetch transactions!",{
          position: "top-center",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          }
        );
    }
  }

  useEffect(() => {

    const verifyCookie = async (level, isAdmin) => {
        try{
            const user = await axios.post("auth/verify",
                {
                    requiredLevel: level,
                    forAdmin: isAdmin
                },
                {
                    withCredentials: true
                });
            setIsVerified(true)
        }
        catch (err){
            toast.error("You're not an admin!",{
              position: "top-center",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              }
            )
            setIsVerified(false)
            navigate("/")
        }
    }

    verifyCookie(0, true)
    getUsers();
    getTransactions();
  }, []);

  return (
    isVerified &&
    <>  
        <Link to='/admin'>
          <ButtonBack>ADMIN</ButtonBack>
        </Link>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
        <div style={{flex: 1}}>
          <h1 style={{textAlign: "center"}}>Users</h1>
          <UserList update={getUsers} users={users} />
        </div>
        <div style={{flex: 1}}>
          <h1 style={{textAlign: "center"}}>Payments</h1>
          <TransactionList transactions={transactions}/>
        </div>
      </div>
      <div>
        <h1 style={{textAlign: "center"}}>Levels</h1>
        <LevelList />
      </div>
    </>

  );
};

export default Dashboard;
