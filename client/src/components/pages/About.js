import React from 'react';

const About = () => {
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <h4>About This App</h4>
          <p>A simple laundry log app</p>
          <p>
            Version <span>1.0.1</span>
          </p>
          <div className='divider'></div>
          <h5>Updates</h5>
          <ul class='collection'>
            <li class='collection-item'>404 error page added</li>
            <li class='collection-item'>About us page added</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
