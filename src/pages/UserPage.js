import React, { useEffect, useState } from 'react';
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

function UserPage({ isAuth }) {
  const [userPlantList, setPlantList] = useState([]);
  const [updated, setUpdated] = useState(1);
  // const [wateringIntervals, setWateringIntervals] = useState({});
  const plantsCollectionRef = collection(db, 'Plants');
  const [deadPlants, setDeadPlants] = useState(false);
  const [deadPlantList, setDeadPlantList] = useState([]);
  const [alerted, setAlerted] = useState(false);
  // const wateringIntervalsRef = collection(db, 'Watering');

  useEffect(() => {
    const getPlants = async () => {
      const plantData = await getDocs(plantsCollectionRef);
      const allPlants = plantData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      let newthing = allPlants.filter(
        (plantObj) => plantObj.owner.id === auth.currentUser.uid
      );
      console.log(newthing);
      setPlantList(newthing);
    };

    getPlants();

    // const getWatering= async()=>{

    // }
  }, [updated]);

  /**
  let today= new Date();
  let lastWatered=plant.lastWatered;
  let daysSinceWatered=(today.getTime()-lastWatered.getTime())/(1000*60*60*24)
  if daysSinceWatered>plant.waterInterval

   **/

  const deletePlant = async (id) => {
    const postPlants = doc(db, 'Plants', id);
    await deleteDoc(postPlants);
    setUpdated(updated + 1);
  };

  const waterPlant = async (id) => {
    const postPlants = doc(db, 'Plants', id);
    await updateDoc(postPlants, { lastWatered: new Date() });
    setUpdated(updated + 1);
  };

  const deadAlert = () => {
    return (
      <Alert
        variant="danger"
        onClose={() => {
          setDeadPlants(false);
          setAlerted(true);
          // setDeadPlantList([]);
        }}
        dismissible
      >
        <Alert.Heading>One of your babes needs water!!</Alert.Heading>
      </Alert>
    );
  };

  //isAuth && plant.author.id==auth.currentUser.uid
  let today = new Date();
  if (deadPlants) {
    return deadAlert();
  } else {
    console.log(deadPlantList);
    return (
      <div className="align-items-center">
        {deadPlantList.length > 0 && (
          <div>
            <Row>
              <Button variant="alert">
                You need to water some dudes{' '}
                <Badge variant="light">{deadPlantList.length}</Badge>
              </Button>
            </Row>
          </div>
        )}
        <Row xs={1} ms={2} lg={3} className="g-4 align-items-center">
          {userPlantList.map((plant) => {
            let wateredDate = new Date(plant.lastWatered.seconds * 1000);
            let wateredString = wateredDate.toLocaleDateString();
            let daysSinceWatered = Math.floor(
              (today.getTime() - wateredDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            let variant = 'light';
            if (daysSinceWatered > plant.plantsWateringSched) {
              variant = 'danger';
              if (!alerted) {
                setDeadPlants(true);
                if (!deadPlantList.includes(plant)) {
                  deadPlantList.push(plant);
                }
              }
            }
            return (
              <Col key={plant.id}>
                <Card
                  bg={variant}
                  text="dark"
                  className="text-center shadow-sm"
                >
                  <Card.Title>{plant.name}</Card.Title>
                  <Card.Subtitle>
                    She should be watered every {plant.plantsWateringSched} days
                  </Card.Subtitle>
                  {variant === 'danger' && (
                    <Card.Subtitle>SHE NEEDS MOISTURE</Card.Subtitle>
                  )}
                  <Card.Text>
                    Last watered on: {wateredString}. That was{' '}
                    {daysSinceWatered} days ago
                  </Card.Text>
                  <div className="btn-group">
                    <Button
                      variant="success"
                      onClick={() => waterPlant(plant.id)}
                    >
                      Wait, I watered her today!!
                    </Button>
                    <Button
                      variant="outline-warning"
                      onClick={() => deletePlant(plant.id)}
                    >
                      She died :(
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default UserPage;
