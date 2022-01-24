import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { FormGroup, InputGroup, TextArea } from "@blueprintjs/core";

@withRouter
@inject("store")
@observer

class TextLineLocal extends Component
{
    state = {"value":false};

    componentDidMount()
    {
        const field = this.props.field;
        if( field )
        {
            const value = window.localStorage.getItem("LBDATA_"+field) || this.props.value || "";
            this.setState({value});
        }
    }

    change( e )
    {
        // .props.store[this.props.field] = e.target.value
        window.localStorage.setItem("LBDATA_"+this.props.field,e.target.value);
        this.setState({"value":e.target.value});
    }
    
    render()
    {
        
        return <FormGroup
        label={this.props.label}>

        { this.props.type == 'textarea' ? 
            <TextArea
            growVertically={true}
            large={true}
            placeholder={this.props.placeholder} 
            onChange={(e)=>this.change(e) } value={this.state.value}
            className="w-full"
        />
        :
        <InputGroup type={this.props.type||"text"} large="true" placeholder={this.props.placeholder||""} onChange={(e)=>this.change(e) } value={this.state.value} />
        }

       
        
        </FormGroup>;
    }
}

export default TextLineLocal ; 
