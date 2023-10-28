// src/components/Menu/Menu.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Menu = () => {
    const auth = useSelector((state) => state.auth);

    const [menus, setMenus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/menus')
        .then(response => {
            if (!response.ok) { throw new Error('Network response was not ok'); }
            return response.json();
        })
        .then(data => {
            setMenus(data.menus);
            setIsLoading(false);
        })
        .catch(error => {
            setError('Failed to fetch menus: ' + error.message);
            setIsLoading(false);
        });
    }, []);

    if (auth.user.role !== 'admin') {
        return <Redirect to="/dashboard" />;
    }

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return <span>Error: {error}</span>;
    }

    return (
        <div>
            <h2>Menus</h2>
            <ul>
                {menus.map(menu => (
                    <li key={menu.id}>
                        <a href={`/menu/${menu.id}`}>{new Date(menu.day).toDateString()}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
