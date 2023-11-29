import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
export default function PrimeReact(){
    const [date, setDate] = useState(null);
    return (
        <div className="card h-screen flex justify-center items-center">
        <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" />
    </div>
    )
}