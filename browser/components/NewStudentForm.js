import React, { Component } from 'react';
import axios from 'axios';

export default class NewStudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post('/student', this.state);
      console.log(data);
      this.props.addStudent(data);
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
      });
      this.props.toggleShowForm();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={this.handleChange}
            name="firstName"
            type="text"
            value={this.state.firstName}
          />
          <br />
          <label htmlFor="lastName">Last Name</label>
          <input
            onChange={this.handleChange}
            name="lastName"
            type="text"
            value={this.state.lastName}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            name="email"
            type="text"
            value={this.state.email}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
