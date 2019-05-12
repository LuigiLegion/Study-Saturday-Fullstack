import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showForm: false,
    };
    this.selectStudent = this.selectStudent.bind(this);
    this.toggleShowForm = this.toggleShowForm.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  toggleShowForm() {
    const curShowForm = this.state.showForm;
    return this.setState({
      showForm: !curShowForm,
    });
  }

  addStudent(newStudent) {
    const curStudentsArr = this.state.students;
    return this.setState({
      students: [...curStudentsArr, newStudent],
    });
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
        <button type="button" onClick={() => this.toggleShowForm()}>
          Add New Student
        </button>
        {this.state.showForm ? (
          <NewStudentForm
            addStudent={this.addStudent}
            toggleShowForm={this.toggleShowForm}
          />
        ) : null}
      </div>
    );
  }
}
