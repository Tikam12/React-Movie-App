import React, { Component } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const withRouter = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const location = useLocation();
        const params = useParams();
        return <WrappedComponent {...props} navigate={navigate} location={location} params={params} />;
    };
};

class Card extends Component {

    onClick=()=>{
        console.log(this.props.genre);
        this.props.navigate('/details/',{state:{id:this.props.id,genre:this.props.genre}});
    }

    render() {
        return (
            <div class="card mt-3" > 
                <img onClick={this.onClick} class="card-img-top image" src={"https://image.tmdb.org/t/p/w500/"+ this.props.path} alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.name}</h5>
                        <p class="card-text ">{this.props.release_date}<b className="float-right" style={{marginLeft: 30}}>{this.props.vote_average.toFixed(1)}/10</b></p>
                    </div>
            </div>
        )
    }
}

export default withRouter(Card);