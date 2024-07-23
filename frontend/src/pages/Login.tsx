import React, { useState } from "react";

const Login: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const getLogin = () => {
        fetch('http://localhost:3000/getLoginInfo')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);
        return response.json();
      })
      .then(data => {

        console.log(data);
      })
      .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    return (
        <div className="flex flex-col space-y-5 h-screen items-center justify-center text-center">
            <h1 className='font-bold'>
                Welcome! Please log in.
            </h1>
            <div className={'inputContainer'}>
                <input
                    value={name}
                    placeholder="Enter your name here"
                    onChange={(ev) => setName(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="w-100"
                />
            </div>
            <div className={'inputContainer'}>
                <input className="px-4 py-2 text-white bg-blue-500 rounded-md" type="button" onClick={getLogin} value={'Log in'} />
            </div>
            <div>
                <p>Don't have an account? <a href="/createAccount" className="text-red-500">Create one!</a></p>
            </div>
        </div>

    )
}

export default Login;