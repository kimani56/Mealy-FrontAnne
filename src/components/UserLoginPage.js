import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const UserLoginPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data)
             // Log the response data for debugging
            
    
            if (data["access-token"]) {
                console.log(data["access-token"]);
                localStorage.setItem('access-token', data.access_token);
            }
    
        console.log(data.message); // Log the message and role
    
            if (data.message === 'Logged in successfully') {
                if (data.role === 'customer') {
                    
                    history.push('/customer-dashboard');
                } else {
                    // Handle the absence of the role attribute or other roles
                    setErrors(prevErrors => [...prevErrors, "Authentication Failed"]);
                }
            } else {
                setErrors(prevErrors => [...prevErrors, "Authentication Failed"]);
            }
        } catch (error) {
            setErrors(prevErrors => [...prevErrors, error.message]);
        }
    }

    return (
        <div>
            <h2>User Login</h2>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Login</button>
            {errors.map((error, index) =>
                <p key={index} style={{ color: 'red' }}>{error}</p>
            )}
        </div>
    );
}

export default UserLoginPage;
