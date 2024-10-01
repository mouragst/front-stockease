import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../components/Button';
import Input from '../../components/Input';

function CadastroUnidade() {

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
                    <h1 className="text-slate-200 font-bold">Cadastro de unidades</h1>
                    <div className="p-2 border-b border-gray-800" />
                    
                    <div className="flex justify-between items-center py-4 border-gray-800">
                        <Input
                            type="text"
                            placeholder="Buscar unidade"
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
                            <Button.Label>Nova Unidade</Button.Label>
                        </Button.Root>
                    </div>

                        {/* Modal de cadastro de produto */}
                        {modalVisible && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2"> {/* Aumenta a largura e adiciona sombra */}
                                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Unidade</h2>
                                {/* Campos para cadastro */}
                                <div className="grid grid-cols-2 gap-6 mb-6"> {/* Aumenta o espaço entre os campos */}
                                    <Input label="Razão Social" placeholder="Digite a razão social" />
                                    <Input label="CNPJ/CPF" placeholder="Digite o CNPJ ou CPF" />
                                    <Input label="Inscrição Municipal" placeholder="Digite a inscrição municipal" />
                                    <Input label="Inscrição Estadual" placeholder="Digite a inscrição estadual" />
                                    <Input label="Matriz" placeholder="Digite a categoria" />
                                    {/* <Input label="Família de Produtos" placeholder="Digite a família de produtos" />
                                    <Input label="Família de Serviços" placeholder="Digite a família de serviços" /> */}
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
    )
}

export default CadastroUnidade;