import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classnames from 'classnames';
import { connect } from 'react-redux'; 
import { registerUser } from '../../actions/authActions';



class Register extends Component {

  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange= this.onChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const newUser= {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    // axios.post('/api/users/register', newUser)
    //   .then(res =>console.log(res.data))
    //   .catch(err => this.setState({errors: err.response.data}));
    this.props.registerUser(newUser);
  }
  render() {

    const {errors} = this.state;

    const { user }= this.props.auth;
    
    return (
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto"></div>
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className='lead text-center'>Create your DevConncter account</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="text" className={classnames('form-control form-control-lg',{
                  'is-invalid': errors.name
                })} placeholder='Name' name='name' value={this.state.name} onChange={this.onChange} />
                {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
              </div>
              <div className="form-group">
                <input type="email" className={classnames('form-control form-control-lg',{
                  'is-invalid': errors.email
                })} placeholder='Email Adress' name='email' value={this.state.email} onChange={this.onChange}/>
                {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                <small className='form-text text-muted'> This site uses gravatar so if you want a profile image, use a Gravatar email</small>

              </div>
              <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{
                  'is-invalid': errors.password
                })} placeholder='Password' name='password' value={this.state.password} onChange={this.onChange}/>
                {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
              </div>
              <div className="form-group">
                <input type="password" className={classnames('form-control form-control-lg',{
                  'is-invalid': errors.password2
                })} placeholder='Confirm Password' name='password2' value={this.state.password2} onChange={this.onChange}/>
                {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
              </div>
              <input type="submit" className='btn btn-info btn-block mt-4' value='Submit'/>

            </form>
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  auth: state.auth
})
export default connect (mapStateToProps, {registerUser} )(Register);