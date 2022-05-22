import React from 'react';
import { connect } from 'react-redux';
import { updateOneProject } from '../redux/projects';
import { fetchProject, getOneProject } from '../redux/singleProject';
import { Link } from 'react-router-dom';

class UpdateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      complete: false,
    };
    this.valueChange = this.valueChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.getSingleProjectInReact(this.props.match.params.id).then(() => {
      let project = this.props.project[0];
      this.setState({ title: project.title, complete: project.complete });
    });
  }

  valueChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  submit(evt) {
    evt.preventDefault();
    const upPjt = { ...this.props.project[0], ...this.state };
    // const rbts = upPjt.robots;
    // input rbts into updateOneProject?
    // delete upPjt.robots;
    this.props.updateOneProject(upPjt);
  }

  render() {
    let singleProject = this.props.project[0];
    return (
      <div>
        {singleProject ? (
          <div>
            <form id="project-form" onSubmit={this.submit}>
              <p>
                <label htmlFor="projectName"> Project's Title:</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Business Time..."
                  value={this.state.title}
                  onChange={this.valueChange}
                />
              </p>

              <p>
                <label htmlFor="complete">Is this task complete?</label>
                <select
                  name="complete"
                  value={this.state.complete}
                  onChange={this.valueChange}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </p>

              <button type="submit">Submit</button>
              <button type="button">
                <Link to="/">Oops!</Link>
              </button>
            </form>
            <h3>Robots assigned to get this work done</h3>
            {singleProject.robots ? (
              <ul>
                {singleProject.robots.map((rbt) => {
                  return (
                    <p key={rbt.id}>
                      <Link to={`/robots/${rbt.id}`}>{rbt.name}</Link>
                    </p>
                  );
                })}
              </ul>
            ) : (
              <p>
                No workers, you should hire someone and maybe pay better so they
                don't leave :/
              </p>
            )}
          </div>
        ) : (
          <p>No project with that ID</p>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  project: state.singleProject,
});

const mapDispatch = (dispatch, { history }) => ({
  getSingleProjectInReact: (id) => dispatch(getOneProject(id)),
  updateOneProject: (id) => dispatch(updateOneProject(id, history)),
  clearProject: () => dispatch(fetchProject({})),
});

export default connect(mapState, mapDispatch)(UpdateProject);
