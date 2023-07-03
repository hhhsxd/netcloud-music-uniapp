<template>
	<view>
		<view class="dis">
			<view class="left">
				 <text class="music-name" :style="{color:songItem.color}">{{songItem.name}}</text>
		 	    <view class="from">
<image src="@/static/sq.png" mode="" v-if="songItem.br>=999000"></image>
<image src="@/static/dujia.png" mode="" v-if="songItem.privType&64===1"></image>
		 	         <text>{{songItem.artiName?.join('/')}} - {{songItem.alName}}</text>
		 	    </view>
			</view>
				<text class="iconfont icon-iconbofang"></text>
		 	</view>
</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app"
	let songItem=defineProps({
				name:String,
				privType:Number,
				artiName:Array,
				alName:String,
				br:Number,
				color:{
					type:String,
					default:'#c6c2bf'
				}
	})
	onLoad(()=>{
		// console.log(songItem);
	})
</script>

<style lang="scss" scoped>
	
		.dis{
			display: flex;
			align-items: center;
			color:#c6c2bf;
			font-size: 28rpx;
			margin-bottom: 12rpx;
			position:relative;
			margin: 20rpx auto;
			width: 588rpx;
			.left{
				overflow:hidden;
				width: 488rpx;
			text{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 400rpx;
				}	
			.from{
				font-size: 22rpx;
				display: flex;
				align-items: center;
				image{
					// flex-shrink: 1;
					width: 26rpx;
					height: 20rpx;
					margin-right: 10rpx;
				}
				
				}
			}
			.icon-iconbofang{
				font-size: 50rpx;
				color: #c6c2bf;
				position: absolute;
				// right:30rpx;
				right: 0;
				
			}
	
		}
			
</style>