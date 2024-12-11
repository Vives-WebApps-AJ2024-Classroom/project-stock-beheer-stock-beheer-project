import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`http://localhost:5000/orders?store=${filter}`);
            setOrders(response.data);
        };
        fetchOrders();
    }, [filter]);

    return (
        <div>
            <h1>Orders</h1>
            <input placeholder="Filter by Store" onChange={(e) => setFilter(e.target.value)} />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Store</th>
                        <th>Article Number</th>
                        <th>URL</th>
                        <th>Total Cost</th>
                        <th>Requested By</th>
                        <th>Delivery Days</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.date_requested}</td>
                            <td>{order.quantity}</td>
                            <td>{order.description}</td>
                            <td>{order.store}</td>
                            <td>{order.article_number}</td>
                            <td>{order.url}</td>
                            <td>{order.total_cost}</td>
                            <td>{order.requested_by}</td>
                            <td>{order.delivery_days}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
