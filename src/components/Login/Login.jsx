import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { login, signup } from '../../firebase';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error handling state
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Initialize navigate

  const user_auth = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading to true

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      // Redirect to QLMT page after successful authentication
      navigate('/qlmt');
    } catch (err) {
      setError(err.message); // Display error message
    } finally {
      setLoading(false); // Set loading to false after process completes
    }
  };

  return (
    <div className='login'>
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder='Your name'
              required
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email'
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password'
            required
          />
          {error && <p className="error-message">{error}</p>}
          {loading ? (
            <div className="spinner"></div> // Display loading spinner
          ) : (
            <button type='submit'>{signState}</button>
          )}
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to the system? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
