import axios from "axios";
axios.defaults.withCredentials = true;
class Source
{
    study_163_args = {
        "fields": [
            {
                "field_id":"study_163_pid",
                "field_name":"讲师ID·后台URL中可见",
                "field_default":"",
            },
            {
                "field_id":"study_163_source_url",
                "field_name":"数据回填URL·在LazyBoard中复制",
                "field_default":"",
            },
            {
                "field_id":"study_163_check_minutes",
                "field_name":"抓取时间间隔·分钟数",
                "field_default":"0",
            },
        ]
    };

    async study_163_fetch( data )
    {
        const ret = await axios.get('https://cp.study.163.com/j/cp/getCapitailAccount.json',{headers: {
            'providerid': data.study_163_pid,
          }});
        if( ret?.data )
        {
            return ret.data.result.totalAmount;
        }
        else
            return "需登录";

    }

    marketstack_args = {
        "fields": [
            {
                "field_id":"marketstack_key",
                "field_name":"API Key·从 marketstack.com 获取",
                "field_default":"",
            },
            {
                "field_id":"marketstack_symbol",
                "field_name":"股票代码",
                "field_default":"",
            },
            {
                "field_id":"marketstack_source_url",
                "field_name":"数据回填URL·在LazyBoard中复制",
                "field_default":"",
            },
            {
                "field_id":"marketstack_check_minutes",
                "field_name":"抓取时间间隔·分钟数",
                "field_default":"0",
            },
        ]
    };

    async marketstack_fetch( data )
    {
        const ret = await axios.get('http://api.marketstack.com/v1/intraday?access_key='+ data.marketstack_key +'&symbols='+data.marketstack_symbol+'&limit=1');
        if( ret?.data )
        {
            return ret.data.data[0].last;
        }
        else
            return "-";

    }

    open_weather_args = {
        "fields": [
            {
                "field_id":"open_weather_key",
                "field_name":"API Key·从 openweathermap.org 获取",
                "field_default":"",
            },
            {
                "field_id":"open_weather_city",
                "field_name":"城市拼音",
                "field_default":"",
            },
            {
                "field_id":"open_weather_source_url",
                "field_name":"数据回填URL·在LazyBoard中复制",
                "field_default":"",
            },
            {
                "field_id":"open_weather_check_minutes",
                "field_name":"抓取时间间隔·分钟数",
                "field_default":"0",
            },
        ]
    };

    async open_weather_fetch( data )
    {
        const ret = await axios.get('http://api.openweathermap.org/data/2.5/weather?q='+ data.open_weather_city +'&appid='+data.open_weather_key+'&lang=zh_cn&units=metric');
        if( ret?.data )
        {
            return ret.data.weather[0].description+'·'+parseInt(ret.data.main.feels_like)+'℃';
        }
        else
            return "-";

    }


    bili_unreply_args = {
        "fields": [
            {
                "field_id":"bili_unreply_source_url",
                "field_name":"数据回填URL·在LazyBoard中复制",
                "field_default":"",
            },
            {
                "field_id":"bili_unreply_check_minutes",
                "field_name":"抓取时间间隔·分钟数",
                "field_default":"0",
            },
        ]
    };

    async bili_unreply_fetch( data )
    {
        const ret = await axios.get('https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web');
        if( ret?.data )
        {
            return ret.data.data.reply;
        }
        else
            return "需登录";

    }

    
    coin_price_args = {
        "fields": [
            {
                "field_id":"coin_price_key",
                "field_name":"API Key·从 min-api.cryptocompare.com 获取",
                "field_default":"",
            },
            {
                "field_id":"coin_price_from",
                "field_name":"显示货币的种类·如BTC",
                "field_default":"",
            },
            {
                "field_id":"coin_price_to",
                "field_name":"显示货币的兑换币种·如USD",
                "field_default":"",
            },
            {
                "field_id":"coin_price_source_url",
                "field_name":"数据回填URL·在LazyBoard中复制",
                "field_default":"",
            },
            {
                "field_id":"coin_price_check_minutes",
                "field_name":"抓取时间间隔·分钟数",
                "field_default":"0",
            }
        ]
    }

    async coin_price_fetch( data )
    {
        const ret = await axios.get('https://min-api.cryptocompare.com/data/price?fsym='+data.coin_price_from+'&tsyms=USD&api_key='+data.coin_price_key);
        if( ret?.data )
            return parseInt(ret.data[data.coin_price_to.toUpperCase()]);
        else
            return "-";

    }
    
    
    weibo_fans_args = {
        "fields": [
            {
                "field_id":"weibo_fans_uid",
                "field_name":"微博UID",
                "field_desp_url":false,
                "field_default":"",
            },
            {
                "field_id":"weibo_fans_source_url",
                "field_name":"数据回填URL·在LazyBoard中复制",
                "field_default":"",
            },
            {
                "field_id":"weibo_fans_check_minutes",
                "field_name":"抓取时间间隔·分钟数",
                "field_default":"0",
            },
            {
                "field_id":"weibo_fans_notes",
                "field_name":"笔记",
                "field_type":"textarea",
                "field_default":"",
            }
        ]
    }

    async weibo_fans_fetch( data )
    {
        const ret = await axios.get('https://m.weibo.cn/profile/info?uid='+data.weibo_fans_uid);
        if( ret?.data?.data )
            return ret.data.data.user.followers_count;
        else
            return "-";

    }

    customer_fetch_args = {
        "fields": [
            {
                "field_id":"customer_fetch_data_url",
                "field_name":"数据来源URL",
                "field_default":"",
            },
            {
                "field_id":"customer_fetch_code",
                "field_name":"执行代码·JavaScript",
                "field_type":"textarea",
                "field_default":"",
            },
            {
                "field_id":"customer_fetch_source_url",
                "field_name":"数据回填URL·在LazyBoard中复制",
                "field_default":"",
            },
            {
                "field_id":"customer_fetch_check_minutes",
                "field_name":"抓取时间间隔·分钟数",
                "field_default":"0",
            }
        ]
    };

    async customer_fetch_fetch( data )
    {
        let ret_key = 'LB_CUSTOM_REST';
        eval("(async () => {" + data.customer_fetch_code + "})()");
        return window.localStorage.getItem(ret_key) || '-';

        // demo code 
        /**
        let result = await fetch( data.customer_fetch_data_url );
        const m1json = await result.json();
        window.localStorage.setItem( 'LB_CUSTOM_REST' , m1json.data.sct?.today_income_amount )
        **/
    }
}

export default new Source();
