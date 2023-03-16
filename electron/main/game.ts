import request from 'electron-request';

export function SendGameData(prompt: any[]) {
    let data = {
        apiKey: '',    // 在这里输入你的key
        prompt
    }

    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }
        console.log(options);
        request('http://42.192.204.130:3059/game', options)
            .then(res => resolve(res.text())).catch(err => reject(err))
    })
}