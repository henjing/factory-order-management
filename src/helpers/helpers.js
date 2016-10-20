// 识别,并统计中文字符
export function chineseOnly(string) {
    var length = string.length;
    var single;
    var strLength = 0;
    for ( var i = 0; i < length; i++) {
        single = string.charAt(i);
        if (escape(single).length > 4) {
            strLength++;
        } else {
            return false;
        }
    }
    return strLength;
}

// 毫秒数转成日期
export function milisecToDate(miliseconds) {
    return (new Date(miliseconds * 1000)).toLocaleDateString()
}

// 毫秒转成日期 + 时间(精确到秒)
export function milisecToDateTime(miliseconds) {
    var millSec = parseInt(miliseconds);
    var time = new Date(millSec * 1000);
    return time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
}

// outline页面中所有不是{display : none}的元素
export function outline() {
    return [].forEach.call(document.querySelectorAll("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)});
}
