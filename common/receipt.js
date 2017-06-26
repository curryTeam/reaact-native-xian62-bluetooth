/**
 * @description 小票指令转换
 * @author curry.liang
 */
const _ = require('underscore');
const Util = require('./utility');

let writeTextToDevice;

function _setBT(bt) {
    writeTextToDevice = bt.writeTextToDevice;
}

let Config = {
    width: 60,
    height: 40,
    gap: 2,
    direction: 0,
    referenceX: 30,
    referenceY: 30
};

const RECEIPT = {
    _setBT,
    config(con){
        Object.assign(Config, con);
    },
    size(width, height){
        writeTextToDevice(`SIZE ${width} mm, ${height} mm\r\n`);
    },
    gap(g){
        writeTextToDevice(`GAP ${g} mm\r\n`);
    },
    direction(dir = 0){
        writeTextToDevice(`DIRECTION ${dir}\r\n`);
    },
    reference(x = 0, y = 0){
        writeTextToDevice(`REFERENCE ${x},${y}\r\n`);
    },
    cls(){
        writeTextToDevice(`CLS \r\n`);
    },
    
    init(){
        RECEIPT.size(Config.width, Config.height);
        RECEIPT.gap(Config.gap);
        RECEIPT.direction(Config.direction);
        RECEIPT.reference(Config.referenceX, Config.referenceY);
        RECEIPT.cls();
    },
    
    text(x, y, text, x_times = 1, y_times = 1){
        writeTextToDevice(`TEXT ${x},${y},"TSS24.BF2", 0,${x_times},${y_times},"${text}"`)
    },
    print(times = 1){
        writeTextToDevice(`PRINT ${times}\r\n`);
    },
    sound(times = 2, time = 100){
        writeTextToDevice(`SOUND ${times},${time}\r\n`);
    }
}

module.exports = RECEIPT;