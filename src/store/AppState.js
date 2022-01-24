 /*global chrome*/
import { observable,action,computed } from "mobx";
import source from "../lib/Source";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

class AppState
{
    @observable appname = "LazyBoardExt";
    source_types = [
        {"label":"微博粉丝数","value":"weibo_fans"},
        {"label":"B站未读回复","value":"bili_unreply"},
        {"label":"加密货币实时价格","value":"coin_price"},
        {"label":"城市天气","value":"open_weather"},
        {"label":"美股查询","value":"marketstack"},
        {"label":"网易云课堂讲师账户总金额","value":"study_163"},
        {"label":"自定义操作","value":"customer_fetch"},
    ];

    @observable selected_type=false;
    @observable logtext = "";

    set_log( info )
    {
        this.logtext += info + "\r\n"  ;
    }

    clean_log()
    {
        this.logtext = "";
    }

    @computed
    get form_data()
    {
        const key_name = this.selected_type+'_args'; 
        console.log( "key_name",key_name );
        if( !this.selected_type || !source[key_name] )
        {
            return false;
        }
        return source[key_name];
    }

    @observable fetch_data_items = [];
    constructor()
    {
        let the_data = kv_get( 'LB_ALL_DATA' );
        if( !the_data ) the_data = [];
        this.fetch_data_items = the_data;

        if( chrome && chrome.alarms )
        {
            chrome.alarms.onAlarm.addListener((a)=>
            {
                if( a.name == 'check_fetch' )
                    this.do_fetch();	
            });
        }
        
    }

    async save_data()
    {
        // 读取总数组
        
        if( !this.selected_type )
        {
            alert("请先选择数据源类型");
            return false;
        }

        let the_row = {"id":uuidv4(),"enabled":"0","field":this.selected_type,"name":this.source_types.filter( item => item.value == this.selected_type )[0].label};
        for( const f of this.form_data.fields )
        {
            the_row[f.field_id] = kv_get( "LBDATA_"+f.field_id , false );
        }

        if( !the_row[this.selected_type+'_check_minutes'] || parseInt(the_row[this.selected_type+'_check_minutes']) < 1 ){
            alert("抓取间隔时间不能为空和0");
            return false;
        }
        
        this.fetch_data_items.push( the_row );
        // console.log( the_data );
        this.save_data_items();
    }

    remove_row( id )
    {
        if( !window.confirm("确定要删除这个数据来源吗？") ) return false;
        let new_data_items = this.fetch_data_items.filter( item => item.id != id );
        this.fetch_data_items = new_data_items;
        this.save_data_items();
    }

    toggle_enable( id )
    {
        let new_data_items = this.fetch_data_items.map( item => item.id == id ? {...item,enabled:(parseInt(item.enabled)+1)%2+""} : item );
        this.fetch_data_items = new_data_items;
        this.save_data_items();

    }

    save_data_items()
    {
        kv_set( 'LB_ALL_DATA' , this.fetch_data_items );
    }
    
    async do_fetch( debug = false)
    {
        for( const item of this.fetch_data_items )
        {
            if( parseInt(item.enabled) === 1 )
            {
                if(  parseInt( item[item.field+'_check_minutes'] ) == 0 ) item[item.field+'_check_minutes'] = 1;
                
                console.log( JSON.stringify( item ) )
                let do_now = true;
                if( !debug )
                {
                    if( new Date().getMinutes() % parseInt( item[item.field+'_check_minutes'] ) != 0  )
                    {
                        do_now  = false; 
                    }
                }

                if( do_now )
                {
                    const value = await source[item.field+'_fetch']( item );
                    const set_url = item[item.field+'_source_url'].replace(/value=.+/ig,'value='+encodeURIComponent(value));
                    const set_ret = await axios.get( set_url );
                    if( debug )
                    {
                        this.set_log( item.field + "→" + value );
                        this.set_log( "set →" + JSON.stringify( set_ret.data ) );
                    }
                        

                }
            }
            
        }
    }

}

export default new AppState();

function kv_get( key, json = true )
{
    const value = window.localStorage.getItem(key);
    if( !value ) 
        return false;
    else
    {
        if( json ) return JSON.parse(value);
        else return value;
    }
        
}

function kv_set( key, value, json = true )
{
    if( json ) value = JSON.stringify(value);
    return window.localStorage.setItem( key,value );
}

function find_label_by_value( array, value )
{
    return array.filter( item => item.value == value )
}