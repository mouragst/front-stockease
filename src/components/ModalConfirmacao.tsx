import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    children?: ReactNode;
}

const ModalConfirmacao = ({ isOpen, onClose, onConfirm, title = 'Confirmação', children }: ModalProps) => {
    if (!isOpen) return null; // O modal só será renderizado quando 'isOpen' for true

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <div className="mb-6">{children}</div>
                <div className="flex justify-end space-x-4">
                    <button 
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacao;
