import { useState } from 'react';

function ModalPedido({ onClose, itensPedido, setItensPedido }) {
    const [codigoProduto, setCodigoProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [estoqueAtual, setEstoqueAtual] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [unidade, setUnidade] = useState('');

    // Função para adicionar item ao pedido
    const handleAddItem = () => {
        const novoItem = {
            codigoProduto,
            descricao,
            quantidade: parseFloat(quantidade),
            unidade,
            estoqueAtual,
            valorUnitario: parseFloat(valorUnitario),
            valorTotal: parseFloat(quantidade) * parseFloat(valorUnitario),
        };
        setItensPedido([...itensPedido, novoItem]);
        resetForm();
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setCodigoProduto('');
        setDescricao('');
        setQuantidade('');
        setEstoqueAtual('');
        setValorUnitario('');
        setUnidade('');
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl text-gray-800 mb-4">Adicionar Item ao Pedido</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600">Código do Produto</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={codigoProduto}
                                onChange={(e) => setCodigoProduto(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Descrição</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Quantidade</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Estoque Atual</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={estoqueAtual}
                                onChange={(e) => setEstoqueAtual(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Valor Unitário</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={valorUnitario}
                                onChange={(e) => setValorUnitario(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleAddItem}
                        >
                            Adicionar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

                {/* Mini tabela de itens já adicionados */}
                <div className="mt-6">
                    <h3 className="text-xl mb-2">Itens Adicionados</h3>
                    <table className="min-w-full bg-white border rounded">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left">Código</th>
                                <th className="py-2 px-4 text-left">Descrição</th>
                                <th className="py-2 px-4 text-left">Quantidade</th>
                                <th className="py-2 px-4 text-left">Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itensPedido.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{item.codigoProduto}</td>
                                    <td className="py-2 px-4">{item.descricao}</td>
                                    <td className="py-2 px-4">{item.quantidade}</td>
                                    <td className="py-2 px-4">R$ {item.valorTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ModalPedido;
