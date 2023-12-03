import styled from 'styled-components';

const ButtonBack = styled.button`
  background-color: #032144;
  color: white; 
  padding: 10px 20px; 
  font-size: 16px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer;

  &:hover {
    background-color: #244B7A; 
  }

  position: absolute;
  top: 20px;
  left: 20px;
`;

export default ButtonBack;
