/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalNavigatorButton as NavigatorButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { layout, symbol, navigation, styles, page } from '@wordpress/icons';
import { useDispatch, useSelect } from '@wordpress/data';

import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { SidebarNavigationItemGlobalStyles } from '../sidebar-navigation-screen-global-styles';
import { unlock } from '../../private-apis';
import { store as editSiteStore } from '../../store';
import SidebarNavigationScreenNavigationMenuButton from '../sidebar-navigation-screen-navigation-menus/navigator-button';

export default function SidebarNavigationScreenMain() {
	const editorCanvasContainerView = useSelect( ( select ) => {
		return unlock( select( editSiteStore ) ).getEditorCanvasContainerView();
	}, [] );

	const { setEditorCanvasContainerView } = unlock(
		useDispatch( editSiteStore )
	);

	// Clear the editor canvas container view when accessing the main navigation screen.
	useEffect( () => {
		if ( editorCanvasContainerView ) {
			setEditorCanvasContainerView( undefined );
		}
	}, [ editorCanvasContainerView, setEditorCanvasContainerView ] );

	return (
		<SidebarNavigationScreen
			isRoot
			title={ __( 'Design' ) }
			description={ __(
				'Customize the appearance of your website using the block editor.'
			) }
			content={
				<ItemGroup>
					<SidebarNavigationScreenNavigationMenuButton
						withChevron
						icon={ navigation }
						as={ SidebarNavigationItem }
					>
						{ __( 'Navigation' ) }
					</SidebarNavigationScreenNavigationMenuButton>

					<SidebarNavigationItemGlobalStyles
						withChevron
						icon={ styles }
					>
						{ __( 'Styles' ) }
					</SidebarNavigationItemGlobalStyles>
					<NavigatorButton
						as={ SidebarNavigationItem }
						path="/page"
						withChevron
						icon={ page }
					>
						{ __( 'Pages' ) }
					</NavigatorButton>
					<NavigatorButton
						as={ SidebarNavigationItem }
						path="/wp_template"
						withChevron
						icon={ layout }
					>
						{ __( 'Templates' ) }
					</NavigatorButton>
					<NavigatorButton
						as={ SidebarNavigationItem }
						path="/wp_template_part"
						withChevron
						icon={ symbol }
					>
						{ __( 'Library' ) }
					</NavigatorButton>
				</ItemGroup>
			}
		/>
	);
}
