import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ModalVisualizarPedido from '../Modal/ModalVisualizarPedido';
import ModalPedido from '../Modal/ModalPedido';
import { apiUrl } from '../../config';

function PedidoCompra() {
    const [isModalVisualizarPedidoOpen, setIsModalVisualizarPedidoOpen] = useState(false);
    const [isModalPedidoOpen, setIsModalPedidoOpen] = useState(false);
    const [isModalConfirmarCancelamentoOpen, setIsModalConfirmarCancelamentoOpen] = useState(false);
    const [itensPedido, setItensPedido] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [pedidoParaCancelar, setPedidoParaCancelar] = useState(null);

    useEffect(() => {
        fetch(`${apiUrl}/api/compras`)
            .then(response => response.json())
            .then(data => setPedidos(data))
            .catch(error => console.error('Erro ao buscar pedidos:', error));
    }, []);

    const buscarPedidos = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/compras`);
            if (!response.ok) {
                throw new Error('Erro ao buscar pedidos');
            }
            const data = await response.json();
            setPedidos(data);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    const handleOpenModal = () => setIsModalPedidoOpen(true);

    const handleClosePedidoModal = () => {
        setIsModalPedidoOpen(false);
        setItensPedido([]);
        setPedidoSelecionado(null);
    };

    const handleCloseVisualizarPedidoModal = () => {
        setIsModalVisualizarPedidoOpen(false);
        setPedidoSelecionado(null);
    };

    const handleViewPedido = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/api/compras/pedido/${id}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar o pedido');
            }
            const pedido = await response.json();
            setPedidoSelecionado(pedido);
            setIsModalVisualizarPedidoOpen(true);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleOpenConfirmarCancelamentoModal = (id) => {
        setPedidoParaCancelar(id);
        setIsModalConfirmarCancelamentoOpen(true);
    };

    const handleCloseConfirmarCancelamentoModal = () => {
        setIsModalConfirmarCancelamentoOpen(false);
        setPedidoParaCancelar(null);
    };

    const handleConfirmarCancelamento = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/compras/pedido/${pedidoParaCancelar}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao cancelar o pedido');
            }
            buscarPedidos();
            handleCloseConfirmarCancelamentoModal();
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <Sidebar>
            <div className='p-4'>
                <h1 className='text-2xl text-gray-300 mb-4'>Pedido de compras</h1>
                <button 
                    className='bg-blue-500 text-gray-900 px-4 py-2 rounded-md hover:bg-blue-600'
                    onClick={handleOpenModal}>
                    Novo Pedido
                </button>
                
                {isModalVisualizarPedidoOpen && (
                    <ModalVisualizarPedido onClose={handleCloseVisualizarPedidoModal} itensPedido={itensPedido} setItensPedido={setItensPedido} pedido={pedidoSelecionado} />
                )}

                {isModalPedidoOpen && (
                    <ModalPedido onClose={handleClosePedidoModal} itensPedido={itensPedido} setItensPedido={setItensPedido} />
                )}

                {isModalConfirmarCancelamentoOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-gray-700 text-slate-200 border border-gray-600 p-4 rounded">
                            <h2 className="text-xl mb-4">Confirmar Cancelamento</h2>
                            <p>Tem certeza que deseja cancelar este pedido?</p>
                            <div className="mt-4 flex justify-end">
                                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2" onClick={handleCloseConfirmarCancelamentoModal}>Não</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleConfirmarCancelamento}>Sim</button>
                            </div>
                        </div>
                    </div>
                )}

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
                                            <button className="bg-red-500 text-white ml-2 px-2 py-1 rounded hover:bg-red-600" onClick={() => handleOpenConfirmarCancelamentoModal(pedido.id)}>Cancelar</button>
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