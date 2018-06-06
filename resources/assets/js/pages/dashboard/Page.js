import React from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    Responsive,
    Segment,
    Step
} from 'semantic-ui-react'
import PageHeader from '../../common/pageHeader'
import {Link, Redirect} from 'react-router-dom'

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageHeader heading="Dashboard"/>
                <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                    <Header as='h1'>Dashboard</Header>
                    <Link to='/addProduct' replace>Add New Product</Link>
                </Segment>                
            </div>
        );
    }
}

export default Page;