<script lang='ts' setup>
import { computed } from "vue";
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-dark.css'

const props = defineProps<{
    item: { role: "user" | "system" | "assistant", content: string }
}>()

let content = computed(() => {
    return marked(props.item.content)
})

</script>
<template>
    <div :class="item.role" class="list">
        <div class="markdown-body" v-html="content"></div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'GameCommandList',
}
</script>
<style lang='less' scoped>
.system {
    display: none;
}

.list {
    border-bottom: 1px solid #464646;
    padding: 15px;
}

.user {
    text-align: right;
}

.markdown-body {
    background-color: transparent;
}
</style>