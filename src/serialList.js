import React, { Component } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from './card';

const withRouter = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} location={location} params={params} />;
    };
};

class SerialList extends Component {

    state = {
        serial: [],
        PageNo: 1
    }

    componentDidMount = () => {
        this.setState({PageNo:this.state.PageNo});
        this.apiCall(1,this.props.params.term);
    }

    componentDidUpdate(prevProps) {

        console.log("cdu " + prevProps.params.term);
        console.log("cdu " + this.props.params.term);
        if (prevProps.params.term !== this.props.params.term) {
            this.setState({PageNo:1});
            this.apiCall(1,this.props.params.term);
            console.log("changed");
        }
    }

    apiCall = (page,name) => {
        axios
            .get(`https://api.themoviedb.org/3/tv/${name}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US&page=${page}`)
            .then((response) => {
                this.setState({ serial: response.data.results,PageNo:this.state.PageNo});
                window.scrollTo({top:0, left:0, behavior: "smooth"});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    LastPage = () => {
        if (this.state.PageNo > 1) {
            this.setState((prevState) => ({ PageNo: prevState.PageNo - 1}), () => {
                this.apiCall(this.state.PageNo,this.props.params.term);
            });
        } else {
            this.setState({ PageNo: 1 }, () => {
                this.apiCall(1,this.props.params.term);
            });
        }
    };

    NextPage = () => {
        this.setState((prevState) => ({ PageNo: prevState.PageNo + 1}), () => {
            this.apiCall(this.state.PageNo,this.props.params.term);
        });
    };


    render() {
        console.log('render');
        return (

            <div className='container'>
                <div className='row mt-5'>
                    <h3><b>{this.props.params.term}</b></h3>
                </div>
                <div className='row'>
                    {
                        this.state.serial.map((item, index) => {
                            return <div className='col-6 col-md-4 col-lg-3'>
                                <Card
                                    id={item.id}
                                    genre={'tv'}
                                    path={item.poster_path}
                                    name={item.original_name}
                                    release_date={item.first_air_date}
                                    vote_average={item.vote_average}
                                />
                            </div>
                        })
                    }
                </div>

                <div className='row mt-5 text-center'>
                    <div className='col-4 col-md-3 col-sm-2 d-flex align-items-center justify-content-center'>
                        <h3 className='text-md-right text-center'>{this.state.PageNo - 1} 🡰</h3>
                    </div>
                    <div className="col-4 col-md-6 col-sm-8 d-flex align-items-center justify-content-center my-2 my-md-0">
                        <button className="btn mx-3" style={{ backgroundColor: 'rgb(3,37,65)', color: '#7ECAA9' }} type="button" onClick={this.LastPage}>Prev</button>
                        <button className="btn mx-3" style={{ backgroundColor: 'rgb(3,37,65)', color: '#7ECAA9' }} type="button" onClick={this.NextPage}>Next</button>
                    </div>
                    <div className='col-4 col-md-3 col-sm-2 d-flex align-items-center justify-content-center'>
                        <h3 className='text-md-left text-center'>🡲 {this.state.PageNo + 1}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SerialList);
