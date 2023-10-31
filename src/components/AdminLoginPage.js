import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),

                // body: JSON.stringify({ username: email, password }),

                // body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            

            const data = await response.json();

            if (data.isAuthenticated) {
                history.push('/admin-dashboard'); // Redirect to admin dashboard
            } else {
                setErrors(prevErrors => [...prevErrors, "Authentication Failed"]);
            }
        } catch (error) {
            setErrors(prevErrors => [...prevErrors, error.message]);
        }
    }

    return (
        <div>
            <h2>Admin Login</h2>
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

export default AdminLoginPage;
