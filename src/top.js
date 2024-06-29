import React, { Component } from 'react';
import axios from 'axios';
import Card from './card';
import './index.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const withRouter = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} location={location} params={params} />;
    };
};

class Top extends Component {

    state = {
        movies: [],
        PageNo: 0
    };

    apiCall = (page) => {
        
        if(page !== this.state.PageNo){
            axios
            .get(`https://api.themoviedb.org/3/movie/${this.props.name}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=${page}`)
            .then((response) => {
                this.setState({ movies: response.data.results,PageNo:page});
                window.scrollTo({top:0, left:0, behavior: "smooth"});
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
    };

    render() {
        this.apiCall(this.props.page_no);

        return (
            <div>
                <div className="row">
                </div>
                    {
                        this.state.movies.map((movie, index) => (
                            <div key={index} className="col-10 col-md-4 col-lg-2 scrollerItemStyle" style={{ padding: 0 }}>
                                <Card name={movie.title}
                                    vote_average={movie.vote_average}
                                    release_date={movie.release_date}
                                    path={movie.poster_path}
                                    id={movie.id} 
                                    genre = {'movie'}
                                />
                                    
                            </div>
                        ))
                    }
            </div>
        )
    }
}

export default withRouter(Top);
