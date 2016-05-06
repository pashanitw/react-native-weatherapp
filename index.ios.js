/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import {getWeatherAPI} from './src/api'
import {iconMapper} from './src/icons'

const WeatherBoard=({temp,condition,city,icon})=>{

     return <View style={styles.board}>
         <Text style={styles.temperature}>{Math.round(temp) + "°C"}</Text>
         <Text style={styles.icon}>{iconMapper(icon)}</Text>
         <Text style={styles.weatherType}>{condition}</Text>
         <Text style={styles.location}>{city}</Text>
     </View>
}
class weatherapp extends Component {
    constructor(props){
        super(props)
        this.state={
            searchText:'',
            showBoard:false,
            weatherData:{

            }
        }
    }
    _getWeather(city) {
        getWeatherAPI(this.state.searchText).then((data)=>{
debugger;
               this.setState({
                   showBoard:true,
                   weatherData:{
                       temp:data.main.temp,
                       icon:data.weather[0].icon,
                       city:data.name,
                       condition:data.weather[0].main
                   }
               })

        })
    }
    _handleSearchChange(searchText){
        this.setState({
            searchText
        })
    }
    render() {
        let searchProps = {
            autoCapitalize:'none',
            autoCorrect:false,
            autoFocus: false,
            clearButtonMode: 'always',
            clearTextOnFocus: true,
            enablesReturnKeyAutomatically: true,
            returnKeyType: 'search'
        }
        let icon = '\uf03e'
        return (
            <View style={styles.container}>
                {this.state.showBoard?<WeatherBoard {...this.state.weatherData}/>:null}
                <TextInput
                    style={styles.input}
                    value={this.state.searchText}
                    {...searchProps}
                    onChangeText={this._handleSearchChange.bind(this)}
                    onSubmitEditing={this._getWeather.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
        justifyContent:'center'
    },
    board:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    temperature: {
        fontSize: 62,
        fontWeight: "100",
        margin: 0
    },
    location: {
        fontSize: 14,
        fontWeight: "100",
        marginBottom: 20,
    },
    weatherType: {
        fontSize: 34,
        fontWeight: "500"
    },
    input: {
        borderWidth: 1,
        borderColor: "#666",
        height: 40,
        marginVertical: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop:100
    },
    icon: {
        fontFamily: 'WeatherIcons-Regular',
        fontSize: 130,
        padding: 0
    }
});

AppRegistry.registerComponent('weatherapp', () => weatherapp);
