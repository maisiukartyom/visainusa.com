
 import React, { useEffect, useState } from 'react';
 import "./Timer.css"

 const Timer = () => {
   const countdownDate = new Date('December 22, 2023 00:00:00').getTime();
   const currentDate = new Date().getTime();
  const [remainingTime, setRemainingTime] = useState(countdownDate - currentDate);

  useEffect(() => {
     const timer = setInterval(() => {
       const now = new Date().getTime();
      const distance = countdownDate - now;
      setRemainingTime(distance);

       if (distance <= 0) {
        clearInterval(timer);
       }
     }, 1000);

    return () => {
      clearInterval(timer);
     };
   }, []);

   const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
   const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);


  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
   };

  return (
    <div >
        <div className='timer'>
       <div className='timer-color'>{`${formatTime(days)} days ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</div>
     </div>
     </div>
   );
 };

 export default Timer;

