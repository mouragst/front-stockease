import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';

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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
            familiaServicos: ['Suporte Técnico', 'Consultoria de TI', 'Desenvolvimento de Software'],
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
    const itensPorPagina = 17; // Defina quantos itens por página você deseja
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
                            intent='warning'
                            size='lg'
                        >
                            <Button.Label>Novo Fornecedor</Button.Label>
                        </Button.Root>
                    </div>

                    {/* Lista de fornecedores */}
                    <table className="min-w-full bg-gray-800 rounded rounded-lg">
                        <thead>
                            <tr className="text-left text-slate-300 bg-gray-700">
                                <th className="p-2">Código</th>
                                <th className="p-2">Pessoa</th>
                                <th className="p-2">Razão Social</th>
                                <th className="p-2">CNPJ/CPF</th>
                                <th className="p-2">Categoria</th>
                                <th className="p-2">Família de Produtos</th>
                                <th className="p-2">Família de Serviços</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fornecedoresParaExibir.map(fornecedor => (
                                <tr key={fornecedor.codigo} className="text-slate-200 border-b border-gray-700">
                                    <td className="p-2">{fornecedor.codigo}</td>
                                    <td className="p-2">{fornecedor.tipoPessoa}</td>
                                    <td className="p-2">{fornecedor.razaoSocial}</td>
                                    <td className="p-2">{fornecedor.cnpj || fornecedor.cpf}</td>
                                    <td className="p-2">{fornecedor.categoria}</td>
                                    <td className="p-2">{fornecedor.familiaProdutos.join(', ')}</td>
                                    <td className="p-2">{fornecedor.familiaServicos.join(', ')}</td>
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

                    {/* Modal de cadastro de fornecedor */}
                    {modalVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2"> {/* Aumenta a largura e adiciona sombra */}
                                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Fornecedor</h2>
                                {/* Campos para cadastro */}
                                <div className="grid grid-cols-2 gap-6 mb-6"> {/* Aumenta o espaço entre os campos */}
                                    <Input label="Razão Social" placeholder="Digite a razão social" />
                                    <Input label="CNPJ/CPF" placeholder="Digite o CNPJ ou CPF" />
                                    <Input label="Inscrição Municipal" placeholder="Digite a inscrição municipal" />
                                    <Input label="Inscrição Estadual" placeholder="Digite a inscrição estadual" />
                                    <Input label="Categoria" placeholder="Digite a categoria" />
                                    <Input label="Família de Produtos" placeholder="Digite a família de produtos" />
                                    <Input label="Família de Serviços" placeholder="Digite a família de serviços" />
                                </div>

                                <div className="flex justify-end mt-6">
                                    <Button.Root onClick={fecharModal} 
                                    variant='ghost'
                                    intent='danger'
                                    className='border border-gray-600 mr-2'>
                                        <Button.Label>Cancelar</Button.Label>
                                    </Button.Root>
                                    <Button.Root 
                                    variant='soft'
                                    intent='success'
                                    className='border border-gray-600'>
                                        <Button.Label>Salvar</Button.Label>
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

export default CadastroFornecedor;
