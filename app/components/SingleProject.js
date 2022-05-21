import React from 'react';
import { connect } from 'react-redux';
import { getOneProject } from '../redux/singleProject';
import { Link } from 'react-router-dom';

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.getSingleProjectInReact(this.props.match.params.id);
  }

  render() {
    let project = this.props.singleProject;
    let singleProject = project[0];
    return (
      <div>
        {singleProject ? (
          <div>
            <h1> {singleProject.title}</h1>
            <p>{singleProject.description}</p>
            <ul>
              <li>Due by {singleProject.deadline.slice(0, 10)}</li>
              <li>The priority is {singleProject.priority} out of 10</li>
            </ul>
            <button>
              <Link to={`/projects/${singleProject.id}/edit`}>
                Edit Project
              </Link>
            </button>
            <button>Complete</button>
            <h3>Robots assigned to get this work done</h3>
            {singleProject.robots.length > 0 ? (
              <ul>
                {singleProject.robots.map((rbt) => {
                  return (
                    <Link to={`/robots/${rbt.id}`} key={rbt.id}>
                      {rbt.name}
                    </Link>
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
          <p>No robot with that ID</p>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return { singleProject: state.singleProject };
};

const mapDispatch = (dispatch) => ({
  getSingleProjectInReact: (id) => dispatch(getOneProject(id)),
});

export default connect(mapState, mapDispatch)(SingleProject);
