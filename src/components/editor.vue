<template>
	<div>
	<!-- 图片上传组件辅助-->
	<el-upload
		class="avatar-uploader"
		:action="serverUrl"
		name="file"
		:data="imgData"
		:show-file-list="false"
		:on-success="uploadSuccess"
		:on-error="uploadError"
		:before-upload="beforeUpload"
		id="quill-upload">
	</el-upload>
	<!--富文本编辑器组件-->
	<el-row v-loading="quillUpdateImg">
		<quill-editor
		v-model="detailContent"
		ref="myQuillEditor"
		:options="editorOption"
		@change="onEditorChange($event)"
		@ready="onEditorReady($event)"
		>
		</quill-editor>
	</el-row>
	</div>
</template>
<script>
import {quillEditor} from 'vue-quill-editor';
const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'], // toggled buttons
	['blockquote', 'code-block'],
	
	[{'header': 1}, {'header': 2}], // custom button values
	[{'list': 'ordered'}, {'list': 'bullet'}],
	[{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
	[{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
	[{'direction': 'rtl'}], // text direction
	
	[{'size': ['10px', '12px', '14px', '16px' ,'18px', '20px', '22px', '24px', '26px', '32px', '48px']}], // custom dropdown
	[{'header': [1, 2, 3, 4, 5, 6, false]}],
	
	[{'color': []}, {'background': []}], // dropdown with defaults from theme
	[{'font': []}],
	[{'align': []}],
	['link', 'image'],
	['clean'] // remove formatting button
]
export default {
	props:{
		serverUrl:String,
		imgData:Object
	},
	data() {
		return {
			quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
			// serverUrl: '', // 这里写你要上传的图片服务器地址
			// header: {token: sessionStorage.token}, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
			detailContent: '', // 富文本内容
			editorOption: {
				placeholder: '编辑内容',
				theme: 'snow', // or 'bubble'
				modules: {
					toolbar: {
						container: toolbarOptions, // 工具栏
						handlers: {
							'image': function (value) {
								if (value) {
									document.querySelector('#quill-upload input').click()
								} else {
									this.quill.format('image', false);
								}
							}
						}
					}
				}
			} // 富文本编辑器配置
		}
	},
	methods: {
		// 上传图片前
		beforeUpload(res, file) {
			this.quillUpdateImg = true
		},
		// 上传图片成功
		uploadSuccess(res, file) {
			// res为图片服务器返回的数据
			// 获取富文本组件实例
			let quill = this.$refs.myQuillEditor.quill
			// 如果上传成功
			console.log(res)
			if (res.code == 200 && res.result !== null) {
				// 获取光标所在位置
				let length = quill.getSelection().index;
				// 插入图片 res.info为服务器返回的图片地址
				quill.insertEmbed(length, 'image', res.result.url)
				// 调整光标到最后
				quill.setSelection(length + 1)
			} else {
				this.$message.error('图片插入失败')
			}
			// loading动画消失
			this.quillUpdateImg = false
		},
		// 上传图片失败
		uploadError(res, file) {
			// loading动画消失
			this.quillUpdateImg = false
			this.$message.error('图片插入失败')
		},
		onEditorChange(){},
		onEditorReady(){},
		getContent(value){
			this.detailContent = value
		}
	},
	components:{
		quillEditor
	},
	watch:{
		detailContent(newVal,oldVal){
			this.$emit('changeContent',newVal)
		}
	}
}
</script>