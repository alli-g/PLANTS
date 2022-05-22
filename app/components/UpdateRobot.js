import React from 'react';
import { connect } from 'react-redux';
import { updateOneRobot } from '../redux/robots';
import { fetchRobot, getOneRobot } from '../redux/singleRobot';
import { Link } from 'react-router-dom';

class UpdateRobot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      fuelLevel: 100,
    };
    this.valueChange = this.valueChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.getSingleRobotInReact(this.props.match.params.id).then(() => {
      let robot = this.props.robot[0];
      this.setState({ name: robot.name, complete: robot.fuelLevel });
    });
  }

  valueChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  submit(evt) {
    evt.preventDefault();
    const upRbt = { ...this.props.robot[0], ...this.state };
    delete upRbt.projects;
    this.props.updateOneRobot(upRbt);
  }

  render() {
    // let project = this.props.singleProject;
    // let singleProject = project[0];

    let singleRobot = this.props.robot;

    return (
      // <div> edit Page</div>
      <div>
        {singleRobot ? (
          <div>
            <form id="project-form" onSubmit={this.submit}>
              <p>
                <label htmlFor="robotName"> Robot's Name:</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Robot's need names..."
                  value={this.state.name}
                  onChange={this.valueChange}
                />
              </p>

              <p>
                <label htmlFor="fuelLevel">
                  Did you refill your tank? Or use up a lot?
                </label>
                <input
                  name="fuelLevel"
                  type="number"
                  value={this.state.fuelLevel}
                  onChange={this.valueChange}
                />
              </p>

              <button type="submit">Submit</button>
              <button type="button">
                <Link to="/">Oops!</Link>
              </button>
            </form>
            <h3>Projects this robot is assigned to</h3>
            {singleRobot.projects ? (
              <ul>
                {singleRobot.projects.map((pjt) => {
                  return (
                    <Link to={`/robots/${pjt.id}`} key={pjt.id}>
                      {pjt.title}
                    </Link>
                  );
                })}
              </ul>
            ) : (
              <p>No assignments yet. Get this bot to work!</p>
            )}
          </div>
        ) : (
          <p>No robot with that ID</p>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  robot: state.singleRobot,
});

const mapDispatch = (dispatch, { history }) => ({
  getSingleRobotInReact: (id) => dispatch(getOneRobot(id)),
  updateOneRobot: (id) => dispatch(updateOneRobot(id, history)),
  // clearRobot: () => dispatch(fetchRobot({})),
});

export default connect(mapState, mapDispatch)(UpdateRobot);
