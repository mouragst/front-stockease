import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalCadastroUnidade from '../Modal/ModalCadastroUnidade';
import { apiUrl } from '../../config'; // Certifique-se de que apiUrl está configurado corretamente

function CadastroUnidade() {
    const [modalVisible, setModalVisible] = useState(false);
    const [busca, setBusca] = useState('');
    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(false);

    // Função para abrir o modal de cadastro
    const abrirModal = () => {
        setModalVisible(true);
    };

    // Função para fechar o modal
    const fecharModal = () => {
        setModalVisible(false);
    };

    // Função para buscar as unidades na API
    const fetchUnidades = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/unidades`);
            if (response.ok) {
                const data = await response.json();
                setUnidades(data);
            } else {
                console.error('Erro ao buscar unidades:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para buscar as unidades quando o componente é montado
    useEffect(() => {
        fetchUnidades();
    }, []);

    // Filtrar as unidades com base na busca
    const unidadesFiltradas = unidades.filter(unidade =>
        unidade.razaoSocial.toLowerCase().includes(busca.toLowerCase()) ||
        unidade.cnpj.includes(busca)
    );

    return (
        <>
            <Sidebar>
                <div className="flex flex-col p-1">
                    <h1 className="text-slate-200 font-bold">Cadastro de Unidades</h1>
                    <div className="p-2 border-b border-gray-800" />

                    <div className="flex justify-between items-center py-4 border-gray-800">
                        <Input
                            type="text"
                            placeholder="Buscar unidade"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="p-2 border-gray-700 w-1/2 text-slate-100"
                            size="lg"
                            variant="mixed"
                        />
                        <Button.Root onClick={abrirModal} variant="soft" intent="info" size="lg">
                            <Button.Label>Nova Unidade</Button.Label>
                        </Button.Root>
                    </div>

                    {/* Tabela de unidades */}
                    <div className="mt-4">
                        <h2 className="text-xl text-slate-300 mb-4">Cadastro de Unidades</h2>
                        {loading ? (
                            <p className="text-center text-gray-500">Carregando unidades...</p>
                        ) : (
                            <table className="min-w-full text-left text-sm text-gray-400">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-2">Razão Social</th>
                                        <th className="px-4 py-2">CNPJ</th>
                                        <th className="px-4 py-2">Cidade</th>
                                        <th className="px-4 py-2">UF</th>
                                        <th className="px-4 py-2">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unidadesFiltradas.length > 0 ? (
                                        unidadesFiltradas.map((unidade, index) => (
                                            <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                                                <td className="px-4 py-2">{unidade.razaoSocial}</td>
                                                <td className="px-4 py-2">{unidade.cnpj}</td>
                                                <td className="px-4 py-2">{unidade.cidade}</td>
                                                <td className="px-4 py-2">{unidade.uf}</td>
                                                <td className="px-4 py-2 flex space-x-2">
                                                    <Button.Root variant="soft" intent="info">
                                                        Editar
                                                    </Button.Root>
                                                    <Button.Root variant="soft" intent="danger">
                                                        Apagar
                                                    </Button.Root>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-2 text-center">Nenhuma unidade encontrada.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {modalVisible && <ModalCadastroUnidade onClose={fecharModal} />}
                </div>
            </Sidebar>
        </>
    );
}

export default CadastroUnidade;
