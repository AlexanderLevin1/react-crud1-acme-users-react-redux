import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Users = ({ users, count })=> {
    return (
      <div>
        <h2>Users { count }</h2>
        <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                <Link to={`/users/${user.id}`}>
                  { user.name }
                </Link>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
}

const mapStateToProps = ({ users })=> {
  return {
    users,
    count: users.length
  };
};

export default connect(mapStateToProps)(Users);