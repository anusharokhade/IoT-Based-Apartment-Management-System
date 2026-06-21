import React, { useEffect, useRef, useState } from 'react'
import '../myStyles/employee.css'
import axios from 'axios'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function Employee() {
    const [employees, setEmployee] = useState([])
    const [financialyear, setFinancialyear] = useState()
    const month = useRef("")
    const year = useRef("")
    const amount = useRef("")
    const sstatus = useRef("")
    const saldate = useRef("")

    useEffect(() => {
        axios.get("http://localhost:9000/api/secretary/getfinancialyear")
            .then(response => {
                setFinancialyear(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        if (!financialyear) return;
        axios.get("http://localhost:9000/api/secretary/getallemployees/" + financialyear)
            .then(response => {
                setEmployee(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [financialyear])
    const makesalary = (empid) => {
        let month1 = month.current.value
        let year1 = year.current.value
        let amount1 = amount.current.value
        let sstatus1 = sstatus.current.value
        let saldate1 = saldate.current.value
        if (month1 === "" || year1 === "" || amount1 === "" || sstatus1 === "" || saldate1 === "")
            alert("All fields are compulsory")
        else {
            const payload = {
                month: month1,
                year: year1,
                amount: amount1,
                sstatus: sstatus1,
                saldate: saldate1
            }
            axios.post("http://localhost:9000/api/secretary/generatesalarydetails", { payload, empid })
                .then(response => {
                    alert("Changes added successfully!!")
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f4f7fc',
                width: '1400px',
                padding: '20px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
            <div style={{ flex: 2 }}>
                <h2 style={{ color: '#4A90E2', textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>
                    Employee Details
                </h2>
                <ul
                    style={{
                        listStyle: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        borderRadius: '5px',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                    }}>
                    <li style={{ width: '90px' }}>EMP_ID</li>
                    <li style={{ width: '150px' }}>NAME</li>
                    <li style={{ width: '110px' }}>GENDER</li>
                    <li style={{ width: '130px' }}>CELL_NUM</li>
                    <li style={{ width: '150px' }}>AADHAR_NUM</li>
                    <li style={{ width: '120px' }}>ADDRESS</li>
                    <li style={{ width: '140px', textAlign: 'center' }}>ACTIONS</li>
                </ul>
                <div>
                    {employees.map((employee) => (
                        <div
                            key={employee.empid}
                            style={{
                                backgroundColor: '#fff',
                                padding: '15px',
                                margin: '10px 0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '14px',
                                    color: 'blue',
                                    marginBottom: '10px',
                                }}>
                                <li style={{ width: '90px' }}>{employee.empid}</li>
                                <li style={{ width: '150px' }}>{employee.empname}</li>
                                <li style={{ width: '110px' }}>{employee.empgender}</li>
                                <li style={{ width: '130px' }}>{employee.empcellno}</li>
                                <li style={{ width: '150px' }}>{employee.empaadhaarno}</li>
                                <li style={{ width: '120px' }}>{employee.empaddress}</li>
                                <div style={{ width: '140px', textAlign: 'center' }}>
                                    <button
                                        onClick={() => makesalary(employee.empid)}
                                        style={{
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            padding: '8px 16px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                        }}>Make Salary
                                    </button>
                                </div>
                            </ul>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    backgroundColor: '#17a2b8',
                                    color: 'white',
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                }}>
                                <li style={{ width: '90px' }}>MONTH</li>
                                <li style={{ width: '110px' }}>YEAR</li>
                                <li style={{ width: '110px' }}>STATUS</li>
                                <li style={{ width: '130px' }}>SALARY DATE</li>
                                <li style={{ width: '110px' }}>AMOUNT</li>
                            </ul>
                            {employee.empsalarydet.map((salary) => (
                                <ul
                                    key={salary.month + salary.year}
                                    style={{
                                        listStyle: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px',
                                        color: 'black',
                                        borderBottom: '1px solid #e0e0e0',
                                        fontSize: '14px',
                                    }}>
                                    <li style={{ width: '90px' }}>{salary.month}</li>
                                    <li style={{ width: '110px' }}>{salary.year}</li>
                                    <li style={{ width: '110px' }}>{salary.sstatus}</li>
                                    <li style={{ width: '130px' }}>{salary.saldate}</li>
                                    <li style={{ width: '110px' }}>{salary.amount}</li>
                                </ul>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex 3', flexDirection: 'column', width: '430px' }}>
                <h2 style={{ color: '#4A90E2', textAlign: 'center', marginBottom: '20px', fontSize: '24px' }}>
                    Enter Salary Details
                </h2>
                <div
                    style={{
                        backgroundColor: '#DFFFD6',
                        padding: '19px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        flex: '0 0 400px',
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <select
                            ref={month}
                            className="form-select"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}>
                            <option selected>Enter salary month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        <select
                            ref={year}
                            className="form-select"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}>
                            <option selected>Enter salary year</option>
                            <option>2020-21</option>
                            <option>2021-22</option>
                            <option>2022-23</option>
                            <option>2023-24</option>
                            <option>2024-25</option>
                            <option>2025-26</option>
                            <option>2026-27</option>
                            <option>2027-28</option>
                        </select>
                        <input
                            type="text"
                            ref={amount}
                            className="form-control"
                            placeholder="Enter salary amount"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }} />
                        <select
                            ref={sstatus}
                            className="form-select"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}>
                            <option selected>Enter salary status</option>
                            <option>Pending</option>
                            <option>Approved</option>
                        </select>
                        <label style={{ fontSize: '18px', color: '#333' }}>Enter salary date</label>
                        <input
                            type="date"
                            ref={saldate}
                            className="form-control"
                            style={{
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Employee;