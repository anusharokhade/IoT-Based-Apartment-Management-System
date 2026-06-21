import React, { useEffect, useRef, useState } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function Ownerpayment() {
    const [owners, setOwners] = useState([])
    const paymentdate = useRef("")
    const amount = useRef("")
    const year = useRef("")
    const estatus = useRef("")
    const modeofpayment = useRef("")
    const paymentdescription = useRef("")
    useEffect(() => {
        axios.get("http://localhost:9000/api/owner/getallowners")
            .then(response => {
                setOwners(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [owners])
    const makepayment = (oid) => {
        let paymentdate1 = paymentdate.current.value
        let amount1 = amount.current.value
        let year1 = year.current.value
        let estatus1 = estatus.current.value
        let modeofpayment1 = modeofpayment.current.value
        let paymentdescription1 = paymentdescription.current.value
        if (paymentdate1 === "" || amount1 === "" || year1 === "" || estatus1 === "" || modeofpayment1 === "" || paymentdescription1 === "")
            alert("All fields are compulsory")
        else {
            const payload1 = {
                paymentdate: paymentdate1,
                amount: amount1,
                year: year1,
                estatus: estatus1,
                modeofpayment: modeofpayment1,
                paymentdescription: paymentdescription1
            }
            axios.post("http://localhost:9000/api/owner/generatemaintainencedetails", { payload1, oid })
                .then(response => {
                    alert("Maintainence details saved!!")
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#007BFF', textAlign: 'center', marginBottom: '20px' }}>Owner Info</h1>
            <div
                style={{
                    backgroundColor: '#F8F9FA',
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: '10px',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    gap: '20px',
                }}
            >
                {/* Define cellStyle */}
                {(() => {
                    const cellStyle = {
                        padding: '10px',
                        borderBottom: '1px solid #ddd',
                        textAlign: 'left',
                    };

                    return (
                        <>
                            {/* Owner Info Table */}
                            <div
                                style={{
                                    flex: 2, // 2:1 ratio adjustment
                                    overflowX: 'auto',
                                    padding: '10px',
                                    backgroundColor: '#E9F7FE',
                                    borderRadius: '10px',
                                }}
                            >
                                <table
                                    style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <thead>
                                        <tr
                                            style={{
                                                backgroundColor: '#007BFF',
                                                color: 'white',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <th style={{ padding: '10px', fontWeight: 'bold' }}>OID</th>
                                            <th style={{ padding: '10px', fontWeight: 'bold' }}>First Name</th>
                                            <th style={{ padding: '10px', fontWeight: 'bold' }}>Last Name</th>
                                            <th style={{ padding: '10px', fontWeight: 'bold' }}>Gender</th>
                                            <th style={{ padding: '10px', fontWeight: 'bold' }}>Cell No.</th>
                                            <th style={{ padding: '10px', fontWeight: 'bold' }}>Email</th>
                                            <th style={{ padding: '10px', fontWeight: 'bold' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {owners.map((owner) => (
                                            <React.Fragment key={owner.oid}>
                                                <tr>
                                                    <td style={cellStyle}>{owner.oid}</td>
                                                    <td style={cellStyle}>{owner.ofname}</td>
                                                    <td style={cellStyle}>{owner.olname}</td>
                                                    <td style={cellStyle}>{owner.ogender}</td>
                                                    <td style={cellStyle}>{owner.ocellno}</td>
                                                    <td style={cellStyle}>{owner.oemail}</td>
                                                    <td style={cellStyle}>
                                                        <button
                                                            style={{
                                                                backgroundColor: '#DC3545',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '5px',
                                                                padding: '5px 10px',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => makepayment(owner.oid)}
                                                        >
                                                            Pay Maintenance
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr
                                                    style={{
                                                        backgroundColor: '#007BFF',
                                                        color: 'white',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Description</th>
                                                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Date</th>
                                                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Amount</th>
                                                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Year</th>
                                                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Mode</th>
                                                    <th style={{ padding: '10px', fontWeight: 'bold' }}>Payment status</th>
                                                </tr>
                                                {owner.maintainence.map((m, idx) => (
                                                    <tr key={idx}>
                                                        <td style={cellStyle}>{m.paymentdescription}</td>
                                                        <td style={cellStyle}>{m.paymentdate}</td>
                                                        <td style={cellStyle}>{m.amount}</td>
                                                        <td style={cellStyle}>{m.year}</td>
                                                        <td style={cellStyle}>{m.modeofpayment}</td>
                                                        <td style={cellStyle}>{m.estatus}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Maintenance Form */}
                            <div
                                style={{
                                    flex: 1, // 2:1 ratio adjustment
                                    backgroundColor: '#DFFFD6',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h2 style={{ color: '#28A745', marginBottom: '20px', textAlign: 'center' }}>
                                    Enter Maintenance Details
                                </h2>
                                <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Select Payment Date</label>
                                <input
                                    type="date"
                                    ref={paymentdate}
                                    className="form-control"
                                    style={{
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                    }}
                                />
                                <input
                                    type="text"
                                    ref={amount}
                                    placeholder="Enter maintenance amount"
                                    className="form-control"
                                    style={{
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                    }}
                                />
                                <input
                                    type="text"
                                    ref={year}
                                    placeholder="Enter payment year"
                                    className="form-control"
                                    style={{
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                    }}
                                />
                                <select
                                    ref={estatus}
                                    className="form-select"
                                    style={{
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <option selected>Enter maintenance status</option>
                                    <option>Pending</option>
                                    <option>Approved</option>
                                </select>
                                <input
                                    type="text"
                                    ref={modeofpayment}
                                    placeholder="Enter mode of payment"
                                    className="form-control"
                                    style={{
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                    }}
                                />
                                <input
                                    type="text"
                                    ref={paymentdescription}
                                    placeholder="Enter payment description"
                                    className="form-control"
                                    style={{
                                        marginBottom: '15px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                    }}
                                />
                            </div>
                        </>
                    );
                })()}
            </div>
        </div>

    )
}
export default Ownerpayment