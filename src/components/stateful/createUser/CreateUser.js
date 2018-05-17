import React, { Component } from 'react';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '', 
      email: '' 
    };
  }

  handleChange = (event) => {
    const { name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="ex. John Smith"
            onChange={this.handleChange}   
          />
          <input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="ex. Jsmith@gmail.com"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={this.state.password}
            placeholder="PASSWORD"
            onChange={this.handleChange}   
          />
          <button>SIGN-UP</button>
        </form>    
      </div>
    );
  }
}

export default CreateUser;

