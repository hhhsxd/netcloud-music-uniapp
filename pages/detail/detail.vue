<template>
	<view>
		<image :src="songInfo.pic" alt="" class="backimg" />
		<musichead :title="songInfo.name" :iconshow="true" ></musichead>
		<view class="container">
		<scroll-view scroll-y="true">
		  <view class="player" @tap="handleToPause">
			<text class="needle"></text>
			<img :src="songInfo.pic" alt="" class="al-cover" :class="{run:isRota}" >
			<text class="iconfont icon-iconbofang icon" v-if="!isPlay"></text>
			<text class="iconfont icon-zanting icon" v-if="isPlay"></text>
		   </view>
		   <view class="music-lyric">
			 	<view class="lyric-item" :style='{transform:"translateY("+ -(lyricIndex-1)*82+"rpx)"}'>  
		   	<view class="lyric-list" v-for="(i,index) in showLyric" :key="index" :class="{active:index==lyricIndex}">
						{{i.lyric}}
				</view>
		   	</view>
		   </view>
		   <view class="getmore">
				在网易云查看更多歌词
			</view>
			<view class="share">
				<button type="default">分享给微信好友</button>
			</view>
		   <view class="guess-like">
		   	 <view class="like-head">
				 <view>
				 	喜欢听这首歌的人也喜欢听
				 </view>
					<view>
					<text class="iconfont icon-iconbofang right">一键收听</text>
					</view>
		   	 </view>
			 <view class="like-list">
		<view class="list-music-item" v-for="i in songInfo.recom" :key="i.id">
		
				<image :src="i.album.picUrl" mode="" class="al"></image>
			
			<SongItem :name="i.name" :privType="i.privilege.flag"  :br="i.privilege.maxbr" :artiName="i.artists.map((item)=>item.name)" :alName="i.album.name" :color="black" @tap="handlerToDetail(i.id)"/>
			</view>
		   </view>
		   </view>
			<view class="comment-list">
				<view class="esta">
					精彩评论
				</view>
				<view class="nullComment" v-if="songCom.length==0">
					去网易云音乐APP写下第一条评论吧~
				</view>
				<view class="comment-single" v-for="i in songCom" :key="i.id">
				<view class="costomer-item">
					<view class="costomer-head">
					<img :src="i.user.avatarUrl" alt="">
				    </view>
				<view class="costomer-info">
					<view class="the-name">
						{{i.user.nickname}}
					</view>
					<view class="publish-time">
						{{formateTime(i.time)}}
					</view>
				</view>
					<view class="point">
						<view class="point-num">
							{{i.likedCount}}
						</view>
						<view class="iconfont icon-dianzan"></view>
					</view>
					
				</view>
				<view class="comment-item">
						{{i.content}}
				</view>
				</view>
				
			</view>
		</scroll-view>	
		</view>
	</view>
</template>

<script setup>
	import {useSongIdStore} from "@/store/songid.js"
	import SongItem from "@/components/SongItem/SongItem.vue"
	import {formateTime} from "@/common/utils.js"
	import {songDetail,songComment,songLyric,songSimi,songUrl} from "@/common/api.js"
	import { onLoad,onUnload,onHide } from '@dcloudio/uni-app';
	import {ref} from "vue"
	const songIdStore=useSongIdStore()
    const songInfo=ref({})
	const songCom=ref([])
	const isPlay=ref(true)
	const isRota=ref(true)
	let backgroundAudio={}
	let lyricIndex=ref(0)
	let showLyric=[]
	let timer=null
	onLoad((e)=>{	
		
		getMusicInfo(e)
	})
	onUnload(()=>{
		backgroundAudio.destroy()
		clearInterval(timer)
	})
	// onHide(()=>{
	// 	backgroundAudio.destroy()
	// 	clearInterval(timer)
	// 	})
	const getMusicInfo=(e)=>{
		console.log(e.id);
		songIdStore.next_change(e.id)
		
		Promise.all([songDetail(e.id),songComment(e.id),songLyric(e.id),songSimi(e.id),songUrl(e.id)]).then((res)=>{
	
			if(res[0].data.code==200){
				songInfo.value.name=res[0].data.songs[0].name
				songInfo.value.pic=res[0].data.songs[0].al.picUrl
			}
			if(res[1].data.code==200){
				songCom.value=res[1].data.hotComments
				console.log(songCom.value);
			}
			if(res[2].data.code==200){
				let lyric=res[2].data.lrc.lyric
				console.log(res[2].data.lrc.lyric);
				const reg=/\[([^\]]+)\]([^\[]+)/g
				let result=[]
				 lyric.replace(reg,($0,$1,$2)=>{
					result.push({"time":formateToSec($1),"lyric":$2})
				})
				 showLyric=result
				 listenLyric()
			}
			if(res[3].data.code==200){
				songInfo.value.recom=res[3].data.songs
				console.log(songInfo.value.recom);
			}
			if(res[4].data.code==200){
				songInfo.value.music=res[4].data.data[0].url
				backgroundAudio=uni.createInnerAudioContext()
				backgroundAudio.src=`${songInfo.value.music}`
				listenLyric()
				backgroundAudio.autoplay=true
				backgroundAudio.onPlay(()=>{
					console.log('开始播放');
					isPlay.value=true
					isRota.value=true
					
					listenLyric()
						
				})
					backgroundAudio.onPause(()=>{
						console.log('pause');
						isPlay.value=false
						isRota.value=false
						clearInterval(timer)
					})
					backgroundAudio.onEnded(()=>{
						// console.log(songInfo.value.recom);
						handlerToDetail(songIdStore.nextId)
					})
			}
			})
			
			}
	const handleToPause=()=>{
		if(backgroundAudio.paused){
			backgroundAudio.play()
		}else{
			backgroundAudio.pause()
		}
	}
	const formateToSec=(value)=>{
		let arr=value.split(":")
		return (Number(arr[0]*60)+Number(arr[1])).toFixed(1)
	}
	const listenLyric=()=>{
			clearInterval(timer)
			timer=setInterval(()=>{
				for(var i=0;i<=showLyric.length;i++){
				if(backgroundAudio.currentTime>showLyric[showLyric.length-1]?.time){
					//播放结束时
					lyricIndex.value=showLyric.length-1;
					break
				}
				if(backgroundAudio.currentTime>showLyric[i]?.time && backgroundAudio.currentTime<showLyric[i+1]?.time){
					lyricIndex.value=i
				}
			}
		},500)
			// }
		  
	}
	const handlerToDetail=(id)=>{
		uni.navigateTo({
			url:`/pages/detail/detail?id=${id}`
		})
	}
	
</script>

<style lang="scss">
.backimg{
	position: absolute;
	filter:blur(30rpx) brightness(50%);
	height: 100vh;
	width: 100%;
	background-size: cover;
	background-position: center;
	transform: scale(1.2) ;
}
.player{
	width:580rpx;
	height: 580rpx;
	background: url('@/static/disc.png') no-repeat 0/cover;
	margin: 214rpx auto 0 auto;
	position:relative;

	.al-cover{
		position:absolute;
		width:370rpx;
		height: 370rpx;
		top:290-185rpx;
		left: 290-185rpx;
		border-radius: 50%;
		animation:10s linear infinite rota;
		animation-play-state: paused;
	}
	.run{
		animation-play-state: running;
	}
	@keyframes rota {
		0%{
			transform:rotate( 0deg);
		}
		100%{
			transform:rotate(360deg);
		}
	}
	.needle{
		position: absolute;
		top:-214rpx;
		left: 230rpx;
		width:230rpx;
		height: 360rpx;
		background: url('@/static/needle.png') 0/cover;
	}
	.icon{
		color: white;
		font-size: 100rpx;
		position: absolute;
		top:240rpx;
		left: 50%;
		transform: translateX(-50rpx);
	}
	
}
.music-lyric{
	margin: 0 30rpx;
	font-size: 32rpx;
	color:#c6c2bf;
	text-align: center;
	//因为是lyric-item向上走，溢出了Music-lyric的盒子,是在music-lyric里面的lyric-item盒子要hidden
	overflow: hidden;
	position: relative;
	view{
		&.lyric-item{
			transition: .5s;
			height:246rpx;
			.lyric-list{
				height: 82rpx;
				line-height: 82rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space:nowrap;
				}
			.active{
				color: white;
			}
		}
		}
	}
.getmore{
			text-decoration: underline;
			font-size: 32rpx;
			text-align: center;
			color:  #c6c2bf;
			margin-top: 30rpx;
		}
		.share{
			button{
			width: 375rpx;
			height: 64rpx;
			line-height: 64rpx;
			border: 1px solid  #c6c2bf;
			color:  #c6c2bf;
			border-radius: 64rpx;
			overflow: hidden;
			background: transparent; 
			margin-top: 20rpx;
			}
	}
.guess-like{
	margin: 0 30rpx;
	
	.like-head{
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		margin: 50rpx 0;
		color: white;
		.right{
			border: 1px solid white;
			display: block;
			width: 180rpx;
			text-align: center;
			line-height:50rpx;
			heigth:50rpx;
			border-radius: 36rpx;
		}
	}
	.like-list{
		.list-music-item{
					display: flex;
					align-items: center;
					.al{
							width:82rpx;
							height: 82rpx;
							margin-right: 20rpx;
							border-radius:20rpx;
							overflow: hidden;
							flex-shrink: 1;
							image{
								width:100%;
								height:100%;
								
					}}
}
}
}
.comment-list{
	margin:50rpx 30rpx;
	.esta{
		color: white;
		font-size:36rpx;
		margin-bottom: 50rpx;
	}
	.nullComment{
		text-align: center;
		color: #e8e8e8;
		padding-bottom: 50rpx;
		font-size:26rpx;
	}
	.comment-single{
		display: flex;
		flex-direction: column;
		&:last-child{
			.comment-item{
				border-bottom: none;
			}
		}
	.costomer-item{
		display: flex;
		align-items: center;
		.costomer-head{
			width: 64rpx;
			height:64rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 20rpx;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.costomer-info{
			flex:1;
			color: #cbcacf;
			.the-name{
				font-size: 26rpx;
			}
			.publish-time{
				font-size: 20rpx;
				
			}
		}
		.point{
			display: flex;
			align-items: center;
			color: #cbcacf;
			font-size: 28rpx;
			.point-num{
				margin-right: 10rpx;
			}
		}
		}
		.comment-item{
			color:white;
			margin: 20rpx 0 20rpx 84rpx;
			font-size: 28rpx;
			border-bottom: 1px solid #7b7a7f;
			padding-bottom: 40rpx;
			
		}
		
	}
	
}
</style>
