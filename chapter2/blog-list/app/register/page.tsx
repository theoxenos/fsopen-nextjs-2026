import {registerUser} from "@/app/actions/register";

const RegistrationPage = () => {
    const divStyle = {marginBottom: "1.5rem"}
    return (
        <div>
            <h2>Registration Page</h2>
            <form action={registerUser}>
                <div style={divStyle}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div style={divStyle}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div style={divStyle}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
};

export default RegistrationPage;