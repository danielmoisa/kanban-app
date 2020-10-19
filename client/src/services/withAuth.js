import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default function withAuth(ComponentToProtect) {
	return class extends Component {
		constructor() {
			super();
			let cookieValue = document.cookie.replace(
				/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
				"$1"
			);

			this.state = {
				loading: true,
				redirect: false,
				accessToken: cookieValue,
			};
		}
		componentDidMount() {
			// fetch("http://localhost:4000/checkToken")
			//   .then((res) => {
			//     if (res.status === 200) {
			//       this.setState({ loading: false });
			//     } else {
			//       const error = new Error(res.error);
			//       throw error;
			//     }
			//   })
			//   .catch((err) => {
			//     console.error(err);
			//     this.setState({ loading: false, redirect: true });
			//   });
		}
		render() {
			console.log(this.state);
			if (!this.state.accessToken) {
				return <Redirect to="login" />;
			}

			return <ComponentToProtect {...this.props} />;
		}
	};
}
