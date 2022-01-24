import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TextLineLocal from '../component/TextLineLocal'; 
@withRouter
@inject("store")
@observer
class FormLIne extends Component
{
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    // componentDidMount()
    // {
    //    // 
    // }

    // componentDidUpdate(prevProps)
    // {
    //     if (this.props.data !== prevProps.data) 
    //     {
           
    //     }
    // }
    
    render()
    {
        const data = this.props.data;
        if( !data ) return null;
        
        return <div>
            <TextLineLocal value={data.field_default} label={data.field_name} type={data.field_type || "text"} key={data.field_id} field={data.field_id} />
        </div>;
    }
}
export default FormLIne ; 
