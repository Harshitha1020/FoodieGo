import React from "react";
import { UserContext } from "./UserContext"; // Use named import

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      count: 0,
      count2: 2,
      userInfo: {
        name: "dummy",
        location: "dummy",
        avatar_url: "", // Add avatar_url to initial state
      },
    };
  }

  async componentDidMount() {
    // Fetch user data from GitHub API
    const data = await fetch("https://api.github.com/users/Khemchand7");
    const json = await data.json();
    this.setState({ userInfo: json });
  }

  render() {
    const { count, count2, userInfo } = this.state;
    const { name, location, avatar_url } = userInfo;

    return (
      <div className="user-card">
        <h1>Count: {count}</h1>
        <button
          onClick={() => {
            // Use functional setState to ensure correct updates
            this.setState((prevState) => ({
              count: prevState.count + 1,
              count2: prevState.count2 + 2,
            }));
          }}
        >
          Increase Count
        </button>

        <h1>Count2: {count2}</h1>
        <div>
          Logged In User:
          <UserContext.Consumer>
            {(data) => <h2>{data.loggedInUser}</h2>}
          </UserContext.Consumer>
        </div>
        {/* Render user avatar */}
        <img src={avatar_url} alt="User Avatar" style={{ width: "100px", borderRadius: "50%" }} />
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: khemchandk360@gmail.com</h4>
      </div>
    );
  }
}

export default UserClass;