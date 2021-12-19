import React, { useState } from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Button, TextInput, Text, View, Touchable } from 'react-native';
import { auth, createUserWithEmailAndPassword, db,doc ,setDoc} from "../src/firebase"
import * as Facebook from 'expo-facebook';
import khana from "../img/khana.png"



export default function Signup({ navigation }) {
    const [userRole, setUserRole] = useState('NeedyPoeple');
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

   
    const regesterme =  async () => {
        try {
       
        
            let { user } = await createUserWithEmailAndPassword(auth, email, password);
            let dataRef = doc(db, 'users', user.uid)
            console.log(email,password,userRole)
            navigation.navigate('SignIn')
            await setDoc(dataRef, {
                email: user.email,
                uid: user.uid,
                userRole
            });
           
          
        } catch (err) {
            setErrMsg(err.message);
            setTimeout(() => {
                setErrMsg('');
            }, 5000)
        }
}


    return (
        

            <ScrollView>
        <View>


            <Image source={khana} style={styles.img}></Image>
            <Text style={styles.Signup}>
                Sign-Up
            </Text>
            
            <Text style={styles.Are}>
                Are U Regester
                 <TouchableOpacity  onPress={()=>{ navigation.navigate('SignIn')}}>
                     <Text style={styles.Signin}>
                        Login
                    </Text>
                </TouchableOpacity>
            </Text>
   
            <TextInput style={styles.input} placeholder="Your G-mail" onChangeText={text => (setemail(text))}></TextInput>
            <TextInput style={styles.input} placeholder="Your Password" onChangeText={text => (setpassword(text))}></TextInput>
            <TextInput style={styles.input} value={userRole} placeholder="Your Role" onChangeText={text => (setUserRole(text))}></TextInput>
            
            

                
                  <Text onPress={regesterme}  style={{ textAlign: "center", backgroundColor: "green", color: "black", height: 40, width: 100, paddingTop: 10, marginLeft: "35%", fontWeight: "bold", fontSize: 20, borderColor: "#841584", borderRadius: 10, }} > SignUp</Text> 

          {errMsg ? <Text style={{color:"red",textAlign:"center",fontSize:15,fontWeight:"bold"}}>{errMsg}</Text> : null}
           
           






     </View>
     </ScrollView>

    )
}
const styles = StyleSheet.create({
   img:{
    height: 200,
    width:200,
    marginLeft:70,
   },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "green",
        padding: 10,
        marginTop: 18,
        color: "green",
        borderRadius: 9,
    },
     Signup: {
         fontSize: 30,

         fontWeight: "bold",
         textAlign: "center",
         color: "green"

     }
    ,
    Are: {
        fontSize: 30,

        fontWeight: "bold",
        marginTop: 50,
        textAlign: "center",
        color: "grey",
    },
    Signin: {
        fontSize: 25,
        color: "blue",
        textAlign: "center",
    },
});


