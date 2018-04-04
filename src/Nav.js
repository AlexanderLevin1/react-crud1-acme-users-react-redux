import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ userCount, productCount})=> {
  return (
    <ul>
      <li>
        <Link to='/'>Users ({ userCount })</Link>
      </li>
      <li>
        <Link to='/products'>Products ({ productCount })</Link>
      </li>
      <li>
        <Link to='/users/create'>Create A User</Link>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ users, products })=> {
  return {
    userCount: users.length,
    productCount: products.length
  };
};

export default connect(mapStateToProps)(Nav);