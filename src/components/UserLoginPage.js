import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleLogin = async () => {
        // Your API call logic to login admin goes here.
        // I'm mocking an example for simplicity:

        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.isAuthenticated) {
            history.push('/admin-dashboard'); // Redirect to admin dashboard or any other admin-specific page
        } else {
            setErrors([...errors, "Authentication Failed"]);
        }
    }

    return (
        <div>
            <h2>Admin Login</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            {errors.map((error, index) => <p key={index} style={{ color: 'red' }}>{error}</p>)}
        </div>
    );
}

export default AdminLoginPage;
