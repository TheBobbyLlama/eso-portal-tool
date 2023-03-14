import { useState } from "react";
import { useSelector } from "react-redux";

import { authSelectors } from "../../store/authSlice";
import "./Login.css";

function validateInputs(email, password) {
	return ((password.length >= 4) && (email.match(/.+@.+\..+/)))
}

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const error = useSelector(authSelectors.error);

	return <section id="login">
		<h2>Login</h2>
		<div>
			<label>Email:</label>
			<input type="text" value={email} onChange={(e) => { setEmail(e.target.value);}} />
		</div>
		<div>
			<label>Password:</label>
			<input type="password" value={password} onChange={(e) => { setPassword(e.target.value);}} />
		</div>
		<button disabled={!validateInputs(email, password)}>Login</button>
		{error && <div className="loginError">{error}</div>}
	</section>
}

export default Login;