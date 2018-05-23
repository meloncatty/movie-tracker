import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Favorites extends Component {
  displayFavorites() {
    const movieImageRootUrl = 'https://image.tmdb.org/t/p/w500';
    return this.props.favorites[0].map((movie, index) => (
      <article className='favorites-card' key={`key${index}`}>
        <h3>{movie.title}</h3>
        <img src={`${movieImageRootUrl + movie.poster_path}`} alt={movie.title} />
        <p>Vote average: {movie.vote}</p>
      </article>
    ))
  }

  render() {
    return (
      <div>
        {this.displayFavorites()}
      </div>
    )
  }
}


export const mapStateToProps = state => ({
  favorites: state.favorites
});

export default withRouter(connect(mapStateToProps)(Favorites));
