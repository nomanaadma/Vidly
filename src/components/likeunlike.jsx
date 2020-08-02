import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'


class Likeunlike extends Component {

    state = { 
        like: 0
    };
    

    getIcon() {
        return this.state.like == 0 ? farHeart : fasHeart; 
    }

    handleLike = () => {
        const like = this.state.like == 0 ? 1 : 0;
        this.setState({ like });
    }
    
    render() { 

        const icon = this.getIcon();

        return ( 
            <FontAwesomeIcon onClick={this.handleLike} icon={icon} className="link-unlink-btn" />
        );
        
    }
}
 
export default Likeunlike;