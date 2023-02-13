import React, { Component } from "react";
import { connect } from "react-redux";
import { submitLogin } from "../../actions";
import {
    Image,
    StyleSheet,
    TextInput,
    Text,
    View,
    ImageBackground
} from "react-native";
import Logo from '../../../../../assets/logo/logo.png'
import { Button } from 'react-native-elements';
import { TouchableOpacity } from "react-native";
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    componentDidUpdate() {
        const { isLoginSuccess, isLoginRejected, navigation } = this.props;
        if (isLoginSuccess) {
        } else if (isLoginRejected) {
            alert("Username & Password is not correct, please try again.");
        }
    }

    handleSubmitLogin() {
        const { email, password } = this.state;
        const { onSubmitLogin } = this.props;
        const data = {
            email,
            password
        };
        onSubmitLogin(data, 'customer');
    }

    render() {
        console.log("CUSTOMER SIDE")

        const { isLoginLoading, navigation } = this.props;
        return (
            <ImageBackground
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#F7F7FA"
                }}
            >
                <View style={styles.container}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FD2D55' }}>
                        <Image
                            source={Logo}
                            style={styles.welcomeImage}
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <View style={{ margin: 10 }}>
                            <View style={styles.inputView}>
                                <TextInput value={this.state.email} autoCapitalize='none' onChangeText={(e) => this.setState({ email: e })} style={styles.input} placeholder="Email" />
                            </View>

                            <View style={styles.inputView}>
                                <TextInput secureTextEntry={true} autoCapitalize='none' value={this.state.password} onChangeText={(e) => this.setState({ password: e })} style={styles.input} placeholder="Password" />
                            </View>

                        </View>
                        <View style={{ marginBottom: 5, marginHorizontal: 10 }} >
                            <Button
                                loading={this.props.isLoginLoading}
                                buttonStyle={{ backgroundColor: '#FD2D55', borderRadius: 10, height: 50 }}
                                title="Continue"
                                type="solid"
                                onPress={() => {
                                    this.handleSubmitLogin();
                                }}
                            />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                            <Text>Don't have an account yet?</Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("CustomerSignUp");
                            }}>
                                <Text style={{ color: '#353A50', fontSize: 14, fontWeight: 'bold', marginHorizontal: 10, textDecorationLine: 'underline' }}>Register Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

Login.navigationOptions = {
    header: null,
    tabBarVisible: false
};

function mapStateToProps(state) {
    return {
        isLoginLoading: state.login.isLoginLoading,
        isLoginSuccess: state.login.isLoginSuccess,
        isLoginRejected: state.login.isLoginRejected
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmitLogin: (data, userType) => dispatch(submitLogin(data, userType))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // display: 'flex',
        // alignContent: 'flex-end',
        // justifyContent: 'flex-end',
        marginBottom: 50
        // backgroundColor: 'black'
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeImage: {
        width: 120,
        height: 120,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: -10,
        resizeMode: "contain"
    },
    input: {
        height: 40,
        fontSize: 16,
        padding: 4,
    },
    section: {
        marginLeft: 10,
        marginRight: 10,
    },
    inputView: {
        borderBottomColor: 'lightgray',
        borderTopColor: 'lightgray',
        borderLeftColor: 'lightgray',
        borderRightColor: 'lightgray',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        height: 60,
        marginTop: 10,
        marginBottom: 10


    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 120,
        height: 120,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: -10,
        resizeMode: "contain"
    },
    loading: {
        backgroundColor: "rgba(128,128,128,0.1)",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    }
});
