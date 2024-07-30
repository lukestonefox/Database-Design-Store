import { useEffect, useState } from "react";
import { Product } from "./types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

interface OrdersRegisterProps {
    order: Product[];
    removeFromOrder: (productId: number) => void;
}

const OrdersRegister: React.FC<OrdersRegisterProps> = ({ order, removeFromOrder}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState<Product[]>(order);
    const [menuVisible, setMenuVisible] = useState<Product | null>(null);
    const [menuPosition, setMenuPosition] = useState<{top: number; left: number} | null>(null);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setItems(order);
    }, [order]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            return items.reduce((total, item) => total + (item.price || 0), 0);
        };
        setTotalPrice(calculateTotalPrice());
    }, [items]);

    const loadOrder = () => {
        console.log(order);
        setItems(order);
    }

    const checkoutOrder = async () => {
        try {
            const deliveryPlanResponse = await fetch ('http://localhost:3000/deliveryplan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({deliverytype: 'order', deliveryprice: totalPrice, shipdate: new Date().toISOString(), deliverydate: new Date().toISOString() })
            });

            if (!deliveryPlanResponse.ok) {
                throw new Error('Failed to create a delivery plan');
            }

            const deliveryPlan = await deliveryPlanResponse.json();
            const deliveryPlanId = deliveryPlan.deliveryid;

            const orderPromises = items.map(item => 
                fetch('http://localhost:3000/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productid: item.productid,
                        quantity: 1,
                        status: 'pending',
                        deliveryid: deliveryPlanId
                    }),
                })
                .then(orderResponse => {
                    if (!orderResponse.ok) {
                        throw new Error('Failed to create a new order');
                    }
                    return orderResponse.json();
                })
                .then(order => removeFromOrder(order.productid))
                .catch(error => console.error('Error creating order: ', error))
            );

            await Promise.all(orderPromises)

            console.log('Delivery plan was created successfully');
            setItems([]);
        } catch (error) {
            console.error('Error during checkout: ', error);
        }
    };

    const handleSearch = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleIconCLick = (event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, item: Product) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMenuPosition({top: rect.bottom, left: rect.left});
        setMenuVisible(menuVisible === item ? null : item);
    }

    const removeItem = (product: Product) => {
        removeFromOrder(product.productid);
        setItems((prevItems) => prevItems.filter(item => item.productid !== product.productid))
    }

    const filteredItems = items?.filter((item) =>
        item.productid.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.producttype.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.productsize?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rowStyle = {
        transition: 'background-color 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: '#f0f0f0',
    };

    const menuStyle: React.CSSProperties = {
        position: 'absolute',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        top: menuPosition?.top,
        left: menuPosition?.left
    };

    return (
        <div style={{paddingLeft: '1rem', marginRight: '1rem'}}>
            <div style={{display: 'flex', flexDirection: 'row', gap: '40px'}}>
                <input 
                    type="text"
                    placeholder="Search order..."
                    style={{border: '2px solid #ddd'}}
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={() => loadOrder()}>See Order</button>
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={() => checkoutOrder()}>Place Order</button>
            </div>
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
                {filteredItems?.map((item, index) =>
                        <tr key={index} 
                            style={{...rowStyle}} 
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor} 
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                        >
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.productid}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.productname}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>${item.price}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.producttype}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.brand}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.productsize}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px'}}>{item.description}</td>
                            <td style={{border: '1px solid #ddd', padding: '8px', textAlign: 'center'}} onClick={(e) => handleIconCLick(e, item)}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                                {menuVisible === item && (
                                    <div style={menuStyle}>
                                        <div style={{padding: '8px', cursor: 'pointer'}} onClick={() => removeItem(item)}>Remove from Order</div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default OrdersRegister