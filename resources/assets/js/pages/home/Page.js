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
import axios from 'axios';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            url: '/api/products/paged',
            pagination: []
        }
    }

    
    componentWillMount() {
        this.fetchProducts()
    }

    fetchProducts(){
        let $this = this;

        axios.get(this.state.url).then(response => {
            $this.setState({
                data: $this.state.data.length > 0 ? $this.state.data.concat(response.data.data) : response.data.data,
                url: response.data.next_page_url
            })

            $this.makePagination(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    loadMore(){
        console.log(this.state.pagination.next_page_url)
        this.setState({
            url: this.state.pagination.next_page_url
        })

        this.fetchProducts()
    }
    
    makePagination(data){
        let pagination = {
            current_page: data.current_page,
            last_page: data.last_page,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url
        }

        this.setState({
            pagination: pagination
        })
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
                                    {this.state.data.map((product, i) => (
                                        <Grid.Column key={i}>
                                            <img src="https://dummyimage.com/200x200/5e3ad6/fff" alt="dummy"/>
                                            <h3>{product.name}</h3>
                                            <p>{product.details}</p>
                                            <h5>Price : {product.price}</h5>
                                            <p>&nbsp;</p>
                                        </Grid.Column> 
                                        )
                                    )}
                                </Grid.Row>
                            </Grid>
                        </Responsive>
                        <Button icon labelPosition='left' primary size='small' onClick={this.loadMore.bind(this)}>
                            <Icon name='angle double down' /> Load More
                        </Button>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Page;