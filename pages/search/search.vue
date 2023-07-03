<template>
	<view>
		<musichead title="搜索" :iconshow="true" iconcolor="black"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" >
			<view class="search">
				<text class="iconfont icon-sousuo fangda"></text>
				<input type="text" placeholder="搜索歌曲"  @input="searchInput(searchWord)" @confirm="handlerResult(searchWord)" v-model="searchWord"/>
				<text class="iconfont icon-cuowu chacha" v-if="inputIn!==1" @tap="handleToClose"></text>
			</view>
		<view class="history" v-if="inputIn===1">
			<view class="history-head">
				<view class="title">
					历史记录
				</view>
				<view class="iconfont icon-lajitong" @tap="clearHistory"></view>
			</view>
			<view class="history-title">
				<view class="history-item" v-for="i in inputHistory" :key="i" @tap="handlerResult(i)">
					{{i}}
				</view>
			</view>
		</view>
		<view class="hot-list" v-if="inputIn===1"> 
			<view class="hot-head">
				热搜榜
			</view>
			<view class="hot-list-item" v-for="(i,index) in hotList" :key="i.id" @tap="handlerResult(i.searchWord)">
				<view class="no" :class="{top_3:index<3}">
					{{index+1}}
				</view>
				<view class="hot-disc">
					<view class="hot-name">
						{{i.searchWord}}
					<image :src="i.iconUrl" mode="aspectFit" class="icon-hot"></image>
					</view>
					<view class="hot-content">
						{{i.content}}
					</view>
				</view>
				<view class="hot-temp">
					{{i.score}}
				</view>
			</view>
		</view>
		<view class="searchRecommend" v-if="inputIn===2">
			<view class="straight">
				搜索"{{ival}}"
			</view>
			<view class="recomlist">
				<view class="recom-item" v-for="i in recArr" :key="i.id" @tap="handlerResult(i.keyword)">
					<text class="iconfont icon-sousuo"></text>
					<view>{{i.keyword}}</view>
				</view>
			</view>
		</view>
		<view class="searchResult" v-if="inputIn===3">
			<view class="result-item" v-for="i in endResult" :key="i.id" @tap="handlerToDetail(i.id)">
			<SongItem :name="i.name" :privType="i.privilege?.flag" :br="i.privilege?.maxbr" :artiName="i.ar?.map((item)=>item.name)" :alName="i.al?.name" @tap="handlerToDetail(i.id)" color="black"/>
			</view>
		
		</view>
		</scroll-view>
		</view>
		</view>
</template>

<script setup>
	import SongItem from "@/components/SongItem/SongItem.vue"
	import {searchHot,searchKey,searchsuggest} from "@/common/api.js"
	import {onLoad} from "@dcloudio/uni-app"
	import {ref} from 'vue'
	const hotList=ref([])
	const inputIn=ref(1)
	let recArr=ref([])
	let ival=ref()
	let endResult=ref([])
	let inputHistory=ref([])
	let searchWord=ref(null)
	onLoad(()=>{
		searchHot().then((res)=>{
			if(res.data.code==200)
			hotList.value=res.data.data
			console.log(hotList);
		})
		uni.getStorage({
			key:'inputHistory',
			success:(res)=>{
				inputHistory.value=res.data
			}
		})
		
	})
	
	const searchInput=(e)=>{
		if(e==''){
			inputIn.value=1
		}
		inputIn.value=2
		ival.value=e
		console.log(ival.value);
		searchsuggest(ival.value).then((res)=>{
			// console.log(res);
			recArr.value=res.data.result.allMatch
			console.log(recArr.value);
		})
	}
	const handlerResult=(e)=>{
		console.log(e);
		e=e.trim()
		if(!e){
			inputIn.value=1
			return
		}
		inputHistory.value.unshift(e)
		inputHistory.value=[...new Set(inputHistory.value)]
		if(inputHistory.value.length>10){
			inputHistory.value.length=10
		}
		uni.setStorage({
			key:'inputHistory',
			data:inputHistory.value
		})
		inputIn.value=3
		searchKey(e).then((res)=>{
			console.log(res);
			endResult.value=res.data.result.songs
			console.log(endResult);
		})
	}
	const handleToClose=()=>{
		searchWord.value=''
		inputIn.value=1
	}
	const handlerToDetail=(songId)=>{
		uni.navigateTo({
			url:`/pages/detail/detail?id=${songId}`
		})
	}
	const clearHistory=()=>{
		uni.removeStorage({
			key:'inputHistory',
			success:(res)=>{
				inputHistory.value=[]
			}
		})
	}
</script>

<style lang="scss" scoped>
	.container{
		margin: 0 30rpx;
	}
	.search{
		display:flex;
		position: relative;
		align-items: center;
		background-color: #f7f7f7;
		width:690rpx;
		line-height: 70rpx;
		border-radius:35rpx ;
		margin: 70rpx auto 30rpx;
		text{
			font-size: 26rpx;
			&.fangda{
			margin-left: 28rpx;
			margin-right: 28rpx;
			}
			&.chacha{
				position: absolute;
				right: 35rpx;
				top:0 ;
			}
			
		}
		input{
			font-size: 27rpx;
			flex: 1;
			margin-right: 35rpx;
		}
	}
	.history{
		margin-bottom: 50rpx;
		.history-head{
			display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		margin-bottom: 36rpx;
		
			}
			.history-title{
				display: flex;
				flex-wrap: wrap;
				.history-item{
					padding: 16rpx 28rpx;
					background-color: #f7f7f7;
					border-radius: 40rpx;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
				}
				}
				
	}
	
.hot-list{
 .hot-head{
	 margin-bottom: 30rpx;
 }
 .hot-list-item{
	 display: flex;
	 align-items: center;
	 font-size: 26rpx;
	 margin-bottom: 58rpx;
	 .no{
		 width:60rpx;
		 color: black;
		 margin-left: 8rpx;
		 text-align: center;
	 }
	 .top_3{
		 color: #fb2222;
	 }
	 .hot-disc{
		 flex:1;
		 .hot-name{
			 font-size: 30rpx;
			 
		 }
		 .icon-hot{
			 width:48rpx;
			height: 22rpx;
		 }
		 .hot-content{
			 font-size: 24rpx;
			 color: #878787;
			
		 }
		
	 }
	  .hot-temp{
			 color: #878787;
		 }
 }
}
.searchRecommend{
	margin-left: 30rpx;
	.straight{
		margin-bottom: 30rpx;
		color:rgb(13, 140, 198);
	}
	.recomlist{
		.recom-item{
			display: flex;
			margin-bottom: 30rpx;
			font-size: 24rpx;
			align-items: center;
			text{
				font-size: 20rpx;
				width: 30rpx;
				margin-right: 20rpx;
				color: grey;
			}
				
			}
		}
	}
.result-item{
	margin:30rpx 0;
	
}
</style>
