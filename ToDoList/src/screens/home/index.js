import React,{useState, useEffect} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, Modal,  Pressable, CheckBox} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function Home(){

    const [modalNovo, setModalNovo] = useState(false);
    const [modalPreview, setModalPreview] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [isSelected, setSelection] = useState(false);
    //Criar uma lista de objetos Tarefas
    let[tarefa, setTarefa] = useState('');
    let[descTarefa, setDescTarefa] = useState('');
    let[tarefaEdit, setTarefaEdit] = useState('');
    let[descTarefaEdit, setDescTarefaEdit] = useState('');
    let[idTarefaEdit, setIdTarefaEdit] = useState('');
    let[saudacao, setSaudacao] = useState('');
    let[minhasTarefas, setMinhasTarefas] = useState([
        {
            id: 1,
            nome: 'Tarefa 1',
            descricao:'Descrição da tarefa 1',
            check: 0
        },
        {
            id: 2,
            nome: 'Tarefa 2',
            descricao:'Descrição da tarefa 2',
            check: 0
        },
        {
            id: 3,
            nome: 'Tarefa 3',
            descricao:'Descrição da tarefa 3',
            check: 0
        },
    ]);

    let[minhasTarefasView, setMinhasTarefasView] = useState('');

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
           setModalNovo(!modalNovo);
        }
        else{
            alert('Digite um nome de uma tarefa')
        }
      
      }

    function deletarTarefa(id){
        let novasTarefas = [...minhasTarefas];

        novasTarefas = novasTarefas.filter((item)=>{
            if(item.id != id){
                return true;
            }else{
                return false;
            }
        });

        setMinhasTarefas(novasTarefas);
    }

    function buscarTarefa(id){
        let novasTarefas = [...minhasTarefas];

        novasTarefas = novasTarefas.filter((item)=>{
            if(item.id == id){
                setDescTarefaEdit(item.descricao);
                setTarefaEdit(item.nome);
                setIdTarefaEdit(id);
                return true;
            }else{
                return false;
            }
        });
        setModalPreview (true);
        setMinhasTarefasView(novasTarefas);
    }

    function alterarTarefa(){
        if(tarefaEdit.trim() != ''){
        //     const dados = {
        //         id: String(new Date().getTime()),
        //         nome: tarefaEdit,
        //         descricao: descTarefaEdit
        //       };
         
          
        //       setMinhasTarefas((oldState) => [... oldState, dados]);
        let novasTarefas = [...minhasTarefas];
        novasTarefas = novasTarefas.filter((item)=>{
            if(item.id == idTarefaEdit){
                item.nome = tarefaEdit;
                item.descricao = descTarefaEdit;
                return true;
            }else{
                return true;
            }
        })
        setMinhasTarefas(novasTarefas);
        setModalEdit(!modalEdit);
        setModalPreview(!modalPreview);

        }else{
               alert('Digite um nome de uma tarefa')
           }

    }

    function checkTarefa(id){
        let novasTarefas = [...minhasTarefas];

        novasTarefas = novasTarefas.filter((item)=>{
            if(item.id == id){
                item.check = !item.check;
                return true;
            }else{
                return true;
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
                visible={modalEdit}
                style={{elevation:1, zIndex:1}}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalNovo(!modalEdit);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                    style={[styles.botaoFechar]}
                    onPress={() => {setModalEdit(!modalEdit); setModalPreview(!modalPreview)}}
                    >
                    <Text style={styles.textoBotaoFechar}>X</Text>
                    </Pressable>

                    <Text style={styles.titulo}>Editar Tarefa</Text>
                    
                    <TextInput 
                        value={tarefaEdit}
                        returnKeyType="name" 
                        style={styles.campo} 
                        onChangeText={setTarefaEdit} 
                        placeholder="Digite o nome da tarefa"
                        placeholderTextColor="#FFF" 
                    />
                    <TextInput 
                        value={descTarefaEdit}
                        returnKeyType="desc" 
                        style={styles.campo} 
                        onChangeText={setDescTarefaEdit} 
                        placeholder="Digite a descrição da tarefa"
                        placeholderTextColor="#FFF" 
                    />
                    <TouchableOpacity style={styles.botaoCriar}  onPress={alterarTarefa}>
                    <Ionicons name="checkmark" size={32} color="white" style={styles.textoBotaoCriar}/>
                    </TouchableOpacity>
                    
                </View>
                </View>
            </Modal>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalPreview}
                style={{elevation:2, zIndex:2}}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalPreview(!modalPreview);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalPreview}>
                        <Pressable
                            style={[styles.botaoFechar]}
                            onPress={() => setModalPreview(!modalPreview)}
                            >
                            <Text style={styles.textoBotaoFechar}>X</Text>
                        </Pressable>
                        <FlatList
                        data={minhasTarefasView}
                        keyExtractor={(item) => item.id}
                        renderItem={(({item}) => 
                            <View style={styles.botaoTarefa}>
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch', width:'100%'}}>
                                    <View>
                                        <Text style={styles.textoBotaoTarefa}>{item.nome}</Text>
                                        <Text style={styles.subTextoBotaoTarefa}>{item.descricao}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                
                        />

                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', alignSelf:'stretch'}}>
                            <Pressable
                                style={[styles.botaoCriar]}
                                onPress={() => {setModalEdit(true); setModalPreview(false)}}
                            >
                                <MaterialIcons name="edit" size={24} color="white" style={styles.textoBotaoEditar}/>
                            </Pressable> 

                            
                            <TouchableOpacity style={styles.botaoExcluir} onPress={()=>{deletarTarefa(idTarefaEdit); setModalPreview(false)}}>
                                <FontAwesome5 style={styles.textoBotaoExcluir} name="trash" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
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
                            colors={['transparent', '#8bbcff']}
                            style={styles.botaoGradiente}
                        >
                    <View style={styles.botaoTarefa}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', alignSelf:'stretch', width:'100%'}}>
                            <View >
                            <Pressable
                                style={{flexDirection:'column', justifyContent:'space-between', alignSelf: 'stretch'}}
                                onPress={() => buscarTarefa(item.id)}
                            >
                                <Text style={styles.textoBotaoTarefa}>{item.nome}</Text>
                                <Text style={styles.subTextoBotaoTarefa}>{item.descricao}</Text>
                            </Pressable>
                            </View>
                            {/* <TouchableOpacity onPress={()=>deletarTarefa(item.id)}> */}
                            <TouchableOpacity onPress={() => checkTarefa(item.id)}>
                            <CheckBox
                                    value={item.check}
                                    style={styles.checkbox}
                                    
                                />
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
        fontSize:44,
        fontWeight: 'bold',
        marginBottom: 10,
        justifyContent: "center",
        textAlign:"center"

    },

    subTitulo:{
        color: '#1E1E1E',
        fontSize:30,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop:10
    },


    campo:{
        backgroundColor: '#8bbcff',
        fontSize:18,
        color: '#FFF',
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

    botaoExcluir:{
        backgroundColor: '#ff4545',
        height:50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },

    botaoEditar:{
        backgroundColor: '#93D2F9',
        height:50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        alignSelf:'flex-end'
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

    textoBotaoExcluir:{
        padding: 13,
        fontSize:20
    },

    textoBotaoEditar:{
        alignSelf: 'center',
        paddingTop:10
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
        borderLeftColor: '#8bbcff'

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
    modalPreview: {
        margin: 20,
        backgroundColor: "white",
        width:300,
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
      },
      checkbox:{
          height:25,
          width:25,
          borderRadius: 50,
          color: 'blue'
      }
    });