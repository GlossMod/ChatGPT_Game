<script lang='ts' setup>
import { useMain } from '@src/stores/useMain';
import { ipcRenderer } from 'electron';
import { useRouter } from "vue-router";
import GameHeader from '@src/components/game/header.vue'
import GameCommand from '@src/components/game/command.vue'
import GameInput from '@src/components/game/input.vue'
import { ElMessage } from 'element-plus';

const router = useRouter();
const main = useMain()

if (!main.allOk) {
    router.push('/')
} else {
    console.log('生成游戏');
}

// send-game-date-reply
ipcRenderer.on('send-game-date-reply', function (event, arg) {
    if (main.loading == false) {
        return
    }
    let { code, body } = JSON.parse(arg.body)
    console.log(body);
    if (body.choices) {
        main.prompt.push({
            role: 'assistant',
            content: body.choices[0].message.content
        })
    } else {
        // error
        ElMessage({
            message: body.error.message,
            type: 'error',
            offset: 100,
        })
    }
    main.loading = false
})

</script>
<template>
    <v-container fluid class="Game">
        <GameHeader></GameHeader>
        <GameCommand></GameCommand>
        <GameInput></GameInput>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'Game',
}
</script>
<style lang='less' scoped></style>