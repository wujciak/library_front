import React from 'react';
import './LoginForm.css'

function LoginForm() {
    return (
        <div>
            <form className="login-form" >
                <label>
                    Username:
                    <input type="text" name="username" placeholder="Username" />
                </label>
                <label>
                    Password:
                    <input type="text" name="password" placeholder="Password" />
                </label>
                <input type="submit" value="Sign in" />
            </form>
        </div>
    );
}

export default LoginForm;