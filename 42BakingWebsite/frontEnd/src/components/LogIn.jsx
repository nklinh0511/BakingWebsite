import {useState} from 'react'

const LogIn = ({alreadyReg}) => {
    const [isLogin, setIsLogin] = useState(alreadyReg);
    console.log(isLogin);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { username, password, email };

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('User created:', data);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="grid place-items-center justify-items-center w-full max-w-full mt-10">
            <h2 className="font-titan text-color-6 text-4xl my-5">{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className="font-poppins grid place-items-center my-5">
                <div className="my-2">
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mx-2 rounded-md"
                        />
                    </label>
                </div>
                <div className="my-2">
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mx-2 rounded-md"
                        />
                    </label>
                </div >
                {!isLogin && (
                    <div className="my-2">
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mx-2 rounded-md"
                            />
                        </label>
                    </div>
                )}
                <button type="submit" className="place-items-center text-center bg-color-4 rounded-md p-2 my-2 hover:bg-color-7 hover:text-color-3">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} className="underline font-poppins">
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        </div>
    );
}

export default LogIn
