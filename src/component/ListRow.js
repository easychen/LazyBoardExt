import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

@withRouter
@inject("store")
@observer
class ListRow extends Component
{
    state = {"show_data":false}
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
        // console.log( JSON.stringify( data ) )
        return <><div className="mb-2 border p-5 rounded text-lg flex flex-row items-center justify-between" >
            <div className="flex items-center text-xl">{data.name} <span className="text-sm items-center flex bg-blue-900 text-white px-2 rounded mx-2 h-fit">{data[data.field+'_check_minutes']}分钟/次</span>
            {parseInt(data.enabled) === 1 ? <Button large={true} className="mr-2" icon="automatic-updates" onClick={()=>this.props.store.toggle_enable(data.id)}>已启用</Button> : <Button large={true} className="mr-2" icon="disable" onClick={()=>this.props.store.toggle_enable(data.id)} >未启用</Button>  }
            
            <Button large={true} className="mr-2" onClick={()=>this.setState({"show_data":!this.state.show_data})} icon="more"></Button>
            
            </div>
            <div className="action flex">
                
                <Button large={true} onClick={()=>this.props.store.remove_row(data.id)} intent="danger">删除</Button>
            </div>
        </div>
            {this.state.show_data && <div className="json code bg-black text-white p-5 rounded">{JSON.stringify(data)}</div>}
            
        </>;
    }
}
export default ListRow ; 
