<template>
	<view class="musichead" :style="{color:iconcolor}">
		<view class="head-icon" v-if="iconshow" >
			 <text class="iconfont icon-fanhuijiantou" @tap="backTo"></text> | <text class="iconfont icon-shouye" @tap="toHome"></text>
		</view>
		<view class="headtitle">
			{{title}}
		</view>
		
	</view>
</template>

<script setup>
	// import {defineProps} from "vue"
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
		iconcolor:{
			type:String,
			default:'white'
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
	onLoad((e)=>{
		console.log(e);
		ids.value=e.id
	})
</script>

<style lang="scss">
	.musichead{
		width: 100%;
		height: 75px;
		font-size: 16px;
		text-align: center;
		display: flex;
		align-items: center;
		position: relative;
		// color: white;
		.head-icon{
			width:90px;
			// height: 28px;
			// background-color: rgba(0,0,0,.4);
			position:absolute;
			top: 24.5px;
			left: 9px;
			border-radius:14px ;
			border: 1px solid  #f7f7f7;
			display: flex;
			justify-content: space-evenly;
			line-height: 28px;
		}
		.headtitle{
			margin:0 auto;
			width:330rpx;
			white-space:nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
		}
	}
</style>