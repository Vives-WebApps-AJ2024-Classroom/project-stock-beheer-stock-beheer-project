import React, { useState } from 'react';
import axios from 'axios';
import '../styles/placeorder.css';

const PlaceOrder = () => {
    const [order, setOrder] = useState({
        datum_aanvraag: '',
        aantal: '',
        korte_beschrijving: '',
        winkel: '',
        artikelnummer: '',
        url: '',
        totale_prijs: '',
        aangevraagd_door: '',
        levertijd: '',
    });

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:5000/order', order);
            alert('Order placed successfully');
        } catch (err) {
            alert('Error placing order');
        }
    };

    return (
        <div>
            <h1>Place Order</h1>
            <form>
                <input name="datum_aanvraag" placeholder="Datum Aanvraag" onChange={handleChange} required/>
                <input name="aantal" placeholder="Aantal" onChange={handleChange} />
                <input name="korte_omschrijving" placeholder="Description" onChange={handleChange} required/>
                <select name="winkel" value={order.winkel} onChange={handleChange} required>
                    <option value="Conrad">Conrad</option>
                    <option value="Digi-Key">Digi-Key</option>
                    <option value="Farnell">Farnell</option>
                </select>
                <input name="artikelnummer" placeholder="Artikel nummer" onChange={handleChange} required/>
                <input name="url" placeholder="URL" onChange={handleChange} required/>
                <input name="totale_prijs" placeholder="Totale Kostprijs (incl. BTW)" onChange={handleChange} required/>
                <input name="aangevraagd_door" placeholder="Aangevraagd Door" onChange={handleChange} required/>
                <input name="levertijd" placeholder="Geschatte Levertijd" onChange={handleChange} required/>
                <button type="button" onClick={handleSubmit}>Verzend</button>
            </form>
        </div>
    );
};

export default PlaceOrder;
