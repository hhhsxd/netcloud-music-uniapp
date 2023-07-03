export const formateTime =(time)=>{
	let formater=new Date(time)
	return formater.getFullYear()+"年"+(formater.getMonth()+1)+'月'+formater.getDay()+'日'
	
}
export const formateCount=(count)=>{
	if(count>10000&&count<100000000){
		return (count/=1000).toFixed(1)+'万'
	}
	if(count>100000000){
		return (count/=100000000).toFixed(1)+'亿'
	}
	return count
}