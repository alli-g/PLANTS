import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreatePlant({ isAuth }) {
  const [name, setName] = useState('');
  const [plantType, setPlantType] = useState('high');
  const [lastWatered, setLastWatered] = useState(new Date());
  const [plantPic, setPlantPic] = useState('');
  const [plantsWateringSched, setPlantWatering] = useState(3);
  const [allWateringSched, setWatering] = useState({
    high: 3,
    moderate: 7,
    low: 14,
    vlow: 18,
  });

  const plantsCollectionRef = collection(db, 'Plants');

  let navigate = useNavigate();

  const createPlant = async () => {
    await addDoc(plantsCollectionRef, {
      name,
      plantType,
      lastWatered,
      plantsWateringSched,
      plantPic,
      owner: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/yourplants');
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  });

  const handleChange = (event) => {
    setPlantPic(event.target.files[0]);
    console.log(event)
  };

  return (
    <div className="createPlantPage">
      <div className="createContainer">
        <h1>OMG YOU GOT A NEW PLANT!?!</h1>
        <h4>Tell us all about your new babe below</h4>
        <Form>
          <Form.Group className="md-form w-50">
            <Form.Label>Plant's Name:</Form.Label>
            <Form.Control
              name="name"
              placeholder="Plant"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              Give your plant a name, or use the scientific name
            </Form.Text>
          </Form.Group>
          <Form.Group className="w-50">
            <Form.Label>Plant Type:</Form.Label>
            <Form.Select
              className="col-auto"
              name="plantType"
              onChange={(event) => {
                setPlantType(event.target.value);
                // console.log(allWateringSched[event.target.value])
                setPlantWatering(allWateringSched[event.target.value]);
              }}
            >
              <option value="high">High water use</option>
              <option value="moderate">Moderate water use</option>
              <option value="low">Low water use</option>
              <option value="vlow">Very Low water use</option>
            </Form.Select>
            <Form.Text className="text-muted">
              By plant type, we mean how much water does it need?
            </Form.Text>
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Last Watered:</Form.Label>
            <div>
              <DatePicker
                onChange={(value) => {
                  setLastWatered(value);
                }}
                value={lastWatered}
              />
              <p></p>
            </div>
            <Form.Control type='file' placeholder='Plant Pic Plz' onClick={handleChange}></Form.Control>
          </Form.Group>
          <div>
            <Button variant="secondary" onClick={createPlant}>
              Add Your New Plant
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreatePlant;
