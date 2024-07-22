import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const EditProductModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const modalStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0, 
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    
    const modalContent: React.CSSProperties = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px',
        position: 'relative',
        minWidth: '300px',
    };
    
    const buttonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return ReactDOM.createPortal(
        <div style={modalStyle}>
            <div style={modalContent}>
                <button onClick={onClose} style={buttonStyle}>Close</button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default EditProductModal;