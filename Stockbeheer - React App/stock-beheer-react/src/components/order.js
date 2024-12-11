import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/order.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [storeFilter, setStoreFilter] = useState('');
    const [selectedCostRanges, setSelectedCostRanges] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleCostRangeChange = (range) => {
        setSelectedCostRanges((prevRanges) => {
            if (prevRanges.includes(range)) {
                return prevRanges.filter((item) => item !== range);
            } else {
                return [...prevRanges, range];
            }
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            let url = `http://localhost:5000/order?store=${storeFilter}`;

            if (selectedCostRanges.length > 0) {
                url += `&costRanges=${selectedCostRanges.join(',')}`;
            }

            if (startDate) {
                url += `&startDate=${startDate}`;
            }
            if (endDate) {
                url += `&endDate=${endDate}`;
            }

            const response = await axios.get(url);
            setOrders(response.data);
        };

        fetchOrders();
    }, [storeFilter, selectedCostRanges, startDate, endDate]);

    return (
        <div className="container">

            
<div className="filters">
                <div className="filter-group">
                    <h3>Filter by Store</h3>
                    <input
                        type="text"
                        placeholder="Filter by Store"
                        onChange={(e) => setStoreFilter(e.target.value)} 
                    />
                </div>

                <div className="filter-group">
                    <h3>Filter by Cost</h3>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedCostRanges.includes('0-10')}
                            onChange={() => handleCostRangeChange('0-10')}
                        />
                        €0 - €10
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedCostRanges.includes('10-50')}
                            onChange={() => handleCostRangeChange('10-50')}
                        />
                        €10 - €50
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedCostRanges.includes('50-100')}
                            onChange={() => handleCostRangeChange('50-100')}
                        />
                        €50 - €100
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={selectedCostRanges.includes('100-500')}
                            onChange={() => handleCostRangeChange('100-500')}
                        />
                        €100 - €500
                    </label>
                </div>

                <div className="filter-group">
                    <h3>Filter by Date</h3>
                    <input 
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                    <input 
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                </div>
            </div>
            <h1>Orders</h1>

            <table>
                <thead>
                    <tr>
                        <th>Date Requested</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Store</th>
                        <th>Article Number</th>
                        <th>URL</th>
                        <th>Total Cost</th>
                        <th>Requested By</th>
                        <th>Delivery Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.datum_aanvraag}</td>
                            <td>{order.aantal}</td>
                            <td>{order.korte_omschrijving}</td>
                            <td>{order.winkel}</td> 
                            <td>{order.artikelnummer}</td> 
                            <td>{order.url}</td>
                            <td>{order.totale_prijs}</td>    
                            <td>{order.aangevraagd_door}</td> 
                            <td>{order.levertijd}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Orders;
