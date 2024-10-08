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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center">
            <div className="bg-gray-800 text-slate-300 p-8 rounded-lg w-full max-w-3xl">
                <h2 className="text-2xl text-slate-300 mb-4">Adicionar Serviço</h2>
                <form>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-slate-300">Código do Serviço</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                value={codigoServico}
                                placeholder='Digite o código do serviço'
                                onChange={(e) => setCodigoServico(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300">Descrição</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300">Quantidade</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                placeholder='Digite a quantidade'
                            />
                        </div>
                        <div>
                            <label className="block text-slate-300">Tipo de Quantidade</label>
                            <select
                                className="w-full p-2 border rounded bg-gray-700 text-white"
                                value={tipoQuantidade}
                                onChange={(e) => setTipoQuantidade(e.target.value)}
                            >
                                <option value="horas">Horas</option>
                                <option value="unidades">Unidades</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-300">Valor Unitário</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded bg-gray-800 text-white"
                                value={valorUnitario}
                                onChange={(e) => setValorUnitario(e.target.value)}
                                disabled
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
                    <table className="min-w-full bg-gray-700 border rounded text-slate-300">
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
