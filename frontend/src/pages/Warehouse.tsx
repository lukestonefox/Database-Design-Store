import React, { useEffect, useState } from "react";
import { WarehouseRow } from "../types"

const Warehouse: React.FC = () => {
    const [warehouses, setWarehouses] = useState<WarehouseRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await fetch('http://localhost:3000/warehouse');
                const data = await response.json();
                setWarehouses(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch warehouses');
                setLoading(false);
            }
        };

        fetchWarehouses();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const rowStyle = {
        transition: 'background-color 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: '#f0f0f0',
    };

    return (
        <>
            <h1>Warehouses</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>ID</th>
                        <th style={tableHeaderStyle}>Address</th>
                        <th style={tableHeaderStyle}>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map((warehouse, index) => (
                        <tr key={index}
                            style={{ ...rowStyle }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <td style={tableCellStyle}>{warehouse.warehouseid}</td>
                            <td style={tableCellStyle}>{warehouse.address}</td>
                            <td style={tableCellStyle}>{warehouse.capacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

const tableHeaderStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f4f4f4',
    textAlign: 'center',
};

const tableCellStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    padding: '8px',
};

export default Warehouse;
