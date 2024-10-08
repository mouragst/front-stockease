// ModalCadastroUnidade.js
import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { apiUrl } from '../../config';

function ModalCadastroUnidade({ onClose, unidade }) {
    // Estados para armazenar os dados do formulário
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState('');
    const [inscricaoEstadual, setInscricaoEstadual] = useState('');
    const [matriz, setMatriz] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    // Estado de carregamento
    const [loading, setLoading] = useState(false);

    // Função para limpar os campos após salvar ou cancelar
    const limparCampos = () => {
        setRazaoSocial('');
        setCnpj('');
        setInscricaoMunicipal('');
        setInscricaoEstadual('');
        setMatriz('');
        setCep('');
        setEndereco('');
        setCidade('');
        setUf('');
    };
    useEffect(() => {
        if (unidade) {
            setRazaoSocial(unidade.razaoSocial || '');
            setCnpj(unidade.cnpj || '');
            setInscricaoMunicipal(unidade.inscricaoMunicipal || '');
            setInscricaoEstadual(unidade.inscricaoEstadual || '');
            setMatriz(unidade.matriz || '');
            setCep(unidade.cep || '');
            setEndereco(unidade.endereco || '');
            setCidade(unidade.cidade || '');
            setUf(unidade.uf || '');
        }
    }, [unidade]);
    
    const handleSave = async () => {
        const novaUnidade = {
            razaoSocial: razaoSocial,
            cnpj: cnpj,
            inscricaoMunicipal: inscricaoMunicipal,
            inscricaoEstadual: inscricaoEstadual,
            matriz: matriz,
            cep: cep,
            endereco: endereco,
            cidade: cidade,
            uf: uf,
            ativo: true,
        };

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/unidades`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaUnidade),
            });

            if (response.ok) {
                console.log('Unidade cadastrada com sucesso!');
                limparCampos();
                onClose();
            } else {
                console.error('Erro ao cadastrar unidade');
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Unidade</h2>
                {/* Campos para cadastro */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <Input
                        label="Razão Social"
                        placeholder="Digite a razão social"
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                    />
                    <Input
                        label="CNPJ"
                        placeholder="Digite o CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                    />
                    <Input
                        label="Inscrição Municipal"
                        placeholder="Digite a inscrição municipal"
                        value={inscricaoMunicipal}
                        onChange={(e) => setInscricaoMunicipal(e.target.value)}
                    />
                    <Input
                        label="Inscrição Estadual"
                        placeholder="Digite a inscrição estadual"
                        value={inscricaoEstadual}
                        onChange={(e) => setInscricaoEstadual(e.target.value)}
                    />
                    <Input
                        label="Matriz"
                        placeholder="Digite o nome da matriz"
                        value={matriz}
                        onChange={(e) => setMatriz(e.target.value)}
                    />
                    <Input
                        label="CEP"
                        placeholder="Digite o CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                    />
                    <Input
                        label="Endereço"
                        placeholder="Digite o endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                    <Input
                        label="Cidade"
                        placeholder="Digite a cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                    />
                    <Input
                        label="UF"
                        placeholder="Digite o estado (UF)"
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <Button.Root
                        onClick={onClose}
                        variant='ghost'
                        intent='danger'
                        className='border border-gray-600 mr-2'
                        disabled={loading} // Desabilita o botão ao carregar
                    >
                        <Button.Label>Cancelar</Button.Label>
                    </Button.Root>
                    <Button.Root
                        onClick={handleSave} // Chama a função de salvar ao clicar
                        variant='soft'
                        intent='success'
                        className='border border-gray-600'
                        disabled={loading} // Desabilita o botão ao carregar
                    >
                        {loading ? 'Salvando...' : 'Salvar'} {/* Mostra loading ou o texto padrão */}
                    </Button.Root>
                </div>
            </div>
        </div>
    );
}

export default ModalCadastroUnidade;
