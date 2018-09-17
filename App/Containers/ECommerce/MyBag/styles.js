import { Platform, StyleSheet, Dimensions } from 'react-native';

// Screen Styles
import { Fonts, Metrics, Colors } from '../../../Themes/';

const styles = StyleSheet.create({
	container: {
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT,
		backgroundColor: Colors.snow,
	},

	header: {
		backgroundColor: '#0e1130',
		height: Metrics.HEIGHT * 0.1,
		borderBottomWidth: 0,
		...Platform.select({
			ios: {
				paddingTop: Metrics.HEIGHT * 0.02,
			},
			android: {
				paddingTop: Metrics.WIDTH * 0.04,
			},
		}),
		elevation: 0,
		paddingLeft: Metrics.WIDTH * 0.05,
		paddingRight: Metrics.WIDTH * 0.05,
	},

	left: {
		flex: 1,
		backgroundColor: Colors.transparent,
	},

	body: {
		flex: 2,
		alignItems: 'center',
		backgroundColor: Colors.transparent,
	},

	textTitle: {
		color: Colors.snow,
		fontSize: Fonts.moderateScale(20),
		alignSelf: 'center',
		fontFamily: Fonts.type.helveticaNeueLight,
	},

	right: {
		flex: 1,
		alignItems: 'center',
	},

	bagIcon: {
		marginLeft: Metrics.WIDTH * 0.04,
		color: Colors.snow,
	},

	heartIcon: {
		color: Colors.snow,
		alignSelf: 'center',
	},

	heartBg: {
		width: Metrics.WIDTH * 0.054,
		height: Metrics.WIDTH * 0.054,
		borderRadius: Metrics.WIDTH * 0.027,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: Colors.snow,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: Metrics.WIDTH * 0.005,
	},

	listBg: {
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT * 0.81,
		backgroundColor: Colors.transparent,
		marginBottom: Metrics.WIDTH * 0.04,
	},

	bottomView: {
		width: Metrics.WIDTH,
		height: Metrics.HEIGHT * 0.089,
		backgroundColor: Colors.transparent,
		alignItems: 'center',
		justifyContent: 'center',
	},

	divider: {
		backgroundColor: '#d8d8d8',
		height: Metrics.HEIGHT * 0.001,
		width: Metrics.WIDTH,
	},

	footerBtnBg: {
		width: Metrics.WIDTH * 0.92,
		alignSelf: 'center',
		backgroundColor: '#0691ce',
		paddingTop: Metrics.WIDTH * 0.025,
		paddingBottom: Metrics.WIDTH * 0.025,
		borderRadius: 5,
	},

	footerBtnTxt: {
		color: Colors.snow,
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
		textAlign: 'center',
	},

	rowBg: {
		width: Metrics.WIDTH * 0.92,
		alignSelf: 'center',
		flexDirection: 'row',
		marginTop: Metrics.WIDTH * 0.04,
		marginBottom: Metrics.WIDTH * 0.04,
	},

	productImage: {
		width: Metrics.WIDTH * 0.44,
	},

	productDetailBg: {
		width: Metrics.WIDTH * 0.44,
		marginLeft: Metrics.WIDTH * 0.04,
		backgroundColor: Colors.transparent,
	},

	heartListIcon: {
		alignSelf: 'flex-end',
		marginTop: Metrics.WIDTH * 0.025,
		marginRight: Metrics.WIDTH * 0.025,
	},

	productTitleTxt: {
		color: '#0e1130',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
		textAlign: 'left',
	},

	priceTxt: {
		color: '#ff0000',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
	},

	detailFieldRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	closeIconBg: {
		backgroundColor: '#cecece',
		width: Metrics.WIDTH * 0.048,
		height: Metrics.WIDTH * 0.048,
		borderRadius: Metrics.WIDTH * 0.024,
		alignItems: 'center',
		justifyContent: 'center',
	},

	closeImg: {
		alignSelf: 'center',
		color: Colors.snow,
		...Platform.select({
			ios: {
				paddingBottom: Metrics.WIDTH * 0.003,
			},
			android: {},
		}),
	},

	dropDownContainerStyle: {
		width: Metrics.WIDTH * 0.22,
		height: Metrics.WIDTH * 0.08,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#d7d7d7',
		backgroundColor: Colors.snow,
	},

	dropDownPickerStyle: {
		width: Metrics.WIDTH * 0.22,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#d7d7d7',
		marginLeft: Metrics.WIDTH * 0.04,
		backgroundColor: Colors.snow,
	},

	listColorBg: {
		width: Metrics.WIDTH * 0.22,
		height: 20,
		paddingTop: Metrics.WIDTH * 0.01,
	},

	colorViewer: {
		height: Metrics.WIDTH * 0.04,
    width: Metrics.WIDTH * 0.04,
    borderRadius: 3,
    borderWidth: 2,
	},

	rowAddtoBagBtn: {
		width: Metrics.WIDTH * 0.44,
		backgroundColor: '#0691ce',
		paddingTop: Metrics.WIDTH * 0.02,
		paddingBottom: Metrics.WIDTH * 0.02,
		borderRadius: 5,
		marginTop: Metrics.WIDTH * 0.12,
	},

	row: {
		width: Metrics.WIDTH,
		backgroundColor: Colors.transparent,
	},

	text: {
		fontSize: 30,
		alignSelf: 'center',
		color: 'red',
	},
	dropstyle: {
		backgroundColor: 'transparent',
		width: Fonts.moderateScale(75),
		height: Fonts.moderateScale(28),
		borderWidth: 0.5,
		borderColor: 'lightgrey',
		borderRadius: 4,
	},

	alertBg: {
		width: Metrics.WIDTH * 0.03,
		height: Metrics.WIDTH * 0.03,
		borderRadius: Metrics.WIDTH * 0.015,
		backgroundColor: '#ff0000',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: -(Metrics.WIDTH * 0.018),
	},

	alertTxt: {
		fontSize: Fonts.moderateScale(8),
		fontFamily: Fonts.type.sfuiDisplayMedium,
		color: Colors.snow,
	},
});

export default styles;
