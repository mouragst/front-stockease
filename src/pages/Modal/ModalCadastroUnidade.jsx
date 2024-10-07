// ModalCadastroUnidade.js
import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { apiUrl } from '../../config';

function ModalCadastroUnidade({ onClose }) {
    // Estados para armazenar os dados do formulário
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpjCpf, setCnpjCpf] = useState('');
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState('');
    const [inscricaoEstadual, setInscricaoEstadual] = useState('');
    const [matriz, setMatriz] = useState('');

    // Estado de carregamento
    const [loading, setLoading] = useState(false);

    // Função para limpar os campos após salvar ou cancelar
    const limparCampos = () => {
        setRazaoSocial('');
        setCnpjCpf('');
        setInscricaoMunicipal('');
        setInscricaoEstadual('');
        setMatriz('');
    };

    // Função para salvar os dados na API
    const handleSave = async () => {
        const novaUnidade = {
            razao_social: razaoSocial,
            cnpj_cpf: cnpjCpf,
            inscricao_municipal: inscricaoMunicipal,
            inscricao_estadual: inscricaoEstadual,
            matriz: matriz,
        };

        setLoading(true); // Iniciar o loading
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
                limparCampos(); // Limpar os campos após sucesso
                onClose(); // Fechar modal após sucesso
            } else {
                console.error('Erro ao cadastrar unidade');
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false); // Finalizar o loading
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
                        label="CNPJ/CPF"
                        placeholder="Digite o CNPJ ou CPF"
                        value={cnpjCpf}
                        onChange={(e) => setCnpjCpf(e.target.value)}
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
                        placeholder="Digite a categoria"
                        value={matriz}
                        onChange={(e) => setMatriz(e.target.value)}
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
