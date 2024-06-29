import axios from 'axios';
import React from 'react';
import Card from './card';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export function withRouter(Children) {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    return <Children {...props} navigate={navigate} location={location} params={params} />
  }
}

class Search extends React.Component {

  state = {
    recommendMovies: []
  };

  componentDidMount() {
    let MovieName = this.props.params.term;
    console.log(MovieName);

    axios
      .get('https://api.themoviedb.org/3/search/movie?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=1&include_adult=false&query=' + MovieName)
      .then((response) => {
        console.log(response.data.results);
        this.setState({ recommendMovies: response.data.results });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onClick = (id) => {
    console.log(id);
    this.props.navigate('/details/',{state:{id:id,genre:'movie'}});
  }

  render() {
    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-12'>
            <h3>Search for {this.props.params.term} :</h3>
          </div>
        </div>

        <div className="card">
          <div className='card-body'>
            {
              this.state.recommendMovies.map((movie, index) => (
                <div className='card'>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-lg-2 col-md-6 col-12'>
                        <img onClick={() => this.onClick(movie.id)} class="card-img-top image"
                          src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                          alt="Card image cap"
                        />
                      </div>
                      <div className='col-lg-10 col-md-6 col-12 mt-2'>
                        <h3><b>{index + 1}. {movie.original_title}</b></h3>
                        <p> {movie.release_date}</p>
                        <p>⭐ {movie.vote_average} ({movie.vote_count})</p>
                        <p>Original language: ({movie.original_language})</p>
                        <p>Popularity : {movie.popularity}</p>
                        <p>{movie.overview}</p>
                      </div>
                    </div>

                    {/* <div className="col-6 col-md-4 col-lg-3" key={index}>
                      <Card
                        name={movie.title}
                        vote_average={movie.vote_average}
                        release_date={movie.release_date}
                        path={movie.poster_path}
                        id={movie.id}
                        genre={'movie'}
                      />
                    </div> */}

                  </div>
                </div>

              ))
            }
          </div>

        </div>


        {/* <div className="row">
          {
            this.state.recommendMovies.map((movie, index) => (
              <div className="col-6 col-md-4 col-lg-3" key={index}>
                <Card
                  name={movie.title}
                  vote_average={movie.vote_average}
                  release_date={movie.release_date}
                  path={movie.poster_path}
                  id={movie.id}
                  genre={'movie'}
                />
              </div>
            ))
          }
        </div> */}
      </div>
    )
  }
}

export default withRouter(Search);