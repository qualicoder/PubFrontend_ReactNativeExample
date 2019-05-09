/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from './api'
import PubInside from "./PubInside";
import {connect} from "react-redux";
import {ReduxState} from "./services/rootReducer";
import {bindActionCreators, Dispatch} from "redux";
import {setUserId, setUsername} from "./services/actions"

interface Props {
    username: string,
    userId?: number,
    setUsername: (username: string) => any,
    setUserId: (userId: number | null) => any,
}

interface State {
}

class App extends Component<Props, State> {

    login = async (username: string) => {
        const {id} = await api.login(username);

        console.log(id);
        await AsyncStorage.setItem("userId", `${id}`);
        this.props.setUserId!(id);
    };

    logout = async () => {
        await AsyncStorage.removeItem("userId");
        this.props.setUserId!(null);
    };

    render() {
        const {userId, username, setUsername} = this.props;
        console.log("username: " + username);
        console.log("userId: " + userId);

        if (!userId) {
            return <LoginScreen login={this.login} username={username!}
                                setUsername={(text) => setUsername!(text)}/>
        }

        return <PubInside username={username!} logout={this.logout}/>
            ;
    }
}

interface LoginScreenProps {
    username: string,
    setUsername: (_: string) => void,
    login: (_: string) => void,
}

const LoginScreen = (props: LoginScreenProps) =>

    <View style={styles.container}>
        <View>
            <Text>Please log in!</Text>
            <TextInput style={styles.input} value={props.username} onChangeText={props.setUsername}
                       placeholder={'username'}/>
            <Button title={"Login"} onPress={() => props.login(props.username)}/>
        </View>
    </View>;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        padding: 5
    },
    input: {
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 1
    }
});

const mapStateToProps = (state: {root: ReduxState}) => ({
    username: state.root.username,
    userId: state.root.userId
});

const mapDispatchToProps = (dispatch: Dispatch) => (
    bindActionCreators(
        {
            setUsername: setUsername,
            setUserId: setUserId
        },
        dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(App);