/**
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import Toolbar from './toolbar';

// Gutenberg imports
import { getBlockType } from '@gutenberg/blocks/api';

type PropsType = {
	index: number,
	blockType: string,
	content: string,
	focused: boolean,
	onToolbarButtonPressed: ( button: number, index: number ) => void,
	onBlockHolderPressed: ( rowId: number ) => void,
};
type StateType = { selected: boolean, focused: boolean };

export default class BlockHolder extends React.Component<PropsType, StateType> {
	renderToolbarIfBlockFocused() {
		if ( this.props.focused ) {
			return (
				<Toolbar index={ this.props.index } onButtonPressed={ this.props.onToolbarButtonPressed } />
			);
		} else {
			// Return empty view, toolbar won't be rendered
			return <View />;
		}
	}

	getBlockForType() {
		const blockType = getBlockType( this.props.blockType );
		if ( blockType ) {
			const Code = blockType.edit;
			// TODO: input text needs to be kept by updating the attributes
			return (
				<Code
					attributes={ { ...this.props.attributes } }
					// pass a curried version of onChanged with just one argument
					setAttributes={ attrs => this.props.onChange( this.props.index, attrs ) }
				/>
			);
		} else {
			// Default block placeholder
			return <Text>{ this.props.attributes.content }</Text>;
		}
	}

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={ this.props.onBlockHolderPressed.bind( this, this.props.index ) }
			>
				<View style={ styles.blockHolder }>
					<View style={ styles.blockTitle }>
						<Text>BlockType: { this.props.blockType }</Text>
					</View>
					<View style={ styles.blockContainer }>{ this.getBlockForType.bind( this )() }</View>
					{ this.renderToolbarIfBlockFocused.bind( this )() }
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create( {
	blockHolder: {
		flex: 1,
	},
	blockContainer: {
		backgroundColor: 'white',
	},
	blockContent: {
		padding: 10,
	},
	blockTitle: {
		backgroundColor: 'grey',
		paddingLeft: 10,
		paddingTop: 4,
		paddingBottom: 4,
	},
} );
