import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createNewProject } from '../redux/robots';

class NewProject extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      deadline: '',
      priority: 10,
      complete: false,
      description: '',
    };
    this.valueChange = this.valueChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  valueChange(event) {
    const title = event.target.title;

    this.setState({
      [title]: event.target.value,
    });
  }

  submit(evt) {
    evt.preventDefault();
    this.props.createNewProject({ ...this.state });
    //^^from mapDispatch
    console.log('***state***', this.state);
    //error handling
    this.setState({
      title: '',
      deadline: '',
      priority: 10,
      complete: false,
      description: '',
    });
  }

  render() {
    return (
      <div>
        <form id="project-form" onSubmit={this.submit}>
          <p>
            <label htmlFor="projectName"> Projects's Title:</label>
            <input
              name="title"
              type="text"
              placeholder="name..."
              value={this.state.title}
              onChange={this.valueChange}
            />
          </p>
          <p>
            <label htmlFor="deadline">Project's deadline:</label>
            <input
              name="deadline"
              type="text"
              placeholder="YYYY-MM-DD"
              value={this.state.deadline}
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
          <p>
            <label htmlFor="description">Short description of project:</label>
            <input
              name="description"
              type="text"
              placeholder="Project is...."
              value={this.state.description}
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
    createNewProject: (pjt) => dispatch(createNewProject(pjt, history)),
  };
};

export default connect(null, mapDispatch)(NewProject);
