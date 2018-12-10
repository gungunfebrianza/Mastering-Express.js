import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postAction';

class Post extends Component {
  render() {
    return (
      <div>
        <h1>POST</h1>
      </div>
    );
  }
}

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Post);
