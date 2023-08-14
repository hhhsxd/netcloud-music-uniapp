<template>
	<view class="bornhead" :style="{height:`${statusbarheight}px`}"></view>
	<view class="musichead" :class="{isWhite:white}" :style="{height:`${barheight}px`}">
		<view class="head-icon" v-if="iconshow" >
			 <text class="iconfont icon-fanhuijiantou" @tap="backTo"></text> | <text class="iconfont icon-shouye" @tap="toHome"></text>
		</view>
		<view class="headtitle">
			{{title}}
		</view>
		
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {onLoad} from "@dcloudio/uni-app"
	defineProps({
		title:{
			type:String,
		},
		iconshow:{
			type:Boolean,
			default:true
		},
		white:{
			type:Boolean,
			default:false
		}
	})
	const backTo=()=>{
		uni.navigateBack()
	}
	const toHome=()=>{
		uni.navigateTo({
			url:"/pages/index/index"
		})
	}
	const ids=ref()
	const statusbarheight=ref(0)
	const barheight=ref(0)
	onLoad((e)=>{
		ids.value=e.id
		statusbarheight.value=uni.getSystemInfoSync().statusBarHeight
		const {top,height}=wx.getMenuButtonBoundingClientRect()
		barheight.value=height?height+(top-statusbarheight.value)*2:38
	})
</script>

<style lang="scss">
	.musichead{
		width: 100%;
		// height:var(--status-bar-height);
		// line-height:var(--status-bar-height);
		font-size: 16px;
		display: flex;
		align-items: center;
		display: relative;
		color:black;
		.head-icon{
			width:90px;
			height: 31px;
			line-height: 31px;
			margin-left: 8px;
			border-radius:15px;
			// border: 1px solid white;
			background-color: rgba(0, 0,0,0.4);
			display: flex;
			justify-content: space-evenly;
			z-index: 999;
		}
		.headtitle{
			width:330rpx;
			white-space:nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
			position: absolute;
			left:210rpx;
			text-align: center;
			
		}
	}
	.isWhite{
		color: white;
	}
</style>