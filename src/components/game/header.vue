<script lang='ts' setup>
import { useMain } from '@src/stores/useMain';
import { SetConfig } from '@src/model/config'
import { ElMessage } from 'element-plus';
import { watch } from 'vue';

const main = useMain()

function save() {
    SetConfig({
        gameData: main.gameData,
        prompt: main.prompt
    })

    ElMessage({
        message: '存档成功!',
        type: 'success',
        offset: 100,
    })
}

watch(() => main.gameData, () => {
    SetConfig({
        gameData: main.gameData,
        prompt: main.prompt
    })
}, { deep: true })


watch(() => main.prompt.length, () => {
    SetConfig({
        gameData: main.gameData,
        prompt: main.prompt
    })
})

</script>
<template>
    <v-row>
        <v-col cols="12">
            <div class="btn">
                <div class="left">
                    <v-btn variant="text" to="/" prepend-icon="mdi-arrow-left">
                        返回主页
                    </v-btn>
                </div>
                <div class="right">
                    <v-btn variant="text" @click="save()" prepend-icon="mdi-content-save-outline">存档</v-btn>
                </div>
            </div>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'GameHeader',
}
</script>
<style lang='less' scoped>
.btn {
    display: flex;
    justify-content: space-between;
}
</style>