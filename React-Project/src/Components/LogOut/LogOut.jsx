import React from "react";
import { Redirect } from 'react-router-dom';


class LogOut extends React.Component {

	componentDidMount() {
		this.props.signOut()
	}
	
	render() {
		return <Redirect to="/signIn" />
	}
}

export default LogOut;