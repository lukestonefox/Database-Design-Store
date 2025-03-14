import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Product } from "./types";
import EditProductModal from "./EditProductModal";
import EditProductForm from "./EditProductForm";
import { useUserContext } from "./context/UserContext";

interface ProductsRegisterProps {
    products: Product[];
    addToOrder: (product: Product) => void;
}

const ProductsRegister: React.FC<ProductsRegisterProps> = ({products, addToOrder}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState<Product[]>(products);
    const [menuVisible, setMenuVisible] = useState<Product | null>(null)
    const [menuPosition, setMenuPosition] = useState<{top: number; left: number} | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editProductModalOpen, setModalOpen] = useState(false);
    const { role } = useUserContext();

    useEffect(() => {
        setItems(products);
    }, [products]);

    const handleSearch = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleIconCLick = (event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>, item: Product) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMenuPosition({top: rect.bottom, left: rect.left});
        setMenuVisible(menuVisible === item ? null : item);
    };

    const handleAdd = (item: Product) => {
        console.log(`Adding ${item} to order in handleAdd`);
        addToOrder(item);
        setMenuVisible(menuVisible === item ? null : item);
    };

    const handleEdit = (item: Product) => {
        setMenuVisible(menuVisible === item ? null : item);
        openEditProduct(item);
    };

    const addProduct = () => {
        const newProduct: Product = {
            productid: 0,
            productname: '',
            price: 0,
            producttype: '',
            brand: '',
            productsize: '',
            description: '',
        };
        setSelectedProduct(newProduct);
        setModalOpen(true);
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

    const itemSelected = (item: Product) => {
        console.log(role);
    };

    const openEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    const closeEditProduct = async (updatedProduct: Product, warehouseid: number) => {
        if (updatedProduct.productid === 0) {
            let newProduct: Product;
            try {
                const response = await fetch ('http://localhost:3000/product/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedProduct),
                });

                if (!response.ok) {
                    throw new Error('Failed to add new product');
                }
                
                newProduct = await response.json();
                updateStockTable(newProduct.productid, warehouseid);
            } catch (error) {
                console.error('Error adding a new product', error);
            }

            setItems((prevItems) => [...prevItems, newProduct]);
        } else {
            try {
                const response = await fetch(`http://localhost:3000/product/${updatedProduct.productid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct)
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update product')
                }
    
                const updatedProductFromServer = await response.json();

                updateStockTable(updatedProductFromServer.productid, warehouseid);
                
                setItems(prevItems => prevItems.map(item => item.productid === updatedProductFromServer.productid ? updatedProductFromServer : item));
            } catch (error) {
                console.error('Error updating product', error);
            }

            console.log('updatedProduct: ', updatedProduct);
            console.log('Warehouseid: ', warehouseid);
        }
        setSelectedProduct(null);
        closeModal();
    };

    const updateStockTable = async (updatedProductId: number, warehouseid: number) => {
        try {
            const response = await fetch(`http://localhost:3000/stock/`);
            if (!response.ok) {
                throw new Error('Could not get stock items');
            }
            const stockData = await response.json();
            const stockItem = stockData.filter((item: any) => item.productid === updatedProductId && item.warehouseid === warehouseid);
            
            if (stockItem.length === 0) {
                await addStockItem(updatedProductId, warehouseid);
            } else {
                await updateStockItem(updatedProductId, warehouseid, stockItem[0]?.stockcount + 1);
            }
        } catch (error) {
            console.error('There was a problem fetching items in the stock table:', error);
        }
    };

    const addStockItem = async (newItemProductid: number, newItemWarehouseid: number) => {
        const requestBody = JSON.stringify({ productid: newItemProductid, stockcount: 1, warehouseid: newItemWarehouseid });
        try {
            const response = await fetch('http://localhost:3000/stock', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error('Failed to add a new stock item');
            }

            // the item that is added has a stockCount of 0 for some reason
            const newStockItem = await response.json();
            console.log('Added new stock item: ', newStockItem);
        } catch (error) {
            console.error('Error adding a new stock item:', error);
        }
    };

    const updateStockItem = async (productid: number, warehouseid: number, stockCount: number) => {
        try {
            const response = await fetch(`http://localhost:3000/stock/${productid}/${warehouseid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stockcount: stockCount }),
            });

            if (!response.ok) {
                throw new Error('Failed to update an existing stock item');
            }

            const updatedStockItem = await response.json();
            console.log('Updated stock item: ', updatedStockItem);
        } catch (error) {
            console.error('Error updating stock item: ', error);
        }
    };

    const handleCancel = () => {
        closeModal();
    };

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
        display: menuVisible ? 'block' : 'none',
        top: menuPosition?.top,
        left: menuPosition?.left,
    };

    return (
        <div style={{paddingLeft: '1rem', marginRight: '1rem'}}>
            <div style={{display: 'flex', flexDirection: 'row', gap: '40px'}}>
                <input
                    type="text"
                    placeholder="Search products..."
                    style = {{border: '2px solid #ddd', height: 'fit-content'}}
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {role !== 'customer' && (
                    <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={addProduct}>Add Product</button>
                )}
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
                    {filteredItems.map((item, index) =>
                        <tr key={index} 
                            style={{...rowStyle}} 
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor} 
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                            onClick={() => itemSelected(item)}
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
                                        <div style={{padding: '8px', cursor: 'pointer'}} onClick={() => handleAdd(item)}>Add to Order</div>
                                        {role !== 'customer' && (
                                            <div style={{padding: '8px', cursor: 'pointer'}} onClick={() => handleEdit(item)}>Edit Item</div>
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            <EditProductModal isOpen={editProductModalOpen} onClose={closeModal}>
                    {selectedProduct && (
                        <EditProductForm
                            product={selectedProduct}
                            onSave={closeEditProduct}
                            onCancel={handleCancel}
                        />
                    )}
            </EditProductModal>
        </div>
    )
};

export default ProductsRegister