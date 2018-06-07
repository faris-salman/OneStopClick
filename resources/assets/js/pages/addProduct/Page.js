import React from 'react'
import {Button, Dimmer, Form, Grid, Header, Loader, Message, Segment, Checkbox, Input, TextArea} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
import PageHeader from '../../common/pageHeader'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: 'required|min:3',
            description: 'required|min:10',
            price: 'required|decimal'
        });
        this.state = {
            products: {
                name: '',
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
        this.props.dispatch(AuthService.addProduct(products))
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

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <PageHeader heading="Add Product"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Adding...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={{maxWidth: '450px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Add a new product
                        </Header>
                        {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        {this.state.isSuccess && <Message positive>
                            <Message.Content>
                                Product is Successfully Added ! Go to <Link to='/dashboard' replace>Dashboard</Link>
                            </Message.Content>
                        </Message>}
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
                                    />
                                    {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>
                                        {errors.first('name')}
                                    </Header>}
                                </Form.Group>
                                <Form.TextArea
                                    label='Description' 
                                    name='description'
                                    placeholder='Tell us more about the product...'
                                    onChange={this.handleChange}
                                />
                                {errors.has('description') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('description')}
                                </Header>}
                                <Form.Checkbox
                                    label='Promoted Product'
                                    name='promoted' />
                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Add</Button>
                            </Segment>
                        </Form>
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