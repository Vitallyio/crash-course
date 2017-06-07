import * as React from 'react';
import { connect } from 'react-redux';
// Import the interface from a shared 'package' instead
import { IMovie } from 'Interfaces/models/Movie';
import { loadMovies } from '../actions';
import { IReduxStore } from '../reducers';

interface IMoviesPassedProps {}

interface IMoviesConnectedProps {
  movies?: Array<IMovie>;
  fetching: boolean;
}

interface IMoviesDispatchProps {
  loadMovies: () => void;
}

type MoviesProps = IMoviesPassedProps & IMoviesConnectedProps & IMoviesDispatchProps;

class Movies extends React.Component<MoviesProps, undefined> {
  public componentDidMount() {
    const { loadMovies: dispatchLoadMovies } = this.props;
    dispatchLoadMovies();
  }

  public render() {
    const { fetching, movies } = this.props;

    if (fetching || !movies) {
      return <div>Loading...</div>
    };

    return (
      <ul>
        {movies.map(this.renderMovie)}
      </ul>
    );
  }

  private renderMovie = (movie: IMovie) => (
    <li key={movie.id}>
      <strong>{movie.name}</strong> - {movie.director.name}
    </li>
  );
}

// We can gain typesafe access to our Redux store by simply
// importing the 'parent' interface
const mapStateToProps = (
  store: IReduxStore,
  ownProps: IMoviesPassedProps
): IMoviesConnectedProps => {
  const { movies } = store;

  return {
    ...movies
  };
}

export default connect(mapStateToProps, {
  loadMovies
})(Movies);
