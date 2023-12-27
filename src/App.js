import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";

const App = () => {
  const [sectors, setSectors] = useState([]);

  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await fetch("https://localhost:7125/Sectors");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setSectors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  const handleSave = (data) => {
    // Set the user data to trigger a re-render
    setUserData(data);

    fetch("https://localhost:7125/AcceptForm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful response
        console.log("Success:", data);
        setUserData(data);
        setEditMode(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

    // Set edit mode to allow user to edit during the session
  };

  const handleEdit = (data) => {
    // Set the user data to trigger a re-render
    setUserData(data);

    fetch("https://localhost:7125/AcceptForm", {
      method: "Put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful response
        console.log("Success:", data);
        setUserData(data);
        setEditMode(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

    // Set edit mode to allow user to edit during the session
  };

  return (
    <div>
      <h2>User Form</h2>
      <UserForm onSave={handleSave} sectors={sectors} user={userData} />
      {editMode && (
        <div>
          <h2>Edit Mode</h2>
          <UserForm
            sectors={sectors}
            user={userData}
            editMode={true}
            onEdit={handleEdit}
          />
        </div>
      )}
    </div>
  );
};

export default App;
