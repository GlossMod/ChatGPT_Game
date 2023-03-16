<script lang='ts' setup>
import { useMain } from '@src/stores/useMain';
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { initialization } from '@src/model/config'
import { ipcRenderer } from 'electron';

const router = useRouter();
const main = useMain()


function newGame() {
    if (main.gameData.name == '' ||
        main.gameData.job == '' ||
        main.gameData.sex == '' ||
        main.gameData.race == ''
    ) {
        ElMessage({
            message: '请填写您的名称、职业、性别、种族.',
            type: 'error',
            offset: 100,
        })
        return
    }
    main.init()
    main.loading = true
    ipcRenderer.send('send-game-date', JSON.stringify(main.prompt))
    router.push('/game')
}

function loginGame() {
    router.push('/game')
}

initialization()

</script>
<template>
    <div class="flex-center">
        <h1>异世界转生模拟器</h1>
        <p>一款完全由你决定的高自由度文字冒险游戏</p>
        <el-form :inline="true" label-position="top">
            <el-form-item label="名称">
                <el-input v-model="main.gameData.name" />
            </el-form-item>
            <el-form-item label="职业">
                <el-input v-model="main.gameData.job" />
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="main.gameData.sex" />
            </el-form-item>
            <el-form-item label="种族">
                <el-input v-model="main.gameData.race" />
            </el-form-item>
        </el-form>
        <div class="other">
            <el-form-item label="其他备注">
                <el-input v-model="main.gameData.other" type="textarea" autosize />
            </el-form-item>
        </div>
        <div class="btn">
            <v-btn @click="newGame" variant="text" color="#00ACC1">
                新游戏
            </v-btn>
            <v-btn @click="loginGame" variant="text" color="#FDD835" append-icon="mdi-arrow-right-thick"
                v-if="main.prompt.length > 0">
                继续游戏
            </v-btn>
        </div>

    </div>
</template>
<script lang='ts'>

export default {
    name: 'Home',
}
</script>
<style lang='less' scoped>
.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    .other {
        display: block;
        width: 100%;
        max-width: 650px;
    }

    .btn {
        display: flex;
    }
}
</style>