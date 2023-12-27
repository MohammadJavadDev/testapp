import React, { useState, useEffect } from "react";
import SectorsSelect from "./SectorsSelect";

const UserForm = ({ onSave, sectors, user, editMode, onEdit }) => {
  const [name, setName] = useState(user?.name || "");
  const [sectorsId, setSectorsId] = useState(0);
  const [agree, setAgree] = useState(user?.agree || false);
  const [id, setId] = useState(user.id);

  const handleSave = () => {
    // Validation
    console.log(name, sectorsId, agree);
    if (!name || !sectorsId || !agree) {
      alert("All fields are mandatory");
      return;
    }

    // Save to database (mocked with localStorage)
    const userData = { name, sectorsId, agree };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Callback to parent component
    onSave(userData);
  };

  const handleEdit = () => {
    // Validation
    console.log(name, sectorsId, agree);
    if (!name || !sectorsId || !agree) {
      alert("All fields are mandatory");
      return;
    }

    // Save to database (mocked with localStorage)
    const userData = { name, sectorsId, agree, id };
    localStorage.setItem("userData", JSON.stringify(userData));

    // Callback to parent component
    onEdit(userData);
  };

  useEffect(() => {
    // Refill the form with stored data
    setName(user?.name || "");
    setSectorsId(user?.sectorsId || 0);
    setAgree(user?.agree || false);
    setId(user.id);
  }, [user]);

  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="hidden" value={id} />
      <br />
      <br />
      <label>Sectors:</label>
      <SectorsSelect
        sectors={sectors}
        onChange={(e) => {
          console.log(e);
          setSectorsId(e.target.value);
        }}
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
      <button onClick={editMode ? handleEdit : handleSave}>
        {editMode ? "Edit" : "Save"}
      </button>
    </div>
  );
};

export default UserForm;
