import React, { Component } from 'react'
import Title from '../Title';


const Forbidden = () => {
    return (
        <React.Fragment>
            <div className='mt-5'><Title name="403" title="Forbidden" /></div>
            <div className='d-flex justify-content-center align-items-center'>
                <img src='https://static.vecteezy.com/system/resources/previews/019/862/578/original/http-four-hundred-three-forbidden-status-code-3d-rendering-on-transparent-background-ui-ux-icon-design-web-and-app-trend-png.png' width={600} height={600} />
            </div>
            <Title title="You are not authorized to access this resources!!"><h3 className="text-1 mt-3"> You are not authorized to access this resources!! </h3></Title>
        </React.Fragment>
    );
}
export default Forbidden;

