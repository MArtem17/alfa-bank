const app = require('express')()
const server = require('http').createServer(app)
const fs = require('fs')

async function getFullData() {
    let listFull = []
    let raw = fs.readFileSync('server/testdata.json')
    listFull = JSON.parse(raw)
    let listResFull = []
    var obj = {}
    for (let i = 0; i < listFull.length; i++) {
        let money = 0, activerate = 0, passiverate = 0
        let res = listFull[i].resources.split('},{')
        for (let j = 0; j < res.length; j++) {
            let parseVal = res[j].split(',')[1].split(':')[1].split("}")[0]
            if (res[j].includes("ACTIVERATE")) {
                activerate = Number(parseVal)
            }
            if (res[j].includes("PASSIVERATE")) {
                passiverate = Number(parseVal)
            }
            if (res[j].includes("MONEY")) {
                money = Number(parseVal)
            }
        }
        obj = {
            fio: listFull[i].fio,
            status: listFull[i].level,
            rate: activerate + passiverate, //listFull[i].resources[0].activerate + listFull[i].resources[1].passiverate, - для testdata_my.json
            money: money //listFull[i].resources[2].money - для testdata_my.json
        }
        listResFull.push(obj)
    }
    listResFull.sort(function (a, b) {
        return b.rate - a.rate || b.money - a.money
    })
    return listResFull
}

app.get('/full', async (req, res) => {
    let listResFull = await getFullData()
    let listRes = []
    let position = 1
    for (let i = 0; i < listResFull.length; i++) {
        if (i == 0) {
            obj = {
                position: position,
                ...listResFull[i]
            }
            listRes.push(obj)
        } else {
            if (listResFull[i].rate == listResFull[i - 1].rate && listResFull[i].money == listResFull[i - 1].money) {
                obj = {
                    position: position,
                    ...listResFull[i]
                }
                listRes.push(obj)
            } else {
                position = position + 1;
                obj = {
                    position: position,
                    ...listResFull[i]
                }
                listRes.push(obj)
            }
        }
    }
    res.send({
        status: true,
        message: 'listFull',
        data: {
            ...{
                list: listRes
            }
        }
    })
})

app.get('/top', async (req, res) => {
    let listResFull = await getFullData()
    let listRes = []
    let position = 1
    for (let i = 0; i < listResFull.length; i++) {
        if (i == 0) {
            obj = {
                position: position,
                ...listResFull[i]
            }
            listRes.push(obj)
        } else {
            if (listResFull[i].rate == listResFull[i - 1].rate && listResFull[i].money == listResFull[i - 1].money) {
                obj = {
                    position: position,
                    ...listResFull[i]
                }
                listRes.push(obj)
            } else {
                position = position + 1;
                if (position != 6) {
                    obj = {
                        position: position,
                        ...listResFull[i]
                    }
                    listRes.push(obj)
                } else {
                    break
                }
            }
        }
    }
    res.send({
        status: true,
        message: 'listTop',
        data: {
            ...{
                list: listRes
            }
        }
    })
})


module.exports = {
    app, server
}