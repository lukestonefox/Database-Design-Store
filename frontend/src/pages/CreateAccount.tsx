import React, { useState } from "react";

const CreateAccount: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [address1, setaddress1] = useState<string>('');
    const [address2, setaddress2] = useState<string>('');
    const [cardnumber, setcardnumber] = useState<string>('');
    const [expirationdate, setexpirationdate] = useState<string>('');
    const [cvv, setcvv] = useState<string>('');
    const [address, setaddress] = useState<string>('');

    const createAccount = () => {

        fetch('http://localhost:3000/creditcard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({cardnumber, expirationdate, cvv, address})
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then(data => {
            fetch('http://localhost:3000/customer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({customername: name, customerpassword: password, address1, address2, balance: 0, creditid1: data.creditid, creditid2: null})
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok')
                }
                if(response.ok) {
                    alert("You account was successfully created!");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    }

    return (
        <div className="flex flex-col space-y-5 h-screen items-center justify-center text-center">
            <h1 className='font-bold'>
                Please enter in the required information to create your account.<br />
                Fields with a <span>*</span> are required.
            </h1>
            <div className={'inputContainer'}>
                <p>Name*</p>
                <input
                    value={name}
                    placeholder="Aiden"
                    onChange={(ev) => setName(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <p>Password*</p>
                <input
                    value={password}
                    placeholder="1234"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <p>Primary Address*</p>
                <input
                    value={address1}
                    placeholder="7777 Something St."
                    onChange={(ev) => setaddress1(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <p>Secondary Address</p>
                <input
                    value={address2}
                    placeholder="0000 Something Rd."
                    onChange={(ev) => setaddress2(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <p>Credit Card Number*</p>
                <input
                    value={cardnumber}
                    placeholder="0000000000000000"
                    onChange={(ev) => setcardnumber(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <p>Expiration Date*</p>
                <input
                    value={expirationdate}
                    placeholder="00/00"
                    onChange={(ev) => setexpirationdate(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <p>CVV*</p>
                <input
                    value={cvv}
                    placeholder="000"
                    onChange={(ev) => setcvv(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <div className={'inputContainer'}>
                <p>Address linked to Credit Card*</p>
                <input
                    value={address}
                    placeholder="9999 Something Rd."
                    onChange={(ev) => setaddress(ev.target.value)}
                    className={'inputBox'}
                />
            </div>
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={createAccount}>
                Create Account
            </button>
        </div>
    )
}

export default CreateAccount;