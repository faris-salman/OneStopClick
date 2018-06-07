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
                    {/* <Link to='/addProduct' replace>Add New Product</Link> */}
                    <div className="course-tour">
                        <Container className="step-container">
                            <Responsive minWidth={100}>
                                <Grid columns={5} padded="horizontally">
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Link to='/addProduct' replace>
                                                <img src="https://dummyimage.com/200x200/13cf32/030b85&text=Add+New+Product" alt="dummy"/>
                                            </Link>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Link to='/addProduct' replace>
                                                <img src="https://dummyimage.com/200x200/13cfff/030b85&text=Your+Product+List" alt="dummy"/>
                                            </Link>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Link to='/addProduct' replace>
                                                <img src="https://dummyimage.com/200x200/44bb00/030b85&text=Other+Menu1" alt="dummy"/>
                                            </Link>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Link to='/addProduct' replace>
                                                <img src="https://dummyimage.com/200x200/44aacc/030b85&text=Other+Menu2" alt="dummy"/>
                                            </Link>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Responsive>
                        </Container>
                    </div>
                </Segment>
                                
            </div>
        );
    }
}

export default Page;