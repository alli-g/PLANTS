import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewRobot } from '../redux/robots';

class NewRobot extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      fuelType: 'electric',
      fuelLevel: 100,
      imageUrl: '',
    };
    this.valueChange = this.valueChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  valueChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  submit(evt) {
    evt.preventDefault();
    this.props.createNewRobot({ ...this.state });
    //^^from mapDispatch
    //error handling
    this.setState({
      name: '',
      fuelType: 'electric',
      fuelLevel: 100,
      imageUrl: '',
    });
  }

  render() {
    return (
      <div>
        <form id="robot-form" onSubmit={this.submit}>
          <p>
            <label htmlFor="robotName"> Robot's Name:</label>
            <input
              name="name"
              type="text"
              placeholder="name..."
              value={this.state.name}
              onChange={this.valueChange}
            />
          </p>
          <p>
            <label htmlFor="fuelType">Robot's fuel:</label>
            <select
              name="fuelType"
              value={this.state.fuelType}
              onChange={this.valueChange}
            >
              <option value="electric">Electric</option>
              <option value="gas">Gas</option>
              <option value="diesel">Diesel</option>
            </select>
          </p>
          <p>
            <label htmlFor="fuelLevel">Robot's current fuel level:</label>
            <input
              name="fuelLevel"
              type="number"
              placeholder="percentage of fuel left..."
              value={this.state.fuelLevel}
              onChange={this.valueChange}
            />
          </p>
          <p>
            <label htmlFor="imageUrl">Image:</label>
            <input
              name="imageUrl"
              type="text"
              placeholder="URL to image..."
              value={this.state.imageUrl}
              onChange={this.valueChange}
            />
          </p>
          <button type="submit">Submit</button>
          <button>
            <Link to="/">Oops!</Link>
          </button>
        </form>
        <h1>{this.state.complete}</h1>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    createNewRobot: (rbt) => dispatch(createNewRobot(rbt, history)),
  };
};

export default connect(null, mapDispatch)(NewRobot);
