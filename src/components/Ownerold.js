import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PlaceOrder from './PlaceOrder';
import Raisecomplaint from './Raisecomplaint';

function Owner({ username, setLoginStatus ,oid}) {
  const [owners, setOwners] = useState([]); // Fixed variable name

  useEffect(() => {
    axios.get("http://localhost:9000/api/owner/getmaintainence/" + oid)
      .then(response => {
        setOwners(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const logout = () => {
    setLoginStatus(false)
  }

  const updatestatus = () => {

    axios.post("http://localhost:9000/api/owner/updatepaymentstatus", { username: username })
      .then(response => {
        alert("Payment status updated!!!")
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-200 p-8 rounded-lg shadow-lg">
     
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Maintenance Details
      </h2>
      <div className="space-y-8">
        {owners && owners.length > 0 ? (
          owners.map((owner, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Maintenance of :- {owner.ofname} {owner.olname}
              </h3>
              <div className="flex flex-wrap gap-6">
                {owner.maintainence && owner.maintainence.length > 0 ? (
                  owner.maintainence.map((m, idx) => (
                    <div
                      key={idx}
                      className="w-full p-4 border rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg hover:scale-105 transition-transform"
                    >
                      <h4 className="text-lg font-bold text-blue-600 mb-3">
                        Payment #{idx + 1}
                      </h4>
                      <div className="flex flex-wrap justify-between items-start text-center">
                        <div className="flex flex-col w-1/7">
                          <span className="font-medium text-gray-700">
                            Payment Date
                          </span>
                          <span className="text-gray-800">{m.paymentdate}</span>
                        </div>
                        <div className="flex flex-col w-1/7">
                          <span className="font-medium text-gray-700">Amount</span>
                          <span className="text-gray-800">{m.amount}</span>
                        </div>
                        <div className="flex flex-col w-1/7">
                          <span className="font-medium text-gray-700">Year</span>
                          <span className="text-gray-800">{m.year}</span>
                        </div>
                        <div className="flex flex-col w-1/7">
                          <span className="font-medium text-gray-700">
                            Mode of Payment
                          </span>
                          <span className="text-gray-800">{m.modeofpayment}</span>
                        </div>
                        <div className="flex flex-col w-1/7">
                          <span className="font-medium text-gray-700">Status</span>
                          <span
                            className={`px-2 py-1 rounded text-sm ${m.estatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                              }`}
                          >
                            {m.estatus}
                          </span>
                        </div>
                        <div className="flex flex-col w-1/7">
                          <span className="font-medium text-gray-700">
                            Description
                          </span>
                          <span className="text-gray-800">{m.paymentdescription}</span>
                        </div>
                        <button
                          onClick={updatestatus}
                          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Pay Now
                        </button>
                      </div>
                      {/* <div className="mt-4 text-center">
                        <PlaceOrder amount={m.amount} />
                        
                      </div> */}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No maintenance records available.</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No owner data available.</p>
        )}
      </div>
      <Raisecomplaint oid={oid}/>
      
    </div>

  );
}

export default Owner;
