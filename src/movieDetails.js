import axios from 'axios';
import React, { Component } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Card from './card';
import './index.css';
import YouTube from 'react-youtube';

// use this function to pass id without changing class component to function or using hooks
const withRouter = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} location={location} params={params} />;
    };
};

// change Component to React.Component
class MovieDetails extends React.Component {

    state = {
        detail: {},
        recommend: [],
        videos: [],
    }

    apiCall(id, genre) {
        // fetch details
        axios
            .get(`https://api.themoviedb.org/3/${genre}/${id}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US`)
            .then((response) => {
                this.setState({ detail: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        // fetch recommendations
        axios
            .get(`https://api.themoviedb.org/3/${genre}/${id}/recommendations?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US`)
            .then((response) => {
                this.setState({ recommend: response.data.results });
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            })
            .catch((error) => {
                console.log(error);
            });

        // fetch related videos
        axios
            .get(`https://api.themoviedb.org/3/${genre}/${id}/videos?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US`)
            .then((response) => {
                this.setState({ videos: response.data.results });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.state.id !== this.props.location.state.id) {
            this.apiCall(this.props.location.state.id, this.props.location.state.genre);
        }
    }

    componentDidMount() {
        const { genre, id } = this.props.location.state;
        this.apiCall(id, genre);
    }

    getTrailer = () => {
        let flag = 0;
        return this.state.videos.map((video, index) => {
            if (flag === 0 && video.type === 'Trailer') {
                flag += 1;
                return (
                    <div key={index} className="video-responsive">
                        <YouTube videoId={video.key} />
                    </div>
                );
            }
            return null;
        });
    }

    render() {
        console.log(this.state)
        let releaseYear = new Date(this.state.detail.release_date).getFullYear();
        let serialReleaseYear = new Date(this.state.detail.last_air_date).getFullYear();

        if (Number.isNaN(releaseYear)) {
            releaseYear = serialReleaseYear;
        }

        let rating = this.state.detail.vote_average;
        let rate = Math.round(rating * 10) / 10;

        let image = `https://image.tmdb.org/t/p/w500/${this.state.detail.backdrop_path}`;

        return (
            <div>
                <div className="jumbotron jumbotron-fluid" style={{ height: '100vh', position: 'relative', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="container" style={{ marginTop: -50, marginLeft: 10 }}>
                        <div className="row mt-5">
                            <div className="overlay"></div>
                            <div className="col-md-7 col-sm-12 overlay-content mt-5">
                                <h1 className="display-4"><b>{this.state.detail.title} {this.state.detail.original_name} ({releaseYear})</b></h1>
                                <p>
                                    {this.state.detail.release_date} {this.state.detail.first_air_date}
                                    ({this.state.detail.origin_country})
                                    • {this.state.detail.genres && this.state.detail.genres.map((element) => (
                                        <span style={{ marginLeft: 5 }} key={element.id}>{element.name},</span>
                                    ))}
                                    • {this.state.detail.runtime} mins
                                </p>
                                <h3><b>{rate}/10</b></h3>
                                <p><b>{this.state.detail.tagline}</b></p>
                                <h3>Overview</h3>
                                <p className="lead">{this.state.detail.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <h2><b>Facts :</b></h2>
                            <div className='row'>
                                <div className='col-6 mt-2'>
                                    <h4>Status</h4>
                                    <p>{this.state.detail.status}</p>
                                </div>
                                <div className='col-7 mt-2'>
                                    <h4>Original language</h4>
                                    {this.state.detail.spoken_languages && this.state.detail.spoken_languages.map((item, index) => (
                                        <span className='mr-2' key={index}>{item.english_name},</span>
                                    ))}
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-4'>
                                    <h4>Budget</h4>
                                    <p>${this.state.detail.budget}</p>
                                </div>
                                <div className='col-6'>
                                    <h4>Revenue</h4>
                                    <p>${this.state.detail.revenue}</p>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-12'>
                                    <a href={this.state.detail.homepage} className="btn btn-lg" style={{ backgroundColor: 'rgb(3,37,65)', color: '#7ECAA9' }}>
                                        <b>Watch full movie here!</b>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-sm-12 mt-3">
                            {this.getTrailer()}
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row my-5'>
                        <h2><b>Production Companies :</b></h2>
                        <div className='col-12'>
                            <div className='row mt-2'>
                                {this.state.detail.production_companies && this.state.detail.production_companies.map((element, index) => (
                                    <div className='col-6 col-md-4 col-lg-3 mt-4' key={index}>
                                        <img style={{ height: 80, width: 150 }} src={`https://image.tmdb.org/t/p/w500/${element.logo_path}`} alt={element.name} />
                                        <p>{element.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                        <h2><b>Videos</b></h2>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-12'>
                            <div className='scrollerContainerStyle'>
                                {this.state.videos.map((video, index) => (
                                    <div className='scrollerItemStyle' style={{ padding: 0 }} key={index}>
                                        <div>
                                            <YouTube videoId={video.key} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container mt-5">
                    <div className="row">
                        <div className="col-12">
                            <h2><b>Similar to {this.state.detail.title}</b></h2>
                        </div>
                        <div className="scrollerContainerStyle">
                            {this.state.recommend.map((movie, index) => {
                                let name = movie.title || movie.original_name;
                                return (
                                    <div key={index} className="col-10 col-md-4 col-lg-2 scrollerItemStyle" style={{ padding: 0 }}>
                                        <Card
                                            name={name}
                                            vote_average={movie.vote_average}
                                            release_date={movie.release_date}
                                            path={movie.poster_path}
                                            id={movie.id}
                                            genre={this.props.location.state.genre}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// pass MovieDetails into withRouter function 
export default withRouter(MovieDetails);
