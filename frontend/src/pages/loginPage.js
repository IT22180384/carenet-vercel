import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Update the path to firebaseConfig.js

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Logged in user:', userCredential.user);
                // Redirect or perform additional actions after login
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                setError('Invalid email or password');
            });
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-white">
            <div className="grid gap-8">
                <div id="back-div" className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
                    <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                        <h1 className="pt-8 pb-6 font-bold text-5xl text-center">
                            Log in
                        </h1>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="mb-2 text-lg">Email</label>
                                <input
                                    id="email"
                                    className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="mb-2 text-lg">Password</label>
                                <input
                                    id="password"
                                    className="border p-3 shadow-md border-gray-300 rounded-lg w-full"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Link to="#" className="text-blue-400">Forgot your password?</Link>
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-500 mt-6 p-2 text-white rounded-lg w-full hover:scale-105 transition duration-300"
                                type="submit"
                            >
                                LOG IN
                            </button>
                        </form>
                        <div className="flex flex-col mt-4 items-center text-sm">
                            <h3>Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
