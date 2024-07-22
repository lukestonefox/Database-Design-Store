import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ProductsRegister = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState([
        {id: 1, name: 'Stuffed Bear', price: 20, type: 'Toy', brand: 'LotFancy', size: 'M', description: 'A brown, medium sized stuffed toy bear'},
        {id: 2, name: 'Apple', price: 3, type: 'Food', brand: 'Honeycrisp', size: 'S', description: 'A normal sized honeycrisp apple'},
        {id: 3, name: 'PS5', price: 499.99, type: 'Gaming', brand: 'Sony', size: null, description: 'A gaming console by Sony'}
      ]);

    const [menuVisible, setMenuVisible] = useState(null);

    const handleSearch = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleIconCLick = (item: any) => {
        setMenuVisible(menuVisible === item ? null : item)
    };

    const handleAdd = (item: any) => {
        setMenuVisible(menuVisible === item ? null : item)
    };

    const filteredItems = items.filter((item) =>
        item.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.size?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const itemSelected = (item: any) => {
        console.log(item);
    };

    const rowStyle = {
        transition: 'background-color 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: '#f0f0f0',
    };

    const menuStyle = {
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
    };

    return (
        <div style={{paddingLeft: '1rem', marginRight: '1rem'}}>
            <input
                type="text"
                placeholder="Search products..."
                style = {{border: '2px solid #ddd'}}
                value={searchQuery}
                onChange={handleSearch}
            />
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
                <thead>
                    <tr>
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'center'}}>ID</th>
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'center'}}>Name</th>
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'center'}}>Price</th>
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'center'}}>Type</th>
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'center'}}>Brand</th>
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'center'}}>Size</th>
                        <th style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4', textAlign: 'center'}}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((item, index) =>
                        <tr key={index} 
                            style={{...rowStyle}} 
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor} 
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                            onClick={() => itemSelected(item)}
                        >
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.id}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.name}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>${item.price}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.type}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.brand}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.size}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.description}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}}>
                                <FontAwesomeIcon icon={faEllipsisV} onClick={() => handleIconCLick(item)}/>
                                {menuVisible === item && (
                                    <div style={{position: 'absolute', 
                                        backgroundColor: 'white', 
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                        zIndex: 1000, 
                                        top: '100%'}}>
                                        <div style={{padding: '8px', cursor: 'pointer'}} onClick={() => handleAdd(item)}>Add to Order</div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};

export default ProductsRegister