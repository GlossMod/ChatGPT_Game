<script lang='ts' setup>
import { useMain } from "@src/stores/useMain";
import { ipcRenderer } from "electron";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const main = useMain()
let input = ref('')


function send() {
    if (input.value == '') {
        ElMessage({
            message: '请输入指令',
            type: 'error',
            offset: 100,
        })
        return
    }
    main.prompt.push({
        role: 'user',
        content: input.value,
    })
    main.loading = true

    // 读取最后的6个数据
    let prompt = [
        main.prompt[0],
        ...main.prompt.slice(-6)
    ]


    ipcRenderer.send('send-game-date', JSON.stringify(prompt))
    input.value = ''
}

</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-text-field label="输入指令" variant="underlined" v-model="input" @keydown.enter="send()">
                <template #append-inner>
                    <!-- <v-progress-circular indeterminate color="primary" v-if="loading" /> -->
                    <v-btn icon :loading="main.loading" variant="text" @click="send()">
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                </template>
            </v-text-field>
        </v-col>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'GameInput',
}
</script>
<style lang='less' scoped></style>