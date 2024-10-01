import  { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ModalServico from '../Modal/ModalServico';

function OrdemServico() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicosOrdem, setServicosOrdem] = useState([]);

    // Função para abrir o modal
    const handleOpenModal = () => setIsModalOpen(true);

    // Função para fechar o modal
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Sidebar>
            <div className='p-4'>
                <h1 className='text-2xl text-slate-300 mb-4'>Ordem de Serviço</h1>
                
                {/* Botão para abrir o modal de adicionar serviço */}
                <button 
                    className='bg-blue-500 text-gray-900 px-4 py-2 rounded-md hover:bg-blue-600'
                    onClick={handleOpenModal}>
                    Nova Ordem de Serviço
                </button>

                {/* Modal para Adicionar Serviço */}
                {isModalOpen && (
                    <ModalServico onClose={handleCloseModal} servicosOrdem={servicosOrdem} setServicosOrdem={setServicosOrdem} />
                )}

                {/* Tabela de Ordens de Serviço */}
                <div className="mt-6">
                    <h2 className="text-xl text-slate-300 mb-4">Ordens de Serviço Recentes</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-400">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="py-3 px-6">ID</th>
                                    <th className="py-3 px-6">Data</th>
                                    <th className="py-3 px-6">Total Serviços</th>
                                    <th className="py-3 px-6">Valor Total</th>
                                    <th className="py-3 px-6">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300 text-sm font-light">
                                {/* Renderizar as ordens de serviço aqui */}
                                {servicosOrdem.map((servico, index) => (
                                    <tr key={index} className="border-b border-gray-400 hover:bg-gray-700">
                                        <td className="py-3 px-6 whitespace-nowrap">{index + 1}</td>
                                        <td className="py-3 px-6">{new Date().toLocaleDateString()}</td>
                                        <td className="py-3 px-6">{servico.quantidade}</td>
                                        <td className="py-3 px-6">R$ {servico.valorTotal}</td>
                                        <td className="py-3 px-6">
                                            <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Sidebar>
    );
}

export default OrdemServico;
