import React, { Component } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './index.css';
import Top from './top';

const withRouter = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} location={location} params={params} />;
    };
};
class Footer extends Component {

    movie_list=(name)=>{
        this.props.navigate(`/movieList/${name}`);
    }

    series_list=(name)=>{
        this.props.navigate(`/serialList/${name}`)
    }

    render() {
        return (
            <div style={{backgroundColor:'rgb(3,37,65)',color:"white"}}>
                <div class="container " >
                    <footer class="row row-cols-5 py-5 my-5 border-top ">

                        <div class="col-12 col-md-12 col-lg-3 mt-4">
                            <a  classname="d-flex align-items-center mb-3 link-dark text-decoration-none" style={{color:'#7ECAA9'}}>
                                <h1>MovieApp</h1> 
                            </a>
                            <button className="btn btn-lg btn-light" style={{color:'#01B4E4'}}>
                                <b>Hi User !</b>
                            </button>
                        </div>

                        <div class="col-12 col-md-4 col-lg-2 mt-3">
                            <h5>MOVIE LISTS</h5>
                            <ul class="nav flex-column"> 
                                <li onClick={()=>this.movie_list('now_playing')} class="nav-item mb-2">Now Playing</li>
                                <li onClick={()=>this.movie_list('popular')} class="nav-item mb-2">Popular</li>
                                <li onClick={()=>this.movie_list('top_rated')} class="nav-item mb-2">Top Rated</li>
                                <li onClick={()=>this.movie_list('upcoming')} class="nav-item mb-2">Upcoming</li>
                            </ul>
                        </div>

                        <div class="col-12 col-md-4 col-lg-2 mt-3">
                            <h5>SERIES LISTS</h5>
                            <ul class="nav flex-column"> 
                                <li onClick={()=>this.series_list('airing_today')} class="nav-item mb-2">Airing Today</li>
                                <li onClick={()=>this.series_list('popular')} class="nav-item mb-2">Popular</li>
                                <li onClick={()=>this.series_list('on_the_air')} class="nav-item mb-2">On the Air</li>
                                <li onClick={()=>this.series_list('top_rated')} class="nav-item mb-2">Top Rated</li>
                            </ul>
                        </div>

                        <div class="col-12 col-md-4 col-lg-2 mt-3">
                            <h5>Section</h5>
                            <ul class="nav flex-column">
                                <li class="nav-item mb-2">Home</li>
                                <li class="nav-item mb-2">Movie Details</li>
                                <li class="nav-item mb-2">Search Movie<a href="#" class="nav-link p-0 text-muted"></a></li>
                                <li class="nav-item mb-2">Recommendation</li>
                            </ul>
                        </div>
                    </footer>
                    <section style={{backgroundColor:'rgb(3,37,65)',color:'black',textAlign:'center'}}>Build by Tc Choudhary</section>
                </div>
            </div>
        )
    }
}
export default withRouter(Footer);

