<template>
	<view :style="{'background-image':`url(${listDetail?.coverImgUrl})`}">
		<musichead title='歌单' :iconshow="true"></musichead>
		<view class="list-head">
			<view class="head-img">
				<image :src="listDetail?.coverImgUrl" alt=""/>
				<text class="cur iconfont icon-iconbofang">
						{{formateCount(listDetail?.playCount)}}
				</text>
			</view>
			<view class="desc" >
				<text class="title">{{listDetail?.name}}</text>
				<text class="host">
					<image :src="listDetail.creator?.avatarUrl" alt="" />
					{{listDetail.creator?.nickname}}
				</text>
				<text class="ske">{{listDetail?.description}}
				</text>
			</view>
		</view>
		<button class="share">
			<text class="iconfont icon-fenxiang"></text>
			分享给微信好友
		</button>
		<view class="list-item">
			<view class="handleAll">
			   <text class="iconfont icon-iconbofang"></text>
			   <text>播放全部</text>
			   <text>（共{{listDetail?.trackCount}}首）</text>
			</view>
			<view class="list-music">
				<view class="list-music-item" v-for="(i,index) in listDetail?.tracks" :key="i.id" @tap="naviToDetail(i.id)">
					<text>{{index+1}}</text>
					<SongItem :name="i.name" :privType="i.privilege?.flag"  :br="i.sq?.br" :artiName="i.ar.map((item)=>item.name)" :alName="i.al.name" color="black"/>
				</view>
			</view> 
		</view>
	</view>
</template>

<script setup>
	import {useSongIdStore} from "@/store/songid.js"
	import {formateCount} from "@/common/utils.js"
	import {ref} from 'vue'
	import {playList} from "@/common/api.js"
	import { onLoad } from '@dcloudio/uni-app';
	const listDetail=ref({})
	const isLoading=ref(true)
	const songIdStore=useSongIdStore()
	
	onLoad((e)=>{
		uni.showLoading({
			title:'加载中...'
		})
		console.log(e.id);
		playList(e.id).then((res)=>{
			if(res.data.code==200){
			listDetail.value=res.data.playlist
			
			songIdStore.init_ids(res.data.playlist.trackIds)
			isLoading.value=false
			uni.hideLoading()
			}
			
	})
})
		
	const naviToDetail=(ids)=>{
		uni.navigateTo({
			url:`/pages/detail/detail?id=${ids}`
		})
	}
</script>

<style lang="scss" scoped>
$distance:30rpx;
	.list-head{
		
		margin:70rpx 30rpx 30rpx 30rpx;
		display: flex;
		.desc{
			display: flex;
			color: #f2f2f7;
			flex-direction: column;
			text{
					margin-bottom: 30rpx;
			}
			.title{
				color: white;
				font-size: 34rpx;
			}
			.host{
				font-size: 24rpx;
			 image{
					width:54rpx;
					height: 54rpx;
					vertical-align: middle;
					border-radius: 50%;
					margin-right:14rpx ;
				}
			}
			.ske{
				font-size: 22rpx;
				line-height: 34rpx;
			}
			
		}
	.head-img{
	    width:264rpx;
	    height: 264rpx;
	    border-radius: 30rpx;
	    overflow: hidden;
	    position: relative;
	    margin-right:42rpx;
	    flex-shrink: 0;
	    image{
	    	width:100%;
	    	height: 100%;
	    }
	    .cur{
	    	position: absolute;
	    	right:8rpx;
	    	top:8rpx;
	    	color: white;
	    	font-size: 26rpx;
	    }
}
		
	}
.share{
	width:330rpx;
	height: 74rpx;
	border-radius: 37rpx;
	line-height: 74rpx;
	font-size: 28rpx;
	color: white;
	background-color:rgba(0,0,0,.4);
}
.list-item{
	background-color: white;
	border-radius: 50rpx;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	margin-top: 40rpx;
	overflow: hidden;
	.handleAll{
		margin: 30rpx 0 70rpx 22rpx;
		display: flex;
		align-items: center;
		text:nth-child(1){
			font-size: 50rpx;
		}
		text:nth-child(2){
			font-size: 30rpx;
			margin:0 10rpx 0 26rpx ;
		}
		text:nth-child(3){
			color: #b2b2b2;
			font-size: 26rpx;
		}
	}
	.list-music{
		
		.list-music-item{
			display: flex;
			align-items: center;
			margin-left: $distance;
			margin-right: $distance;
			columns: #959595;
			position: relative;
			text{
				&:nth-child(1){
					color: #b2b2b2;
					font-size:30rpx ;
					width:30rpx;
					margin-right: 30rpx;
				}
				
			}
			}
			}
			}
</style>
