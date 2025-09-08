import './Login.css';
import { useContext, useState } from 'react';
import bcrypt from "bcryptjs";
import { AppContext } from '../main.tsx';
import type { AppContextType } from '../main.tsx';
import { useNavigate } from 'react-router-dom';


function Login() {
    const { username, setUsername, isLoggedIn, setIsLoggedIn } = useContext(AppContext) as AppContextType;
    const [password, setPassword] = useState('');
    // const [hashedPassword, setHashedPassword] = useState('');
    const navigate = useNavigate();

    function handleSignUp() {
        navigate('/signup')
    }
    function handleSubmit() {
        if (!username || !password) {
            alert('Please enter username and password');
        }
        fetch(`http://localhost:8080/user_table/username/${username}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Username not found");
                } else {
                    return res.json();
                }
            })
            .then(user => {
                console.log(user)
                bcrypt.compare(password, user[0].password, function (err, result) {
                    if (err) {
                        console.log('Error comparing passwords:', err);
                    } else {
                        console.log('Password match: ', result);
                        if (!result) {
                            alert("incorect password")
                        } else {
                            setIsLoggedIn(true)
                            // localStorage.setItem('username', username);
                            localStorage.setItem('user', JSON.stringify(user[0]));
                            navigate('/items')
                        }
                    }
                });
            });
        return
    }

    function handleAllItems() {
        navigate('/')
    }
    return (
        <>
            <div>
                <h1>Inventory Manager</h1>
            </div>
            <div>
                <h3>Login:</h3>
                <input type="text" name="username" placeholder=" Enter Username " onChange={e => setUsername(e.target.value)}></input>
                <input type="password" name="password" placeholder=" Enter Password " onChange={e => setPassword(e.target.value)}></input>
                <div>
                    <button onClick={() => handleSignUp()}>Sign Up</button>
                    <button onClick={() => handleSubmit()}>Submit</button>
                    <button onClick={() => handleAllItems()}>Browse all Items</button>
                </div>
            </div>
        </>
    )
}

export default Login