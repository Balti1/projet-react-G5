import React, { useEffect, useState } from "react";
import { auth, signOut, database } from "./Firebase";
import { get, ref } from "firebase/database";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch user profile when the component mounts
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Accessing basic profile information directly from user.providerData
          const basicProfile = user.providerData[0];

          // Fetch additional user information from the Realtime Database
          const snapshot = await get(ref(database, `clients/${user.uid}`));
          const userData = snapshot.val();

          setUserProfile({
            displayName: userData.username || basicProfile.displayName,
            email: basicProfile.email,
            // Add other profile properties as needed
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // You can add additional logic after logout if needed
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="profile-container">
      {userProfile ? (
        <div>
          <h2>Welcome, {userProfile.displayName || userProfile.email}!</h2>
          {/* Additional profile information can be displayed here */}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
