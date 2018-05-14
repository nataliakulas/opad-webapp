import React from 'react';

export default (props) =>
  <div className="box">
    <img src={props.src} alt={props.name}/>
    <div className="content">
      <p>{props.name}</p>
    </div>
  </div>;