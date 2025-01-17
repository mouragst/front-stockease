import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { apiUrl } from '../../config';
import InputMask from 'react-input-mask';

function ModalCadastroUsuario({ onClose }) {
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [nivelAcesso, setNivelAcesso] = useState('');
    const [permissoes, setPermissoes] = useState('');
    const [senha, setSenha] = useState('');
    const [unidade, setUnidade] = useState('');
    const [loading, setLoading] = useState(false);

    const niveisAcessos = [
        { label: 'Usuário', value: 'USER' },
        { label: 'Supervisor', value: 'SUPERVISOR' },
        { label: 'Gerente', value: 'GERENTE' },
        { label: 'Administrador', value: 'ADMIN' },
    ]

    const handleSave = async () => {
        const novoUsuario = {
            ativo: 1,
            cpf,
            email,
            nivel_acesso: nivelAcesso,
            permissoes,
            senha,
            unidade,
        };

        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/api/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoUsuario),
            });

            if (response.ok) {
                console.log('Usuário cadastrado com sucesso!');
                resetForm();
                onClose();
            } else {
                console.error('Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCpf('');
        setEmail('');
        setNivelAcesso('');
        setPermissoes('');
        setSenha('');
        setUnidade('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/4">
                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Usuário</h2>
                <div className="grid grid-cols-1 gap-4 ">
                    <InputMask
                        mask="999.999.999-99"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    >
                        {(inputProps) => <Input label="CPF" placeholder="Digite o CPF" {...inputProps} />}
                    </InputMask>
                    <Input
                        label="Email"
                        placeholder="Digite o email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Select.Root defaultValue="USER" value={nivelAcesso} onValueChange={setNivelAcesso}>
                        <Select.Trigger size="md" className="">
                        <Select.Value placeholder="Nível de Acesso" />
                        <Select.Icon />
                        </Select.Trigger>

                        <Select.Portal>
                        <Select.Content mixed className="z-50">
                            <Select.Viewport>
                            {niveisAcessos.map((nivel) => (
                                <SelectItem entry={nivel} key={nivel.value} />
                            ))}
                            </Select.Viewport>
                        </Select.Content>
                        </Select.Portal>
                    </Select.Root>
                    <Input
                        label="Permissões"
                        placeholder="Digite as permissões"
                        value={permissoes}
                        onChange={(e) => setPermissoes(e.target.value)}
                    />
                    <Input
                        label="Senha"
                        placeholder="Digite a senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <Input
                        label="Unidade"
                        placeholder="Digite a unidade"
                        value={unidade}
                        onChange={(e) => setUnidade(e.target.value)}
                    />
                </div>
                <div className="flex justify-end mt-6">
                    <Button.Root
                        onClick={onClose}
                        variant="ghost"
                        intent="danger"
                        className="border border-gray-600 mr-2"
                        disabled={loading}
                    >
                        <Button.Label>Cancelar</Button.Label>
                    </Button.Root>
                    <Button.Root
                        onClick={handleSave}
                        variant="soft"
                        intent="success"
                        className="border border-gray-600"
                        disabled={loading}
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </Button.Root>
                </div>
            </div>
        </div>
    );
}

const SelectItem = ({ entry }) => {
    return (
      <Select.Item value={entry.value} className="pl-7 items-center">
        <Select.ItemIndicator />
        <Select.ItemText>{entry.label}</Select.ItemText>
      </Select.Item>
    );
  };

  SelectItem.propTypes = {
    entry: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
};

ModalCadastroUsuario.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalCadastroUsuario;