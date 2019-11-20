import React from "react";
import { appendFile } from "fs";

class SignUp extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    const { email, password } = this.state;
    fetch("/newUser", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 200) {
        this.props.history.push("/");
        window.location.reload()
      }
    });
  };

  render() {
    return (
      <>
        <h1>Sign Up!</h1>
        <form onSubmit={this.onFormSubmit}>
          {/* <label htmlFor="sign_up_name">Name</label>
          <input type="text" id="sign_up_name" onChange={this.onInputChange} /> */}

          <label htmlFor="sign_up_email">Email</label>
          <input
            type="email"
            id="sign_up_email"
            name="email"
            onChange={this.onInputChange}
            required
          />

          <label htmlFor="sign_in_password">Password</label>
          <input
            type="password"
            id="sign_in_password"
            name="password"
            onChange={this.onInputChange}
            required
          />

          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default SignUp;
