import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";

const App = () => {
  const [sectors, setSectors] = useState([
    { value: "manufacturing", label: "Manufacturing" },
    { value: "constructionMaterials", label: "Construction materials" },
    // ... add other sectors
  ]);

  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Load sectors from the database (in this case, just using state)
    // In a real-world scenario, this would come from an API or a database.
    setSectors([
      { value: "manufacturing", label: "Manufacturing" },
      { value: "constructionMaterials", label: "Construction materials" },
      // ... add other sectors
    ]);

    // Load user data from the database (mocked with localStorage)
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleSave = (data) => {
    // Set the user data to trigger a re-render
    setUserData(data);

    // Set edit mode to allow user to edit during the session
    setEditMode(true);
  };

  return (
    <div>
      <h2>User Form</h2>
      <UserForm onSave={handleSave} sectors={sectors} user={userData} />
      {editMode && (
        <div>
          <h2>Edit Mode</h2>
          <UserForm onSave={handleSave} sectors={sectors} user={userData} />
        </div>
      )}
    </div>
  );
};

export default App;
