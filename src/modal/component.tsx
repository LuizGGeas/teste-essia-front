import React from 'react';
import "./style.css"

interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
}

export default function Modal({ isOpen, message, onClose, onConfirm }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
