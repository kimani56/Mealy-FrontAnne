import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function UserLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleLogin = async () => {
      

        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.isAuthenticated) {
            history.push('/user-dashboard'); 
        } else {
            setErrors([...errors, "Authentication Failed"]);
        }
    }

    return (
        <div>
            <h2>User Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            {errors.map((error, index) => <p key={index} style={{ color: 'red' }}>{error}</p>)}
        </div>
    );
}

export default UserLoginPage;
