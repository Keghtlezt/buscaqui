import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import { Button } from '../components/botao/button';
import style from "../components/style";

export default function Index(){
  return(
    <View style={style.container}> 
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/iconapp2.png')}
          style={styles.reactLogo}
        />
      </View>
      <View style={styles.containerCorpo}>
        <View style={styles.containerTitulos}>
          <Text style={styles.title}>BUSCAQUI</Text>
          <Text style={styles.subtitle}>Seu App de transportes</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <View style={styles.login}>
          <Button title='Cadastro' onPress={() => router.navigate('./register')}/>
        </View>
        <View style={styles.register}>
          <Button title='Entrar' onPress={() => router.navigate('./login')}/>
        </View>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
  header: {
    backgroundColor: '#156874',    
    height: 230,
    width: '100%',
    position: 'relative',
  },
  reactLogo: {
    height: 195,
    width: 380,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  containerCorpo: {
    width: '100%',
  },
  containerTitulos:{
    width: '100%',
    height: 300,
    paddingLeft: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 0,
    lineHeight: 32,
    color: '#156874',
  },
  subtitle: {
    fontSize: 25,
    color: '#156874',
    fontWeight: 'bold',
  },
  login:{

  },
  register:{

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerButton:{
    top: 150,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: "row",
    gap: 20,
    left: 75,
  },
})