import { defineStore } from "pinia";

export const useMain = defineStore('main', {
    state: () => ({
        apiKey: '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',
        loading: false,
        gameData: {
            // 名称 职业 性别 种族
            name: '',
            job: '',
            sex: '',
            race: '',
            other: ''
        },
        prompt: [
            // { role: "user", content: `职业是${this.gameData}` },
        ] as { role: "user" | "system" | "assistant", content: string }[],
    }),

    getters: {
        allOk() {
            if (this.gameData.name == '' ||
                this.gameData.job == '' ||
                this.gameData.sex == '' ||
                this.gameData.race == ''
            ) {
                return false
            } else {
                return true
            }
        }
    },
    actions: {
        init() {
            let other = this.gameData.other == '' ? '' : ',备注:' + this.gameData.other
            let content = `姓名:${this.gameData.name},职业:${this.gameData.job},性别:${this.gameData.sex},种族:${this.gameData.race} ${other}`
            this.prompt = [{ role: "system", content: content }]
        },
        send(content: string) {
            this.prompt.push({ role: "user", content: content })
        },
        handleInput(content: string) {

        }
    },

})