import React, { Component } from 'react';
import { observer , inject } from 'mobx-react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import SoloView from '../component/SoloView'; 
import DropLine from '../component/DropLine';
import { Button, Intent, Spinner } from '@blueprintjs/core';
import FormBox from '../component/FormBox'; 
import ListRow from '../component/ListRow'; 

@withRouter
@inject("store")
@observer

class Sample extends Component
{
    // constructor(props) 
    // {
    //     super(props);
    // }
    
    componentDidMount()
    {
       // this.props.store.test(); 
    }

    // show()
    // {
    //     console.log( this.props.store.form_data );
    // }

    render()
    {
        const main = <div>
            <div className="text-2xl py-5">LazyBoard插件·数据源设置 <Button className="ml-2" onClick={()=>this.props.store.do_fetch(true)}>测试</Button><Button className="ml-2" onClick={()=>this.props.store.clean_log()}>清除日志</Button></div>
            {this.props.store.logtext && <div className="log code bg-black text-white p-5 rounded mb-2 whitespace-pre-line">{this.props.store.logtext}</div>}
            
            <div className="box-list">
                { this.props.store.fetch_data_items && this.props.store.fetch_data_items.map( item => <ListRow key={item.id} data={item} /> ) }
            </div>
            <div className="box-add  border p-5 rounded">
            <div className="text-xl pb-5">添加数据源</div>
                <DropLine field="selected_type" options={this.props.store.source_types}  />

                { this.props.store.form_data && <FormBox data={this.props.store.form_data} /> }

                
            </div>

        </div>;
        return <SoloView title={this.props.store.appname} main={main} />;
    }
}
export default Sample ; 
