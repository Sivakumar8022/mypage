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

class MobileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isChecked: false,
            isLoggedIn: false
        }
    }
    myFun = () => {
        const { email, password } = this.state;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        axios
            .post('http://jetfix.in/app-front-login', formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if (response.data.status == 'fail') {
                    console.log(response);
                    alert('faild to login');
                } else {
                    console.log(response.data.data);
                    if (this.state.isChecked) {
                        let userProfileData = {
                            UserData: response.data.data,
                            isLoggedIn: true,
                        };
                        AsyncStorage.setItem(
                            'userProfileData',
                            JSON.stringify(userProfileData),
                        );
                    } else {
                        let userProfileData = {
                            UserData: response.data.data,
                            isLoggedIn: false,
                        };
                        AsyncStorage.setItem(
                            'userProfileData',
                            JSON.stringify(userProfileData),
                        );
                    }

                    //alert('Sucess');
                    this.props.navigation.navigate('HomeScreen');
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Faild');
            });
    };


    render() {
        return (
            <View style={styles.Container}>
                {/* 
                <View>
                    <Image source={require('../images/logoo.jpeg')} />
                </View> */}
                <View>
                    <TextInput style={styles.input1}
                        placeholder='email'
                        onChangeText={(email) => { this.setState({ email }) }}
                    />
                </View>
                <View>
                    <TextInput style={styles.input2}
                        placeholder='password'
                        onChangeText={(password) => { this.setState({ password }) }}
                    />
                </View>
                <View>
                    <CheckBox
                        style={{
                            //borderColor: '#FFFFFF',
                            marginTop: Platform.OS === 'ios' ? 1 : 0,
                        }}
                        onClick={() => {
                            this.setState({
                                isModalVisible: true,
                                isChecked: !this.state.isChecked,
                            });
                        }}
                        isChecked={this.state.isChecked}
                    // Text={'CheckBox'}
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={this.myFun}
                        style={[styles.buttonContainer, styles.loginButton]}
                    //onPress={() => this.props.navigation.navigate('OtpScreen')}
                    >
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

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

export default MobileScreen
