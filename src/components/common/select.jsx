import React from "react";

const Input = ({ name, label, error, listData, ...rest }) => {
    
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select {...rest} name={name} id={name} className="form-control">
                { listData.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
