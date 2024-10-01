import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ModalPedido from '../Modal/ModalPedido';

function PedidoCompra() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itensPedido, setItensPedido] = useState([]);

    // Função para abrir o modal
    const handleOpenModal = () => setIsModalOpen(true);

    // Função para fechar o modal
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Sidebar>
            <div className='p-4'>
                <h1 className='text-2xl text-gray-300 mb-4'>Pedido de compras</h1>
                {/* Botão para abrir o modal de adicionar pedidos */}
                <button 
                    className='bg-blue-500 text-gray-900 px-4 py-2 rounded-md hover:bg-blue-600'
                    onClick={handleOpenModal}>
                    Novo Pedido
                </button>
                
                {/* Modal para Adicionar Pedido */}
                {isModalOpen && (
                    <ModalPedido onClose={handleCloseModal} itensPedido={itensPedido} setItensPedido={setItensPedido} />
                )}

                {/* Tabela de Pedidos */}
                <div className="mt-6">
                    <h2 className="text-xl text-gray-300 mb-4">Pedidos Recentes</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-400">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">Data</th>
                                    <th className="py-3 px-6 text-left">Unidade</th>
                                    <th className="py-3 px-6 text-left">Total Itens</th>
                                    <th className="py-3 px-6 text-left">Valor Total</th>
                                    <th className="py-3 px-6 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300 text-sm font-light">
                                {/* Renderizar os pedidos aqui */}
                                {itensPedido.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                        <td className="py-3 px-6 text-left">{new Date().toLocaleDateString()}</td>
                                        <td className="py-3 px-6 text-left">{item.unidade}</td>
                                        <td className="py-3 px-6 text-left">{item.quantidade}</td>
                                        <td className="py-3 px-6 text-left">R$ {item.valorTotal}</td>
                                        <td className="py-3 px-6 text-left">
                                            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Excluir</button>
                                            <button className='bg-red-500 text-white ml-2 px-2 py-1 rounded hover:bg-red-600'> Editar</button>
                                            <button className='bg-red-500 text-white ml-2 px-2 py-1 rounded hover:bg-red-600'>Visualizar pedido</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}

export default PedidoCompra;
