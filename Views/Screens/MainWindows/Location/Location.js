/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ActivityIndicator, TouchableHighlight } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Octicons';
// import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';

var geoLib = require('geolib');

export default class Location extends Component {
	constructor(props) {
		super(props)
		this.state = {
			region: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			},
			originCoords: {
				latitude: 5.970375,
				longitude: 80.692441,
			},
			coverage: false
		}
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				var distance = geoLib.getDistance(
					{ latitude: this.state.originCoords.latitude, longitude: this.state.originCoords.longitude },
					{ latitude: position.coords.latitude, longitude: position.coords.longitude }
				);
				console.log(distance)
				if (distance <= 5000) {
					this.setState({
						coverage: true
					})
				}
				else {
					this.setState({
						coverage: false
					})
				}
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.0011
						// latitude: 20.3742342,
						// longitude: 37.2234,
						// latitudeDelta: 0.01,
						// longitudeDelta: 0.0011
					}
				});
			},
			(error) => alert("Error", "Cannot get the connection due to bad connectivity."),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}

	onRegionChange = (region) => {
		this.setState({ region });
	}

	setAlarmToDestination = () => {
		const { region } = this.state;

		const tempRegion = { latitude: region.latitude, longitude: region.longitude };
		// const tempDestination = { latitude: destination.latitude, longitude: destination.longitude };

		if (JSON.stringify(tempRegion) == JSON.stringify(tempRegion)) {
			Vibration.vibrate(100);
		}
	}



	render() {
		const { region } = this.state.region;
		if (this.state.region.latitude != 0 && this.state.region.longitude != 0) {
			return (
				<View style={{ flex: 1 }}>
					{/* <View style={{ marginBottom: 10 }}> */}

					{/* </View> */}
					<MapView
						provider={PROVIDER_GOOGLE}
						initialRegion={this.state.region}
						region={this.state.region}
						// region={region}
						style={{ flex: 1 }}
						// onRegionChange={this.onRegionChange}
						showsUserLocation
						loadingEnabled
					>
						<MapViewDirections
							origin={this.state.region}
							destination={this.state.originCoords}
							strokeWidth={3}
							apikey={'AIzaSyCfpyjsCryoM6w90zCbqYJpbZcy87Y6fXc'}
							strokeColor="blue"
						/>

						<Marker
							coordinate={{
								latitude: this.state.originCoords.latitude,
								longitude: this.state.originCoords.longitude
							}}
						></Marker>
					</MapView>
					<View style={{ position: 'absolute', backgroundColor: 'transparent', flex: 1 }}>
						<TouchableHighlight onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="black"
								size={27}
								style={{ marginLeft: 10, marginTop: 10, paddingBottom: 5, backgroundColor: 'transparent' }}
							/>
						</TouchableHighlight>

						<Dialog
							visible={this.state.coverage}
							dialogStyle={{justifyContent: 'flex-end'}}
							dialogTitle={<DialogTitle title="Dialog Title" />}
						>
							<DialogContent>
								<Text>skhdvshdv</Text>
							</DialogContent>
						</Dialog>
						{/* <PopupDialog
							ref={(popupDialog) => { this.popupDialog = popupDialog; }}
							dialogStyle={{ position: 'absolute', bottom: 0 }}
							dialogAnimation={slideAnimation}
							height={150}
							dialogTitle={<DialogTitle title="Select options" />}
						></PopupDialog> */}

					</View>
					{/* <Search onLocationSelected={this.handleLocationSelected} /> */}
					{/* <Button title="Place" color="red" onPress={this.setAlarmToDestination} /> */}
				</View>
				// <View style={{flex:1}}>

				// 	{/* <WelcomeScreen /> */}
				// 	{/* <Location/> */}
				// </View>
			);
		} else {
			return (
				<View style={{
					flex: 1,
					// justifyContent: 'center',
					// flexDirection: 'row',
					// justifyContent: 'space-around',
					// padding: 10,
					backgroundColor: '#1c1c1c'
				}}
				>
					<View style={{ marginBottom: 10 }}>
						<TouchableHighlight onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="white"
								size={27}
								style={{ marginLeft: 10, marginTop: 10, paddingBottom: 5, backgroundColor: 'transparent' }}
							/>
						</TouchableHighlight>
					</View>

					<View style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						// justifyContent: 'space-around',
						padding: 10,
					}}>
						<Text style={{ marginBottom: 3, fontSize: 28, color: 'white' }}>Loading the map..</Text>
						<ActivityIndicator size="large" color="#00ff00" />
					</View>
				</View>
			);
		}

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
