import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import {apiUrl} from '../../config';

function ModalCadastroFornecedor({ onClose }) {
    const [codigo, setCodigo] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpjCpf, setCnpjCpf] = useState('');
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

    // Estado de carregamento
    const [loading, setLoading] = useState(false);
    
    const handleSave = async () => {
        const novoFornecedor = {
            codigo,
            razaoSocial,
            cnpjCpf,
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
            const response = await fetch(`${apiUrl}/fornecedores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoFornecedor),
            });

            if (response.ok) {
                console.log('Fornecedor cadastrado com sucesso');
                resetForm();
                onClose();
            } else {
                console.error('Erro ao cadastrar fornecedor');
            } 
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false); // Finalizar o loading
        }
    };

    const resetForm = () => {
        setCodigo('');
        setRazaoSocial('');
        setCnpjCpf('');
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
                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Fornecedor</h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <Input label="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} placeholder="Digite a razão social" />
                    <Input label="CNPJ/CPF" value={cnpjCpf} onChange={(e) => setCnpjCpf(e.target.value)} placeholder="Digite o CNPJ ou CPF" />

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
                        {loading ? 'Salvando...' : 'Salvar'} {/* Mostra loading ou o texto padrão */}
                    </Button.Root>
                </div>
            </div>
        </div>
    );
}

export default ModalCadastroFornecedor;
