import React, { Component } from 'react'
import { Text, View, Linking, TouchableHighlight, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Styles from './Styles';
export default class Call extends Component {
	// state = {
	// 	contact = +94772226925,
	// }

	callAssistant = () => {
		Linking.openURL(`tel:${+94772226925}`)
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={() => this.callAssistant()} style={Styles.callBtn}>
					<Icon
						name="ios-call"
						color="white"
						size={35}
						style={{paddingTop: 7}}
					/>
				</TouchableOpacity>
			</View>
		)
	}
}
