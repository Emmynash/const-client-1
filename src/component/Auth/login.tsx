import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleReactValidator from 'simple-react-validator';
import { withRouter, Link } from 'react-router-dom';
// import Spinner from '../Spinner/Spinner';
import { withFirebase } from '../Firebase';
import { Button, PropTypes, Container, Grid, FormControl, Input, InputLabel } from '@material-ui/core';
// , Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
// import {  } from '@material-ui/core';

class Login extends React.Component<any, any> {
  _isMounted = false;
  validator: SimpleReactValidator;
  state: { 
    InitRegisterUser: { 
      email: string; 
      password: string; 
      error: any; }; 
    modal: boolean; 
    loading: boolean;
  };
  props: any;
  setState: any;
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      InitRegisterUser: {
        email: '',
        password: '',
        error: null
      },
      modal: false,
      loading: false
    };

    this.toggle = this.toggle.bind(this);
    this.submitFormHandler = this.submitFormHandler.bind(this);
    this.userFormHandler = this.userFormHandler.bind(this);
  }
  userFormHandler(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { InitRegisterUser } = this.state;
    this.setState({
      InitRegisterUser: {
        ...InitRegisterUser,
        [name]: value
      }
    });
    // console.log(event.target.value);
  }
 


  submitFormHandler(event) {
    this._isMounted = true;
    event.preventDefault();
    if (this.validator.allValid()) {
      this.setState({ loading: true });

      const { email, password } = this.state.InitRegisterUser;
      this.props.firebase.doSignInWithEmailAndPassword(email, password)
        .then(authUser => {
          console.log(authUser);
          this.setState({
            ...this.state.InitRegisterUser,
            loading: false,
            modal: false
          });
          this.props.history.push({ pathname: '/dashboard' });
        })
        .catch(error => {
          this.setState({
            ...this.state.InitRegisterUser,
            InitRegisterUser: { error: error },
            loading: false,
            modal: true
          });
          console.log(error);
        });

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  forceUpdate() {
    throw new Error('Method not implemented.');
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { InitRegisterUser } = this.state;
    let form =  <form onSubmit={this.submitFormHandler}>
      <span style={{ color: 'red' }}>{InitRegisterUser.error && <p>{InitRegisterUser.error.message}</p>}</span>
      <FormControl>
        <InputLabel for="email">Email</InputLabel>
        <Input name="email" type="text" value={InitRegisterUser.email} onChange={this.userFormHandler} id="email" placeholder="Email" />
        <span style={{ color: 'red' }}>{this.validator.message('email', InitRegisterUser.email, 'required|email|regex')}</span>
      </FormControl>
      <FormControl>
        <InputLabel for="Password">Password</InputLabel>
        <Input type="password" name="password" value={InitRegisterUser.password} onChange={this.userFormHandler} id="Password" placeholder="Password" />
        <span style={{ color: 'red' }}>{this.validator.message('password', InitRegisterUser.password, 'required|min:7')}</span>
      </FormControl>
      <Button color="primary">Sign in</Button>
    </form>;
    if (this.state.loading) {
      form = <p>Loading...</p>;
    }
    return (
      <div>
        <Container>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid container item xs={12} spacing={3}>
              <h4 style={{ color: "#ef5635", marginTop: "20px" }}>Please Login!</h4>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              {form}
              <div>
                <div><span>Don't have an account yet? <Button tag={Link} to='/register' color="primary">Register</Button></span></div>
                <Button color="secondary" tag={Link} to='/'>Cancel</Button> 
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default (withRouter(withFirebase(Login)));