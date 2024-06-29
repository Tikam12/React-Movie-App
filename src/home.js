import React, { Component } from 'react';
import './index.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Trending from './trending';
import Top from './top';

const withRouter = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} location={location} params={params} />;
    };
};

class Home extends Component {

    state = {
        image: ""
    }

    backgroundimage = (path) => {
        this.setState({ image: "https://image.tmdb.org/t/p/w500/" + path });
    }

    SearchMovie = () => {
        let MovieName = document.querySelector('#search').value;
        this.props.navigate(`/search/${MovieName}`);
    };
    // url(${image})
    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid" style={{ position: 'relative', backgroundImage: `url(${this.state.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="container text-center text-md-left">
                        <div className='z1'></div>
                        <div className='row z2'>
                            <div className='col-12'>
                                <h1 className="display-4">Welcome to MovieApp</h1>
                                <p className="lead">A one-stop place where you can have every info about all of your favorite movies.</p>
                            </div>
                        </div>
                        <div className='row z2 mt-3 justify-content-center'>
                            <div className='col-12 col-md-8 col-lg-6'>
                                <input id="search" type="text" className="form-control form-control-lg" placeholder="Search any movie" />
                            </div>
                            <div className='col-6 col-md-4 col-lg-2 mt-3 mt-md-0'>
                                <button onClick={this.SearchMovie} className="btn btn-dark btn-lg btn-block" style={{ backgroundColor: 'rgb(3,37,65)', color: '#7ECAA9' }}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="container mt-5">
                    <Trending backgroundImage={this.backgroundimage} />
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <h3>Top Movies</h3>
                    </div>
                    <div className='scrollerContainerStyle'>
                        <Top name="top_rated" heading="Top Rated" page_no="1" />
                    </div>
                </div>


                <div className="container mt-5">
                    <div className="row">
                        <h3>What's Popular</h3>
                    </div>
                    <div className='scrollerContainerStyle'>
                        <Top name="popular" heading="What's Popular" page_no="8" />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
