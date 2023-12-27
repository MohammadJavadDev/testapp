import React, { useState, useEffect } from "react";
import SectorsSelect from "./SectorsSelect";

const UserForm = ({ onSave, sectors, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [selectedSectors, setSelectedSectors] = useState(user?.sectors || []);
  const [agree, setAgree] = useState(user?.agree || false);

  const handleSave = () => {
    // Validation
    if (!name || selectedSectors.length === 0 || !agree) {
      alert("All fields are mandatory");
      return;
    }

    // Save to database (mocked with localStorage)
    const userData = { name, sectors: selectedSectors, agree };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Callback to parent component
    onSave(userData);
  };

  useEffect(() => {
    // Refill the form with stored data
    setName(user?.name || "");
    setSelectedSectors(user?.sectors || []);
    setAgree(user?.agree || false);
  }, [user]);

  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <label>Sectors:</label>
      <SectorsSelect
        sectors={sectors}
        onChange={(e) =>
          setSelectedSectors(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
      />
      <br />
      <br />
      <label>
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
        />
        Agree to terms
      </label>
      <br />
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserForm;
