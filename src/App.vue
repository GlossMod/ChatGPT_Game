<script lang='ts' setup>
// import { initialization } from '@src/model/config'

import AppHeader from '@src/components/base/AppHeader.vue'
import LeftMenu from '@src/components/base/LeftMenu.vue'

// initialization()

</script>
<template>
    <div class="common-layout">
        <AppHeader></AppHeader>
        <div class="main common-layout">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang='ts'>

export default {
    name: 'App',
}
</script>
<style lang='less' scoped>
.common-layout {
    .main {
        margin-top: 40px;
        max-height: calc(100vh - 50px);
        overflow: hidden;
    }
}
</style>