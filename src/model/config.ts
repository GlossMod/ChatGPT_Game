import { join } from 'node:path'
import { homedir } from "os";
import { readFileSync, writeFile, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { useMain } from '@src/stores/useMain'
import { watch } from "vue";

const configFile = function () {
    let configPath = 'config.json'

    const documents = join(homedir(), 'My Documents', '异世界模拟器')

    configPath = join(documents, configPath);

    if (!existsSync(documents)) {
        mkdirSync(documents)
    }

    if (!existsSync(configPath)) {
        writeFileSync(configPath, '{}', 'utf8');
    }

    return configPath
}

export function GetConfig() {
    // 读取 config.json 文件
    let configPath = configFile()

    let config: any = readFileSync(configPath, 'utf-8')
    config = JSON.parse(config)
    return {
        gameData: {
            name: config.gameData?.name || '',
            job: config.gameData?.job || '',
            sex: config.gameData?.sex || '',
            race: config.gameData?.race || '',
            other: config.gameData?.other || '',
        },
        prompt: config.prompt || []
    }
}

export function SetConfig(data: any) {
    let configPath = configFile()

    data = JSON.parse(JSON.stringify(data))
    console.log(data);

    // 格式化存入文件
    const config = JSON.stringify(data)
    writeFile(configPath, config, { encoding: 'utf-8', flag: 'w' }, function (err) {
        if (err) {
            console.log(err)
        }
    })
}

export function initialization() {
    const main = useMain()

    let data = GetConfig()
    main.gameData.name = data.gameData.name
    main.gameData.job = data.gameData.job
    main.gameData.other = data.gameData.other
    main.gameData.race = data.gameData.race
    main.gameData.sex = data.gameData.sex
    main.prompt = data.prompt
}