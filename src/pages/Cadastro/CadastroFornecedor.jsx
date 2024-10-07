import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalCadastroFornecedor from '../Modal/ModalCadastroFornecedor';
import { apiUrl } from '../../config';

function CadastroFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false); // Modal de confirmação
    const [busca, setBusca] = useState('');
    const [fornecedorEditar, setFornecedorEditar] = useState(null);
    const [fornecedorApagar, setFornecedorApagar] = useState(null); // Fornecedor a ser apagado
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 14;

    const fetchFornecedores = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/fornecedores`);
            if (!response.ok) {
                throw new Error('Erro ao buscar fornecedores');
            }
            const data = await response.json();
            setFornecedores(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFornecedores();
    }, []);

    const fornecedoresFiltrados = fornecedores.filter(fornecedor =>
        fornecedor.razaoSocial.toLowerCase().includes(busca.toLowerCase())
    );

    const totalItens = fornecedoresFiltrados.length;
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    useEffect(() => {
        if (paginaAtual > totalPaginas) {
            setPaginaAtual(totalPaginas || 1);
        }
    }, [totalPaginas, paginaAtual]);

    const fornecedoresParaExibir = fornecedoresFiltrados.slice(
        (paginaAtual - 1) * itensPorPagina,
        paginaAtual * itensPorPagina
    );

    const abrirModal = (fornecedor) => {
        setFornecedorEditar(fornecedor);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setFornecedorEditar(null); // Limpa o fornecedor ao fechar
    };

    const handleSave = async () => {
        await fetchFornecedores(); // Recarrega os fornecedores após salvar
        fecharModal(); // Fecha o modal
    };

    const proximaPagina = () => {
        if (paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 1) {
            setPaginaAtual(paginaAtual - 1);
        }
    };

    const confirmarApagar = (fornecedor) => {
        setFornecedorApagar(fornecedor);
        setModalConfirmVisible(true); // Abre o modal de confirmação
    };

    const apagarFornecedor = async () => {
        if (fornecedorApagar) {
            try {
                const response = await fetch(`${apiUrl}/api/fornecedores/${fornecedorApagar.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ativo: 0 }) // Atualiza o status do fornecedor para inativo
                });

                if (!response.ok) {
                    throw new Error('Erro ao apagar o fornecedor');
                }

                await fetchFornecedores(); // Atualiza a lista após a remoção
                setModalConfirmVisible(false); // Fecha o modal de confirmação
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) {
        return (
            <Sidebar>
                <div className="flex flex-col p-1">
                    <h1 className="text-slate-200 font-bold">Cadastro de Fornecedor</h1>
                    <div className="p-2 border-b border-gray-800" />
                    <div className="flex justify-center items-center h-full">
                        <p className="text-slate-200">Carregando fornecedores...</p>
                    </div>
                </div>
            </Sidebar>
        );
    }

    if (error) {
        return (
            <Sidebar>
                <div className="flex flex-col p-1">
                    <h1 className="text-slate-200 font-bold">Cadastro de Fornecedor</h1>
                    <div className="p-2 border-b border-gray-800" />
                    <div className="flex justify-center items-center h-full">
                        <p className="text-red-500">Erro: {error}</p>
                    </div>
                </div>
            </Sidebar>
        );
    }

    return (
        <Sidebar>
            <div className="flex flex-col p-1">
                <h1 className="text-slate-200 font-bold">Cadastro de Fornecedor</h1>
                <div className="p-2 border-b border-gray-800" />
                
                <div className="flex justify-between items-center py-4 border-gray-800">
                    <Input
                        type="text"
                        placeholder="Buscar fornecedor por razão social..."
                        value={busca}
                        onChange={(e) => {
                            setBusca(e.target.value);
                            setPaginaAtual(1);
                        }}
                        className="p-2 border-gray-700 w-1/2 text-slate-100"
                        size='lg'
                        variant='mixed'
                    />
                    <Button.Root
                        onClick={() => abrirModal(null)}
                        variant='soft'
                        intent='info'
                        size='lg'
                    >
                        <Button.Label>Novo Fornecedor</Button.Label>
                    </Button.Root>
                </div>

                <h2 className="text-xl text-slate-300 mb-4">Lista de Fornecedores</h2>
                <table className="min-w-full text-left text-sm text-gray-400">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-2">Código</th>
                            <th className="p-2">Pessoa</th>
                            <th className="p-2">Razão Social</th>
                            <th className="p-2">CNPJ/CPF</th>
                            <th className="p-2">Categoria</th>
                            <th className="p-2 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 text-slate-300 text-sm font-light">
                        {fornecedoresParaExibir.map(fornecedor => (
                            <tr key={fornecedor.id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="p-2">{fornecedor.id}</td>
                                <td className="p-2">
                                    {fornecedor.cnpj.length === 14 
                                        ? 'Jurídica'  
                                        : fornecedor.cnpj.length === 11 
                                            ? 'Física'  
                                            : 'N/A'     
                                    }
                                </td>
                                <td className="p-2 font">{fornecedor.razaoSocial}</td>
                                <td className="p-2">
                                    {fornecedor.cnpj.length === 14 
                                        ? `${fornecedor.cnpj.slice(0,2)}.${fornecedor.cnpj.slice(2,5)}.${fornecedor.cnpj.slice(5,8)}/${fornecedor.cnpj.slice(8,12)}-${fornecedor.cnpj.slice(12)}` 
                                        : fornecedor.cnpj.length > 0
                                            ? `${fornecedor.cnpj.slice(0,3)}.${fornecedor.cnpj.slice(3,6)}.${fornecedor.cnpj.slice(6,9)}-${fornecedor.cnpj.slice(9)}`  
                                            : 'N/A'
                                    }
                                </td>
                                <td className="p-2">{fornecedor.categoria}</td>
                                <td className="p-2 text-center">
                                    <div className="flex justify-center space-x-2">
                                        <Button.Root
                                            className="py-1 px-2"
                                            variant='soft'
                                            intent='warning'
                                            onClick={() => abrirModal(fornecedor)} // Passar fornecedor para edição
                                        >
                                            <Button.Label>Editar</Button.Label>
                                        </Button.Root>
                                        <Button.Root
                                            className="py-1 px-2"
                                            variant='ghost'
                                            intent='danger'
                                            onClick={() => confirmarApagar(fornecedor)} // Abre modal de confirmação
                                        >
                                            <Button.Label>Apagar</Button.Label>
                                        </Button.Root>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginação */}
                {totalPaginas > 1 && (
                    <div className="flex justify-center mt-4">
                        <Button.Root onClick={paginaAnterior} size='md' intent='primary' variant='mixed' disabled={paginaAtual === 1}>
                            Anterior
                        </Button.Root>
                        <span className="mx-2">{paginaAtual} de {totalPaginas}</span>
                        <Button.Root onClick={proximaPagina} size='md' intent='primary' variant='mixed' disabled={paginaAtual === totalPaginas}>
                            Próxima
                        </Button.Root>
                    </div>
                )}

            </div>

            {/* Modal de Cadastro */}
            {modalVisible && (
                <ModalCadastroFornecedor
                    onClose={fecharModal}
                    fornecedor={fornecedorEditar}
                    onSave={handleSave}
                />
            )}

            {/* Modal de Confirmação de Exclusão */}
            {modalConfirmVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
                        <h2 className="text-lg font-semibold mb-4">Confirmação de Exclusão</h2>
                        <p className="mb-4">Tem certeza de que deseja apagar o fornecedor {fornecedorApagar?.razaoSocial}?</p>
                        <div className="flex justify-between">
                            <Button.Root onClick={() => setModalConfirmVisible(false)} variant='soft' intent='secondary'>
                                Cancelar
                            </Button.Root>
                            <Button.Root onClick={apagarFornecedor} variant='soft' intent='danger'>
                                Apagar
                            </Button.Root>
                        </div>
                    </div>
                </div>
            )}
        </Sidebar>
    );
}

export default CadastroFornecedor;
