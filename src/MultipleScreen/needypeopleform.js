import React, { useState } from "react";

import { StyleSheet, ScrollView, TouchableOpacity, Button, TextInput, Text, Image, View, Touchable, _ScrollView } from 'react-native';
import ImagePickerExample from "./imgpicker";
import { db, addDoc, collection } from "../firebase";
import { setDoc } from "firebase/firestore";

export default function NeedypeopleForm() {
    const [name, setname] = useState("")
    const [fname, setfname] = useState("")
    const [cnic, setcnic] = useState("")
    const [DOB, setDOB] = useState("")
    const [familymembercount, setfamilyMembercount] = useState("")
    const [errMsg, setErrMsg] = useState('');
    const [color, setcolor] = useState("green");
    const [image, setimage] = useState("")



    // 

    const SendRequest = async () => {

        if (name === "") {
            setcolor("red")

            setErrMsg(" Name Required");
            setTimeout(() => {
                setErrMsg('');
            }, 5000)
        } else if (fname === "") {
            setcolor("red")


            setErrMsg("fname Requried");
            setTimeout(() => {
                setErrMsg('');
            }, 5000)
        }
        else if (cnic === "") {
            setcolor("red")


            setErrMsg("cnic Requried");
            setTimeout(() => {
                setErrMsg('');
            }, 5000)
        }
        else if (DOB === "") {
            setcolor("red")


            setErrMsg("DOB Requried");
            setTimeout(() => {
                setErrMsg('');
            }, 5000)
        }
        else if (familymembercount === "") {
            setcolor("red")


            setErrMsg("family person count Requried");
            setTimeout(() => {
                setErrMsg('');
            }, 5000)
        }


        else {


            try {
                let obj = {
                    name,
                    fname,
                    cnic,
                    DOB,
                    familymembercount,


                }
                setname("");
                let input_text = collection(db, "Needy-People-Request");
                await addDoc(input_text, obj)

                setcolor("green")
                setname(""),
                setfname(""),
                setcnic(""),
                setDOB(""),
                setfamilyMembercount(""),
                setimage(""),
                setErrMsg("Sucessfully send Request");
                setTimeout(() => {
                    setErrMsg('');
                }, 5000)
            }
            catch {
                setErrMsg("Failed To send Request");
                setTimeout(() => {
                    setErrMsg('');
                }, 5000)
            }

        }
    }







    return (
        <ScrollView>

            <View>
                <Text style={styles.Signup}>
                    Add Bio-Detail
                </Text>

                <TextInput style={styles.input} placeholder="Name" onChangeText={text => (setname(text))}></TextInput>
                <TextInput style={styles.input} placeholder="FName" onChangeText={text => (setfname(text))}></TextInput>
                <TextInput style={styles.input} placeholder="Cnic" onChangeText={text => (setcnic(text))}></TextInput>
                <TextInput style={styles.input} placeholder="DateofBirth" onChangeText={text => (setDOB(text))}></TextInput>
                <TextInput style={styles.input} placeholder="NumberOfFamilyMember" onChangeText={text => (setfamilyMembercount(text))}></TextInput>


                {errMsg ? <Text style={{ color: "red", textAlign: "center", fontSize: 15, fontWeight: "bold" }}>{errMsg}</Text> : null}

                <View>
                    <ImagePickerExample />
                </View>

                <Text style={styles.send} onPress={SendRequest}>Send Request</Text>
                {/*
         */}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({


    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "green",
        padding: 10,

        color: "green",
        borderRadius: 9,
    },
    Signup: {
        fontSize: 30,

        fontWeight: "bold",
        marginTop: 50,
        textAlign: "center",
        color: "green"

    }
    ,
    send: {
        width: 300,
        height: 60,
        backgroundColor: "green",
        marginTop: 30,
        borderRadius: 5,
        marginLeft: 30,
        fontSize: 40,
        paddingTop: 10,
        textAlign: "center",
    }
})