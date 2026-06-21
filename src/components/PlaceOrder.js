import React, { useState } from 'react';
import axios from 'axios';

const PlaceOrder = ({ amount }) => {
    const [currency, setCurrency] = useState('INR');
    const [receipt, setReceipt] = useState('');
    const [orderId, setOrderId] = useState('');
    const [message, setMessage] = useState('');

    // Handle order creation
    const createOrder = async () => {
        try {
            // Validate amount, currency, and receipt
            if (!amount || isNaN(amount) || amount <= 0) {
                setMessage('Please enter a valid amount.');
                return;
            }
            if (!currency || !receipt) {
                setMessage('Please fill all the required fields.');
                return;
            }

            // Sending order creation request to the backend
            const response = await axios.post('http://localhost:9000/api/create-order', {
                amount: parseFloat(amount),
                currency,
                receipt,
            });

            if (response.data.success) {
                setOrderId(response.data.orderId);
                launchRazorpay(response.data.orderId, response.data.amount);
            } else {
                setMessage('Failed to create order.');
            }
        } catch (error) {
            console.error('Error creating order:', error.response ? error.response.data : error.message);
            setMessage('An error occurred while creating the order. Please try again.');
        }
    };

    // Launch Razorpay Checkout
    const launchRazorpay = (orderId, amount) => {
        const options = {
            key: 'rzp_test_FRoCXFr2FkZqrx', // Replace with your Razorpay API Key
            amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
            currency: currency,
            name: 'jFork Technology Services',
            description: 'Training and Project Guidance Services',
            order_id: orderId,
            handler: async (response) => {
                try {
                    // Capture payment after successful transaction
                    const captureResponse = await axios.post('http://localhost:9000/api/capture-payment', {
                        paymentId: response.razorpay_payment_id,
                        amount: parseFloat(amount),
                    });

                    if (captureResponse.data.success) {
                        setMessage('Payment captured successfully.');
                    } else {
                        setMessage('Failed to capture payment.');
                    }
                } catch (error) {
                    console.error('Error capturing payment:', error.response ? error.response.data : error.message);
                    setMessage('An error occurred while capturing the payment.');
                }
            },
            prefill: {
                name: 'Sunil Rodd',
                email: 'sfroddjforkts@gmail.com',
                contact: '9480275919',
            },
            theme: {
                color: '#2d89ef',
            },
        };

        // Open Razorpay checkout
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="space-y-4">
            {/* Wrapper div with flex to arrange items horizontally */}
            <div className="flex space-x-4 items-center">
                {/* Amount Input */}
                <div className="flex items-center space-x-2">
                    <label className="mr-2">Amount (in INR):</label>
                    <input
                        type="number"
                        value={amount}
                        className="border p-2 rounded"
                        disabled // You can enable this field if you want users to manually input the amount
                    />
                </div>

                {/* Currency Input */}
                <div className="flex items-center space-x-2">
                    <label className="mr-2">Currency:</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                {/* Receipt Input */}
                <div className="flex items-center space-x-2">
                    <label className="mr-2">Receipt:</label>
                    <input
                        type="text"
                        value={receipt}
                        onChange={(e) => setReceipt(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                <button
                    onClick={createOrder}
                    className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                    Make Payment
                </button>
            </div>

            {/* Message */}
            {message && <p className="mt-4 text-red-600">{message}</p>}
        </div>
    );
};

export default PlaceOrder;
