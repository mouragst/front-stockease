import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { apiUrl } from '../../config';
import InputMask from 'react-input-mask';

function ModalCadastroFornecedor({ onClose, fornecedor }) {
    const [codigo, setCodigo] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [numeroLogradouro, setNumeroLogradouro] = useState('');
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
            setNumeroLogradouro(fornecedor.numeroLogradouro || '');
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
            ativo : 1,
            telefone,
            email,
            contato,
            categoria,
            familiaProdutos,
            familiaServicos
        };

        setLoading(true);

        if (razaoSocial === '') { console.log("Razão Social é obrigatória"), setLoading(false); return; } 

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

    const consultaCnpj = async () => {
        setCnpj(cnpj.replace(/[^\d]+/g, ''));
        console.log(cnpj);
        if (cnpj.length !== 14) { return }
        try {
            // API COM USO LIMITADO DE 5 REQUISIÇÕES POR MINUTO, COMO É PARA PORTFÓLIO, JÁ ESTÁ EXCELENTE
            const response = await fetch(`https://open.cnpja.com/office/${cnpj}`);
            const dadosFornecedor = await response.json();
            setRazaoSocial(dadosFornecedor.company.name);
        } catch (error) {
            console.error('Erro ao consultar CNPJ:', error);
        }
    };

    const consultaCep = async () => {
        setCep(cep.replace('-', ''));
        if (cep.length !== 8) { return }
        try {
            // Consulta o CEP na API ViaCEP
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dadosEndereco = await response.json();
            setEndereco(dadosEndereco.logradouro);
            setCidade(dadosEndereco.localidade);
            setUf(dadosEndereco.uf);
        } catch (error) {
            console.error('Erro ao consultar CEP:', error);
        }
    }

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
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2 border border-gray-500">
                <h2 className="text-xl font-bold mb-6 text-slate-300">
                    {fornecedor ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <InputMask
                        mask="99.999.999/9999-99"
                        value={cnpj}
                        onBlur={consultaCnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        >
                        {(inputProps) => <Input {...inputProps} label="CNPJ/CPF" placeholder="Digite o CNPJ ou CPF" />}
                    </InputMask>
                    <Input label="Razão Social" value={razaoSocial} placeholder="Digite a razão social" disabled/>

                    <InputMask
                        mask="99999999999999"
                        value={inscricaoMunicipal}
                        onChange={(e) => setInscricaoMunicipal(e.target.value)}
                        >
                        {(inputProps) => <Input {...inputProps} label="Inscrição Municipal" placeholder="Digite a inscrição municipal" />}
                    </InputMask>


                    <InputMask
                        mask="999999999"
                        value={inscricaoEstadual}
                        onChange={(e) => setInscricaoEstadual(e.target.value)}
                        >
                        {(inputProps) => <Input {...inputProps} label="Inscrição Estadual" placeholder="Digite a inscrição estadual" />}
                    </InputMask>

                    <div className="grid grid-cols-3 gap-4">
                        <InputMask
                            mask="99999-999"
                            value={cep}
                            onBlur={consultaCep}
                            onChange={(e) => setCep(e.target.value)}
                            >
                            {(inputProps) => <Input {...inputProps} label="CEP" placeholder="Digite o CEP" />}
                        </InputMask>
                        <Input label="UF" value={uf} onChange={(e) => setUf(e.target.value)} disabled placeholder="Digite o UF" />
                        <Input label="NumeroLogradouro" value={numeroLogradouro} onChange={(e) => setNumeroLogradouro(e.target.value)} placeholder="Digite o numero do logradouro" />
                    </div>

                    <Input label="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} disabled placeholder="Digite o endereço" />
                    <Input label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} disabled placeholder="Digite a cidade" />

                    <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email" />

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Categoria" />
                        <Input label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="Digite o telefone" />
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
ModalCadastroFornecedor.propTypes = {
    onClose: PropTypes.func.isRequired,
    fornecedor: PropTypes.shape({
        id: PropTypes.number,
        codigo: PropTypes.string,
        razaoSocial: PropTypes.string,
        cnpj: PropTypes.string,
        numeroLogradouro: PropTypes.int,
        inscricaoMunicipal: PropTypes.string,
        inscricaoEstadual: PropTypes.string,
        endereco: PropTypes.string,
        cidade: PropTypes.string,
        cep: PropTypes.string,
        uf: PropTypes.string,
        telefone: PropTypes.string,
        email: PropTypes.string,
        contato: PropTypes.string,
        categoria: PropTypes.string,
        familiaProdutos: PropTypes.string,
        familiaServicos: PropTypes.string,
    }),
};

export default ModalCadastroFornecedor;
