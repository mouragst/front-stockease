import { useState, useEffect } from 'react';
import { apiUrl } from '../../config';
import Sidebar from '../Sidebar/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalCadastroUsuario from '../Modal/ModalCadastroUsuario';

function CadastroUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [busca, setBusca] = useState('');
    const [usuarioEditar, setUsuarioEditar] = useState(null);
    const [usuarioApagar, setUsuarioApagar] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 14;

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/usuario`);
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const totalItens = usuariosFiltrados.length;
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    useEffect(() => {
        if (paginaAtual > totalPaginas) {
            setPaginaAtual(totalPaginas || 1);
        }
    }, [totalPaginas, paginaAtual]);

    const usuariosParaExibir = usuariosFiltrados.slice(
        (paginaAtual - 1) * itensPorPagina,
        paginaAtual * itensPorPagina
    );

    const abrirModal = (usuario) => {
        setUsuarioEditar(usuario);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setUsuarioEditar(null);
    };

    const handleSave = async () => {
        await fetchUsuarios();
        fecharModal();
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

    const confirmarApagar = (usuario) => {
        setUsuarioApagar(usuario);
        setModalConfirmVisible(true);
    };

    const apagarUsuario = async () => {
        if (usuarioApagar) {
            try {
                const response = await fetch(`${apiUrl}/api/usuarios/${usuarioApagar.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ativo: 0 })
                });

                if (!response.ok) {
                    throw new Error('Erro ao apagar o usuário');
                }

                await fetchUsuarios();
                setModalConfirmVisible(false);
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (error) {
        return (
            <Sidebar>
                <div className="flex flex-col p-1">
                    <h1 className="text-slate-200 font-bold">Cadastro de Usuário</h1>
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
                <h1 className="text-slate-200 font-bold">Cadastro de Usuário</h1>
                <div className="p-2 border-b border-gray-800" />
                
                <div className="flex justify-between items-center py-4 border-gray-800">
                    <Input
                        type="text"
                        placeholder="Buscar usuário por nome..."
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
                        disabled={loading}
                    >
                        <Button.Label>Novo Usuário</Button.Label>
                    </Button.Root>
                </div>

                <h2 className="text-xl text-slate-300 mb-4">Lista de Usuários</h2>
                <table className="min-w-full text-left text-sm text-gray-400">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-2">Código</th>
                            <th className="p-2">Nome</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 text-slate-300 text-sm font-light">
                        {loading ? (
                            Array.from({ length: itensPorPagina }).map((_, index) => (
                                    <tr key={index} className="border border-gray-700 bg-gray-800 animate-pulse">
                                        <td className="px-4 py-6 h-10"></td>
                                        <td className="px-4 py-6"></td>
                                        <td className="px-4 py-6"></td>
                                        <td className="px-4 py-6"></td>
                                    </tr>
                                ))
                        ) : (
                            usuariosParaExibir.map(usuario => (
                                <tr key={usuario.id} className="border-b border-gray-700 hover:bg-gray-700">
                                    <td className="p-2">{usuario.id}</td>
                                    <td className="p-2">{usuario.nome}</td>
                                    <td className="p-2">{usuario.email}</td>
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <Button.Root
                                                className="py-1 px-2"
                                                variant='soft'
                                                intent='warning'
                                                onClick={() => abrirModal(usuario)}
                                            >
                                                <Button.Label>Editar</Button.Label>
                                            </Button.Root>
                                            <Button.Root
                                                className="py-1 px-2"
                                                variant='ghost'
                                                intent='danger'
                                                onClick={() => confirmarApagar(usuario)}
                                            >
                                                <Button.Label>Apagar</Button.Label>
                                            </Button.Root>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

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

            {modalVisible && (
                <ModalCadastroUsuario
                    onClose={fecharModal}
                    usuario={usuarioEditar}
                    onSave={handleSave}
                />
            )}

            {modalConfirmVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-gray-800 text-slate-300 rounded-lg shadow-lg p-6 max-w-md mx-auto">
                        <h2 className="text-lg font-semibold mb-4">Confirmação de Exclusão</h2>
                        <p className="mb-4">Tem certeza de que deseja apagar o usuário {usuarioApagar?.nome}?</p>
                        <div className="flex justify-between">
                            <Button.Root onClick={() => setModalConfirmVisible(false)} variant='soft' intent='secondary'>
                                Cancelar
                            </Button.Root>
                            <Button.Root onClick={apagarUsuario} variant='soft' intent='danger'>
                                Apagar
                            </Button.Root>
                        </div>
                    </div>
                </div>
            )}
        </Sidebar>
    );
}

export default CadastroUsuario;