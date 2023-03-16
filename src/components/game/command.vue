<script lang='ts' setup>
import { useMain } from '@src/stores/useMain';

import commandList from '@src/components/game/commandList.vue'
import { ref, watch, onMounted } from 'vue';

const main = useMain()

let command = ref<HTMLDivElement | null>(null)




onMounted(() => {
    watch(() => main.prompt.length, () => {

        // 延迟100ms执行，等待dom渲染完成
        setTimeout(() => {
            // 滚动条滚动到底部
            command.value!.scrollTop = command.value?.scrollHeight || 0
        }, 100)
    }, { immediate: true })
})

</script>
<template>
    <v-row>
        <div class="command" ref="command">
            <v-col cols="12">
                <commandList v-if="main.prompt.length > 0" v-for="item in main.prompt" :key="item.content" :item="item">
                </commandList>
            </v-col>
        </div>
    </v-row>
</template>
<script lang='ts'>

export default {
    name: 'GameCommand',
}
</script>
<style lang='less' scoped>
.command {
    height: calc(100vh - 64px - 64px - 64px);
    overflow: auto;
}
</style>