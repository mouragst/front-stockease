import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ModalPedido from '../Modal/ModalPedido';
import { apiUrl } from '../../config';

function PedidoCompra() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itensPedido, setItensPedido] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/api/compras`)
            .then(response => response.json())
            .then(data => setPedidos(data))
            .catch(error => console.error('Erro ao buscar pedidos:', error));
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const handleViewPedido = (id) => {
        // Lógica para visualizar o pedido
        console.log('Visualizar pedido', id);
    };

    const handleEditPedido = (id) => {
        // Lógica para editar o pedido
        console.log('Editar pedido', id);
    };

    const handleDeletePedido = (id) => {
        // Lógica para excluir o pedido
        console.log('Excluir pedido', id);
    };

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
                                    <th className="py-3 px-6 text-left">CNPJ Unidade</th>
                                    <th className="py-3 px-6 text-left">Unidade</th>
                                    <th className="py-3 px-6 text-left">Valor Total</th>
                                    <th className="py-3 px-6 text-left">Status</th>
                                    <th className="py-3 px-6 text-left">Data de Criação</th>
                                    <th className="py-3 px-6 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300 text-sm font-light">
                                {pedidos.map(pedido => (
                                    <tr key={pedido.id} className="border-b border-gray-600 hover:bg-gray-700">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{pedido.id}</td>
                                        <td className="py-3 px-6 text-left">{pedido.cnpjUnidade}</td>
                                        <td className="py-3 px-6 text-left">{pedido.unidade}</td>
                                        <td className="py-3 px-6 text-left">R$ {pedido.valorTotalProduto}</td>
                                        <td className="py-3 px-6 text-left">{pedido.status}</td>
                                        <td className="py-3 px-6 text-left">{pedido.createdAt ? new Date(pedido.createdAt).toLocaleDateString() : 'N/A'}</td>
                                        <td className="py-3 px-6 text-left">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => handleViewPedido(pedido.id)}>Visualizar pedido</button>
                                            <button className="bg-yellow-500 text-white ml-2 px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEditPedido(pedido.id)}>Editar</button>
                                            <button className="bg-red-500 text-white ml-2 px-2 py-1 rounded hover:bg-red-600" onClick={() => handleDeletePedido(pedido.id)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                                {itensPedido.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                                        <td className="py-3 px-6 text-left">{new Date().toLocaleDateString()}</td>
                                        <td className="py-3 px-6 text-left">{item.unidade}</td>
                                        <td className="py-3 px-6 text-left">{item.quantidade}</td>
                                        <td className="py-3 px-6 text-left">R$ {item.valorTotal}</td>
                                        <td className="py-3 px-6 text-left">
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={() => handleViewPedido(index)}>Visualizar pedido</button>
                                            <button className="bg-yellow-500 text-white ml-2 px-2 py-1 rounded hover:bg-yellow-600" onClick={() => handleEditPedido(index)}>Editar</button>
                                            <button className="bg-red-500 text-white ml-2 px-2 py-1 rounded hover:bg-red-600" onClick={() => handleDeletePedido(index)}>Excluir</button>
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