import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import style from '../components/style';

const MyMultilineInput = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senhanovamente, setSenhaNovamente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');

    return (
    <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
        <ScrollView style={styles.scrollView}>
            <View>
                <View style={styles.status}></View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    caixa:{

    },
    scrollView:{
        flexGrow: 1,
    },
    status:{
        height: 35,
        width: '100%',
        backgroundColor: '#156874',
        top: 0,
    },
});

export default MyMultilineInput;