import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components/botao/button';
import style from '../components/style';

const MyMultilineInput = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senhanovamente, setSenhaNovamente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');

    // Função para formatar data (DD/MM/AAAA)
    const formatarData = (text: string) => {
        const numeros = text.replace(/\D/g, '');
        
        if (numeros.length <= 2) {
            return numeros;
        } else if (numeros.length <= 4) {
            return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
        } else {
            return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
        }
    };

    // Função para formatar CPF (XXX.XXX.XXX-XX)
    const formatarCpf = (text: string) => {
        const numeros = text.replace(/\D/g, '');
        
        if (numeros.length <= 3) {
            return numeros;
        } else if (numeros.length <= 6) {
            return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
        } else if (numeros.length <= 9) {
            return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
        } else {
            return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
        }
    };

    // Função para formatar telefone (XX) XXXXX-XXXX
    const formatarTelefone = (text: string) => {
        const numeros = text.replace(/\D/g, '');
        
        if (numeros.length <= 2) {
            return numeros;
        } else if (numeros.length <= 7) {
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
        } else {
            return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
        }
    };

    // Função para validar email
    const validarEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Função para validar CPF (validação básica de formato)
    const validarCpf = (cpf: string) => {
        return cpf.replace(/\D/g, '').length === 11;
    };

    // Função para validar data
    const validarData = (data: string) => {
        if (data.length !== 10) return false;
        
        const [dia, mes, ano] = data.split('/').map(Number);
        const dataObj = new Date(ano, mes - 1, dia);
        
        return dataObj.getFullYear() === ano &&
               dataObj.getMonth() === mes - 1 &&
               dataObj.getDate() === dia &&
               ano >= 1900 &&
               ano <= new Date().getFullYear();
    };

    const handleDataChange = (text: string) => {
        const dataFormatada = formatarData(text);
        setDataNascimento(dataFormatada);
    };

    const handleCpfChange = (text: string) => {
        const cpfFormatado = formatarCpf(text);
        setCpf(cpfFormatado);
    };

    const handleTelefoneChange = (text: string) => {
        const telefoneFormatado = formatarTelefone(text);
        setTelefone(telefoneFormatado);
    };

    const handleSubmit = () => {
        // Validações básicas
        if (!nome.trim() || !email || !senha || !dataNascimento || !senhanovamente || !telefone || !cpf) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        // Validar nome (pelo menos 2 palavras)
        if (nome.trim().split(' ').length < 2) {
            Alert.alert('Erro', 'Por favor, digite seu nome completo');
            return;
        }

        // Validar email
        if (!validarEmail(email)) {
            Alert.alert('Erro', 'Por favor, digite um email válido');
            return;
        }

        // Validar CPF
        if (!validarCpf(cpf)) {
            Alert.alert('Erro', 'Por favor, digite um CPF válido');
            return;
        }

        // Validar data de nascimento
        if (!validarData(dataNascimento)) {
            Alert.alert('Erro', 'Por favor, digite uma data de nascimento válida');
            return;
        }

        // Validar telefone
        if (telefone.replace(/\D/g, '').length !== 11) {
            Alert.alert('Erro', 'Por favor, digite um telefone válido com DDD');
            return;
        }

        // Validar senha (mínimo 6 caracteres)
        if (senha.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        // Validar confirmação de senha
        if (senha !== senhanovamente) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        Alert.alert('Sucesso', 'Registro realizado com sucesso!');
        console.log('Dados:', { 
            nome, 
            email, 
            cpf: cpf.replace(/\D/g, ''), // Remove formatação para salvar
            dataNascimento, 
            telefone: telefone.replace(/\D/g, ''), // Remove formatação para salvar
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={[style.container, styles.container]}>
                <View style={styles.status}></View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Registro</Text>
                </View>

                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor="#999"
                    onChangeText={setNome}
                    value={nome}
                />

                <View style={styles.row}>
                    <View style={styles.halfWidth}>
                        <Text style={styles.label}>CPF</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="000.000.000-00"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                            maxLength={14}
                            onChangeText={handleCpfChange}
                            value={cpf}
                        />
                    </View>
                    <View style={styles.halfWidth}>
                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="DD/MM/AAAA"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            maxLength={10}
                            onChangeText={handleDataChange}
                            value={dataNascimento}
                        />
                    </View>
                </View>

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={15}
                    onChangeText={handleTelefoneChange}
                    value={telefone}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="seuemail@email.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                />

                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha (mín. 6 caracteres)"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={setSenha}
                    value={senha}
                />

                <Text style={styles.label}>Confirmar senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha novamente"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={setSenhaNovamente}
                    value={senhanovamente}
                />

                <View style={styles.buttonContainer}>
                    <Button title='Cadastrar' onPress={handleSubmit} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        paddingBottom: 50,
    },
    status: {
        height: 35,
        width: '100%',
        backgroundColor: '#156874',
    },
    titleWrapper: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        color: '#156874',
        fontSize: 40,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    halfWidth: {
        flex: 1,
    },
    input: {
        borderWidth: 2,
        borderColor: '#156874',
        padding: 12,
        minHeight: 50,
        color: '#000000ff',
        borderRadius: 8,
        fontSize: 16,
        marginHorizontal: 5,
        marginBottom: 5,
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 18,
        color: '#156874',
        marginLeft: 5,
        fontWeight: '500',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 5,
    },
});

export default MyMultilineInput;