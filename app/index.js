/*
* @Author: steven
* @Date:   2018-03-08 01:07:41
* @Last Modified by:   steven
* @Last Modified time: 2018-03-08 01:52:32
*/
import React from 'react';
import {
    StyleSheet,
    Navigator,
    Text,
    View,
    StatusBar,
    BackAndroid,
    Platform
} from 'react-native';
import {getRouteMap, registeNavigetor} from './route';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-native';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';
import MusicControlModal from './component/musicControlModal';
import Toast from './util/toast';
import Orientation from './util/orientation';
import * as Wechat from 'react-native-wechat';

let lastClickTime = 0;

const styles = StyleSheet.create({
	container: {
		flex:1
	},
	navigator: {
		flex: 1,
		backgroundColor: 'white'
	},
	errorView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	errorText: {
		color: 'red',
		fontSize: 16
	}
})


class App extends React.Component {
	constructor (props) {
		super(props);
		this.renderScene = this.renderScene.bind(this);
		this.onBackAndroid = this.onBackAndroid.bind(this);
	}
	componentWillMount (){
		Orientation.lockToPortrait();
		if (Platform.OS === 'android') {
			Orientation.registerOnOrientationChanged();
			BackAndroid.addEventListener('hardwareBackpress', this.onBackAndroid);
		}
	}

	componentDidMount (){
		Wechat.registerApp('your wechat appid');
	}

	componentWillUnMount () {
		if (Platform.OS === 'android') {
			BackAndroid.removeEventListener('handwareBackPress', this.onBackAndroid);P
		}
	}

	render (){
		return (
			<View style={styles.container}>
				<MusicControlModal />
				<StatusBar 
					backgroundColor="black"
					barStyle="default"/>
				<Navigator 
					style={styles.navigator}
					configureScene={this.configureScene}
					renderScene={this.renderScene}
					initialRoute={{
						name: 'MainContainer',
					}}/>
			</View>
		)
	}
	
	//出场动画
	configureScene(route){
		let sceneAnimation = getRouteMap().get(route.name).sceneAnimation;
		if (sceneAnimation) {
			return sceneAnimation;
		}

		return Navigator.SceneConfigs.PushFromRight
	}
}









// 