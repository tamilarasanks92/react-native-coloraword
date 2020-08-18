import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { CommonActions } from '@react-navigation/native'

export default class SplashScreen extends Component {
    navigateToLogin = () => {
        this.props.navigation.navigate('Login')
    }
    componentDidMount() {
        var that = this
        setTimeout(function () {
            that.props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'Home' }],
                }),
            )
        }, 2000)
    }
    render() {
        return (
            <SafeAreaView style={styles.content}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.textTitle}>C  O  L  O  R</Text>
                    <Text style={styles.textDescription}>WORD</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 35,
        color: '#000',
        fontWeight: '200',
        alignItems: 'center',
        marginBottom: 5,

    },
    textDescription: {
        fontSize: 35,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 70,

    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff"
    },
})