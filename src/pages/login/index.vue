<template>
	<div class="containt">
		<div class="content">
			<div class="login-left">
				<img src="@/assets/images/login_left0.png" alt="login" />
			</div>
			<div class="loginfrom">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.svg" alt="" />
					<h2 class="logo-text">Toaly-Admin</h2>
				</div>
				<el-form size="large" label-position="top" :model="loginfrom" :rules="loginRules" ref="loginFormRef" label-width="120px">
					<el-form-item prop="username"> <el-input placeholder="用户名 admin" v-model="loginfrom.username" /> </el-form-item
					><el-form-item prop="password"> <el-input placeholder="密码 123456" v-model="loginfrom.password" /> </el-form-item>
					<el-form-item>
						<el-row justify="space-evenly">
							<el-col :span="8"> <el-button :icon="CircleClose" round @click="onCancel(loginFormRef)">重置</el-button></el-col>
							<el-col :span="8">
								<el-button :icon="UserFilled" round @click="onSubmit(loginFormRef)" type="primary" :loading="loading">
									立即登录
								</el-button>
							</el-col>
						</el-row>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { loginApi } from "@/api/modules/login";
import md5 from "js-md5";
import { useRouter } from "vue-router";
import { GolbState } from "@/store/modules/golb";
const loginFormRef = ref<FormInstance>();
const router = useRouter();
// 登录表单数据
const loginfrom = reactive({
	username: "",
	password: ""
});
const loginRules = reactive<FormRules>({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});
const golbState = GolbState();
const loading = ref(false);

const onSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async valid => {
		if (valid) {
			loading.value = true;
			let requestLoginForm = { username: loginfrom.username, password: md5(loginfrom.password) };
			try {
				const res = await loginApi(requestLoginForm);
				golbState.setToken(res.data!.access_token);
				ElMessage.success("登录成功！");
				router.push({ name: "home" });
			} finally {
				loading.value = false;
			}
		}
	});
};

const onCancel = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
onMounted(() => {
	//监听
	document.onkeyup = e => {
		if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
			if (loading.value) return;
			onSubmit(loginFormRef.value);
		}
	};
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
