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
import ModalDropdown from 'react-native-modal-dropdown-with-flatlist';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            name: '',
            email: '',
            password: '',
            role: '',
            phonenumber: '',
        };

    }


    signupFun = () => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var strongRegex = new RegExp(
            '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{5,})',
        );
        const reg = /^[0]?[789]\d{9}$/;

        const {
            name,
            email,
            password,
            role,
            phonenumber,
            isChecked,
        } = this.state;

        if (
            name != '' &&
            email != '' &&
            password != '' &&
            phonenumber != '' &&
            role != ''
        ) {
            if (emailReg.test(email) === false) {
                Alert.alert('Enter Vailed Email')
            } else if (strongRegex.test(password) === false) {
                Alert.alert('Password  should contain 8LETTERS, 1CAP, 1SMALL & 1 NUM');
            } else if (reg.test(phonenumber) == false) {
                Alert.alert('Enter valid mobile number');
            } else if (isChecked == false) {
                alert('Please Accpet Terms and Conditions');
            } else {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('role', role);
                formData.append('phone', phonenumber);
                console.log(role);

                axios
                    .post('http://jetfix.in/app-front-signup', formData, {
                        headers: {
                            'content-type': 'multipart/form-data',
                        },
                    })
                    .then((response) => {
                        // console.log(response);
                        if (response.data.status == 'fail') {
                            console.log(response);
                            alert('faild to sign up,' + response.data.message);
                        } else {
                            console.log(response);
                            // alert('sucess');
                            this.props.navigation.navigate('MobileScreen');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        alert('Faild');
                    });
            }

        } else {
            alert('fill all fields');
        }

    }


    render() {
        return (
            <View style={styles.Container}>

                <View>
                    <TextInput style={styles.input1}
                        placeholder='name'
                        onChangeText={(name) => { this.setState({ name }) }}
                    />
                </View>
                <View>
                    <TextInput style={styles.input2}
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

                <View style={styles.inputcontainer1}>
                    <View style={{ flex: 1 }}>
                        <Image
                            //source={require('../images/role-icon.png')}
                            style={{ marginTop: 9 }}
                        />
                    </View>
                    <View style={{ flex: 9, flexDirection: 'row', }}>
                        <ModalDropdown
                            style={{
                                marginLeft: 18,
                                paddingTop: 15,
                                color: 'black',
                                flex: 1,

                            }}
                            defaultValue={
                                <Text
                                    style={{
                                        color: '#FFF',
                                        // ...Platform.select({
                                        //     ios: {
                                        //         fontFamily: 'SFCompactText-Regular',
                                        //     },
                                        //     android: {
                                        //         fontFamily: 'SFCompactText_Regular',
                                        //     },
                                        // }),
                                        fontSize: 14,
                                    }}>
                                    Select Role
                        </Text>
                            }
                            textStyle={{ fontSize: 15, color: '#FFF' }}
                            options={['Vendor', 'User']}
                            dropdownStyle={{
                                // width: 330,
                                // height: null,
                                width: wp('55%'),
                                height: hp('10%'),
                                borderColor: 'black',
                                borderWidth: 1,

                                // borderRadius: 30,
                            }}


                            onSelect={(idx, value) => this.setState({
                                role: value

                            })}
                            onChangeText={(role) => this.setState({ role })}

                        ></ModalDropdown>
                        <View style={{ flex: 0.1 }}>
                            <Image
                                style={{ top: 18 }}
                            //source={require('../images/arrow-down.png')}
                            />
                        </View>
                    </View>
                </View>

                <View>
                    <TextInput style={styles.input2}
                        placeholder='phonenumber'
                        onChangeText={(phonenumber) => { this.setState({ phonenumber }) }}
                    />
                </View>


                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
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
                    <TouchableOpacity onPress={() =>{this.props.navigation.navigate('MobileScreen')}}>
                        <Text style={{ marginLeft: 20 }}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={this.signupFun}
                        style={[styles.buttonContainer, styles.loginButton]}
                    //onPress={() => this.props.navigation.navigate('OtpScreen')}

                    >
                        <Text style={styles.loginText}>Sign Up</Text>
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

    },
    inputcontainer1: {
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        width: 250,
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 20

    },

});

export default SignUpScreen
