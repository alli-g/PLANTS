import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePlant({isAuth}) {
  const [name, setName] = useState('');
  const [plantType, setPlantType] = useState('');

  const plantsCollectionRef = collection(db, 'Plants');
  let navigate = useNavigate();

  const createPlant = async () => {
    await addDoc(plantsCollectionRef, {
      name,
      plantType,
      owner: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/');
  };

  useEffect(()=>{
    if (!isAuth){
      navigate('/login')
    }
  })

  return (
    <div className="createPlantPage">
      <div className="createContainer">
        <h1>Create a new Plant!!</h1>
        <div className="input">
          <label>Plant's Name:</label>
          <input
            name="name"
            placeholder="Finn the ficus"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
        </div>
        <div className="input">
          <label>Plant Type</label>
          <select
            name="plantType"
            onChange={(event) => {
              setPlantType(event.target.value);
            }}
          >
            <option value="high">High water use</option>
            <option value="moderate">Moderate water use</option>
            <option value="low">Low water use</option>
            <option value="very-low">Very Low water use</option>
          </select>
          <button onClick={createPlant}>Submit Plant</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePlant;
