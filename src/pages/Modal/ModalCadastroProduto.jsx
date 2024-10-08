import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { apiUrl } from '../../config';

function ModalCadastroProduto({ onClose, produto }) {
    const [codigoSku, setCodigoSku] = useState('');
    const [precoCompra, setPrecoCompra] = useState('');
    const [medida, setMedida] = useState('');
    const [estoqueMinimo, setEstoqueMinimo] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [descricao, setDescricao] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingFornecedor, setLoadingFornecedor] = useState(false);
    const [debounceTimer, setDebounceTimer] = useState(null);

    useEffect(() => {
        const fetchFornecedor = async () => {
            if (cnpj) {
                setLoadingFornecedor(true);
                try {
                    const response = await fetch(`${apiUrl}/api/fornecedores/cnpj/${cnpj}`);
                    if (response.ok) {
                        const fornecedorData = await response.json();
                        setRazaoSocial(fornecedorData.razaoSocial || '');
                    } else {
                        console.error('Erro ao buscar fornecedor:', response.statusText);
                    }
                } catch (error) {
                    console.error('Erro de requisição:', error);
                } finally {
                    setLoadingFornecedor(false);
                }
            }
        };

        if (cnpj) {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }

            const newTimer = setTimeout(() => {
                fetchFornecedor();
            }, 500);

            setDebounceTimer(newTimer);
        }

        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [cnpj]);
    
    const handleSave = async () => {
        const produtoData = {
            codigoSku,
            precoCompra,
            medida,
            estoqueMinimo,
            cnpj,
            razaoSocial,
            descricao,
            ativo: true
        };
    
        setLoading(true);
    
        try {
            const method = produto?.id ? 'PUT' : 'POST'; // Verifica se o produto já existe
            const url = produto?.id 
                ? `${apiUrl}/api/produtos/${produto.id}` // URL para atualização
                : `${apiUrl}/api/produtos`; // URL para criação
    
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtoData),
            });
    
            if (response.ok) {
                console.log(produto?.id ? 'Produto atualizado com sucesso' : 'Produto cadastrado com sucesso');
                resetForm();
                onClose(); // Fechar o modal após salvar/editar
            } else {
                console.error('Erro ao salvar produto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro de requisição:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (produto) {
            setCodigoSku(produto.codigoSku || '');
            setPrecoCompra(produto.precoCompra || '');
            setMedida(produto.medida || '');
            setEstoqueMinimo(produto.estoqueMinimo || '');
            setRazaoSocial(produto.razaoSocial || '');
            setCnpj(produto.cnpj || '');
            setDescricao(produto.descricao || '');
        }
    }, [produto]);

    const resetForm = () => {
        setCodigoSku('');
        setPrecoCompra('');
        setMedida('');
        setEstoqueMinimo('');
        setRazaoSocial('');
        setCnpj('');
        setDescricao('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-6 text-slate-300">Cadastrar Produto</h2>

                <div className="grid grid-cols-2 gap-4 p-2 px-1">
                    <Input label="Código SKU" value={codigoSku} onChange={(e) => setCodigoSku(e.target.value)} placeholder="Digite o código SKU" />
                    <Input label="Preço de Compra" value={precoCompra} onChange={(e) => setPrecoCompra(e.target.value)} placeholder="Digite o preço de compra" />
                    <Input label="Medida" value={medida} onChange={(e) => setMedida(e.target.value)} placeholder="Digite a medida" />
                    <Input
                        label="Estoque Mínimo"
                        value={estoqueMinimo}
                        onChange={(e) => setEstoqueMinimo(e.target.value)}
                        placeholder="Digite o estoque mínimo"
                    />
                    <Input label="CNPJ/CPF" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="CNPJ ou CPF do fornecedor" />
                    <Input
                        label="Razão Social do Fornecedor"
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                        placeholder="Razão social do fornecedor"
                        disabled
                    />
                    <Textarea
                        rows={5}
                        className="col-span-2"
                        label="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Digite a descrição"
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <Button.Root onClick={onClose} variant="ghost" intent="danger" className="border border-gray-600 mr-2">
                        <Button.Label>Cancelar</Button.Label>
                    </Button.Root>
                    <Button.Root onClick={handleSave} variant="soft" intent="success" className="border border-gray-600" disabled={loading}>
                        {loading ? (
                            <span>Salvando...</span>
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
