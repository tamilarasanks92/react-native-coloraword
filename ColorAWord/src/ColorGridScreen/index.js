import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    FlatList,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    ActivityIndicator,
    Alert
} from 'react-native'
import { Header } from '@react-navigation/stack'

export default class ColorGridScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSourceItems: [],
            colorVal: props.route.params.colorValue
        }
    }

    componentDidMount() {
        this.callColorDetailsAPI()
    }

    callColorDetailsAPI() {
        this.setState({ isLoading: true })
        fetch('https://run.mocky.io/v3/e3d46218-f910-4f69-93ac-4a84e224a7bd', {
            method: 'GET'
        }).then((response) => response.json()).then((responseJson) => {
            {
                responseJson.colors.map(color => {
                    if (color.color == this.state.colorVal.toLowerCase()) {
                        this.setState({ isLoading: false })
                        this.setState({ dataSourceItems: color.hexvalues })
                    }
                })
            }
        }).catch((error) => {
            console.error('Error' + error)
        })
    }

    renderItem({ item }) {
        const { width, height } = Dimensions.get('window')
        return (
            <View style={[styles.gridViewBlockStyle, styles.boxWithShadow, { backgroundColor: item, width: (width - 100) / 2 }]}>
                <View style={{ height: 30, width: '100%', position: 'absolute', bottom: 0, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                    <Text style={{ alignSelf: 'center', justifyContent: 'center' }}>{item}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={[{ flex: 1, backgroundColor: '#ffffff' }]}>
                <View style={{ alignItems: 'flex-end', right: 10 }}>
                    <Text style={styles.textTitle}>C  O  L  O  R</Text>
                    <Text style={styles.textDescription}>{this.state.colorVal.toUpperCase()}</Text>
                </View>
                {this.state.isLoading && (
                    <Modal visible={this.state.isLoading} transparent={true} >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 40,
                                    position: 'absolute'
                                }}>
                                <ActivityIndicator size="large" color="black" />
                            </View>
                        </View>
                    </Modal>
                )}
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.dataSourceItems}
                    renderItem={item => this.renderItem(item)}
                    numColumns={2}
                    ListFooterComponent={() => {
                        return <View style={{ backgroundColor: 'white', height: 40 }}></View>
                    }}
                />
                <KeyboardAvoidingView
                    style={styles.footerStyle}
                    keyboardVerticalOffset={160}
                    behavior="padding"
                >
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
                                )) : this.callColorDetailsAPI()
                            }
                        }}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: '200',
        alignItems: 'center',
        marginBottom: 5,

    },
    textDescription: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'

    },
    gridViewBlockStyle: {
        borderRadius: 10,
        justifyContent: 'center',
        flex: 1,
        alignSelf: 'center',
        height: 150,
        margin: 10
    },
    headerStyle: {
        fontWeight: 'bold',
        fontSize: 25
    },
    boxWithShadow: {
        padding: 0.1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    footerStyle: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: 80,
        bottom: 0,
        backgroundColor: 'white',
        alignItems: 'center'
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