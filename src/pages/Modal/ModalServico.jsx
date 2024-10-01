import { useState } from 'react';

function ModalServico({ onClose, servicosOrdem, setServicosOrdem }) {
    const [codigoServico, setCodigoServico] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [tipoQuantidade, setTipoQuantidade] = useState('horas'); // Ex: horas ou outro
    const [valorUnitario, setValorUnitario] = useState('');

    // Função para adicionar serviço à ordem de serviço
    const handleAddServico = () => {
        const novoServico = {
            codigoServico,
            descricao,
            quantidade: parseFloat(quantidade),
            tipoQuantidade,
            valorUnitario: parseFloat(valorUnitario),
            valorTotal: parseFloat(quantidade) * parseFloat(valorUnitario),
        };
        setServicosOrdem([...servicosOrdem, novoServico]);
        resetForm();
    };

    // Função para resetar o formulário
    const resetForm = () => {
        setCodigoServico('');
        setDescricao('');
        setQuantidade('');
        setTipoQuantidade('horas');
        setValorUnitario('');
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl text-gray-800 mb-4">Adicionar Serviço</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600">Código do Serviço</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={codigoServico}
                                onChange={(e) => setCodigoServico(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Descrição</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Quantidade</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Tipo de Quantidade</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={tipoQuantidade}
                                onChange={(e) => setTipoQuantidade(e.target.value)}
                            >
                                <option value="horas">Horas</option>
                                <option value="unidades">Unidades</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-600">Valor Unitário</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={valorUnitario}
                                onChange={(e) => setValorUnitario(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={handleAddServico}
                        >
                            Adicionar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

                {/* Mini tabela de serviços já adicionados */}
                <div className="mt-6">
                    <h3 className="text-xl mb-2">Serviços Adicionados</h3>
                    <table className="min-w-full bg-white border rounded">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 px-4 text-left">Código</th>
                                <th className="py-2 px-4 text-left">Descrição</th>
                                <th className="py-2 px-4 text-left">Quantidade</th>
                                <th className="py-2 px-4 text-left">Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicosOrdem.map((servico, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-4">{servico.codigoServico}</td>
                                    <td className="py-2 px-4">{servico.descricao}</td>
                                    <td className="py-2 px-4">
                                        {servico.quantidade} {servico.tipoQuantidade}
                                    </td>
                                    <td className="py-2 px-4">R$ {servico.valorTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ModalServico;
