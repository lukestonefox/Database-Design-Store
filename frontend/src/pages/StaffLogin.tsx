import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Login: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { role, setRole } = useUserContext();

    const getLogin = () => {
        fetch('http://localhost:3000/staffLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({staffname: name, staffpassword: password})
        })
      .then(response => {
        if (!response.ok) {
            setErrorMessage('Invalid login credentials');
            throw new Error('Network response was not ok');
        }
        setErrorMessage('');
        setRole('staff');
        console.log(response);
        return response.json();
      })
      .then(data => {

        console.log(data);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen gap-y-5 bg-slate-100">
            <Link to="/login" className="absolute top-4 right-4">To Customer Login</Link>
            <div className="flex flex-col items-center justify-center gap-4 p-10 text-xl text-center bg-gray-200 rounded-lg ">
                <h1 className='font-semibold'>Staff Login</h1>
                <input
                    value={name}
                    placeholder="Enter your name here"
                    onChange={(ev) => setName(ev.target.value)}
                    className="w-full bg-inherit"
                />
                <input
                    value={password}
                    placeholder="Enter your password here"
                    type="password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="w-full bg-inherit"
                />
                {errorMessage.length > 0 && <p className="px-4 py-2 text-red-500 bg-red-100 rounded-md px-auto">{errorMessage}</p>}
                <div className={'inputContainer'}>
                    <button className="px-4 py-2 text-white duration-200 bg-red-500 rounded-md hover:bg-red-600" onClick={getLogin}>Log In</button>
                </div>
            </div>
        </div>

    )
}

export default Login;