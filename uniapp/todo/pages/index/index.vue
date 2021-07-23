<template>
	<view>
		<view class="box" hover-class="hoverClass">
			{{title}}
		</view>
		<image src="../../static/logo.png" mode="aspectFit"></image>
	<button :title="title" @click="handleClick" v-if="show">
		{{btnText}}
	</button>
  </view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'Hello',
				btnText: '点我看看',
				show:true
			}
		},
		onLoad() {
			this.sayHi("Hello, uni-app")
		},
		methods: {
			handleClick(e) {
				this.btnText = "你真好看"
			},
			sayHi(msg) {
				alert(msg)
			}
		}
	}
</script>

<style>
	.box {
		color: red;
	}

	.hoverClass {
		color: #007AFF;
	}
</style>
