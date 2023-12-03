import React from 'react';
import styled from 'styled-components';

const TransactionItemWrapper = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TransactionItem = ({ transaction }) => {
  const { paymentID, amount, buyerEmail, status, currency, createTime, updateTime, description } = transaction;

  return (
    <TransactionItemWrapper>
      <div>
        <p>Transaction ID: {paymentID}</p>
        <p>Description: {description}</p>
        <p>Amount: {amount} {currency}</p>
        <p>Buyer: {buyerEmail}</p>
        <p>Status: {status}</p>
        <p>Create time: {createTime}</p>
        <p>Update time: {updateTime}</p>
      </div>
    </TransactionItemWrapper>
  );
};

export default TransactionItem;
