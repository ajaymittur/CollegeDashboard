import React from "react"
import { Message, Grid } from "semantic-ui-react"

function NotFound() {
	return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
	        <Grid.Column style={{ maxWidth:500 }}>
	            <Message color='teal' size='massive' textAlign='left' negative>
	                   <Message.Header> Page Not Found </Message.Header>
	                   <p>
	                   	OOPS! The page you were searching for could not be found!
	                   </p>
	            </Message>
	    	</Grid.Column>
        </Grid>
    )
}

export default NotFound