import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

function CadastroProduto() {

    const [modalVisible, setModalVisible] = useState(false);
    const [busca, setBusca] = useState('');

    // Função para abrir o modal de cadastro
    const abrirModal = () => {
        setModalVisible(true);
    };

    // Função para fechar o modal
    const fecharModal = () => {
        setModalVisible(false);
    };

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
                            size='lg'
                            variant='mixed'
                        />
                        <Button.Root
                            onClick={abrirModal}
                            variant='soft'
                            intent='info'
                            size='lg'
                        >
                            <Button.Label>Novo Produto</Button.Label>
                        </Button.Root>
                    </div>

                    {/* Modal de cadastro de produto */}
                    {modalVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
                                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Produto</h2>
                                
                                {/* Campos para cadastro */}
                                <div className="grid grid-cols-2 gap-4 p-2 px-1"> {/* Layout em grade com duas colunas */}
                                    <Input label="Código" placeholder="Digite o código" />
                                    <Input label="Grupo" placeholder="Digite o grupo" />
                                    <Textarea rows={5} className="col-span-2" label="Descrição" placeholder="Digite a descrição" /> {/* Campo grande ocupa duas colunas */}
                                    <Input label="Estoque Minimo" placeholder="Digite o estoque mínimo" />
                                    <Input label="Razão Social do Fornecedor" placeholder="Digite a razão social do fornecedor" />

                                    {/* Campos menores alinhados */}
                                    <Input label="CNPJ/CPF" placeholder="CNPJ ou CPF do fornecedor" disabled={true} />
                                    <Input label="Inscrição Municipal" placeholder="Inscrição municipal" disabled={true} />

                                    <Input label="Inscrição Estadual" placeholder="Digite a inscrição estadual" disabled={true} />
                                    <Input label="Categoria" placeholder="Digite a categoria" disabled={true} />

                                    <Input label="Família de Produtos" placeholder="Digite a família de produtos" disabled={true} />
                                    <Input label="Família de Serviços" placeholder="Digite a família de serviços" disabled={true} />
                                </div>

                                {/* Botões de ação */}
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
    )
}

export default CadastroProduto;