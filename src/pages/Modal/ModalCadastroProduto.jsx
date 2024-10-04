import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import apiUrl from '../../config';

function ModalCadastroProduto({ onClose }) {
    const [codigo, setCodigo] = useState('');
    const [grupo, setGrupo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [estoqueMinimo, setEstoqueMinimo] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [cnpjCpf, setCnpjCpf] = useState('');
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState('');
    const [inscricaoEstadual, setInscricaoEstadual] = useState('');
    const [categoria, setCategoria] = useState('');
    const [familiaProdutos, setFamiliaProdutos] = useState('');
    const [familiaServicos, setFamiliaServicos] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controle de loading

    const handleSave = async () => {
        const novoProduto = {
            codigo,
            grupo,
            descricao,
            estoqueMinimo,
            fornecedor,
            cnpjCpf,
            inscricaoMunicipal,
            inscricaoEstadual,
            categoria,
            familiaProdutos,
            familiaServicos,
        };

        setLoading(true); // Ativa o estado de loading

        try {
            const response = await fetch(`${apiUrl}/api/produtos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoProduto),
            });

            if (response.ok) {
                console.log('Produto cadastrado com sucesso');
                resetForm();
                onClose();
            } else {
                console.error('Erro ao cadastrar produto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCodigo('');
        setGrupo('');
        setDescricao('');
        setEstoqueMinimo('');
        setFornecedor('');
        setCnpjCpf('');
        setInscricaoMunicipal('');
        setInscricaoEstadual('');
        setCategoria('');
        setFamiliaProdutos('');
        setFamiliaServicos('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Produto</h2>

                <div className="grid grid-cols-2 gap-4 p-2 px-1">
                    <Input label="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Digite o código" />
                    <Input label="Grupo" value={grupo} onChange={(e) => setGrupo(e.target.value)} placeholder="Digite o grupo" />
                    <Textarea
                        rows={5}
                        className="col-span-2"
                        label="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Digite a descrição"
                    />
                    <Input
                        label="Estoque Mínimo"
                        value={estoqueMinimo}
                        onChange={(e) => setEstoqueMinimo(e.target.value)}
                        placeholder="Digite o estoque mínimo"
                    />
                    <Input
                        label="Razão Social do Fornecedor"
                        value={fornecedor}
                        onChange={(e) => setFornecedor(e.target.value)}
                        placeholder="Digite a razão social do fornecedor"
                    />
                    <Input label="CNPJ/CPF" value={cnpjCpf} onChange={(e) => setCnpjCpf(e.target.value)} placeholder="CNPJ ou CPF do fornecedor" disabled />
                    <Input
                        label="Inscrição Municipal"
                        value={inscricaoMunicipal}
                        onChange={(e) => setInscricaoMunicipal(e.target.value)}
                        placeholder="Inscrição municipal"
                        disabled
                    />
                    <Input
                        label="Inscrição Estadual"
                        value={inscricaoEstadual}
                        onChange={(e) => setInscricaoEstadual(e.target.value)}
                        placeholder="Digite a inscrição estadual"
                        disabled
                    />
                    <Input
                        label="Categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        placeholder="Digite a categoria"
                        disabled
                    />
                    <Input
                        label="Família de Produtos"
                        value={familiaProdutos}
                        onChange={(e) => setFamiliaProdutos(e.target.value)}
                        placeholder="Digite a família de produtos"
                        disabled
                    />
                    <Input
                        label="Família de Serviços"
                        value={familiaServicos}
                        onChange={(e) => setFamiliaServicos(e.target.value)}
                        placeholder="Digite a família de serviços"
                        disabled
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <Button.Root onClick={onClose} variant="ghost" intent="danger" className="border border-gray-600 mr-2">
                        <Button.Label>Cancelar</Button.Label>
                    </Button.Root>
                    <Button.Root onClick={handleSave} variant="soft" intent="success" className="border border-gray-600" disabled={loading}>
                        {loading ? (
                            <span>Salvando...</span> // Exibe mensagem de loading
                        ) : (
                            <Button.Label>Salvar</Button.Label>
                        )}
                    </Button.Root>
                </div>
            </div>
        </div>
    );
}

export default ModalCadastroProduto;
