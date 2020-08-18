import React, { Component } from 'react'
import { StyleSheet, View, TextInput, SafeAreaView, Text, Alert } from 'react-native'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colorVal: ''
        }
    }

    componentDidMount() {
        console.log('Mounted')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.textTitle}>C  O  L  O  R</Text>
                    <Text style={styles.textDescription}>WORD</Text>
                    <TextInput ref={input => { this.textInput = input }} style={styles.input}
                        textContentType={'emailAddress'}
                        autoCompleteType='off'
                        returnKeyType={'done'}
                        onChangeText={text => this.setState({ colorVal: text })}
                        onSubmitEditing={() => {
                            {
                                this.state.colorVal == '' ? (Alert.alert(
                                    'Alert',
                                    "Please enter any color",
                                    [
                                        {
                                            text: 'OK',
                                            style: 'ok',
                                        }
                                    ],
                                    { cancelable: false },
                                )) : this.props.navigation.navigate('ColorGrid', {
                                    colorValue: this.state.colorVal
                                })
                            }
                        }}
                    />
                </View>
            </SafeAreaView >
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
        fontWeight: 'bold'

    },
    input: {
        borderWidth: 1.5,
        marginTop: 15,
        width: 300,
        height: 48,
        fontSize: 16,
        paddingHorizontal: 15
    }
})
