import React from 'react';
import {
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    StyleSheet,
    AsyncStorage,
    alert
} from 'react-native';
import { Container, Content, View } from 'native-base'
import axios from 'react-native-axios';
import CheckBox from 'react-native-check-box';

class Profile extends React.Component {
    
    render() {
        return (
            <View style={styles.Container}>
                <View>
                    <TextInput style={styles.input1}
                        placeholder='Name'
                        onChangeText={(email) => { this.setState({ email }) }}
                    />
                </View>
                <View>
                    <TextInput style={styles.input2}
                        placeholder='Age'
                        onChangeText={(Age) => { this.setState({ Age }) }}
                    />
                </View>
                <View>
                    <TextInput style={styles.input2}
                        placeholder='Bio'
                        onChangeText={(Bio) => { this.setState({ Bio }) }}
                    />
                </View>
                

                {/* <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={this.myFun}
                        style={[styles.buttonContainer, styles.loginButton]}
                    //onPress={() => this.props.navigation.navigate('OtpScreen')}
                    >
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View> */}

            </View>

        )
    };
};

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,

    },
    buttonContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 350,
        borderRadius: 10,
        marginTop: 15,
    },
    loginButton: {
        backgroundColor: 'blue',
    },

    loginText: {
        color: 'white',

    },
    input1: {
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        width: 250,
        borderRadius: 10,
        paddingLeft: 10

    },
    input2: {
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        width: 250,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20

    }

});

export default Profile
