/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * 判斷是否為閏年
 * @param {?} year
 * @return {?}
 */
export function is_leap(year) {
    return year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : year % 4 === 0 ? 1 : 0;
}
/**
 * @param {?} ynow
 * @param {?} mnow
 * @param {?} events
 * @param {?=} weeklyEvents
 * @return {?}
 */
export function getCalendar(ynow, mnow, events, weeklyEvents) {
    if (weeklyEvents === void 0) { weeklyEvents = []; }
    // 今天
    /** @type {?} */
    var today = new Date();
    // 當月第一天
    /** @type {?} */
    var nlstr = new Date(ynow, mnow, 1);
    // 第一天星期幾
    /** @type {?} */
    var firstday = nlstr.getDay();
    // 每個月的天數
    /** @type {?} */
    var m_days = new Array(31, 28 + is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    // 當前月天數+第一天是星期幾的數值 獲得 表格行數
    /** @type {?} */
    var tr_str = Math.ceil((m_days[mnow] + firstday) / 7);
    // 每周事件
    /** @type {?} */
    var mutileEvents = events.concat.apply(events, tslib_1.__spread(weeklyEvents.map(getMutipleEvents(ynow, mnow))));
    // 結果
    /** @type {?} */
    var calendar = [];
    /** @type {?} */
    var i;
    /** @type {?} */
    var k;
    /** @type {?} */
    var idx;
    /** @type {?} */
    var date_str;
    // 表格的行
    for (i = 0; i < tr_str; i++) {
        /** @type {?} */
        var week = {
            days: [],
            style: {},
        };
        var _loop_1 = function () {
            // 單元格自然序列號
            idx = i * 7 + k;
            // 計算日期
            date_str = idx - firstday + 1;
            /** @type {?} */
            var calendarDay;
            if (date_str <= 0) {
                // 過濾無效日期（小於等於零的）
                // 取當月第一天
                /** @type {?} */
                var mPrev = new Date(ynow, mnow, 1);
                // 將日期-1為上個月的最後一天，隨著上個月天數變化
                mPrev.setDate(mPrev.getDate() + date_str - 1);
                // 設定日期
                // date_str = mPrev.getDate();
                calendarDay = { date: mPrev, other: true };
            }
            else if (date_str > m_days[mnow]) {
                // 過濾無效日期（大於月總天數的）
                // 取當月第一天
                /** @type {?} */
                var mNext = new Date(ynow, mnow, 1);
                // 取下個月第一天
                mNext.setMonth(mNext.getMonth() + 1);
                // 隨著下個月天數變化
                mNext.setDate(mNext.getDate() + (date_str - m_days[mnow]) - 1);
                // 設定日期
                // date_str = mNext.getDate();
                calendarDay = { date: mNext, other: true };
            }
            else {
                calendarDay = { date: new Date(ynow, mnow, date_str) };
            }
            calendarDay.events = mutileEvents.filter(function (event) { return contain(event, calendarDay.date); });
            calendarDay.name = calendarDay.date.getDay();
            calendarDay.number = calendarDay.date.getDate();
            calendarDay.isToday =
                calendarDay.date.getFullYear() === today.getFullYear() &&
                    calendarDay.date.getMonth() === today.getMonth() &&
                    calendarDay.date.getDate() === today.getDate();
            week.days.push(calendarDay);
        };
        // 表格每行的單元格
        for (k = 0; k < 7; k++) {
            _loop_1();
        }
        calendar.push(week);
    }
    return calendar;
}
/**
 * @param {?} event
 * @param {?} date
 * @return {?}
 */
export function contain(event, date) {
    if (event.start && event.end) {
        /** @type {?} */
        var start = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
        /** @type {?} */
        var end = new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate());
        end.setDate(end.getDate() + 1);
        return start.getTime() <= date.getTime() && end.getTime() > date.getTime();
    }
    if (event.start) {
        return (event.start.getFullYear() === date.getFullYear() &&
            event.start.getMonth() === date.getMonth() &&
            event.start.getDate() === date.getDate());
    }
    return false;
}
/**
 * @param {?} ynow
 * @param {?} mnow
 * @return {?}
 */
export function getMutipleEvents(ynow, mnow) {
    return function (event) {
        /** @type {?} */
        var start = event.start;
        /** @type {?} */
        var distance = event.end.getTime() - event.start.getTime();
        /** @type {?} */
        var currentDay = start.getDay();
        /** @type {?} */
        var firstDate = new Date(ynow, mnow, 1);
        /** @type {?} */
        var firstDay = firstDate.getDay();
        /** @type {?} */
        var secondDate = new Date(ynow, mnow + 1, 1);
        /** @type {?} */
        var result = [];
        /** @type {?} */
        var newDate = new Date(firstDate.setDate(firstDate.getDate() + (currentDay - firstDay)));
        newDate.setHours(start.getHours());
        newDate.setMinutes(start.getMinutes());
        newDate.setSeconds(start.getSeconds());
        newDate.setMilliseconds(start.getMilliseconds());
        result.push(new Date(newDate.getTime()));
        while (newDate < secondDate) {
            newDate = new Date(newDate.setDate(newDate.getDate() + 7));
            result.push(new Date(newDate.getTime()));
        }
        return result.map(function (x) {
            /** @type {?} */
            var ce = Object.assign({}, event);
            ce.start = new Date(x.getTime());
            ce.end = new Date(x.setTime(x.getTime() + distance));
            return ce;
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvbW9udGgvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE1BQU0sVUFBVSxPQUFPLENBQUMsSUFBSTtJQUMxQixPQUFPLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEYsQ0FBQzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUN6QixJQUFZLEVBQ1osSUFBWSxFQUNaLE1BQTRCLEVBQzVCLFlBQXVDO0lBQXZDLDZCQUFBLEVBQUEsaUJBQXVDOzs7UUFHakMsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFOzs7UUFFbEIsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7UUFFL0IsUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7OztRQUV6QixNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDOzs7UUFFbEYsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7UUFFakQsWUFBWSxH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SUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDOztnQkFDWCxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDakMsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmd4SG1DYWxlbmRhckRheSwgTmd4SG1DYWxlbmRhckV2ZW50LCBOZ3hIbUNhbGVuZGFyV2VlayB9IGZyb20gJy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcblxyXG4vKiog5Yik5pa35piv5ZCm54K66ZaP5bm0ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc19sZWFwKHllYXIpIHtcclxuICByZXR1cm4geWVhciAlIDEwMCA9PT0gMCA/ICh5ZWFyICUgNDAwID09PSAwID8gMSA6IDApIDogeWVhciAlIDQgPT09IDAgPyAxIDogMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbGVuZGFyKFxyXG4gIHlub3c6IG51bWJlcixcclxuICBtbm93OiBudW1iZXIsXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSxcclxuICB3ZWVrbHlFdmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW10sXHJcbik6IEFycmF5PE5neEhtQ2FsZW5kYXJXZWVrPiB7XHJcbiAgLy8g5LuK5aSpXHJcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gIC8vIOeVtuaciOesrOS4gOWkqVxyXG4gIGNvbnN0IG5sc3RyID0gbmV3IERhdGUoeW5vdywgbW5vdywgMSk7XHJcbiAgLy8g56ys5LiA5aSp5pif5pyf5bm+XHJcbiAgY29uc3QgZmlyc3RkYXkgPSBubHN0ci5nZXREYXkoKTtcclxuICAvLyDmr4/lgIvmnIjnmoTlpKnmlbhcclxuICBjb25zdCBtX2RheXMgPSBuZXcgQXJyYXkoMzEsIDI4ICsgaXNfbGVhcCh5bm93KSwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzEpO1xyXG4gIC8vIOeVtuWJjeaciOWkqeaVuCvnrKzkuIDlpKnmmK/mmJ/mnJ/lub7nmoTmlbjlgLwg542y5b6XIOihqOagvOihjOaVuFxyXG4gIGNvbnN0IHRyX3N0ciA9IE1hdGguY2VpbCgobV9kYXlzW21ub3ddICsgZmlyc3RkYXkpIC8gNyk7XHJcbiAgLy8g5q+P5ZGo5LqL5Lu2XHJcbiAgY29uc3QgbXV0aWxlRXZlbnRzID0gZXZlbnRzLmNvbmNhdCguLi53ZWVrbHlFdmVudHMubWFwKGdldE11dGlwbGVFdmVudHMoeW5vdywgbW5vdykpKTtcclxuICAvLyDntZDmnpxcclxuICBjb25zdCBjYWxlbmRhcjogTmd4SG1DYWxlbmRhcldlZWtbXSA9IFtdO1xyXG5cclxuICBsZXQgaSwgaywgaWR4LCBkYXRlX3N0cjtcclxuXHJcbiAgLy8g6KGo5qC855qE6KGMXHJcbiAgZm9yIChpID0gMDsgaSA8IHRyX3N0cjsgaSsrKSB7XHJcbiAgICBjb25zdCB3ZWVrOiBOZ3hIbUNhbGVuZGFyV2VlayA9IHtcclxuICAgICAgZGF5czogW10sXHJcbiAgICAgIHN0eWxlOiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgLy8g6KGo5qC85q+P6KGM55qE5Zau5YWD5qC8XHJcbiAgICBmb3IgKGsgPSAwOyBrIDwgNzsgaysrKSB7XHJcbiAgICAgIC8vIOWWruWFg+agvOiHqueEtuW6j+WIl+iZn1xyXG4gICAgICBpZHggPSBpICogNyArIGs7XHJcbiAgICAgIC8vIOioiOeul+aXpeacn1xyXG4gICAgICBkYXRlX3N0ciA9IGlkeCAtIGZpcnN0ZGF5ICsgMTtcclxuXHJcbiAgICAgIGxldCBjYWxlbmRhckRheTogTmd4SG1DYWxlbmRhckRheTtcclxuXHJcbiAgICAgIGlmIChkYXRlX3N0ciA8PSAwKSB7XHJcbiAgICAgICAgLy8g6YGO5r++54Sh5pWI5pel5pyf77yI5bCP5pa8562J5pa86Zu255qE77yJXHJcbiAgICAgICAgLy8g5Y+W55W25pyI56ys5LiA5aSpXHJcbiAgICAgICAgY29uc3QgbVByZXYgPSBuZXcgRGF0ZSh5bm93LCBtbm93LCAxKTtcclxuICAgICAgICAvLyDlsIfml6XmnJ8tMeeCuuS4iuWAi+aciOeahOacgOW+jOS4gOWkqe+8jOmaqOiRl+S4iuWAi+aciOWkqeaVuOiuiuWMllxyXG4gICAgICAgIG1QcmV2LnNldERhdGUobVByZXYuZ2V0RGF0ZSgpICsgZGF0ZV9zdHIgLSAxKTtcclxuICAgICAgICAvLyDoqK3lrprml6XmnJ9cclxuICAgICAgICAvLyBkYXRlX3N0ciA9IG1QcmV2LmdldERhdGUoKTtcclxuICAgICAgICBjYWxlbmRhckRheSA9IHsgZGF0ZTogbVByZXYsIG90aGVyOiB0cnVlIH07XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0ZV9zdHIgPiBtX2RheXNbbW5vd10pIHtcclxuICAgICAgICAvLyDpgY7mv77nhKHmlYjml6XmnJ/vvIjlpKfmlrzmnIjnuL3lpKnmlbjnmoTvvIlcclxuICAgICAgICAvLyDlj5bnlbbmnIjnrKzkuIDlpKlcclxuICAgICAgICBjb25zdCBtTmV4dCA9IG5ldyBEYXRlKHlub3csIG1ub3csIDEpO1xyXG4gICAgICAgIC8vIOWPluS4i+WAi+aciOesrOS4gOWkqVxyXG4gICAgICAgIG1OZXh0LnNldE1vbnRoKG1OZXh0LmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICAvLyDpmqjokZfkuIvlgIvmnIjlpKnmlbjororljJZcclxuICAgICAgICBtTmV4dC5zZXREYXRlKG1OZXh0LmdldERhdGUoKSArIChkYXRlX3N0ciAtIG1fZGF5c1ttbm93XSkgLSAxKTtcclxuICAgICAgICAvLyDoqK3lrprml6XmnJ9cclxuICAgICAgICAvLyBkYXRlX3N0ciA9IG1OZXh0LmdldERhdGUoKTtcclxuICAgICAgICBjYWxlbmRhckRheSA9IHsgZGF0ZTogbU5leHQsIG90aGVyOiB0cnVlIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FsZW5kYXJEYXkgPSB7IGRhdGU6IG5ldyBEYXRlKHlub3csIG1ub3csIGRhdGVfc3RyKSB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjYWxlbmRhckRheS5ldmVudHMgPSBtdXRpbGVFdmVudHMuZmlsdGVyKGV2ZW50ID0+IGNvbnRhaW4oZXZlbnQsIGNhbGVuZGFyRGF5LmRhdGUpKTtcclxuICAgICAgY2FsZW5kYXJEYXkubmFtZSA9IGNhbGVuZGFyRGF5LmRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgIGNhbGVuZGFyRGF5Lm51bWJlciA9IGNhbGVuZGFyRGF5LmRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICBjYWxlbmRhckRheS5pc1RvZGF5ID1cclxuICAgICAgICBjYWxlbmRhckRheS5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IHRvZGF5LmdldEZ1bGxZZWFyKCkgJiZcclxuICAgICAgICBjYWxlbmRhckRheS5kYXRlLmdldE1vbnRoKCkgPT09IHRvZGF5LmdldE1vbnRoKCkgJiZcclxuICAgICAgICBjYWxlbmRhckRheS5kYXRlLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgd2Vlay5kYXlzLnB1c2goY2FsZW5kYXJEYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGVuZGFyLnB1c2god2Vlayk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2FsZW5kYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluKGV2ZW50OiBOZ3hIbUNhbGVuZGFyRXZlbnQsIGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICBpZiAoZXZlbnQuc3RhcnQgJiYgZXZlbnQuZW5kKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKFxyXG4gICAgICBldmVudC5zdGFydC5nZXRGdWxsWWVhcigpLFxyXG4gICAgICBldmVudC5zdGFydC5nZXRNb250aCgpLFxyXG4gICAgICBldmVudC5zdGFydC5nZXREYXRlKCksXHJcbiAgICApO1xyXG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUoZXZlbnQuZW5kLmdldEZ1bGxZZWFyKCksIGV2ZW50LmVuZC5nZXRNb250aCgpLCBldmVudC5lbmQuZ2V0RGF0ZSgpKTtcclxuICAgIGVuZC5zZXREYXRlKGVuZC5nZXREYXRlKCkgKyAxKTtcclxuXHJcbiAgICByZXR1cm4gc3RhcnQuZ2V0VGltZSgpIDw9IGRhdGUuZ2V0VGltZSgpICYmIGVuZC5nZXRUaW1lKCkgPiBkYXRlLmdldFRpbWUoKTtcclxuICB9XHJcblxyXG4gIGlmIChldmVudC5zdGFydCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS5nZXRGdWxsWWVhcigpICYmXHJcbiAgICAgIGV2ZW50LnN0YXJ0LmdldE1vbnRoKCkgPT09IGRhdGUuZ2V0TW9udGgoKSAmJlxyXG4gICAgICBldmVudC5zdGFydC5nZXREYXRlKCkgPT09IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TXV0aXBsZUV2ZW50cyh5bm93OiBudW1iZXIsIG1ub3c6IG51bWJlcikge1xyXG4gIHJldHVybiAoZXZlbnQ6IE5neEhtQ2FsZW5kYXJFdmVudCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBldmVudC5zdGFydDtcclxuICAgIGNvbnN0IGRpc3RhbmNlID0gZXZlbnQuZW5kLmdldFRpbWUoKSAtIGV2ZW50LnN0YXJ0LmdldFRpbWUoKTtcclxuICAgIGNvbnN0IGN1cnJlbnREYXkgPSBzdGFydC5nZXREYXkoKTtcclxuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IG5ldyBEYXRlKHlub3csIG1ub3csIDEpO1xyXG4gICAgY29uc3QgZmlyc3REYXkgPSBmaXJzdERhdGUuZ2V0RGF5KCk7XHJcbiAgICBjb25zdCBzZWNvbmREYXRlID0gbmV3IERhdGUoeW5vdywgbW5vdyArIDEsIDEpO1xyXG4gICAgY29uc3QgcmVzdWx0OiBEYXRlW10gPSBbXTtcclxuXHJcbiAgICBsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKGZpcnN0RGF0ZS5zZXREYXRlKGZpcnN0RGF0ZS5nZXREYXRlKCkgKyAoY3VycmVudERheSAtIGZpcnN0RGF5KSkpO1xyXG5cclxuICAgIG5ld0RhdGUuc2V0SG91cnMoc3RhcnQuZ2V0SG91cnMoKSk7XHJcbiAgICBuZXdEYXRlLnNldE1pbnV0ZXMoc3RhcnQuZ2V0TWludXRlcygpKTtcclxuICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhzdGFydC5nZXRTZWNvbmRzKCkpO1xyXG4gICAgbmV3RGF0ZS5zZXRNaWxsaXNlY29uZHMoc3RhcnQuZ2V0TWlsbGlzZWNvbmRzKCkpO1xyXG5cclxuICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKSk7XHJcblxyXG4gICAgd2hpbGUgKG5ld0RhdGUgPCBzZWNvbmREYXRlKSB7XHJcbiAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShuZXdEYXRlLnNldERhdGUobmV3RGF0ZS5nZXREYXRlKCkgKyA3KSk7XHJcbiAgICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5tYXAoeCA9PiB7XHJcbiAgICAgIGNvbnN0IGNlID0gT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpO1xyXG4gICAgICBjZS5zdGFydCA9IG5ldyBEYXRlKHguZ2V0VGltZSgpKTtcclxuICAgICAgY2UuZW5kID0gbmV3IERhdGUoeC5zZXRUaW1lKHguZ2V0VGltZSgpICsgZGlzdGFuY2UpKTtcclxuICAgICAgcmV0dXJuIGNlO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG4iXX0=