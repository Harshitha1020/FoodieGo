import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div>
            <h1>About Us Page</h1>
            <h3>You are studying through Namaste React</h3>
            {/* <User name={"Khem Chand"} location={"Delhi"}/> */}
            <UserClass />
        </div>
    )
}
export default About;