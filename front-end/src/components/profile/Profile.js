import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./Profile.css";

/**
 * A React component that represents a user's profile page
 * NOTE: currently filled with placeholders for user information
 * @returns The contents of this component, in JSX form.
 */

const Profile = () => {
  return (
    <div className="profile">
      <header className="profile-header">
        <div className="page-info">
          <img src="logo" alt="profile-picture" />
          <h1 className="username">Lisa_Li</h1>

          <ol className="profile-stats">
            <li>63 Posts</li>
            <li>509 Followers</li>
            <li>264 Following</li>
          </ol>
        </div>

        <div className="user-info">
          <p className="style">Streetwear</p>
          <p className="favorite-thrift">Urban Jungle</p>
          <p className="bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>
      </header>
    </div>
  );
};
export default Profile;