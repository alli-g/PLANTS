import React from 'react';
import { connect } from 'react-redux';
import { getAllProjects, deleteOneProject } from '../redux/projects';
import { Link } from 'react-router-dom';
import NewProject from './NewProject';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
class AllProjects extends React.Component {
  componentDidMount() {
    this.props.getAllProjectsInReact();
    this.props.deleteOneProject();
  }

  render() {
    let projects = this.props.allProjectsInReact;
    return (
      <div>
        <h2 className="section-title"> All Projects </h2>
        <ul className="container">
          {Array.isArray(projects)
            ? projects.map((project) => (
                <div className="card" key={project.id}>
                  <Link to={`/projects/${project.id}`}>
                    <h3>{project.title} </h3>
                    <p>Due by {project.deadline.slice(0, 10)}</p>
                    <p>priority level: {project.priority}</p>
                  </Link>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => this.props.deleteOneProject(project.id)}
                  >
                    X
                  </button>
                </div>
              ))
            : 'No projects here'}
        </ul>
        <div>
          <h3> Add a new project to the system</h3>
          <NewProject />
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { allProjectsInReact: state.projects };
};

const mapDispatch = (dispatch, { history }) => ({
  getAllProjectsInReact: () => dispatch(getAllProjects()),
  deleteOneProject: (id) => dispatch(deleteOneProject(id, history)),
});

export default connect(mapState, mapDispatch)(AllProjects);
