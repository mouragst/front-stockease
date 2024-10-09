import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';

function ModalPedido({ onClose, itensPedido, setItensPedido }) {
    const [unidades, setUnidades] = useState([]);
    const [selectedUnidade, setSelectedUnidade] = useState('');
    const [codigoProduto, setCodigoProduto] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [cnpjFornecedor, setCnpjFornecedor] = useState('');
    const [razaoSocialFornecedor, setRazaoSocialFornecedor] = useState('');
    const [estoqueAtual, setEstoqueAtual] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [unidade, setUnidade] = useState('');
    const [isFieldsEnabled, setIsFieldsEnabled] = useState(false);

    // Função para buscar as unidades na API
    useEffect(() => {
        fetch(`${apiUrl}/api/unidades`)
            .then((response) => response.json())
            .then((data) => setUnidades(data))
            .catch((error) => {
                console.error('Erro ao buscar unidades:', error);
            });
    }, []);

    const handleFetchProduto = () => {
        if (codigoProduto) {
            fetch(`${apiUrl}/api/produtos/${codigoProduto}`)
                .then((response) => response.json())
                .then((produto) => {
                    setCnpjFornecedor(produto.cnpj);
                    setRazaoSocialFornecedor(produto.razaoSocial);
                    setDescricao(produto.descricao);
                    setValorUnitario(produto.precoCompra);
    
                    if (selectedUnidade) {
                        return fetch(`${apiUrl}/api/estoque/estoqueUnidade?produtoId=${produto.id}&unidadeId=${selectedUnidade}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    }
                })
                .then((response) => response && response.json())  // Verifica se o response é válido antes de chamar .json()
                .then((estoqueData) => {
                    if (estoqueData) {
                        setEstoqueAtual(estoqueData[0].estoqueAtual);
                    }
                })
                .catch((error) => {
                    console.error('Erro ao buscar produto ou estoque da unidade:', error);
                });
        }
    };

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
        setIsFieldsEnabled(false);
    };

    // Função para habilitar campos após a seleção de uma unidade
    const handleUnidadeChange = (e) => {
        setSelectedUnidade(e.target.value);
        setIsFieldsEnabled(true);
        setUnidade(e.target.value);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-4xl text-slate-300">
                <h2 className="text-3xl mb-4">Adicionar Item ao Pedido</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Select de Unidades */}
                        <div>
                            <label className="block text-slate-300">Unidade Matriz</label>
                            <select
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                value={selectedUnidade}
                                onChange={handleUnidadeChange}
                            >
                                <option value="">Selecione a Unidade Matriz</option>
                                {unidades.map((unidade) => (
                                    <option key={unidade.id} value={unidade.id}>
                                        {unidade.id} - {unidade.razaoSocial} ({unidade.cidade})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Código SKU */}
                        <div>
                            <label className="block text-slate-300">Código SKU</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                placeholder='Digite o código SKU do produto'
                                value={codigoProduto}
                                onChange={(e) => setCodigoProduto(e.target.value)}
                                onBlur={handleFetchProduto}
                                disabled={!isFieldsEnabled}
                            />
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block text-slate-300">Descrição</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={descricao}
                                disabled
                            />
                        </div>

                        {/* Quantidade */}
                        <div>
                            <label className="block text-slate-300">Quantidade</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                placeholder='Digite a quantidade'
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                disabled={!isFieldsEnabled}
                            />
                        </div>

                        {/* CNPJ Fornecedor */}
                        <div>
                            <label className="block text-slate-300">CNPJ Fornecedor</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={cnpjFornecedor.length === 14 
                                    ? `${cnpjFornecedor.slice(0,2)}.${cnpjFornecedor.slice(2,5)}.${cnpjFornecedor.slice(5,8)}/${cnpjFornecedor.slice(8,12)}-${cnpjFornecedor.slice(12)}` 
                                    : cnpjFornecedor.length > 0
                                        ? `${cnpjFornecedor.slice(0,3)}.${cnpjFornecedor.slice(3,6)}.${cnpjFornecedor.slice(6,9)}-${cnpjFornecedor.slice(9)}`  
                                        : 'N/A'
                                }
                                disabled
                            />
                        </div>

                        {/* Razao Social Fornecedor */}
                        <div>
                            <label className="block text-slate-300">Razao Social Fornecedor</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={razaoSocialFornecedor}
                                disabled
                            />
                        </div>

                        {/* Estoque Atual */}
                        <div>
                            <label className="block text-slate-300">Estoque Atual</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={estoqueAtual}
                                disabled
                            />
                        </div>

                        {/* Valor Unitário */}
                        <div>
                            <label className="block text-slate-300">Valor Unitário</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={valorUnitario}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleAddItem}
                            disabled={!codigoProduto || !quantidade}
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
                    <table className="min-w-full bg-gray-800 border rounded">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-2 px-4 text-left text-slate-300">Código</th>
                                <th className="py-2 px-4 text-left text-slate-300">Descrição</th>
                                <th className="py-2 px-4 text-left text-slate-300">Quantidade</th>
                                <th className="py-2 px-4 text-left text-slate-300">Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itensPedido.map((item, index) => (
                                <tr key={index} className="border-b border-gray-700">
                                    <td className="py-2 px-4 text-slate-300">{item.codigoProduto}</td>
                                    <td className="py-2 px-4 text-slate-300">{item.descricao}</td>
                                    <td className="py-2 px-4 text-slate-300">{item.quantidade}</td>
                                    <td className="py-2 px-4 text-slate-300">R$ {item.valorTotal}</td>
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
