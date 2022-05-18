import React from 'react';
import { connect } from 'react-redux';
import { getAllProjects } from '../redux/projects';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
class AllProjects extends React.Component {
  componentDidMount() {
    this.props.getAllProjectsInReact();
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
                  <li>
                    <h3>{project.title} </h3>
                    <p>Due by {project.deadline.slice(0, 10)}</p>
                    <p>priority level: {project.priority}</p>
                  </li>
                </div>
              ))
            : 'No projects here'}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return { allProjectsInReact: state.projects };
};

const mapDispatch = (dispatch) => ({
  getAllProjectsInReact: () => dispatch(getAllProjects()),
});

export default connect(mapState, mapDispatch)(AllProjects);
