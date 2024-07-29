import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

const Profile: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [balance, setbalance] = useState<number>();
    const [salary, setSalary] = useState<number>();
    const [address1, setaddress1] = useState<string>('');
    const [address2, setaddress2] = useState<string>('');
    const [jobtitle, setjobtitle] = useState<string>('');
    const [creditid1, setcreditid1] = useState<string>('');
    const [cardnumber, setcardnumber] = useState<string>('');
    const [expirationdate, setexpirationdate] = useState<string>('');
    const [cvv, setcvv] = useState<string>('');
    const [cardaddress, setcardaddress] = useState<string>('');
    const { role, setRole } = useUserContext();

    useEffect(() => {
        const fetchCustomer = async (customerid: number) => {
            fetch(`http://localhost:3000/customer/${customerid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json();
            })
            .then(data => {
                setName(data.customername);
                setPassword(data.customerpassword);
                setbalance(data.balance);
                setaddress1(data.address1);
                if(data.address2 != null)
                    setaddress2(data.address2);
                fetch(`http://localhost:3000/creditcard/${data.creditid1}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json();
                })
                .then(data2 => {
                    setcardnumber(data2.cardnumber);
                    setexpirationdate(data2.expirationdate);
                    setcvv(data2.cvv);
                    setcardaddress(data2.address);
                })
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
        }

        const fetchStaff = async (staffid: number) => {
            fetch(`http://localhost:3000/staff/${staffid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json();
            })
            .then(data => {
                setName(data.staffname);
                setPassword(data.staffpassword);
                setaddress1(data.address)
                setSalary(data.salary);
                setjobtitle(data.jobtitle);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
        }
        if (role == 'customer') {
            fetchCustomer(1);
        } else {
            fetchStaff(1);
        }
    }, [])
    
    
    const updateProfile = () => {
        if (name == '' || password == '') {
            alert("WARNING: Name/password cannot be empty! Please fix this before updating information!")
            return;
        }
        fetch(`http://localhost:3000/customer/${1}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({customername: name, customerpassword: password, address1, address2, balance, creditid1: 1, creditid2: null})
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        /*
        .then(data => {
            console.log(data);
        })
        */
        .catch(error => console.error('There was a problem with the fetch operation:', error));
        fetch(`http://localhost:3000/creditcard/${1}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cardnumber, expirationdate, cvv, address: cardaddress})
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        /*
        .then(data => {
            console.log(data);
        })
        */
        .catch(error => console.error('There was a problem with the fetch operation:', error));
        alert("Information successfully updated!");
    }

    if(role == 'staff') {
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
                                placeholder="No Name"
                                className={'inputBox'}
                                readOnly
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">Password</p>
                            <input
                                value={password}
                                placeholder="No password"
                                className={'inputBox'}
                                readOnly
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">Salary</p>
                            <input
                                value={salary}
                                placeholder="No salary"
                                className={'inputBox'}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div className={'inputContainer'}>
                            <p className="pb-5">Address</p>
                            <input
                                value={address1}
                                placeholder="No address"
                                className={'inputBox'}
                                readOnly
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">Job Title</p>
                            <input
                                value={jobtitle}
                                placeholder="No job title"
                                className={'inputBox'}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
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
                                placeholder="No Name"
                                onChange={(ev) => setName(ev.target.value)}
                                className={'inputBox'}
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">Password</p>
                            <input
                                value={password}
                                placeholder="No password"
                                onChange={(ev) => setPassword(ev.target.value)}
                                className={'inputBox'}
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">Balance</p>
                            <input
                                value={balance}
                                placeholder="No balance"
                                className={'inputBox'}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5">
                    <div className={'inputContainer'}>
                            <p className="pb-5">Primary Address</p>
                            <input
                                value={address1}
                                placeholder="No address"
                                onChange={(ev) => setaddress1(ev.target.value)}
                                className={'inputBox'}
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">Secondary Address</p>
                            <input
                                value={address2}
                                placeholder="No secondary address"
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
                                placeholder="No card number"
                                onChange={(ev) => setcardnumber(ev.target.value)}
                                className={'inputBox'}
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">Expiration Date</p>
                            <input
                                value={expirationdate}
                                placeholder="No expiration date"
                                onChange={(ev) => setexpirationdate(ev.target.value)}
                                className={'inputBox'}
                            />
                        </div>
                        <div className={'inputContainer'}>
                            <p className="pb-5">CVV</p>
                            <input
                                value={cvv}
                                placeholder="No cvv"
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
                                placeholder="No card address"
                                onChange={(ev) => setcardaddress(ev.target.value)}
                                className={'inputBox'}
                            />
                        </div>
                    </div>
                </div>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={updateProfile}>
                    Update Profile
                </button>
            </div>
        )
    }
}

export default Profile;