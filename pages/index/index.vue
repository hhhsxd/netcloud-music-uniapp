<template>
	<view>
		<musichead title="网易云音乐" :iconshow="false" iconcolor="black"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="search" @tap="handleTosearch">
					<text class="iconfont icon-sousuo"></text>
					<input type="text" placeholder="搜索歌曲"/>
				</view>
				<view class="list">
					<view class="list-item" v-for="item in listItem" :key="item.id" @tap="naviTo(item.id)">
						
						<view class="list-item-img">
							<image :src="item.coverImgUrl"></image>
						<text class="blogo">{{item.updateFrequency}}</text>
						</view>
						<view class="list-item-text">
							<view v-for="(i,index) in item?.tracks" :key="i.id">{{i.first+`-`+i.second}}</view>
						</view> 
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script setup>

    import { ref} from "vue";
	import { onLoad } from '@dcloudio/uni-app';
	import {topList} from "@/common/api.js"
	const listItem=ref([])
	const isLoading=ref(true)
	const  getTopList=async ()=>{
			const res=await topList()
			if(res.length){
				setTimeout(()=>{
					listItem.value=res
					isLoading.value=false
			       console.log(listItem.value)
				},1000)
			}
	}
	
	onLoad(()=>{
		getTopList()
		
	})
	const naviTo=(id)=>{
	   uni.navigateTo({
	   	url:`/pages/list/list?id=${id}`
	   })
	}
	const handleTosearch=()=>{
		uni.navigateTo({
			url:'/pages/search/search'
		})
	}
	
</script>

<style scoped lang='scss'>
	.container{
		width: 100%;
		margin: 18px 15px;
		.search{
			display:flex;
			align-items: center;
			background-color: #f7f7f7;
			width:690rpx;
			line-height: 70rpx;
			border-radius:35rpx ;
			margin: 70rpx 0 30rpx;
			text{
				font-size: 26rpx;
				margin-left: 28rpx;
				margin-right: 28rpx;
			}
			input{
				font-size: 27rpx;
				flex: 1;
				margin-right: 35rpx;
			}
		}
		.list{
			.list-item{
				display:flex;
				margin-bottom: 34rpx;
				.list-item-img{
				
					position: relative;
					width:212rpx;
					height:212rpx;
					border-radius:15rpx;
					margin-right: 22rpx;
					overflow: hidden;
					image{
						width:100%;
						height: 100%; 
							flex-shrink: 1;
					}
					.blogo{
						position:absolute;
						font-size: 20rpx;
						left: 12rpx;
						bottom:16rpx;
						color:white;
					}
				}
				.list-item-text{
					font-size: 24rpx;
					display: flex;
					flex-direction:column;
					justify-content: space-around;
					color: gery;
					view{
						width:480rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
				
			}
		}
	}
</style>
