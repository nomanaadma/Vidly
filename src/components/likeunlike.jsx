import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'


class Likeunlike extends Component {

    getIcon() {
        return this.props.movie.like === 1 ? fasHeart : farHeart; 
    }
    
    render() { 

        const icon = this.getIcon();

        return ( 
            <FontAwesomeIcon onClick={this.props.onLike} icon={icon} className="link-unlink-btn" />
        );
        
    }
}
 
export default Likeunlike;