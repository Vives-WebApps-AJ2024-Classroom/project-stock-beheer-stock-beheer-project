import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Fixed username and password
        const fixedUsername = 'test';
        const fixedPassword = 'test';

        if (username === fixedUsername && password === fixedPassword) {
            // Simulate successful login and navigation to the orders page
            localStorage.setItem('token', 'fake-token'); // This would typically be replaced with a real token
            alert('Login Successful');
            navigate('/order'); // Redirect to the orders page
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
 