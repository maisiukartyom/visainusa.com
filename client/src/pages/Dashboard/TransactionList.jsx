// TransactionList.js
import React from 'react';
import styled from 'styled-components';
import TransactionItem from './TransactionItem';

const TransactionListWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  height: 400px; /* Fixed height with scroll */
  overflow-y: auto; /* Adding scroll */
`;

const TransactionList = ({ transactions }) => {
  return (
    <TransactionListWrapper>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.paymentID} transaction={transaction} />
      ))}
    </TransactionListWrapper>
  );
};

export default TransactionList;
