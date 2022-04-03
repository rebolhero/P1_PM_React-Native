import React,{useState, useEffect} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, Modal,  Pressable} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home(){

    const [modalNovo, setModalNovo] = useState(false);
    const [modalPreview, setModalPreview] = useState(false);
    //Criar uma lista de objetos Tarefas
    let[tarefa, setTarefa] = useState('');
    let[descTarefa, setDescTarefa] = useState('');
    let[tarefaView, setTarefaView] = useState('');
    let[idTarefaView, setIdTarefaView] = useState('');
    let[descTarefaView, setDescTarefaView] = useState('');
    let[saudacao, setSaudacao] = useState('');
    let[minhasTarefas, setMinhasTarefas] = useState([
        {
            id: 1,
            nome: 'tarefa 1',
            descricao:'desc tarefa 1'
        },
        {
            id: 2,
            nome: 'tarefa 2',
            descricao:'desc tarefa 1'
        },
        {
            id: 3,
            nome: 'tarefa 3',
            descricao:'desc tarefa 1'
        },
    ]);

    useEffect(()=>{
        const currentHour = new Date().getHours();

        if(currentHour < 12){
            setSaudacao("Bom dia!!");
        }else if(currentHour >= 12 && currentHour < 18){
            setSaudacao("Boa tarde!!");
        }else{
            setSaudacao("Boa Noite!!");
        }
    },[])

    //funcão para adicionar um tarefa

    function adicionaTarefa(){
        if(tarefa.trim() != ''){
         const dados = {
             id: String(new Date().getTime()),
             nome: tarefa,
             descricao: descTarefa
           };
      
           //alert("clicou");
       
           setMinhasTarefas((oldState) => [... oldState, dados]);
           setTarefa('');
           setDescTarefa('');
        }
        else{
            alert('Digite um nome de uma tarefa')
        }
      
      }

    function deletarTarefa(id){
        console.log('id tarefa:' + id);
        let novasTarefas = [...minhasTarefas];

        novasTarefas = novasTarefas.filter((it, i)=>{
            if(it.id != id){
                return true;
            }else{
                return false;
            }
        });

        setMinhasTarefas(novasTarefas);
    }


    return(
        <View style={styles.container}>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalNovo}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalNovo(!modalNovo);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                    style={[styles.botaoFechar]}
                    onPress={() => setModalNovo(!modalNovo)}
                    >
                    <Text style={styles.textoBotaoFechar}>X</Text>
                    </Pressable>

                    <Text style={styles.titulo}>Criar Tarefa</Text>
                    
                    <TextInput 
                        value={tarefa}
                        returnKeyType="search" 
                        style={styles.campo} 
                        onChangeText={setTarefa} 
                        placeholder="Digite o nome da tarefa"
                        placeholderTextColor="#FFF" 
                    />
                    <TextInput 
                        value={descTarefa}
                        returnKeyType="search" 
                        style={styles.campo} 
                        onChangeText={setDescTarefa} 
                        placeholder="Digite a descrição da tarefa"
                        placeholderTextColor="#FFF" 
                    />
                    <TouchableOpacity style={styles.botaoCriar}  onPress={adicionaTarefa}>
                    <Ionicons name="checkmark" size={32} color="white" style={styles.textoBotaoCriar}/>
                    </TouchableOpacity>
                    
                </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPreview}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalPreview(!modalPreview);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{tarefa}</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalPreview(!modalPreview)}
                    >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
                </View>
            </Modal>



            <Text style={styles.titulo}>To Do List</Text>

            <TextInput 
                style={styles.campo} 
            />

            <View style={{justifyContent:'flex-start', alignSelf:'stretch'}}>
                <Text style={styles.subTitulo}>Itens</Text>
            </View>

            <FlatList
                data={minhasTarefas}
                style={{alignSelf:'stretch'}}
                keyExtractor={(item) => item.id}
                renderItem={(({item}) => 
                <LinearGradient
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            colors={['transparent', '#D494FF']}
                            style={styles.botaoGradiente}
                        >
                    <View style={styles.botaoTarefa}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch', width:'100%'}}>
                            <View >
                            <Pressable
                                style={{flexDirection:'column', justifyContent:'space-between', alignSelf: 'stretch'}}
                                onPress={() => setModalPreview (true)}
                            >
                                <Text style={styles.textoBotaoTarefa}>{item.nome}</Text>
                                <Text style={styles.subTextoBotaoTarefa}>{item.descricao}</Text>
                            </Pressable>
                            </View>
                            <TouchableOpacity onPress={()=>deletarTarefa(item.id)}>
                                <Ionicons name="md-checkmark-circle" size={32} color="white"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </LinearGradient>
                )}
          
            />
            <View style={styles.barraBotao}>
               <Pressable
                style={[styles.botao]}
                onPress={() => setModalNovo(true)}
                >
                    <Text style={styles.textoBotao}>+</Text>
                </Pressable> 
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#FFF',
        paddingVertical:70,
        paddingHorizontal:20,
        flexDirection: 'column',
        alignItems: 'center',
    },

    titulo:{
        color: '#1E1E1E',
        fontSize:34,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: "center",
        textAlign:"center"

    },

    subTitulo:{
        color: '#1E1E1E',
        fontSize:20,
        fontWeight: 'bold',
        marginBottom: 10,
    },


    campo:{
        backgroundColor: '#C9C5FC',
        fontSize:18,
        marginTop:30,
        borderRadius:50,
        padding:15,
        width: '100%'
    },

    botao:{
        backgroundColor: '#6300FF',
        height:50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        alignSelf:'center',
        marginTop: 20,
        marginBottom: 20
    },

    barraBotao:{
        backgroundColor: '#FFF',
        alignSelf:'stretch',
        justifyContent:'center',
        bottom: 0,
        width:'100%',
        position:'fixed',
        marginLeft:-18,
    },

    botaoCriar:{
        backgroundColor: '#93D2F9',
        height:50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },

    botaoFechar:{
        width:'100%',
        justifyContent:'flex-end'
    },

    textoBotao:{
        color: '#FFF',
        fontSize: 40,
        fontFamily: 'Trebuchet MS',
        fontWeight: 'bold',
    },

    textoBotaoCriar:{
        padding: 5
    },

    textoBotaoFechar:{
        fontSize: 28,
        fontFamily: 'Trebuchet MS',
        fontWeight: 'bold',
        marginRight: 5,
        alignSelf:'flex-end'
    },

    botaoTarefa:{
        padding:15,
        marginBottom: 10,
        alignSelf: 'stretch',
        width:'100%'
        
    },

    botaoGradiente:{
        padding:15,
        marginBottom: 10,
        borderBottomEndRadius: 30,
        borderTopEndRadius: 30,
        alignSelf: 'stretch',
        width:'100%',
        borderLeftWidth:'10px',
        borderLeftColor: '#AE06F4'

    },

    textoBotaoTarefa:{
        fontSize:22,
        fontWeight: 'bold',
        marginBottom: 5
    },
    subTextoBotaoTarefa:{
        fontSize: 17
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    });