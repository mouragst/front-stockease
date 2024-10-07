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
    const [busca, setBusca] = useState('');
    const [fornecedorEditar, setFornecedorEditar] = useState(null);
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
                                    {fornecedor.cnpj ? 'Jurídica' : fornecedor.cpf ? 'Física' : 'N/A'}
                                </td>
                                <td className="p-2 font">{fornecedor.razaoSocial}</td>
                                <td className="p-2">
                                    {fornecedor.cnpj 
                                        ? `${fornecedor.cnpj.slice(0,2)}.${fornecedor.cnpj.slice(2,5)}.${fornecedor.cnpj.slice(5,8)}/${fornecedor.cnpj.slice(8,12)}-${fornecedor.cnpj.slice(12)}`
                                        : fornecedor.cpf 
                                            ? `${fornecedor.cpf.slice(0,3)}.${fornecedor.cpf.slice(3,6)}.${fornecedor.cpf.slice(6,9)}-${fornecedor.cpf.slice(9)}`
                                            : 'N/A'}
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
                                            intent='danger'>
                                            <Button.Label>Apagar</Button.Label>
                                        </Button.Root>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {fornecedoresParaExibir.length === 0 && (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-slate-200">
                                    Nenhum fornecedor encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                    <Button.Root 
                        onClick={paginaAnterior} 
                        disabled={paginaAtual === 1} 
                        variant='soft' 
                        intent='primary'
                    >
                        Anterior
                    </Button.Root>
                    <span className="text-slate-200">Página {paginaAtual} de {totalPaginas}</span>
                    <Button.Root 
                        onClick={proximaPagina} 
                        disabled={paginaAtual === totalPaginas || totalPaginas === 0} 
                        variant='soft' 
                        intent='primary'
                    >
                        Próxima
                    </Button.Root>
                </div>
            </div>

            {modalVisible && (
                <ModalCadastroFornecedor 
                    visible={modalVisible} 
                    onClose={fecharModal} 
                    fornecedor={fornecedorEditar} // Passa o fornecedor para o modal
                    onSave={handleSave} // Chama a função para buscar fornecedores após salvar
                />
            )}
        </Sidebar>
    );
}

export default CadastroFornecedor;
