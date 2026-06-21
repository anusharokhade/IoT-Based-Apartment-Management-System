import React, { useEffect, useRef, useState } from "react";
import UpdateFlatOwner from "./UpdateFlatOwner";
import axios from "axios";
import "../output.css";

const AddOwner = () => {

  const [formData, setFormData] = useState({
    oid: "",
    ofname: "",
    olname: "",
    ogender: "",
    ocellno: "",
    oemail: "",
    Login: "",
    Password: "",
    Adesignation: "Owner",
    famcount: "",
    flatno: "",
    floorno: "",
    wing: "",
    maintainence: [],
    Messages: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/admin/getoidcount")
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          oid: response.data[0].oidcounter + 1,
        }));
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/admin/addowner",
        formData
      );
      alert("Owner added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding owner:", error);
      alert("Failed to add owner. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-t from-blue-600 to-white px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10 max-w-4xl w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mb-6 text-center">
          Add New Owner
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner ID (OID)
              </label>
              <input
                type="text"
                name="oid"
                value={formData.oid}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="ofname"
                value={formData.ofname}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="olname"
                value={formData.olname}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="ogender"
                value={formData.ogender}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cell No
              </label>
              <input
                type="text"
                name="ocellno"
                value={formData.ocellno}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="oemail"
                placeholder="gmail id"
                value={formData.oemail}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Login
              </label>
              <input
                type="text"
                name="Login"
                placeholder="Enter flat No."
                value={formData.Login}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Family Count
              </label>
              <input
                type="text"
                name="famcount"
                value={formData.famcount}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Flat No
              </label>
              <input
                type="text"
                name="flatno"
                value={formData.flatno}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wing</label>
              <input
                type="text"
                name="wing"
                value={formData.wing}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Floor Number</label>
              <input
                type="text"
                name="floorno"
                value={formData.floorno}
                onChange={handleChange}
                required
                className="mt-2 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Add Owner
          </button>
        </form>
      </div>
      <div className="w-full max-w-4xl mt-8">
        <UpdateFlatOwner />
      </div>
    </div>
  );
};

export default AddOwner;
