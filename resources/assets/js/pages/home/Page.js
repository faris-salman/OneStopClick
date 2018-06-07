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
import {Link} from 'react-router-dom'
import AuthService from '../../services'

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const social = this.props.match.params.social
        const params = this.props.location.search;

        setTimeout(function() { 

        if (params && social) {
            this.props.dispatch(AuthService.socialLogin({ params, social }))
                .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({responseError});
                this.setState({
                    isLoading: false
                });
            })
        }

        }.bind(this), 1000);
    }

    render() {
        return (
            <div>
                <Segment
                    inverted
                    textAlign='center'
                    className='home-header'
                    vertical
                >
                    <Container text>
                        <Responsive minWidth={769}>
                            <Header
                                as="h2"
                                content="Welcome to"
                                inverted
                                className="pretitle"
                            />
                        </Responsive>
                        <Header
                            as='h1'
                            content='One Stop Click'
                            inverted
                            className="main-heading"
                        />
                        <Header
                            as='p'
                            content='Laravel 5.6 ReactJS 16.4 Application'
                            inverted
                            className="sub-heading"
                        />
                        {/* <Button color="teal" size='huge' className="free-signup-button">
                            <Link to='/register' replace>Register</Link>
                        </Button> */}
                    </Container>
                </Segment>
                <div className="course-tour">
                    <Container textAlign="center" style={{padding: '2em 0em'}}>
                        <Header as="h3" content="OneStopClick Market"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </Container>
                    <Container className="step-container">
                        <Responsive minWidth={100}>
                            <Grid columns={5} padded="horizontally">
                                <Grid.Row>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3ad6/fff" alt="dummy"/>
                                        <h5>Product 1</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3aaa/fff" alt="dummy"/>
                                        <h5>Product 2</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3abb/fff" alt="dummy"/>
                                        <h5>Product 3</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3acc/fff" alt="dummy"/>
                                        <h5>Product 4</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3add/fff" alt="dummy"/>
                                        <h5>Product 5</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3aee/fff" alt="dummy"/>
                                        <h5>Product 6</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3aff/fff" alt="dummy"/>
                                        <h5>Product 7</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3a11/fff" alt="dummy"/>
                                        <h5>Product 8</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3a22/fff" alt="dummy"/>
                                        <h5>Product 9</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3a33/fff" alt="dummy"/>
                                        <h5>Product 10</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <img src="https://dummyimage.com/300x300/5e3a44/fff" alt="dummy"/>
                                        <h5>Product 11</h5>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dicta dolores
                                            dolorum eligendi, esse, facilis fugit hic impedit ipsam libero nisi
                                            obcaecati pariatur placeat soluta voluptatum. Aliquid officia quod
                                            veritatis!</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Responsive>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Page;