import React, { useState } from "react";
import { Product } from "./types";

interface EditProductFormProps {
    product: Product;
    onSave: (updatedProduct: Product) => void;
    onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onCancel }) => {
    const [formState, setFormState] = useState<Product>({ ...product });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value}));
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formState);
    };

    return (
        <form onSubmit={handleSave}>
            <div>
                <label>Product Name:</label>
                <input
                    type="text"
                    name="productname"
                    value={formState.productname}
                    onChange={handleChange}
                    style={{paddingLeft: '10px'}}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formState.price}
                    onChange={handleChange}
                    style={{paddingLeft: '10px'}}
                />
            </div>
            <div>
                <label>Type:</label>
                <input
                    type="text"
                    name="producttype"
                    value={formState.producttype}
                    onChange={handleChange}
                    style={{paddingLeft: '10px'}}
                />
            </div>
            <div>
                <label>Brand:</label>
                <input
                    type="text"
                    name="brand"
                    value={formState.brand}
                    onChange={handleChange}
                    style={{paddingLeft: '10px'}}
                />
            </div>
            <div>
                <label>Size:</label>
                <input
                    type="text"
                    name="productsize"
                    value={formState.productsize || ''}
                    onChange={handleChange}
                    style={{paddingLeft: '10px'}}
                />
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    style={{paddingLeft: '10px', alignContent: 'left'}}
                />
            </div>
            <div style={{float: 'right', paddingTop: '10px'}}>
                <button type="submit" style={{paddingRight: '10px'}}>Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EditProductForm