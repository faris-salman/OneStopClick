import React from 'react'
import {Button, Dimmer, Form, Grid, Header, Loader, Message, Segment, Checkbox, Input, TextArea} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
import PageHeader from '../../common/pageHeader'
import axios from 'axios'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: 'required|min:3',
            details: 'required|min:10',
            description: 'required|min:10',
            price: 'required|decimal'
        });
        this.state = {
            products: {
                id: '',
                name: '',
                details: '',
                description: '',
                price: '',
                promoted: false
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isSuccess: false,
            isLoading: false,
            errors: this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {products} = this.state;
        products[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, products})
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        const {products} = this.state;
        

        this.validator.validateAll(products)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(products);
                }
            });
    }

    submit(products) {
        this.props.dispatch(AuthService.editProduct(products))
            .then((result)  => {
                this.setState({
                    isLoading: false
                });
                this.setState({
                    isSuccess: true,
                });
            })
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
    
    componentWillMount() {
        let $this = this;
        var productId = $this.props.match.params.id
        axios.get('/api/products/'+productId).then(response => {
            var user =  response.data
            console.log(user)

            $this.setState({
                products: {
                    id: productId,
                    name: user.name,
                    details: user.details,
                    description: user.description,
                    price: user.price,
                    promoted: false
                },
            })
        }).catch(error => {
            console.log(error)
        })
    }
    

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <PageHeader heading="Update Product"/>
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
                    <Grid.Column style={{maxWidth: '450px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Edit the product {this.props.match.params.id}
                        </Header>
                        {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        {this.state.isSuccess && <Message positive>
                            <Message.Content>
                                Product is Successfully Updated ! Go to <Link to='/listProduct' replace>Product List</Link>
                            </Message.Content>
                        </Message>}
                        {!this.state.isSuccess &&
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        icon='edit'
                                        iconPosition='left'
                                        label='Name'
                                        name='name'
                                        placeholder='Name'
                                        onChange={this.handleChange}
                                        value={this.state.products.name}
                                    />
                                    {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('name')}
                                    </Header>}
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        icon='edit'
                                        iconPosition='left'
                                        label='Details'
                                        name='details'
                                        placeholder='Details'
                                        onChange={this.handleChange}
                                        value={this.state.products.details}
                                    />
                                    {errors.has('details') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('details')}
                                    </Header>}
                                </Form.Group>
                                <Form.TextArea
                                    label='Description' 
                                    name='description'
                                    placeholder='Tell us more about the product...'
                                    onChange={this.handleChange}
                                    value={this.state.products.description}
                                />
                                {errors.has('description') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('description')}
                                </Header>}
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        icon='edit'
                                        iconPosition='left'
                                        label='Price'
                                        name='price'
                                        placeholder='Price'
                                        onChange={this.handleChange}
                                        value={this.state.products.price}
                                    />
                                    {errors.has('price') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('price')}
                                    </Header>}
                                </Form.Group>
                                {/* <Form.Checkbox
                                    label='Promoted Product'
                                    name='promoted' /> */}
                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Update</Button>
                            </Segment>
                        </Form>}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

Page.propTypes = {
    //isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Page;