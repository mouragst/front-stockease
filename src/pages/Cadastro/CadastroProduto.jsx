import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalCadastroProduto from '../Modal/ModalCadastroProduto';

function CadastroProduto() {
    const [modalVisible, setModalVisible] = useState(false);
    const [busca, setBusca] = useState('');
    const [produtos, setProdutos] = useState([ // Produtos fictícios para exemplo
        { codigo: '001.001.001', grupo: 'Eletrônicos', descricao: 'Smartphone XYZ', fornecedor: 'Tech Corp' },
        { codigo: '001.002.002', grupo: 'Eletrodomésticos', descricao: 'Geladeira ABC', fornecedor: 'Cool Appliances' }
    ]);

    // Função para abrir o modal de cadastro
    const abrirModal = () => {
        setModalVisible(true);
    };

    // Função para fechar o modal
    const fecharModal = () => {
        setModalVisible(false);
    };

    // Filtrar os produtos com base na busca
    const produtosFiltrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        produto.codigo.includes(busca)
    );

    return (
        <>
            <Sidebar>
                <div className="flex flex-col p-1">
                    <h1 className="text-slate-200 font-bold">Cadastro de produto</h1>
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
                        <h2 className="text-xl text-slate-300 mb-4">Cadastro de produtos</h2>
                        <table className="min-w-full text-left text-sm text-gray-400">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-4 py-2">Código</th>
                                    <th className="px-4 py-2">Grupo</th>
                                    <th className="px-4 py-2">Descrição</th>
                                    <th className="px-4 py-2">Fornecedor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtosFiltrados.length > 0 ? (
                                    produtosFiltrados.map((produto, index) => (
                                        <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                                            <td className="px-4 py-2">{produto.codigo}</td>
                                            <td className="px-4 py-2">{produto.grupo}</td>
                                            <td className="px-4 py-2">{produto.descricao}</td>
                                            <td className="px-4 py-2">{produto.fornecedor}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-2 text-center">Nenhum produto encontrado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {modalVisible && <ModalCadastroProduto onClose={fecharModal} />}
                </div>
            </Sidebar>
        </>
    );
}

export default CadastroProduto;
