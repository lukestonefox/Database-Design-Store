import React, { useState } from "react";

const Profile: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [balance] = useState<string>('');
    const [address1, setaddress1] = useState<string>('');
    const [address2, setaddress2] = useState<string>('');
    const [cardnumber, setcardnumber] = useState<string>('');
    const [expirationdate, setexpirationdate] = useState<string>('');
    const [cvv, setcvv] = useState<string>('');
    const [cardaddress, setcardaddress] = useState<string>('');


    return (
        <div className="flex flex-col space-y-5 h-screen items-center justify-center text-center">
            <div className="font-bold text-xl">Welcome, here is your account information:</div>
            <div className="flex flex-col space-y-5">
                <div className="flex flex-row space-x-5">
                    <p className="font-bold">Basic Information</p>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className={'inputContainer'}>
                        <p className="pb-5">Name</p>
                        <input
                            value={name}
                            placeholder="Aiden"
                            onChange={(ev) => setName(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                    <div className={'inputContainer'}>
                        <p className="pb-5">Password</p>
                        <input
                            value={password}
                            placeholder="1234"
                            onChange={(ev) => setPassword(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                    <div className={'inputContainer'}>
                        <p className="pb-5">Account balance</p>
                        <input
                            value={balance}
                            placeholder="1234"
                            className={'inputBox'}
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                <div className={'inputContainer'}>
                        <p className="pb-5">Primary Address</p>
                        <input
                            value={address1}
                            placeholder="7777 Something St."
                            onChange={(ev) => setaddress1(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                    <div className={'inputContainer'}>
                        <p className="pb-5">Secondary Address</p>
                        <input
                            value={address2}
                            placeholder="0000 Something Rd."
                            onChange={(ev) => setaddress2(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <p className="font-bold">Primary Credit Card</p>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className={'inputContainer'}>
                        <p className="pb-5">Credit Card Number</p>
                        <input
                            value={cardnumber}
                            placeholder="0000000000000000"
                            onChange={(ev) => setcardnumber(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                    <div className={'inputContainer'}>
                        <p className="pb-5">Expiration Date</p>
                        <input
                            value={expirationdate}
                            placeholder="00/00"
                            onChange={(ev) => setexpirationdate(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                    <div className={'inputContainer'}>
                        <p className="pb-5">CVV</p>
                        <input
                            value={cvv}
                            placeholder="000"
                            onChange={(ev) => setcvv(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className={'inputContainer'}>
                        <p className="pb-5">Address Linked to Credit Card</p>
                        <input
                            value={cardaddress}
                            placeholder="9999 Something Ln."
                            onChange={(ev) => setcardaddress(ev.target.value)}
                            className={'inputBox'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;