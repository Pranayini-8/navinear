import { useState } from "react";

const OfficeHours = () => {
  const officeHours = [
    { name: "Dr. Smith", time: "Mon & Wed: 10:00 AM - 12:00 PM" },
    { name: "Prof. Johnson", time: "Tue & Thu: 2:00 PM - 4:00 PM" },
    { name: "Dr. Lee", time: "Wed & Fri: 3:00 PM - 5:00 PM" },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOfficeHours = officeHours.filter((entry) => {
    return (
      (filter === "All" || entry.time.includes(filter)) &&
      entry.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl text-blue-600 font-bold mb-4">
        Professor Office Hours
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search professor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded-lg w-full mb-2"
      />

      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded-lg w-full mb-4"
      >
        <option value="All">All Times</option>
        <option value="Mon & Wed">Monday & Wednesday</option>
        <option value="Tue & Thu">Tuesday & Thursday</option>
        <option value="Wed & Fri">Wednesday & Friday</option>
      </select>

      {/* Office Hours List */}
      <ul className="bg-yellow-100 p-4 rounded-lg shadow-md">
        {filteredOfficeHours.length > 0 ? (
          filteredOfficeHours.map((entry, index) => (
            <li key={index} className="text-lg text-blue-700">
              {entry.name} - {entry.time}
            </li>
          ))
        ) : (
          <li className="text-lg text-red-500">No matches found</li>
        )}
      </ul>
    </div>
  );
};

export default OfficeHours;
