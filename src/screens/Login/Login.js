import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authActions, authSelectors } from "../../store/authSlice";
import "./Login.css";

function validateInputs(email, password) {
	return ((password.length >= 4) && (email.match(/.+@.+\..+/)))
}

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const error = useSelector(authSelectors.error);
	const dispatch = useDispatch();

	const doLogin = (e) => {
		e.preventDefault();
		dispatch(authActions.login({ email, password }));
	}

	return <section>
		<form id="login">
			<h2>Login</h2>
			<div>
				<label>Email:</label>
				<input type="email" value={email} onChange={(e) => { setEmail(e.target.value);}} />
			</div>
			<div>
				<label>Password:</label>
				<input type="password" value={password} onChange={(e) => { setPassword(e.target.value);}} />
			</div>
			<button type="submit" disabled={!validateInputs(email, password)} onClick={doLogin}>Login</button>
			{error && <div className="loginError">{error}</div>}
		</form>
	</section>
}

export default Login;