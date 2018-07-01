import React from 'react'
import {Button, Dimmer, Form, Grid, Header, Loader, Message, Segment, Checkbox, Icon, Table} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
import PageHeader from '../../common/pageHeader'
import axios from 'axios'

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
        this.fetchProducts(this.state.url)
    }

    fetchProducts(url){
        let $this = this;
        
        axios.get(url).then(response => {
            $this.setState({
                data: response.data.data
            })
            
            $this.makePagination(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    firstPage(){
        this.setState({
            url: this.state.pagination.first_page_url
        })

        this.fetchProducts(this.state.pagination.first_page_url)
    }

    lastPage(){
        this.setState({
            url: this.state.pagination.last_page_url
        })

        this.fetchProducts(this.state.pagination.last_page_url)
    }

    nextPage(){
        this.setState({
            url: this.state.pagination.next_page_url
        })

        this.fetchProducts(this.state.pagination.next_page_url)
    }

    prevPage(){
        this.setState({
            url: this.state.pagination.prev_page_url
        })

        this.fetchProducts(this.state.pagination.prev_page_url)
    }
    
    makePagination(data){
        
        let pagination = {
            current_page: data.current_page,
            last_page: data.last_page,
            first_page_url: data.first_page_url,
            last_page_url: data.last_page_url,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url
        }

        this.setState({
            pagination: pagination
        })

        console.log(this.state.pagination)
    }

    
    

    render() {
        const {errors} = this.state;
        return (
            <div>
                <PageHeader heading="List Product"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Updating...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={{maxWidth: '1000px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Product List
                        </Header>
                        {/* {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        {this.state.isSuccess && <Message positive>
                            <Message.Content>
                                Product is Successfully Added ! Go to <Link to='/dashboard' replace>Dashboard</Link>
                            </Message.Content>
                        </Message>} */}
                        <Table compact celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Details</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell/>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            {this.state.data.map((product, i) => (
                                    <ProductRow key={i} i={i} product={product} object={this}/>                                
                                )
                            )}
                            </Table.Body>

                            <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='5'>
                                <Link to='/addProduct' replace>
                                    <Button floated='right' icon labelPosition='left' primary size='small'>
                                        <Icon name='plus square' /> Add Product
                                    </Button>
                                </Link>
                                <Button icon labelPosition='left' basic color='green' size='small' onClick={this.firstPage.bind(this)}>
                                    <Icon name='angle double left' />First
                                </Button>
                                <Button icon labelPosition='left' basic color='yellow' size='small' onClick={this.prevPage.bind(this)}>
                                    <Icon name='angle left' />Prev
                                </Button>
                                <Button icon labelPosition='left' basic color='yellow' size='small' onClick={this.nextPage.bind(this)}>
                                    <Icon name='angle right' />Next
                                </Button>
                                <Button icon labelPosition='left' basic color='green' size='small' onClick={this.lastPage.bind(this)}>
                                    <Icon name='angle double right' />Last
                                </Button>
                                {/* <Button disabled size='small'>
                                    Delete All
                                </Button> */}
                                </Table.HeaderCell>
                            </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

class ProductRow extends React.Component {
    deleteProduct(product, object){
        console.log(product);

        var $this = object;
        axios.delete('/api/products/'+product.id).then(response => {
            console.log(response)

            const newState = $this.state.data.slice();
            newState.splice(newState.indexOf(product), 1)
            $this.setState({
                data: newState
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render(){
        return(
            <Table.Row key={this.props.i}>
                <Table.Cell>{this.props.product.name}</Table.Cell>
                <Table.Cell>{this.props.product.details}</Table.Cell>
                <Table.Cell>{this.props.product.description}</Table.Cell>
                <Table.Cell>{this.props.product.price}</Table.Cell>
                <Table.Cell>
                    <Link to={'/editProduct/'+this.props.product.id} replace>
                        <Button floated='right' icon labelPosition='left' basic color='blue' size='small'>
                            <Icon name='edit' /> Edit Product
                        </Button>
                    </Link>
                    <Button onClick={this.deleteProduct.bind(this, this.props.product, this.props.object)} floated='right' icon labelPosition='left' basic color='red' size='small'>
                        <Icon name='delete' /> Delete Product
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}

Page.propTypes = {
    //isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Page;