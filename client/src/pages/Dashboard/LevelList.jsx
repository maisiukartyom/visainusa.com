import { useState } from "react";
import axios from "../../api/axios";
import {toast} from 'react-toastify';
import styled from 'styled-components';

const LevelItemWrapper = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LevelListWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  height: 400px; /* Fixed height with scroll */
  overflow-y: auto; /* Adding scroll */
`;

const SubmitButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  padding: 8px 12px;
  cursor: pointer;
`;

const LevelList = () => {
    const [levelsInfo, setLevelsInfo] = useState([]);
    const [fetched, setFetched] = useState(false);
  
    useState(() => {
        const getLevels = async () => {
            try{
                const levels = await axios.get('/payment/getLevelsCosts');
                setLevelsInfo(levels.data.levels);
                setFetched(true);
            }
            catch(err){
                toast.error("Couldn't fetch levels info!",{
                    position: "top-center",
                    autoClose: 10000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    }
                );
                setFetched(false);
            }
        }
        getLevels();
    }, []);


    const handleCostChange = (index, newCost) => {
        const updatedLevels = [...levelsInfo];
        updatedLevels[index].cost = Number(newCost);
        setLevelsInfo(updatedLevels);
    }

    const submitLevels = async () => {
        try{
            await axios.post('/payment/updateLevels', {
                levels: levelsInfo
            });
            toast.success("Levels updated!",{
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
        catch(err){
            toast.error("Couldn't update levels!",{
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

    console.log(levelsInfo);
  
    return (
        fetched && 
        <LevelListWrapper>
            {levelsInfo.map((level, index) => (
                <LevelItemWrapper>
                    <strong>Level Number:</strong> {level.levelNumber}
                    <strong>Cost:</strong>{' '}
                    <input
                    type="number"
                    value={level.cost}
                    onChange={(e) => handleCostChange(index, e.target.value)}
                />
                </LevelItemWrapper>
            ))}
            <SubmitButton onClick={submitLevels}>Submit changes</SubmitButton>
        </LevelListWrapper>
    );
  };

  export default LevelList;