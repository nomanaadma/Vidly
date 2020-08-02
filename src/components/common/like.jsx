import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';


const Like = props => {

    const icon = props.liked ? fasHeart : farHeart;

    return ( 
        <FontAwesomeIcon onClick={props.onLike} icon={icon} className="link-unlink-btn" />
    );
        
}
 
export default Like;
