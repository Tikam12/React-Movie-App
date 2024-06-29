import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from './card';
import './index.css';
import { type } from '@testing-library/user-event/dist/type';

class Trending extends Component {

    state = {
        PageNo: 1,
        trending: [],
        type: 'day'
    }

    LastPage = () => {

        if (this.state.PageNo > 1) {
            this.setState((prevState) => ({ PageNo: prevState.PageNo - 1, type: this.state.type }), () => {
                this.apiCall(this.state.PageNo, this.state.type);
            });
        } else {
            this.setState({ PageNo: 1 }, () => {
                this.apiCall(1);
            });
        }
    };

    NextPage = () => {
        this.setState((prevState) => ({ PageNo: prevState.PageNo + 1, type: this.state.type }), () => {
            this.apiCall(this.state.PageNo, this.state.type);
        });
    };

    apiCall = (page, type) => {
        axios
            .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=${page}`)
            .then((response) => {
                // console.log(response.data.results[15].backdrop_path);
                this.setState({ trending: response.data.results });
                this.props.backgroundImage(this.state.trending[Math.floor(Math.random() * 20) + 1].backdrop_path)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onClick = (type) => {
        this.setState({ PageNo: this.state.PageNo, type: type });
        this.apiCall(this.state.PageNo, type);
    }

    componentDidMount() {
        let page = this.state.PageNo;
        this.apiCall(page, 'day');
    }
    render() {
        return (
            <div >
                <div className="row">
                    <div className="col-10 col-md-6 col-sm-6">

                        <h3>Trending Movies</h3>
                    </div>
                    {/* <div className='col-2 col-md-6 col-sm-6'>
                        <button onClick={() => this.onClick('day')} className='btn btn-outline-dark ml-2' value='all' >Today</button>
                        <button onClick={() => this.onClick('week')} className='btn btn-outline-dark ml-2' value='movie'>Week</button>
                    </div> */}



                </div>

                <div className='scrollerContainerStyle'>
                    {
                        this.state.trending.map((movie, index) => {
                            return <div key={index} className='col-10 col-md-4 col-lg-2 scrollerItemStyle' style={{ padding: 0 }}>
                                <Card name={movie.title}
                                    vote_average={movie.vote_average}
                                    release_date={movie.release_date}
                                    path={movie.poster_path}
                                    id={movie.id}
                                    genre={'movie'}
                                />
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Trending;
