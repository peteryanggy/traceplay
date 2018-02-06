/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime 
 * @return {String}
 */
function formatPassTime(startTime) {
    if (startTime instanceof Date == false) return null;

    var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
}

/**
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime  
 * @return {String}
 */
function formatRemainTime(endTime) {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}
/**
 * @desc 截取时间字符串去掉秒后面的点，
 * @param {string} date 如 2017-10-16 19:53:24.818839
 * @return{string} 截取返回 2017-10-16 19:53:24
 */
function subDate(date) {
    var stop = date.indexOf('.');
    if (stop < 0) return date;
    return date.substring(0, stop);
}
/**
 * @desc 去掉时间字符串中T字符
 * @param {string} date 如 2017-10-16T19:53:24
 * @return{string} 2017-10-16 19:53:24
 */
function removeDateT(date) {
    return date.replace(/T/g, ' ');
}

/**
 * @desc 如 2017-10-16 19:53:24.818839，截取返回 2017-10-16 19:53:24 去掉去掉时间字符串中T字符
 * @param {string} date 如 2017-10-16T19:53:24.818839
 * @return {string }2017-10-16 19:53:24
 */
function subAndRemoveDate(date) {
    return removeDateT(subDate(date));
}

/**
 * 一天的毫秒数
 */
const totalMillisecondOfDay = 24 * 60 * 60 * 1000;
/**
 * 一个小时的毫秒数
 */
const totalMillisecondOfHour = 60 * 60 * 1000;
/**
 * 一分钟的毫秒数
 */
const totalMillisecondOfMinute = 60 * 1000;
/**
 * 一秒钏的毫秒数
 */
const totalMillisecondOfSecond = 1000;

/**
 * 为时间对象加/减指定的天数，返回新的时间对象
 * @param {时间对象}  dateTime
 * @param {天数}  nDays
 */
function dateTimeAddDays(dateTime, nDays) {
    if (dateTime instanceof Date == false) return null;

    //当前日期的毫秒数 + 天数 * 一天的毫秒数
    var mseconds = dateTime.getTime() + nDays * totalMillisecondOfDay;
    var newDate = new Date(mseconds);
    return newDate;
}

/**
 * 为时间对象加/减指定的小时，返回新的时间对象
 * @param {时间对象}  dateTime
 * @param {小时}  nHours
 */
function dateTimeAddHours(dateTime, nHours) {
    if (dateTime instanceof Date == false) return null;

    //当前日期的毫秒数 + 小时数 * 一小时的毫秒数
    var mseconds = dateTime.getTime() + nHours * totalMillisecondOfHour;
    var newDate = new Date(mseconds);
    return newDate;
}

/**
 * 为时间对象加/减指定的分钟，返回新的时间对象
 * @param {时间对象}  dateTime
 * @param {分钟}  nMinutes
 */
function dateTimeAddMinutes(dateTime, nMinutes) {
    if (dateTime instanceof Date == false) return null;

    //当前日期的毫秒数 + 分钟数 * 一分钟的毫秒数
    var mseconds = dateTime.getTime() + nMinutes * totalMillisecondOfMinute;
    var newDate = new Date(mseconds);
    return newDate;
}

/**
 * 为时间对象加/减指定的秒数，返回新的时间对象
 * @param {时间对象}  dateTime
 * @param {秒数}  nSeconds
 */
function dateTimeAddSeconds(dateTime, nSeconds) {
    if (dateTime instanceof Date == false) return null;

    //当前日期的毫秒数 + 秒数 * 一秒钟的毫秒数
    var mseconds = dateTime.getTime() + nSeconds * totalMillisecondOfSecond;
    var newDate = new Date(mseconds);
    return newDate;
}

/**
 * 返回时间对象当天的开始时间对象，即yyyy-MM-dd 00:00:00
 * @param {时间对象} dateTime 
 */
function dateTimeBegin(dateTime) {
    if (dateTime instanceof Date == false) return null;

    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
}

/**
 * 返回时间对象当天的最后时间对象，即yyyy-MM-dd 23:59:59
 * @param {时间对象} dateTime 
 */
function dateTimeEnd(dateTime) {
    if (dateTime instanceof Date == false) return null;

    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 23, 59, 59);
}

/**
 * 返回时间对象当前周的开始日期时间，时间部分为 0时 0分 0秒
 * @param {时间对象} dateTime 
 */
function dateTimeOfWeekBegin(dateTime) {
    if (dateTime instanceof Date == false) return null;

    var begin = dateTimeBegin(dateTime);
    //根据本地时间返回指定日期对象的星期中的第几天（0-6）
    var day = begin.getDay();

    var weekBegin = null;
    if (day == 0) day = 6;
    weekBegin = dateTimeAddDays(begin, -(day - 1));
    return weekBegin;
}

/**
 * 返回时间对象当前周的最后日期时间，时间部分为 23时 59分 59秒
 * @param {时间对象} dateTime 
 */
function dateTimeOfWeekEnd(dateTime) {
    if (dateTime instanceof Date == false) return null;

    var end = dateTimeEnd(dateTime);
    //根据本地时间返回指定日期对象的星期中的第几天（0-6）
    var day = end.getDay();

    if (day > 0) {
        var ndays = 7 - day;
        return dateTimeAddDays(end, ndays);
    } else {
        return end;
    }
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)  
 * 例子： 
 * (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18 
 * 
 * @param {时间对象} dateTime 
 * @param {格式化字符串} fmt 
 */
function dateTimeFormat(dateTime, fmt) {
    if (dateTime instanceof Date == false) return null;

    var o = {
        "M+": dateTime.getMonth() + 1, //月份 
        "d+": dateTime.getDate(), //日 
        "H+": dateTime.getHours(), //小时 
        "m+": dateTime.getMinutes(), //分 
        "s+": dateTime.getSeconds(), //秒 
        "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度 
        "S": dateTime.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/**
 * @desc 对时间进行替换，-替换/，T替换空去掉秒. 例如 2006-07-02T08:09:04.423 转换后 2006/07/02 08:09:04
 * @param {时间字符串} strDateTime 
 * @returns{dataTime}
 */
function dateTimeReplace(strDateTime) {
    return new Date(subDate(strDateTime.replace(/-/g, '/').replace(/T/g, ' ')));;
}