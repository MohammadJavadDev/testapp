import React from "react";

const SectorsSelect = ({ sectors, onChange }) => (
  <select multiple size="5" onChange={onChange}>
    {sectors.map((sector, index) => (
      <option key={index} value={sector.id}>
        {sector.name}
      </option>
    ))}
  </select>
);

export default SectorsSelect;
