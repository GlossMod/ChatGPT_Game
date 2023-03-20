<script lang='ts' setup>
import { useMain } from '@src/stores/useMain';
import { SetConfig } from '@src/model/config'
import { ElMessage } from 'element-plus';
import { watch, ref } from 'vue';

import { join } from 'node:path'
import { homedir } from "os";
import { writeFileSync } from 'node:fs'

const main = useMain()

let show = ref(false)
let file_name = ref('save')

function save() {
    let text = [] as string[]
    main.prompt.forEach(item => {
        if (item.role != 'system') text.push(item.content)
    });
    const documents = join(homedir(), 'My Documents', '异世界模拟器')
    let path = join(documents, file_name.value + '.txt')

    writeFileSync(path, text.join('\n\n'), 'utf8');

    ElMessage({
        message: '保存成功',
        type: 'success',
        offset: 100,
    })
    show.value = false
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
                    <v-btn variant="text" @click="show = true" prepend-icon="mdi-content-save-outline">保存</v-btn>
                </div>
            </div>
        </v-col>
    </v-row>
    <el-dialog v-model="show" title="保存为文本" width="30%" align-center draggable>
        <el-form>
            <el-form-item label="文件名称">
                <el-input v-model="file_name" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="show = false">取消</el-button>
                <el-button type="primary" @click="save()">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
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