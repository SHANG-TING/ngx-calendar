/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
export function getCalendar(ynow, mnow, events, weeklyEvents = []) {
    // 今天
    /** @type {?} */
    const today = new Date();
    // 當月第一天
    /** @type {?} */
    const nlstr = new Date(ynow, mnow, 1);
    // 第一天星期幾
    /** @type {?} */
    const firstday = nlstr.getDay();
    // 每個月的天數
    /** @type {?} */
    const m_days = new Array(31, 28 + is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    // 當前月天數+第一天是星期幾的數值 獲得 表格行數
    /** @type {?} */
    const tr_str = Math.ceil((m_days[mnow] + firstday) / 7);
    // 每周事件
    /** @type {?} */
    const mutileEvents = events.concat(...weeklyEvents.map(getMutipleEvents(ynow, mnow)));
    // 結果
    /** @type {?} */
    const calendar = [];
    /** @type {?} */
    let i;
    /** @type {?} */
    let k;
    /** @type {?} */
    let idx;
    /** @type {?} */
    let date_str;
    // 表格的行
    for (i = 0; i < tr_str; i++) {
        /** @type {?} */
        const week = {
            days: [],
            style: {},
        };
        // 表格每行的單元格
        for (k = 0; k < 7; k++) {
            // 單元格自然序列號
            idx = i * 7 + k;
            // 計算日期
            date_str = idx - firstday + 1;
            /** @type {?} */
            let calendarDay;
            if (date_str <= 0) {
                // 過濾無效日期（小於等於零的）
                // 取當月第一天
                /** @type {?} */
                const mPrev = new Date(ynow, mnow, 1);
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
                const mNext = new Date(ynow, mnow, 1);
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
            calendarDay.events = mutileEvents.filter(event => contain(event, calendarDay.date));
            calendarDay.name = calendarDay.date.getDay();
            calendarDay.number = calendarDay.date.getDate();
            calendarDay.isToday =
                calendarDay.date.getFullYear() === today.getFullYear() &&
                    calendarDay.date.getMonth() === today.getMonth() &&
                    calendarDay.date.getDate() === today.getDate();
            week.days.push(calendarDay);
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
        const start = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
        /** @type {?} */
        const end = new Date(event.end.getFullYear(), event.end.getMonth(), event.end.getDate());
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
    return (event) => {
        /** @type {?} */
        const start = event.start;
        /** @type {?} */
        const distance = event.end.getTime() - event.start.getTime();
        /** @type {?} */
        const currentDay = start.getDay();
        /** @type {?} */
        const firstDate = new Date(ynow, mnow, 1);
        /** @type {?} */
        const firstDay = firstDate.getDay();
        /** @type {?} */
        const secondDate = new Date(ynow, mnow + 1, 1);
        /** @type {?} */
        const result = [];
        /** @type {?} */
        let newDate = new Date(firstDate.setDate(firstDate.getDate() + (currentDay - firstDay)));
        newDate.setHours(start.getHours());
        newDate.setMinutes(start.getMinutes());
        newDate.setSeconds(start.getSeconds());
        newDate.setMilliseconds(start.getMilliseconds());
        result.push(new Date(newDate.getTime()));
        while (newDate < secondDate) {
            newDate = new Date(newDate.setDate(newDate.getDate() + 7));
            result.push(new Date(newDate.getTime()));
        }
        return result.map(x => {
            /** @type {?} */
            const ce = Object.assign({}, event);
            ce.start = new Date(x.getTime());
            ce.end = new Date(x.setTime(x.getTime() + distance));
            return ce;
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvIiwic291cmNlcyI6WyJsaWIvbW9udGgvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsTUFBTSxVQUFVLE9BQU8sQ0FBQyxJQUFJO0lBQzFCLE9BQU8sSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRixDQUFDOzs7Ozs7OztBQUVELE1BQU0sVUFBVSxXQUFXLENBQ3pCLElBQVksRUFDWixJQUFZLEVBQ1osTUFBNEIsRUFDNUIsZUFBcUMsRUFBRTs7O1VBR2pDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRTs7O1VBRWxCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7O1VBRS9CLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFOzs7VUFFekIsTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzs7O1VBRWxGLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O1VBRWpELFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxD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QU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUVELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7a0JBQ2QsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQztZQUNuQyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNyRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5neEhtQ2FsZW5kYXJEYXksIE5neEhtQ2FsZW5kYXJFdmVudCwgTmd4SG1DYWxlbmRhcldlZWsgfSBmcm9tICcuLi9uZ3gtaG0tY2FsZW5kYXIubW9kZWwnO1xyXG5cclxuLyoqIOWIpOaWt+aYr+WQpueCuumWj+W5tCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNfbGVhcCh5ZWFyKSB7XHJcbiAgcmV0dXJuIHllYXIgJSAxMDAgPT09IDAgPyAoeWVhciAlIDQwMCA9PT0gMCA/IDEgOiAwKSA6IHllYXIgJSA0ID09PSAwID8gMSA6IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYWxlbmRhcihcclxuICB5bm93OiBudW1iZXIsXHJcbiAgbW5vdzogbnVtYmVyLFxyXG4gIGV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10sXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdLFxyXG4pOiBBcnJheTxOZ3hIbUNhbGVuZGFyV2Vlaz4ge1xyXG4gIC8vIOS7iuWkqVxyXG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAvLyDnlbbmnIjnrKzkuIDlpKlcclxuICBjb25zdCBubHN0ciA9IG5ldyBEYXRlKHlub3csIG1ub3csIDEpO1xyXG4gIC8vIOesrOS4gOWkqeaYn+acn+W5vlxyXG4gIGNvbnN0IGZpcnN0ZGF5ID0gbmxzdHIuZ2V0RGF5KCk7XHJcbiAgLy8g5q+P5YCL5pyI55qE5aSp5pW4XHJcbiAgY29uc3QgbV9kYXlzID0gbmV3IEFycmF5KDMxLCAyOCArIGlzX2xlYXAoeW5vdyksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxKTtcclxuICAvLyDnlbbliY3mnIjlpKnmlbgr56ys5LiA5aSp5piv5pif5pyf5bm+55qE5pW45YC8IOeNsuW+lyDooajmoLzooYzmlbhcclxuICBjb25zdCB0cl9zdHIgPSBNYXRoLmNlaWwoKG1fZGF5c1ttbm93XSArIGZpcnN0ZGF5KSAvIDcpO1xyXG4gIC8vIOavj+WRqOS6i+S7tlxyXG4gIGNvbnN0IG11dGlsZUV2ZW50cyA9IGV2ZW50cy5jb25jYXQoLi4ud2Vla2x5RXZlbnRzLm1hcChnZXRNdXRpcGxlRXZlbnRzKHlub3csIG1ub3cpKSk7XHJcbiAgLy8g57WQ5p6cXHJcbiAgY29uc3QgY2FsZW5kYXI6IE5neEhtQ2FsZW5kYXJXZWVrW10gPSBbXTtcclxuXHJcbiAgbGV0IGksIGssIGlkeCwgZGF0ZV9zdHI7XHJcblxyXG4gIC8vIOihqOagvOeahOihjFxyXG4gIGZvciAoaSA9IDA7IGkgPCB0cl9zdHI7IGkrKykge1xyXG4gICAgY29uc3Qgd2VlazogTmd4SG1DYWxlbmRhcldlZWsgPSB7XHJcbiAgICAgIGRheXM6IFtdLFxyXG4gICAgICBzdHlsZToge30sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOihqOagvOavj+ihjOeahOWWruWFg+agvFxyXG4gICAgZm9yIChrID0gMDsgayA8IDc7IGsrKykge1xyXG4gICAgICAvLyDllq7lhYPmoLzoh6rnhLbluo/liJfomZ9cclxuICAgICAgaWR4ID0gaSAqIDcgKyBrO1xyXG4gICAgICAvLyDoqIjnrpfml6XmnJ9cclxuICAgICAgZGF0ZV9zdHIgPSBpZHggLSBmaXJzdGRheSArIDE7XHJcblxyXG4gICAgICBsZXQgY2FsZW5kYXJEYXk6IE5neEhtQ2FsZW5kYXJEYXk7XHJcblxyXG4gICAgICBpZiAoZGF0ZV9zdHIgPD0gMCkge1xyXG4gICAgICAgIC8vIOmBjua/vueEoeaViOaXpeacn++8iOWwj+aWvOetieaWvOmbtueahO+8iVxyXG4gICAgICAgIC8vIOWPlueVtuaciOesrOS4gOWkqVxyXG4gICAgICAgIGNvbnN0IG1QcmV2ID0gbmV3IERhdGUoeW5vdywgbW5vdywgMSk7XHJcbiAgICAgICAgLy8g5bCH5pel5pyfLTHngrrkuIrlgIvmnIjnmoTmnIDlvozkuIDlpKnvvIzpmqjokZfkuIrlgIvmnIjlpKnmlbjororljJZcclxuICAgICAgICBtUHJldi5zZXREYXRlKG1QcmV2LmdldERhdGUoKSArIGRhdGVfc3RyIC0gMSk7XHJcbiAgICAgICAgLy8g6Kit5a6a5pel5pyfXHJcbiAgICAgICAgLy8gZGF0ZV9zdHIgPSBtUHJldi5nZXREYXRlKCk7XHJcbiAgICAgICAgY2FsZW5kYXJEYXkgPSB7IGRhdGU6IG1QcmV2LCBvdGhlcjogdHJ1ZSB9O1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGVfc3RyID4gbV9kYXlzW21ub3ddKSB7XHJcbiAgICAgICAgLy8g6YGO5r++54Sh5pWI5pel5pyf77yI5aSn5pa85pyI57i95aSp5pW455qE77yJXHJcbiAgICAgICAgLy8g5Y+W55W25pyI56ys5LiA5aSpXHJcbiAgICAgICAgY29uc3QgbU5leHQgPSBuZXcgRGF0ZSh5bm93LCBtbm93LCAxKTtcclxuICAgICAgICAvLyDlj5bkuIvlgIvmnIjnrKzkuIDlpKlcclxuICAgICAgICBtTmV4dC5zZXRNb250aChtTmV4dC5nZXRNb250aCgpICsgMSk7XHJcbiAgICAgICAgLy8g6Zqo6JGX5LiL5YCL5pyI5aSp5pW46K6K5YyWXHJcbiAgICAgICAgbU5leHQuc2V0RGF0ZShtTmV4dC5nZXREYXRlKCkgKyAoZGF0ZV9zdHIgLSBtX2RheXNbbW5vd10pIC0gMSk7XHJcbiAgICAgICAgLy8g6Kit5a6a5pel5pyfXHJcbiAgICAgICAgLy8gZGF0ZV9zdHIgPSBtTmV4dC5nZXREYXRlKCk7XHJcbiAgICAgICAgY2FsZW5kYXJEYXkgPSB7IGRhdGU6IG1OZXh0LCBvdGhlcjogdHJ1ZSB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbGVuZGFyRGF5ID0geyBkYXRlOiBuZXcgRGF0ZSh5bm93LCBtbm93LCBkYXRlX3N0cikgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FsZW5kYXJEYXkuZXZlbnRzID0gbXV0aWxlRXZlbnRzLmZpbHRlcihldmVudCA9PiBjb250YWluKGV2ZW50LCBjYWxlbmRhckRheS5kYXRlKSk7XHJcbiAgICAgIGNhbGVuZGFyRGF5Lm5hbWUgPSBjYWxlbmRhckRheS5kYXRlLmdldERheSgpO1xyXG4gICAgICBjYWxlbmRhckRheS5udW1iZXIgPSBjYWxlbmRhckRheS5kYXRlLmdldERhdGUoKTtcclxuICAgICAgY2FsZW5kYXJEYXkuaXNUb2RheSA9XHJcbiAgICAgICAgY2FsZW5kYXJEYXkuZGF0ZS5nZXRGdWxsWWVhcigpID09PSB0b2RheS5nZXRGdWxsWWVhcigpICYmXHJcbiAgICAgICAgY2FsZW5kYXJEYXkuZGF0ZS5nZXRNb250aCgpID09PSB0b2RheS5nZXRNb250aCgpICYmXHJcbiAgICAgICAgY2FsZW5kYXJEYXkuZGF0ZS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKTtcclxuXHJcbiAgICAgIHdlZWsuZGF5cy5wdXNoKGNhbGVuZGFyRGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxlbmRhci5wdXNoKHdlZWspO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbGVuZGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbihldmVudDogTmd4SG1DYWxlbmRhckV2ZW50LCBkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgaWYgKGV2ZW50LnN0YXJ0ICYmIGV2ZW50LmVuZCkge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0TW9udGgoKSxcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RGF0ZSgpLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKGV2ZW50LmVuZC5nZXRGdWxsWWVhcigpLCBldmVudC5lbmQuZ2V0TW9udGgoKSwgZXZlbnQuZW5kLmdldERhdGUoKSk7XHJcbiAgICBlbmQuc2V0RGF0ZShlbmQuZ2V0RGF0ZSgpICsgMSk7XHJcblxyXG4gICAgcmV0dXJuIHN0YXJ0LmdldFRpbWUoKSA8PSBkYXRlLmdldFRpbWUoKSAmJiBlbmQuZ2V0VGltZSgpID4gZGF0ZS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZXZlbnQuc3RhcnQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGV2ZW50LnN0YXJ0LmdldEZ1bGxZZWFyKCkgPT09IGRhdGUuZ2V0RnVsbFllYXIoKSAmJlxyXG4gICAgICBldmVudC5zdGFydC5nZXRNb250aCgpID09PSBkYXRlLmdldE1vbnRoKCkgJiZcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RGF0ZSgpID09PSBkYXRlLmdldERhdGUoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE11dGlwbGVFdmVudHMoeW5vdzogbnVtYmVyLCBtbm93OiBudW1iZXIpIHtcclxuICByZXR1cm4gKGV2ZW50OiBOZ3hIbUNhbGVuZGFyRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gZXZlbnQuc3RhcnQ7XHJcbiAgICBjb25zdCBkaXN0YW5jZSA9IGV2ZW50LmVuZC5nZXRUaW1lKCkgLSBldmVudC5zdGFydC5nZXRUaW1lKCk7XHJcbiAgICBjb25zdCBjdXJyZW50RGF5ID0gc3RhcnQuZ2V0RGF5KCk7XHJcbiAgICBjb25zdCBmaXJzdERhdGUgPSBuZXcgRGF0ZSh5bm93LCBtbm93LCAxKTtcclxuICAgIGNvbnN0IGZpcnN0RGF5ID0gZmlyc3REYXRlLmdldERheSgpO1xyXG4gICAgY29uc3Qgc2Vjb25kRGF0ZSA9IG5ldyBEYXRlKHlub3csIG1ub3cgKyAxLCAxKTtcclxuICAgIGNvbnN0IHJlc3VsdDogRGF0ZVtdID0gW107XHJcblxyXG4gICAgbGV0IG5ld0RhdGUgPSBuZXcgRGF0ZShmaXJzdERhdGUuc2V0RGF0ZShmaXJzdERhdGUuZ2V0RGF0ZSgpICsgKGN1cnJlbnREYXkgLSBmaXJzdERheSkpKTtcclxuXHJcbiAgICBuZXdEYXRlLnNldEhvdXJzKHN0YXJ0LmdldEhvdXJzKCkpO1xyXG4gICAgbmV3RGF0ZS5zZXRNaW51dGVzKHN0YXJ0LmdldE1pbnV0ZXMoKSk7XHJcbiAgICBuZXdEYXRlLnNldFNlY29uZHMoc3RhcnQuZ2V0U2Vjb25kcygpKTtcclxuICAgIG5ld0RhdGUuc2V0TWlsbGlzZWNvbmRzKHN0YXJ0LmdldE1pbGxpc2Vjb25kcygpKTtcclxuXHJcbiAgICByZXN1bHQucHVzaChuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSkpO1xyXG5cclxuICAgIHdoaWxlIChuZXdEYXRlIDwgc2Vjb25kRGF0ZSkge1xyXG4gICAgICBuZXdEYXRlID0gbmV3IERhdGUobmV3RGF0ZS5zZXREYXRlKG5ld0RhdGUuZ2V0RGF0ZSgpICsgNykpO1xyXG4gICAgICByZXN1bHQucHVzaChuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQubWFwKHggPT4ge1xyXG4gICAgICBjb25zdCBjZSA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KTtcclxuICAgICAgY2Uuc3RhcnQgPSBuZXcgRGF0ZSh4LmdldFRpbWUoKSk7XHJcbiAgICAgIGNlLmVuZCA9IG5ldyBEYXRlKHguc2V0VGltZSh4LmdldFRpbWUoKSArIGRpc3RhbmNlKSk7XHJcbiAgICAgIHJldHVybiBjZTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuIl19