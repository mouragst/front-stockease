import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { apiUrl } from '../../config';

function ModalCadastroFornecedor({ onClose, fornecedor }) {
    const [codigo, setCodigo] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState('');
    const [inscricaoEstadual, setInscricaoEstadual] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [contato, setContato] = useState('');
    const [categoria, setCategoria] = useState('');
    const [familiaProdutos, setFamiliaProdutos] = useState('');
    const [familiaServicos, setFamiliaServicos] = useState('');
    const [loading, setLoading] = useState(false);

    // Carregar os dados do fornecedor no modal, se estiver editando
    useEffect(() => {
        if (fornecedor) {
            setCodigo(fornecedor.codigo || '');
            setRazaoSocial(fornecedor.razaoSocial || '');
            setCnpj(fornecedor.cnpj || '');
            setInscricaoMunicipal(fornecedor.inscricaoMunicipal || '');
            setInscricaoEstadual(fornecedor.inscricaoEstadual || '');
            setEndereco(fornecedor.endereco || '');
            setCidade(fornecedor.cidade || '');
            setCep(fornecedor.cep || '');
            setUf(fornecedor.uf || '');
            setTelefone(fornecedor.telefone || '');
            setEmail(fornecedor.email || '');
            setContato(fornecedor.contato || '');
            setCategoria(fornecedor.categoria || '');
            setFamiliaProdutos(fornecedor.familiaProdutos || '');
            setFamiliaServicos(fornecedor.familiaServicos || '');
        }
    }, [fornecedor]);

    const handleSave = async () => {
        const fornecedorData = {
            codigo,
            razaoSocial,
            cnpj,
            inscricaoMunicipal,
            inscricaoEstadual,
            endereco,
            cidade,
            cep,
            uf,
            telefone,
            email,
            contato,
            categoria,
            familiaProdutos,
            familiaServicos
        };

        setLoading(true);

        try {
            const method = fornecedor?.id ? 'PUT' : 'POST';
            const url = fornecedor?.id 
                ? `${apiUrl}/api/fornecedores/${fornecedor.id}` 
                : `${apiUrl}/api/fornecedores`;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fornecedorData),
            });

            if (response.ok) {
                console.log(fornecedor?.id ? 'Fornecedor atualizado com sucesso' : 'Fornecedor cadastrado com sucesso');
                resetForm();
                onClose(); // Fechar o modal após salvar/editar
            } else {
                console.error('Erro ao salvar fornecedor');
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCodigo('');
        setRazaoSocial('');
        setCnpj('');
        setInscricaoMunicipal('');
        setInscricaoEstadual('');
        setEndereco('');
        setCidade('');
        setCep('');
        setUf('');
        setTelefone('');
        setEmail('');
        setContato('');
        setCategoria('');
        setFamiliaProdutos('');
        setFamiliaServicos('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-6 text-slate-300">
                    {fornecedor ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <Input label="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} placeholder="Digite a razão social" />
                    <Input label="CNPJ/CPF" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Digite o CNPJ ou CPF" />

                    <Input label="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Digite o endereço" />
                    <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Digite a cidade" />

                    <div className="grid grid-cols-3 gap-4">
                        <Input label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Digite o CEP" />
                        <Input label="UF" value={uf} onChange={(e) => setUf(e.target.value)} placeholder="Digite o UF" />
                        <Input label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Digite o telefone" />
                    </div>

                    <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email" />
                    <Input label="Contato" value={contato} onChange={(e) => setContato(e.target.value)} placeholder="Digite o contato" />

                    <Input label="Inscrição Municipal" value={inscricaoMunicipal} onChange={(e) => setInscricaoMunicipal(e.target.value)} placeholder="Digite a inscrição municipal" />
                    <Input label="Inscrição Estadual" value={inscricaoEstadual} onChange={(e) => setInscricaoEstadual(e.target.value)} placeholder="Digite a inscrição estadual" />

                    <div className="grid grid-cols-3 gap-4">
                        <Input label="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" />
                        <Input label="Família de Produtos" value={familiaProdutos} onChange={(e) => setFamiliaProdutos(e.target.value)} placeholder="Família de produtos" />
                        <Input label="Família de Serviços" value={familiaServicos} onChange={(e) => setFamiliaServicos(e.target.value)} placeholder="Família de serviços" />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <Button.Root onClick={onClose} variant='ghost' intent='danger' className='border border-gray-600 mr-2' disabled={loading}>
                        <Button.Label>Cancelar</Button.Label>
                    </Button.Root>
                    <Button.Root onClick={handleSave} variant='soft' intent='success' className='border border-gray-600' disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                    </Button.Root>
                </div>
            </div>
        </div>
    );
}

export default ModalCadastroFornecedor;
