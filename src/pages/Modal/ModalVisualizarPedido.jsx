import 'react';
import PropTypes from 'prop-types';

function ModalPedido({ onClose, itensPedido, setItensPedido, pedido }) {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-800 text-white p-6 rounded-lg max-h-screen overflow-y-auto border border-gray-700">
                <h2 className="text-2xl mb-4 bg-gray-600 p-3 rounded"><strong>Detalhes do Pedido</strong></h2>
                {pedido ? (
                    <div>
                        <div className="grid grid-cols-2 gap-4">
                            <p><strong>ID:</strong> {pedido.id}</p>
                            <p><strong>CNPJ Unidade:</strong> {pedido.cnpjUnidade}</p>
                            <p><strong>Unidade:</strong> {pedido.unidade}</p>
                            <p><strong>Valor Total:</strong> R$ {pedido.valorTotalProduto}</p>
                            <p><strong>Status:</strong> {pedido.status}</p>
                            <p><strong>Data de Criação:</strong> {pedido.createdAt ? new Date(pedido.createdAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <hr className="my-5"/>
                        <h3 className="text-xl bg-gray-600 p-3 rounded"><strong>Itens do Pedido</strong></h3>
                        <table className="min-w-full text-slate-200 bg-gray-700">
                            <thead>
                                <tr>
                                    <th className="py-3 px-5">Código SKU</th>
                                    <th className="py-3 px-5">Valor Unitário</th>
                                    <th className="py-3 px-5">Quantidade</th>
                                    <th className="py-3 px-5">Valor Total</th>
                                    <th className="py-3 px-5">Fornecedor</th>
                                    <th className="py-3 px-5">Status</th>
                                    <th className="py-3 px-5">Data de Criação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedido.itensPedidoCompra.map(item => (
                                    <tr key={item.id} className="border-t">
                                        <td className="py-3 px-5">{item.codigoSku}</td>
                                        <td className="py-3 px-5">R$ {item.valor_unitario}</td>
                                        <td className="py-3 px-5">{item.quantidade}</td>
                                        <td className="py-3 px-5">R$ {item.valor_unitario * item.quantidade}</td>
                                        <td className="py-3 px-5">{item.razao_social_fornecedor}</td>
                                        <td className="py-3 px-5">{item.status}</td>
                                        <td className="py-3 px-5">{new Date(item.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Carregando...</p>
                )}
                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}
ModalPedido.propTypes = {
    onClose: PropTypes.func.isRequired,
    itensPedido: PropTypes.array,
    setItensPedido: PropTypes.func,
    pedido: PropTypes.object
};

export default ModalPedido;