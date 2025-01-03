import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';
import Loading from '../../components/Loading/Loading';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalCadastroProduto from '../Modal/ModalCadastroProduto';

function CadastroProduto() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [busca, setBusca] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [produtoEditar, setProdutoEditar] = useState(null);
    const [produtoApagar, setProdutoApagar] = useState(null);
    const [loading, setLoading] = useState(false);

    const abrirModal = () => {
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setProdutoEditar(null);
    };

    const fetchProdutos = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/produtos`);
            if (response.ok) {
                const data = await response.json();
                setProdutos(data);
            } else {
                console.error('Erro ao buscar produtos:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    const editarProduto = (id) => {
        const produto = produtos.find((p) => p.id === id);
        if (produto) {
            setProdutoEditar(produto);
            setModalVisible(true);
        } else {
            console.error('Produto não encontrado');
        }
    };

    const confirmarExclusao = (produto) => {
        setProdutoApagar(produto);
        setModalConfirmVisible(true);
    };

    // Função para apagar o produto
    const apagarProduto = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/produtos/${produtoApagar.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ativo: false }),
            });
            if (response.ok) {
                setModalConfirmVisible(false); 
                fetchProdutos(); 
            } else {
                console.error('Erro ao apagar produto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const produtosFiltrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        produto.codigoSku.includes(busca)
    );

    if (loading) {
        return (
            <Sidebar>
                <Loading />
            </Sidebar>
        );
    }
    
    return (
        <>
            <Sidebar>
                <div className="flex flex-col p-1">
                    <h1 className="text-slate-200 font-bold">Cadastro de Produto</h1>
                    <div className="p-2 border-b border-gray-800" />

                    <div className="flex justify-between items-center py-4 border-gray-800">
                        <Input
                            type="text"
                            placeholder="Buscar produto"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="p-2 border-gray-700 w-1/2 text-slate-100"
                            size="lg"
                            variant="mixed"
                        />
                        <Button.Root onClick={abrirModal} variant="soft" intent="info" size="lg">
                            <Button.Label>Novo Produto</Button.Label>
                        </Button.Root>
                    </div>

                    {/* Tabela de produtos */}
                    <div className="mt-4">
                        <h2 className="text-xl text-slate-300 mb-4">Cadastro de Produtos</h2>
                        {loading ? (
                            <p className="text-center text-gray-500">Carregando produtos...</p>
                        ) : (
                            <table className="min-w-full text-left text-sm text-gray-400">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-2">Código SKU</th>
                                        <th className="px-4 py-2">Grupo</th>
                                        <th className="px-4 py-2">Descrição</th>
                                        <th className="px-4 py-2">Fornecedor</th>
                                        <th className="px-4 py-2">Ações</th> {/* Coluna de ações */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {produtosFiltrados.length > 0 ? (
                                        produtosFiltrados.map((produto, index) => (
                                            <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                                                <td className="px-4 py-2">{produto.codigoSku}</td>
                                                <td className="px-4 py-2">{produto.grupo || 'Não informado'}</td>
                                                <td className="px-4 py-2">{produto.descricao}</td>
                                                <td className="px-4 py-2">{produto.razaoSocial}</td>
                                                <td className="px-4 py-2 flex space-x-2">
                                                    <Button.Root
                                                        onClick={() => editarProduto(produto.id)}
                                                        variant="soft"
                                                        intent="info"
                                                    >
                                                        Editar
                                                    </Button.Root>
                                                    <Button.Root
                                                        onClick={() => confirmarExclusao(produto)}
                                                        variant="soft"
                                                        intent="danger"
                                                    >
                                                        Apagar
                                                    </Button.Root>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-2 text-center">Nenhum produto encontrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {modalVisible && <ModalCadastroProduto onClose={fecharModal} produto={produtoEditar} />}

                    {/* Modal de Confirmação de Exclusão */}
                    {modalConfirmVisible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="bg-gray-800 text-slate-300 rounded-lg shadow-lg p-6 max-w-md mx-auto">
                                <h2 className="text-lg font-semibold mb-4">Confirmação de Exclusão</h2>
                                <p className="mb-4">Tem certeza de que deseja apagar o produto {produtoApagar?.descricao}?</p>
                                <div className="flex justify-between">
                                    <Button.Root onClick={() => setModalConfirmVisible(false)} variant='soft' intent='secondary'>
                                        Cancelar
                                    </Button.Root>
                                    <Button.Root onClick={apagarProduto} variant='soft' intent='danger'>
                                        Apagar
                                    </Button.Root>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Sidebar>
        </>
    );
}

export default CadastroProduto;
