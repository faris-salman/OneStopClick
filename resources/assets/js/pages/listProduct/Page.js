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
            data: []
        }
    }
    
    componentWillMount() {
        let $this = this;

        axios.get('/api/products').then(response => {
            $this.setState({
                data: response.data
            })
        }).catch(error => {
            console.log(error)
        })
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
                                <Button size='small' basic color='green'>Load More</Button>
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