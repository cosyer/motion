import React, { PropTypes } from 'react'
import { connect } from 'dva'
import {hashHistory} from 'react-router'
import Nav from '../components/Home/Nav'
import classnames from 'classnames'

function MainView(state){
	const { children, location,dispatch,appModel} = state;

	const mainProps={
		selectedKeys:appModel.selectedKeys,
		visibleModal:appModel.visibleModal,
		onSelect(value){
			dispatch({
				type: `appModel/changeKey`,
				payload: value.key
			})
		},
		showModal(){
			dispatch({
				type: `appModel/querySuccess`,
				payload: {visibleModal:true}
			})
		},
		handleCancel(){
			dispatch({
				type: `appModel/querySuccess`,
				payload: {visibleModal:false}
			})	
		},
		onUpdate(value){
            dispatch({
				type: `appModel/updatePassword`,
				payload: {userId:localStorage.userID,...value}
			})
		},
		signOut(){
			dispatch({type:'appModel/logout',payload:{userID:localStorage.userID}})
			localStorage.clear()
			hashHistory.push('/login')
		}
	}

	return (
		<div>
		<Nav {...mainProps}/>
		<div>
		{children}
		</div>
		</div>
		)
}

MainView.propTypes = {
	appModel: PropTypes.object,
	children: PropTypes.element.isRequired,
	location: PropTypes.object,
}


export default connect(({appModel})=>({appModel}))(MainView)