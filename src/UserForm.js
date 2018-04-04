import React, { Component } from 'react';
import { deleteUser, saveUser } from './store';
import { connect } from 'react-redux';

class UserUpdate extends Component{
  constructor({ user }){
    super();
    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDestroy = this.onDestroy.bind(this);

    this.state = {
      name: user ? user.name : '' 
    };
  }
  onDestroy(ev){
    ev.preventDefault();
    this.props.deleteUser(this.props.user);
  }
  componentWillReceiveProps(nextProps){
    const { user } = nextProps;
    this.setState({ name: user ? user.name: '' });
  }
  onSave(ev){
    ev.preventDefault();
    const { saveUser, user } = this.props;
    const { name } = this.state;
    saveUser({ id: user ? user.id : null, name });
  }
  onChangeName(ev){
    this.setState({ name: ev.target.value });
  }
  render(){
    const { onChangeName, onSave, onDestroy } = this;
    const { name } = this.state;
    const { id } = this.props;
    return (
      <div>
      <form onSubmit={ onSave }>
        <input value={ name } onChange={ onChangeName }/>
        <button>{ id ? ('Update') : ('Create') }</button>
      </form>
      {
        id && (
          <button onClick={ onDestroy }>Delete</button>
        )
      }
      </div>
    );
  }
}

const mapStateToProps = ({ users }, { id })=> {
  const user = users.find( user => user.id === id);
  return {
    user
  };
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    saveUser: (user)=> dispatch(saveUser(user, history)),
    deleteUser: (user)=> dispatch(deleteUser(user.id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);