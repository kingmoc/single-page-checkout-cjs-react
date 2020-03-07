import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'

import Commerce from '@chec/commerce.js'

const PrivateRoute = ({ component: Component, ...rest }) => {
	

	return <Route {...rest} render={(props) => {


		// return <Component {...props} {...rest} />

		if(localStorage.getItem('cart-id')) {
			return <Component {...props} {...rest}/>
		} else {
			return <Redirect to="/" />
		}

	}} />
}

export default PrivateRoute;