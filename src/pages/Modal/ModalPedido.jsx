import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';

function ModalPedido({ onClose, itensPedido, setItensPedido }) {
    const [unidades, setUnidades] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [idProduto, setIdProduto] = useState('');
    const [selectedUnidade, setSelectedUnidade] = useState('');
    const [codigoProduto, setCodigoProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [cnpjFornecedor, setCnpjFornecedor] = useState('');
    const [razaoSocialFornecedor, setRazaoSocialFornecedor] = useState('');
    const [estoqueAtual, setEstoqueAtual] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [unidade, setUnidade] = useState('');
    const [isFieldsEnabled, setIsFieldsEnabled] = useState(false);
    const [itensVisivel, setItensVisivel] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${apiUrl}/api/produtos`)
            .then((response) => response.json())
            .then((data) => setProdutos(data))
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error)
            })
    }, [])

    useEffect(() => {
        fetch(`${apiUrl}/api/unidades`)
            .then((response) => response.json())
            .then((data) => setUnidades(data))
            .catch((error) => {
                console.error('Erro ao buscar unidades:', error);
            });
    }, []);

    const handleFetchProduto = (codigoProduto) => {
        if (codigoProduto && selectedUnidade) {
            setLoading(true);
            fetch(`${apiUrl}/api/produtos/${codigoProduto}`)
                .then((response) => response.json())
                .then((produto) => {
                    setCnpjFornecedor(produto.cnpj);
                    setRazaoSocialFornecedor(produto.razaoSocial);
                    setDescricao(produto.descricao);
                    setValorUnitario(produto.precoCompra);

                    return fetch(`${apiUrl}/api/estoque/estoqueUnidade?produtoId=${produto.id}&unidadeId=${selectedUnidade}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                })
                .then((response) => response.json())
                .then((estoqueData) => {
                    setEstoqueAtual(estoqueData[0]?.estoqueAtual <= 0 ? 'Sem estoque' : estoqueData[0]?.estoqueAtual);
                })
                .catch((error) => {
                    console.error('Erro ao buscar produto ou estoque da unidade:', error);
                    setEstoqueAtual('0');
                }).finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleAddItem = () => {
        const novoItem = {
            idProduto,
            codigoProduto,
            descricao,
            quantidade: parseFloat(quantidade),
            unidade,
            estoqueAtual,
            valorUnitario: parseFloat(valorUnitario),
            valorTotal: parseFloat(quantidade) * parseFloat(valorUnitario),
        };
    
        const itemExistente = itensPedido.find(item => item.codigoProduto === codigoProduto);
    
        if (itemExistente) {
            const itensAtualizados = itensPedido.map(item => 
                item.codigoProduto === codigoProduto 
                    ? { ...item, quantidade: item.quantidade + novoItem.quantidade, valorTotal: (item.quantidade + novoItem.quantidade) * item.valorUnitario }
                    : item
            );
            setItensPedido(itensAtualizados);
        } else {
            setItensPedido([...itensPedido, novoItem]);
        }
    };

    const handleUnidadeChange = (e) => {
        setSelectedUnidade(e.target.value);
        setIsFieldsEnabled(true);
        setUnidade(e.target.value);
    };

    const handleFinalizarPedido = () => {

        const unidadeSelecionada = unidades.find(u => u.id === parseInt(unidade));
        const pedido = {
            cnpjUnidade: unidadeSelecionada ? unidadeSelecionada.cnpj : null,
            unidade: Number(unidade),
            valorTotalProduto: parseFloat(itensPedido.reduce((acc, item) => acc + item.valorTotal, 0).toFixed(2)),
            status: 'Pendente',
        }
    
        fetch(`${apiUrl}/api/compras`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao salvar o pedido');
            }
            return response.json();
        })
        .then((data) => {
            adicionarItens(data);
            onClose();
        })
        .catch((error) => {
            console.error('Erro ao finalizar o pedido:', error);
        });
    };

    const adicionarItens = (unidade) => {

        const itensDoPedido = itensPedido.map((item) => ({
                codigoSku: item.codigoProduto,
                valor_unitario: item.valorUnitario,
                quantidade: item.quantidade,
                cnpj_fornecedor: cnpjFornecedor,
                razao_social_fornecedor: razaoSocialFornecedor,
                cnpj_unidade: selectedUnidade,
                unidade: Number(item.unidade),
                status: 'Pendente',
                created_at: new Date().toISOString(),
                id_produto: produtos.find((produto) => produto.codigoSku === item.codigoProduto).id,
            }))

            console.log(itensPedido);

        fetch(`${apiUrl}/api/itens/${unidade}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itensDoPedido),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao salvar os itens do pedido');
            }
            return response.json();
        })
    }

    const itemChange = (e) => {
        setItensVisivel(true);
        setCodigoProduto(e)
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-6xl text-slate-300">
                <h2 className="text-3xl mb-4">Adicionar Item ao Pedido</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4">
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

                        <div>
                            <label className="block text-slate-300">Código SKU</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded bg-gray-700 text-white"
                                    value={codigoProduto}
                                    onChange={(e) => itemChange(e.target.value)}
                                    disabled={!isFieldsEnabled}
                                    placeholder="Digite o código SKU do produto"
                                />
                                {codigoProduto && itensVisivel && produtos.some((produto) =>
                                    produto.codigoSku.toLowerCase().includes(codigoProduto.toLowerCase())
                                ) && (
                                    <ul className="absolute bg-gray-700 border border-gray-600 w-full mt-1 max-h-40 overflow-y-auto z-10">
                                        {produtos
                                            .filter((produto) =>
                                                produto.codigoSku.toLowerCase().includes(codigoProduto.toLowerCase())
                                            )
                                            .map((produto) => (
                                                <li
                                                    key={produto.id}
                                                    className="p-2 cursor-pointer hover:bg-gray-600"
                                                    onClick={() => {
                                                        setCodigoProduto(produto.codigoSku);
                                                        setIdProduto(produto.id);
                                                        setDescricao(produto.descricao);
                                                        handleFetchProduto(produto.codigoSku);
                                                        setItensVisivel(false);
                                                    }}
                                                >
                                                    {produto.codigoSku} - {produto.descricao}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-300">Descrição</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={descricao}
                                disabled
                            />
                        </div>

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

                        <div>
                            <label className="block text-slate-300">CNPJ/CPF Fornecedor</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={cnpjFornecedor.length === 14 
                                    ? `${cnpjFornecedor.slice(0,2)}.${cnpjFornecedor.slice(2,5)}.${cnpjFornecedor.slice(5,8)}/${cnpjFornecedor.slice(8,12)}-${cnpjFornecedor.slice(12)}`
                                    : cnpjFornecedor.length > 0
                                        ? `${cnpjFornecedor.slice(0,3)}.${cnpjFornecedor.slice(3,6)}.${cnpjFornecedor.slice(6,9)}-${cnpjFornecedor.slice(9)}`
                                        : ''
                                }
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300">Razão Social Fornecedor</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={razaoSocialFornecedor}
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300">Estoque Atual</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={estoqueAtual}
                                disabled
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300">Valor Unitário</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={valorUnitario}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={handleAddItem}
                        >
                            Adicionar Item
                        </button>
                    </div>
                </form>

                <h3 className="text-xl mt-8 mb-4">Itens do Pedido</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-gray-800 border border-gray-700">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Código SKU</th>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Descrição</th>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Quantidade</th>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Unidade</th>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Estoque Atual</th>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Valor Unitário</th>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Valor Total</th>
                                    <th className="py-2 px-4 border-b border-gray-700 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                            {itensPedido.length > 0 ? (
                                itensPedido.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-700">
                                        <td className="py-2 px-4 border-b border-gray-700">{item.codigoProduto}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{item.descricao}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{item.quantidade}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{item.unidade}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{item.estoqueAtual}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{item.valorUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td className="py-2 px-4 border-b border-gray-700">{item.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td className="py-2 px-4 border-b border-gray-700"><button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" onClick={() => setItensPedido(itensPedido.filter((_, i) => i !== index))}>Remover</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-2 px-4 border-b border-gray-700 text-center">Nenhum item adicionado</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                <div className="mt-8 flex justify-end">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        onClick={handleFinalizarPedido}
                    >
                        Finalizar Pedido
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ml-4"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalPedido;
