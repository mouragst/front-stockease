// CadastroUnidade.js
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ModalCadastroUnidade from '../Modal/ModalCadastroUnidade';

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

                    {/* Modal de cadastro de unidade */}
                    {modalVisible && <ModalCadastroUnidade onClose={fecharModal} />}
                </div>
            </Sidebar>
        </>
    );
}

export default CadastroUnidade;
