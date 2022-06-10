import React from 'react';
import wateredPlants from './plants.jpeg';
import Image from 'react-bootstrap/Image';

function Home() {
  return (
    <div>
      <h1 className="mainpage">Plant Care 101</h1>

      <Image
        className="img-fluid mx-auto"
        src={wateredPlants}
        alt="plants-watered"
      />

      <div className="header max-auto">
        People often worry about underwatering their plants, but did you know
        you can also overwater them? We're here to help you discern whether you
        should water that sweet green guy of yours or not. Simply log-in, upload
        your plant, and we'll notify you when they need to be watered next!{' '}
      </div>
    </div>
  );
}

export default Home;
