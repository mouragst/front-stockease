import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalCadastroFornecedor from '../Modal/ModalCadastroFornecedor';

function CadastroFornecedor() {
    // Lista de fornecedores fictícia
    const [fornecedores, setFornecedores] = useState([
        {
            codigo: 1,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 2,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 3,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 4,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 5,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 6,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 7,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 8,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 9,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 10,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 11,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 12,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 13,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 14,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 15,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 16,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 17,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 18,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        {
            codigo: 19,
            tipoPessoa: 'Jurídica',
            razaoSocial: 'Tech Solutions LTDA',
            cnpj: '12.345.678/0001-90',
            inscricaoMunicipal: '12345678',
            inscricaoEstadual: '987654321',
            categoria: 'Tecnologia',
            familiaProdutos: ['Computadores', 'Servidores', 'Periféricos'],
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Dev'],
        },
        {
            codigo: 20,
            tipoPessoa: 'Física',
            razaoSocial: 'João da Silva',
            cpf: '123.456.789-00',
            inscricaoMunicipal: '87654321',
            inscricaoEstadual: '123456789',
            categoria: 'Serviços Gerais',
            familiaProdutos: ['Ferramentas', 'Equipamentos'],
            familiaServicos: ['Mão de obra', 'Manutenção']
        },
        
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [busca, setBusca] = useState('');
    
    // Paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 14; // Defina quantos itens por página você deseja
    const totalItens = fornecedores.filter(fornecedor =>
        fornecedor.razaoSocial.toLowerCase().includes(busca.toLowerCase())
    ).length;
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);
    
    // Função para filtrar fornecedores com base no campo de busca
    const fornecedoresFiltrados = fornecedores.filter(fornecedor =>
        fornecedor.razaoSocial.toLowerCase().includes(busca.toLowerCase())
    );

    // Calcular fornecedores a serem exibidos na página atual
    const fornecedoresParaExibir = fornecedoresFiltrados.slice(
        (paginaAtual - 1) * itensPorPagina,
        paginaAtual * itensPorPagina
    );

    // Função para abrir o modal de cadastro
    const abrirModal = () => {
        setModalVisible(true);
    };

    // Função para fechar o modal
    const fecharModal = () => {
        setModalVisible(false);
    };

    // Funções para navegação na página
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

    return (
        <>
            <Sidebar>
                <div className="flex flex-col p-1">
                    <h1 className="text-slate-200 font-bold">Cadastro de Fornecedor</h1>
                    <div className="p-2 border-b border-gray-800" />
                    
                    <div className="flex justify-between items-center py-4 border-gray-800">
                        <Input
                            type="text"
                            placeholder="Buscar fornecedor"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="p-2 border-gray-700 w-1/2 text-slate-100"
                            size='lg'
                            variant='mixed'
                        />
                        <Button.Root
                            onClick={abrirModal}
                            variant='soft'
                            intent='info'
                            size='lg'
                        >
                            <Button.Label>Novo Fornecedor</Button.Label>
                        </Button.Root>
                    </div>

                    {/* Lista de fornecedores */}
                    <h2 className="text-xl text-slate-300 mb-4">Cadastro de fornecedor</h2>
                    <table className="min-w-full text-left text-sm text-gray-400">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-2">Código</th>
                                <th className="p-2">Pessoa</th>
                                <th className="p-2">Razão Social</th>
                                <th className="p-2">CNPJ/CPF</th>
                                <th className="p-2">Categoria</th>
                                <th className="p-2">Família de Produtos</th>
                                <th className="p-2">Família de Serviços</th>
                                <th className="p-2 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900 text-slate-300 text-sm font-light">
                            {fornecedoresParaExibir.map(fornecedor => (
                                <tr key={fornecedor.codigo} className="border-b border-gray-700 hover:bg-gray-700">
                                    <td className="p-2">{fornecedor.codigo}</td>
                                    <td className="p-2">{fornecedor.tipoPessoa}</td>
                                    <td className="p-2 font">{fornecedor.razaoSocial}</td>
                                    <td className="p-2">{fornecedor.cnpj || fornecedor.cpf}</td>
                                    <td className="p-2">{fornecedor.categoria}</td>
                                    <td className="p-2">{fornecedor.familiaProdutos.join(', ')}</td>
                                    <td className="p-2">{fornecedor.familiaServicos.join(', ')}</td>
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <Button.Root
                                             className="py-1 px-2"
                                             variant='soft'
                                             intent='warning'>
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
                        </tbody>
                    </table>

                    {/* Paginação */}
                    <div className="flex justify-between items-center mt-4">
                        <Button.Root onClick={paginaAnterior} disabled={paginaAtual === 1} variant='soft' intent='primary'>
                            Anterior
                        </Button.Root>
                        <span className="text-slate-200">Página {paginaAtual} de {totalPaginas}</span>
                        <Button.Root onClick={proximaPagina} disabled={paginaAtual === totalPaginas} variant='soft' intent='primary'>
                            Próxima
                        </Button.Root>
                    </div>

                    {
                        modalVisible && <ModalCadastroFornecedor onClose={fecharModal} />
                    }

                </div>
            </Sidebar>
        </>
    );
}

export default CadastroFornecedor;
