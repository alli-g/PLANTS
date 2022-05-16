## Requirements

The requirements below are broken into separate **tiers**, which model the way we **recommend you approach the project**. That is, we recommend you complete (or complete the majority of) the requirements in Tier 1 before moving on to Tier 2, and so on. Of course, if you get stuck on a particular feature, we recommend moving on and trying another feature - don't sacrifice the good for the perfect!

### Tier 1: All Robots and Projects (20/63)

<details>

#### Frontend

- [ ] Write a component to display a list of all robots (at least their names and imageUrls)
- [ ] Write a component to display a list of all projects (at least their titles and deadlines)
- [ ] Write a robots sub-reducer to manage robots in your Redux store
- [ ] Write a projects sub-reducer to manage projects in your Redux store
- [ ] Display the AllRobots component when the url matches `/robots`
- [ ] Display the AllProjects component when the url matches `/projects`
- [ ] Add links to the navbar that can be used to navigate to the all-projects view and the all-robots view

#### Backend

- [ ] Write a route to serve up all robots
- [ ] Write a route to serve up all projects

- Write a `robots` model with the following information:
  - [ ] name - not empty or null
  - [ ] fuelType - can be one of gas, diesel, or electric (defaults to electric)
  - [ ] fuelLevel - can be a decimal value between 0 and 100 (defaults to 100)
  - [ ] imageUrl - with a default value
- Write a `projects` model with the following information:
  - [ ] title - not empty or null
  - [ ] deadline - a date
  - [ ] priority - an integer between 1 and 10
  - [ ] completed - boolean value, defaults to false
  - [ ] description - extremely large text
- [ ] Robots may be associated with many projects. Likewise, projects may be associated with many robots.

#### Seed
- [ ] Running the seed file creates projects and robots for demonstration purposes

Congrats! You have completed your first vertical slice! Make sure to `commit -m "Feature: Get all robots and projects"` before moving on (see RUBRIC.md - points are awarded/deducted for a proper git workflow)!

</details>

### Tier 2: Single Robot and Single Project (12/63)

<details>

#### Frontend

- Write a component to display a single robot with the following information:
  - [ ] The robot's name, image, fuelType, fuelLevel
  - [ ] The names of all their assigned projects (or a helpful message if they don't have any)
- [ ] Display the appropriate robot when the url matches `/robots/:robotId`
- [ ] Clicking on a robot from the all-robots view should navigate to show that robot in the single-robot view

- Write a component to display a single project with the following information:
  - [ ] The project's title, deadline, priority, description
  - [ ] A list of the names of all robots in that project (or a helpful message if it doesn't have any robots)
- [ ] Display the appropriate project's info when the url matches `/projects/:projectId`
- [ ] Clicking on a project from the all-projects view should navigate to show that project in the single-project view

- [ ] Clicking on the name of a robot in the single-project view should navigate to show that robot in the single-robot view
- [ ] Clicking on the name of a project in the single-robot view should navigate to show that project in the single-project view

#### Backend

- [ ] Write a route to serve up a single robot (based on their id), _including that robot's projects_
- [ ] Write a route to serve up a single project (based on its id), _including that projects' robots_

Congrats! You have completed your second vertical slice! Make sure to `commit -m "Feature: Get Single Project and Robot"` before moving on (see RUBRIC.md - points are awarded/deducted for a proper git workflow)!

</details>

### Tier 3: Adding a Robot and Adding a Project (10/63)

<details>

#### Frontend

- [ ] Write a component to display a form for adding a new robot that contains _at least_ an input for name
- [ ] Display this component as part of the all-robots view, alongside the list of robots
- Submitting the form with valid data should:
  - [ ] Make an AJAX request that causes the new robot to be persisted in the database
  - [ ] Add the new robot to the list of robots without needing to refresh the page

- [ ] Write a component to display a form for adding a new project that contains _at least_ an input for title
- [ ] Display this component as part of the all-projects view, alongside the list of projects
- Submitting the form with valid data should:
  - [ ] Make an AJAX request that causes the new project to be saved to the database
  - [ ] Add the new project to the list of projects without needing to refresh the page

#### Backend

- [ ] Write a route to add a new robot
- [ ] Write a route to add a new project

Congrats! You have completed your third vertical slice! Make sure to `commit -m "Feature: Add Robot and Project"` before moving on (see RUBRIC.md - points are awarded/deducted for a proper git workflow)!

</details>

### Tier 4: Removing a Robot and Removing a Project (8/63)

<details>

#### Frontend

- [ ] In the all-robots view, include an `X` button next to each robot
- Clicking the `X` button should:
  - [ ] Make an AJAX request that causes that robot to be removed from database
  - [ ] Remove the robot from the list of robots without needing to refresh the page

- [ ] In the all-projects view, include an `X` button next to each project
- Clicking the `X` button should:
  - [ ] Make an AJAX request that causes that project to be removed from database
  - [ ] Remove the project from the list of projects without needing to refresh the page

#### Backend

- [ ] Write a route to remove a robot (based on its id)
- [ ] Write a route to remove a project (based on its id)

Congrats! You have completed your fourth vertical slice! Make sure to `commit -m "Feature: Remove Robot and Project"` before moving on (see RUBRIC.md - points are awarded/deducted for a proper git workflow)!

</details>

### Tier 5: Updating a Robot and Updating a Project (13/63)

<details>

#### Frontend

- [ ] Write a component to display a form updating _at least_ a robot's name and fuelLevel
- [ ] Display this component EITHER as part of the single-robot view, or as its own view
- Submitting the form with valid data should:
  - [ ] Make an AJAX request that causes that robot to be updated in the database
  - [ ] Update the robot in the current view without needing to refresh the page
- [ ] In the single-robot view, display an `Unassign` button next to each of its projects, which unassigns it from that project (in the database as well as this view)

- [ ] Write a component to display a form updating _at least_ a project's title and completion status
- [ ] Display this component EITHER as part of the single-project view, or as its own view
- Submitting the form with valid data should:
  - [ ] Make an AJAX request that causes that project to be updated in the database
  - [ ] Update the project in the current view without needing to refresh the page
- [ ] In the single-project view, display an `Unassign` button next to each robot assigned to it, which unassigns that robot (in the database as well as this view)
- [ ] In the single-project view, display a `Complete` button, which marks the project as completed (in the database as well as this view)

#### Backend

- [ ] Write a route to update an existing project
- [ ] Write a route to update an existing robot


Congrats! You have completed your fifth vertical slice! Make sure to `commit -m "Feature: Update Robot and Project"` before moving on (see RUBRIC.md - points are awarded/deducted for a proper git workflow)!

</details>

### Bonus Tier (25 EC)

<details>

#### Finishing Touches

- [ ] If a user attempts to add a new robot or project without a required field, a helpful message should be displayed
- [ ] If a user attempts to access a page that doesn't exist (ex. `/potato`), a helpful "not found" message should be displayed
- [ ] If a user attempts to view a robot/project that doesn't exist, a helpful message should be displayed
- [ ] Whenever a component needs to wait for data to load from the server, a "loading" message should be displayed until the data is available
- [ ] Overall, the app is spectacularly styled and visually stunning

#### Ordering

- [ ] Create option for projects to be ordered based on priority on all-projects view
- [ ] Create option for projects to be ordered based on deadline on all-projects view
- [ ] Create option for robots to be ordered based on fuel level on all-robots view

#### Filtering

- [ ] Create filters on all-projects view so that projects can be filtered based completion status and priority (allow multiple filters to be applied)
- [ ] Create a filter on all-robots view to only show projects without assigned robots and vice versa
- [ ] Create filters on all-robots view so that robots can be filtered based on fuel type and fuel level (allow multiple filters to be applied)
- [ ] Create a filter on all-robots view to only show robots without assigned projects and vice versa

#### Seeding

- [ ] Seed 100+ robots and 100+ projects
- [ ] Implement pagination for robots (e.g. `/robots?page=1` shows the first ten robots, and `/robots?page=2` shows robots 11-20)
- [ ] Implement pagination for projects (e.g. `/projects?page=1` shows the first ten projects, and `/projects?page=2` shows robots 11-20)

#### Testing

- [ ] React (AllRobots): renders "No Robots" if passed no robots
- [ ] React (AllProjects): renders "No Projects" if passed no projects
- [ ] Redux (robots): returns the initial state by default
- [ ] Redux (projects): returns the initial state by default
- [ ] Sequelize (Robot): name must not be null or empty
- [ ] Sequelize (Project): deadline must be a valid date
- [ ] Navigation: navbar to navigate to home, robots
- [ ] Navigation: navbar to navigate to projects
- [ ] Seed File: creates at least one robot that has several projects
- [ ] Seed File: creates at least one project that has several robots

</details>
