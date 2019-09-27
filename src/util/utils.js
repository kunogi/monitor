class FNs{
	constructor(){}

	static load(url_,cb_,errCb_,charset_){
		let isLoaded=false,
			n=document.createElement('script'),
			s=document.getElementsByTagName('script')[0],
			head=document.head || document.getElementsByTagName('head')[0] || document.documentElement,
			baseElement=head.getElementsByTagName('base')[0];

		//n.type='text/javascript';
		n.charset=charset_||'gb2312';//set charset before src to void a messy chinese in ie
		n.src=url_;
		n.async=true;
		n.onload = n.onreadystatechange =function(){
			//noinspection JSCheckFunctionSignatures
			if(!isLoaded && (!n.readyState || /loaded|complete/.test(n.readyState) ) ){
				isLoaded=true;
				n.onload = n.onreadystatechange = n.onerror =null;
				n.parentNode.removeChild(n);
				n=null;
				(typeof cb_==='function')&&cb_();
			}
		};
		n.onerror=function(){
			n.onload = n.onreadystatechange = n.onerror =null;
			n.parentNode.removeChild(n);
			n=null;
			(typeof errCb_==='function')&&errCb_();
		};
		//load:
		//s.parentNode.insertBefore(n,s);
		s.parentNode?
			s.parentNode.insertBefore(n,s):
			baseElement?
				head.insertBefore(n, baseElement):
				head.appendChild(n);
		//baseElement?head.insertBefore(n, baseElement) : head.appendChild(n);
	}

	static getMarketViaSymbol(symbol_){
		if(symbol_.indexOf('fx_s')==0){
			return 'fx';
		}else if(symbol_.indexOf('gb_')==0){
			return 'us';
		}else if(symbol_.indexOf('rt_')==0){
			return 'hk';
		}else if(symbol_.indexOf('hf_')==0){
			return 'hf';
		}else if(symbol_.indexOf('nf_')==0){
			return 'nf';
		}else if(symbol_.indexOf('sb')==0){
			return 'sb';
		}else if(symbol_.indexOf('sh')==0){
			return 'sh';
		}else if(symbol_.indexOf('sz')==0){
			return 'sz';
		}
	}

	static timestampToDate(t_,m_){
		m_=m_||1;
		t_=t_*m_;
		return new Date(t_);
	}

	/**
	 * Date to only time part string
	 */
	static dst(d_,withSeconds_,isUTC_){
		let hour=[d_['get'+(isUTC_?'UTC':'')+'Hours']()];
		let min=[d_['get'+(isUTC_?'UTC':'')+'Minutes']()];
		let timeStr=[hour<10?('0'+hour):hour,min<10?('0'+min):min];
		if(withSeconds_){
			let sec=[d_['get'+(isUTC_?'UTC':'')+'Seconds']()];
			timeStr.push(sec<10?('0'+sec):sec);
		}
		return timeStr.join(':');
	}

	static getUrlParam(){
		let params={},urlStr;
		try{
			urlStr=location.search.substring(1);//get rid of ?
		}catch(err){}
		if(urlStr){
			let paramArr=urlStr.split('&');
			for(let key,value,l=paramArr.length,pos,i=0;i<l;i++){
				pos=paramArr[i].indexOf('=');
				if(pos!=-1){
					key=paramArr[i].substring(0,pos);
					value=paramArr[i].substring(pos+1);
					params[key]=value;
				}
			}
		}
		return params;
	}
}

export let utils={
	fn:FNs
};