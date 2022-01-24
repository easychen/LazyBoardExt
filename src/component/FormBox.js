import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import FormLine from '../component/FormLine'; 
import { Button } from '@blueprintjs/core';

@withRouter
@inject("store")
@observer
class FormBox extends Component
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
    save()
    {
        this.props.store.save_data();
    }
    
    render()
    {
        const data = this.props.data?.fields;
        if( !data ) return null;
        console.log( data );

        return <div className="py-5">
            {data && data.map( item => <FormLine data={item} key={item.field_id} /> )}
            <div className="action-line">
                <Button large={true} onClick={()=>this.save()}>添加</Button>
            </div>
        </div>;
    }
}
export default FormBox ; 
