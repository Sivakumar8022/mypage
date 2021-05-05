import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    CheckBox,
    ImageBackground,
    AppRegistry,
    FlatList,
    AsyncStorage
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//import AsyncStorage from '@react-native-community/async-storage';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridViewItems: [],
            //idHome: '',
            //imageUrl: '',

        };

    }


    // componentDidMount() {
    //   fetch("http://jetfix.in/app-services")
    //     .then(response => response.json())
    //     .then((responseJson) => {
    //       this.setState({
    //         gridViewItems: responseJson
    //       })
    //       const Url = responseJson.imagepath
    //       console.log('imageURL:', this.state.gridViewItems);
    //       this.setState({
    //         imageUrl: Url
    //       })
    //     })
    //     .catch(error => console.log(error)) //to catch the errors if any
    // }

    componentDidMount = async () => {
      //  let userD = await AsyncStorage.getItem('homeServiceData');
      //  let d = JSON.parse(userD);
        // console.log(d.id);
        // console.log("CatID:",UserData.catId);

        fetch('http://jetfix.in/app-services')
            .then((response) => response.json())
            .then((responseJson) => {
                var count = Object.keys(responseJson.services).length;
                console.log('responseJson ', responseJson.services);
                const Url = responseJson.imagepath
                console.log('imageURL:', this.state.gridViewItems);
                this.setState({
                    imageUrl: Url
                })
                AsyncStorage.setItem(
                    'homeServiceData',
                    JSON.stringify(responseJson.services),
                );
                this.setState({
                    loading: false,
                    gridViewItems: responseJson.services,
                });

                this.state.gridViewItems.sort(function (a, b) {
                    return a.id - b.id;
                }, console.log(this.state.gridViewItems[0].id));
            })
            .catch((error) => {
                console.error(error);
            });
    };



    render() {
        return (


            <View style={styles.container} >

                <View>

                    <FlatList
                        numColumns={3}
                        data={this.state.gridViewItems}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => {
                                    //UserData.catId = item.id;
                                    //UserData.catName = item.service_name;
                                    //UserData.prevScreen = 'HomeScreen';

                                    // console.log('Homeid', UserData.catId + UserData.catName);
                                    this.props.navigation.navigate('Sample1');
                                }}
                            >
                                <View style={{}}>

                                    <Image
                                        resizeMode='cover'
                                        style={{ width: 30, height: 30, alignSelf: 'center', marginBottom: 5 }}
                                        source={{
                                            uri:
                                                'http://jetfix.in/uploads/service/' + item.service_image,
                                        }}
                                    />
                                    <Text style={styles.itemName}>{item.service_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    //ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },

    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    itemContainer: {
        width: wp('29%'),
        borderRadius: 5,
        padding: 2,
        height: hp('19%'),
        //marginRight: 10,
        marginTop: 10,
        marginLeft:10,
        justifyContent: 'space-around',
        backgroundColor: '#0195fe',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.69,

        elevation: 11,
    },

    itemName: {
        marginTop: 4,
        //fontSize: RFValue(13),
        //fontFamily: 'Montserrat-SemiBold',
        color: '#FFF',
        textAlign: 'center',

        // width: 100,
    },

});


