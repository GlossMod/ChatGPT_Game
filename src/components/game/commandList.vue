<script lang='ts' setup>
import { computed } from "vue";
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-dark.css'
import { useMain } from "@src/stores/useMain";

const props = defineProps<{
    item: { role: "user" | "system" | "assistant", content: string }
}>()

const main = useMain()

let content = computed(() => {
    return marked(props.item.content)
})

let name = computed(() => {
    if (props.item.role == 'user') return main.gameData.name
    else return '系统'
})

</script>
<template>
    <div :class="item.role" class="wrap">
        <div class="list">
            <div class="avatar">
                <v-avatar> {{ name }} </v-avatar>
            </div>
            <div class="markdown-body" v-html="content"></div>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'GameCommandList',
}
</script>
<style lang='less' scoped>
.system {
    display: none !important;
}

.wrap {
    display: flex;
    padding: 15px;
}

.user {
    justify-content: flex-end;

    .list {
        justify-content: flex-end;
        flex-direction: row-reverse;
    }

    .markdown-body {
        background-color: #5fb878;
        color: #fff;
    }
}

.assistant {
    .markdown-body {
        background-color: #e2e2e2;
        color: #000;
    }
}

.list {
    display: flex;

    .avatar {
        margin: 0 15px;
    }

    .markdown-body {
        padding: 8px 15px;

        border-radius: 3px;
        display: inline-block;
    }
}

.markdown-body {
    background-color: transparent;
}
</style>

<style lang='less'>
.markdown-body {
    * {
        user-select: text
    }
}
</style>