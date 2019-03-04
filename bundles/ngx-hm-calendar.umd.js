(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-rx-modal'), require('rxjs'), require('@angular/animations'), require('@angular/common'), require('@angular/platform-browser'), require('hammerjs')) :
    typeof define === 'function' && define.amd ? define('ngx-hm-calendar', ['exports', '@angular/core', 'ngx-rx-modal', 'rxjs', '@angular/animations', '@angular/common', '@angular/platform-browser', 'hammerjs'], factory) :
    (factory((global['ngx-hm-calendar'] = {}),global.ng.core,global['ngx-rx-modal'],global.rxjs,global.ng.animations,global.ng.common,global.ng.platformBrowser,null));
}(this, (function (exports,core,ngxRxModal,rxjs,animations,common,platformBrowser,hammerjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var NgxHmCalendarViewMode = {
        month: 'month',
        week: 'week',
        day: 'day',
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /**
     * 判斷是否為閏年
     * @param {?} year
     * @return {?}
     */
    function is_leap(year) {
        return year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : year % 4 === 0 ? 1 : 0;
    }
    /**
     * @param {?} ynow
     * @param {?} mnow
     * @param {?} events
     * @param {?=} weeklyEvents
     * @return {?}
     */
    function getCalendar(ynow, mnow, events, weeklyEvents) {
        if (weeklyEvents === void 0) {
            weeklyEvents = [];
        }
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
        var mutileEvents = events.concat.apply(events, __spread(weeklyEvents.map(getMutipleEvents(ynow, mnow))));
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
    function contain(event, date) {
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
    function getMutipleEvents(ynow, mnow) {
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxHmCalendarMonthViewComponent = /** @class */ (function () {
        function NgxHmCalendarMonthViewComponent() {
            this.className = 'black';
            this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            this.yearName = '年';
            this.monthName = '月';
            this.weeklyEvents = [];
            this.events = [];
            this.nstr = new Date();
            this.open = new core.EventEmitter();
            this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
            this.eachPresent = 100 / 14;
        }
        Object.defineProperty(NgxHmCalendarMonthViewComponent.prototype, "ynow", {
            get: /**
             * @return {?}
             */ function () {
                return this.nstr.getFullYear();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxHmCalendarMonthViewComponent.prototype, "mnow", {
            get: /**
             * @return {?}
             */ function () {
                return this.nstr.getMonth();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxHmCalendarMonthViewComponent.prototype, "dnow", {
            get: /**
             * @return {?}
             */ function () {
                return this.nstr.getDate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgxHmCalendarMonthViewComponent.prototype.prev = /**
         * @return {?}
         */
            function () {
                this.nstr.setMonth(this.nstr.getMonth() - 1);
                this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
            };
        /**
         * @return {?}
         */
        NgxHmCalendarMonthViewComponent.prototype.next = /**
         * @return {?}
         */
            function () {
                this.nstr.setMonth(this.nstr.getMonth() + 1);
                this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
            };
        /**
         * @param {?} week
         * @param {?} day
         * @return {?}
         */
        NgxHmCalendarMonthViewComponent.prototype.showEventList = /**
         * @param {?} week
         * @param {?} day
         * @return {?}
         */
            function (week, day) {
                if (day.events.length) {
                    if (week.selectedDay && week.selectedDay === day) {
                        week.selectedDay = undefined;
                    }
                    else {
                        this.calendarData.forEach(function (w) {
                            w.selectedDay = undefined;
                        });
                        week.selectedDay = day;
                        /** @type {?} */
                        var present = (day.name * 2 + 1) * this.eachPresent;
                        week.style = {
                            flex: "1 1 " + present + "%",
                            'max-width': present + "%",
                            'min-width': present + "%",
                        };
                    }
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxHmCalendarMonthViewComponent.prototype.openEvent = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.open.emit(event);
            };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        NgxHmCalendarMonthViewComponent.prototype.trackByFn = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
            function (index, item) {
                return index;
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgxHmCalendarMonthViewComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.events || changes.nstr) {
                    this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
                }
            };
        NgxHmCalendarMonthViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-hm-calendar-month-view',
                        template: "<div class=\"month new\"\n     [ngClass]=\"className\">\n  <div class=\"week\"\n       *ngFor=\"let week of calendarData; trackBy: trackByFn; let week_index = index;\">\n    <div class=\"day\"\n         *ngFor=\"let day of week.days; trackBy: trackByFn; let day_index = index;\"\n         [ngClass]=\"{ other: day.other, today: day.isToday }\"\n         (click)=\"showEventList(week, day)\">\n      <div class=\"day-name\">{{ weekNames[day.name] }}</div>\n      <div class=\"day-number\">{{ day.number }}</div>\n      <div class=\"day-events\">\n        <ng-container *ngFor=\"let event of day.events;\">\n          <span [style.background]=\"event.color\"></span>\n        </ng-container>\n      </div>\n    </div>\n    <div class=\"details\"\n         [ngClass]=\"{ 'in': week.selectedDay, 'out': !week.selectedDay }\">\n      <div class=\"arrow-container\"\n           *ngIf=\"week.selectedDay\">\n        <div class=\"fill\"\n             [ngStyle]=\"week.style\"></div>\n        <div class=\"arrow\"></div>\n      </div>\n      <div class=\"events\">\n        <ng-container *ngIf=\"week.selectedDay\">\n          <div class=\"event\"\n               *ngFor=\"let event of week.selectedDay.events;\"\n               (click)=\"openEvent(event)\">\n            <div class=\"event-category\"\n                 [style.background]=\"event.color\"></div>\n            <span>{{ event.title }}</span>\n          </div>\n        </ng-container>\n      </div>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{display:block;max-height:85vh}.month{opacity:0}.month.new{-webkit-animation:1s ease-out fadeIn;animation:1s ease-out fadeIn;opacity:1;overflow-y:scroll}.month.black .day{color:#fff}.month.black .day.other{color:#717171}.month.black .day.today{background:#467298;color:#53b7ff}.month.black .day-name{color:rgba(255,255,255,.5)}.month.black .details{background:#a4a4a4;color:#fff}.month.white .day{color:#000}.month.white .day.other,.month.white .day.other .day-name{color:#dadada}.month.white .day.today{background:#d7ecff;color:#53b7ff}.month.white .day-name{color:#db4437}.month.white .arrow{border-color:transparent transparent #dcffc7}.month.white .details{background:#dcffc7}.month .week{display:flex;flex-wrap:wrap}.month .week .day{z-index:1;display:inline-block;width:calc(100% / 7);padding:10px;text-align:center;cursor:pointer;box-sizing:border-box}.month .week .day .day-events{list-style:none;margin-top:3px;text-align:center;min-height:12px;line-height:6px;overflow:hidden}.month .week .day .day-events span{display:inline-block;width:5px;height:5px;margin:0 1px}.month .week .day .day-name{font-size:9px;text-transform:uppercase;margin-bottom:5px;letter-spacing:.7px}.month .week .day .day-number{font-size:24px}.month .week .details{display:none;position:relative;max-height:5000px;width:100%;margin-top:5px;border-radius:4px;flex:1 1 100%;min-width:100%;max-width:100%}.month .week .details.in{display:block;-webkit-animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade;animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade}.month .week .details.in .event{-webkit-animation:.3s .3s both fadeIn;animation:.3s .3s both fadeIn}.month .week .details.out{display:block;z-index:-1;max-height:0;transition:all .5s cubic-bezier(0,1,0,1)}.month .week .details.out .event{-webkit-animation:.3s both fadeIn;animation:.3s both fadeIn}.month .week .details .arrow-container{width:100%;display:flex}.month .week .details .arrow-container .fill{transition:all .3s ease}.month .week .details .arrow-container .arrow{-webkit-transform:translateX(-2.5px) translateY(-5px);transform:translateX(-2.5px) translateY(-5px);width:0;height:0;border-style:solid;border-width:0 5px 5px;border-color:transparent transparent #a4a4a4}.month .week .details .events{min-height:120px;padding:7px 0;overflow-y:auto;overflow-x:hidden}.month .week .details .events .event{font-size:16px;line-height:22px;letter-spacing:.5px;padding:2px 16px;vertical-align:top;display:flex}.month .week .details .events .event.empty{color:#eee}.month .week .details .events .event .event-category{height:10px;width:10px;display:inline-block;margin:6px 5px 0;vertical-align:top}.month .week .details .events .event span{display:inline-block;padding:0 0 0 7px}.month .week .details .events .event span:hover{color:#ff0;font-size:120%}.month .week .details .events .event span:active{color:red}@media screen and (max-width:320px){.day{padding:5px}}@-webkit-keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@-webkit-keyframes fadeIn{0%{opacity:0}}@keyframes fadeIn{0%{opacity:0}}@-webkit-keyframes fadeOut{100%{opacity:0}}@keyframes fadeOut{100%{opacity:0}}", ".blue{background:#9ccaeb}.orange{background:#f7a700}.green{background:#99c66d}.yellow{background:#f9e900}"]
                    }] }
        ];
        /** @nocollapse */
        NgxHmCalendarMonthViewComponent.ctorParameters = function () { return []; };
        NgxHmCalendarMonthViewComponent.propDecorators = {
            className: [{ type: core.Input }],
            weekNames: [{ type: core.Input }],
            yearName: [{ type: core.Input }],
            monthName: [{ type: core.Input }],
            weeklyEvents: [{ type: core.Input }],
            events: [{ type: core.Input }],
            nstr: [{ type: core.Input }],
            open: [{ type: core.Output }]
        };
        return NgxHmCalendarMonthViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxHmCalendarWeekViewComponent = /** @class */ (function () {
        function NgxHmCalendarWeekViewComponent() {
            this.className = 'black';
            this.dayName = '號';
            this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            this.weeklyEvents = [];
            this.events = [];
            this.nstr = new Date();
            this.open = new core.EventEmitter();
            this.weekDays = [];
            this.weekEvents = [];
        }
        /**
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.initValue();
            };
        /**
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.initValue = /**
         * @return {?}
         */
            function () {
                this.setWeekDays();
                this.setWeekEvents();
            };
        /**
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.setWeekDays = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var today = new Date();
                /** @type {?} */
                var nstrDay = this.nstr.getDay();
                /** @type {?} */
                var startDate = new Date(this.nstr.getTime());
                startDate.setDate(startDate.getDate() + (0 - nstrDay));
                this.weekDays = [];
                for (var i = 0; i < 7; i++) {
                    /** @type {?} */
                    var date = new Date(startDate.getTime());
                    date.setDate(date.getDate() + i);
                    this.weekDays.push(( /** @type {?} */({
                        date: date,
                        year: date.getFullYear(),
                        month: date.getMonth(),
                        day: date.getDate(),
                        isToday: date.toDateString() === today.toDateString(),
                    })));
                }
            };
        /**
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.setWeekEvents = /**
         * @return {?}
         */
            function () {
                var _a;
                /** @type {?} */
                var firstWeekDay = this.weekDays[0];
                /** @type {?} */
                var firstdate = new Date(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day);
                /** @type {?} */
                var firstday = firstdate.getDay();
                /** @type {?} */
                var lastWeekDay = this.weekDays[6];
                /** @type {?} */
                var lastdate = new Date(lastWeekDay.year, lastWeekDay.month, lastWeekDay.day);
                /** @type {?} */
                var lastday = lastdate.getDay();
                lastdate.setDate(lastdate.getDate() + 1);
                this.weekEvents = (_a = this.events).concat.apply(_a, __spread(this.weeklyEvents.map(getMutipleEvents(firstWeekDay.year, firstWeekDay.month)))).filter(function (e) {
                    return ((e.start >= firstdate && e.start < lastdate) ||
                        (firstdate >= e.start && firstdate <= e.end) ||
                        (e.start <= firstdate && lastdate < e.end));
                })
                    .sort(function (e1, e2) { return e1.start.getTime() - e2.start.getTime(); })
                    .map(function (e) {
                    /** @type {?} */
                    var event = {
                        style: {
                            width: 7,
                            left: e.start.getDay() - firstday,
                            color: e.color,
                        },
                        startsBeforeWeek: true,
                        endsAfterWeek: true,
                        title: e.title,
                        url: e.url,
                        data: e,
                    };
                    if (e.start >= firstdate && e.end < lastdate) {
                        event.style.width = e.end.getDay() - e.start.getDay() + 1;
                        event.style.left = e.start.getDay() - firstday;
                    }
                    else if (e.start < firstdate && (firstdate <= e.end && e.end < lastdate)) {
                        event.style.width = e.end.getDay() - firstday + 1;
                        event.style.left = 0;
                        event.startsBeforeWeek = false;
                    }
                    else if (e.start >= firstdate && e.start < lastdate && e.end >= lastdate) {
                        event.style.width = lastday - e.start.getDay() + 1;
                        event.style.left = e.start.getDay() - firstday;
                        event.endsAfterWeek = false;
                    }
                    else if (e.start <= firstdate && lastdate < e.end) {
                        event.style.width = 7;
                        event.style.left = 0;
                        event.startsBeforeWeek = false;
                        event.endsAfterWeek = false;
                    }
                    return __assign({}, event, { style: {
                            width: (event.style.width / 7) * 100 + "%",
                            left: (event.style.left / 7) * 100 + "%",
                            color: e.color,
                        } });
                });
            };
        /**
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.prev = /**
         * @return {?}
         */
            function () {
                this.nstr.setDate(this.nstr.getDate() - 7);
                this.initValue();
            };
        /**
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.next = /**
         * @return {?}
         */
            function () {
                this.nstr.setDate(this.nstr.getDate() + 7);
                this.initValue();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.openEvent = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.open.emit(event);
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgxHmCalendarWeekViewComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.nstr || changes.events) {
                    this.initValue();
                }
            };
        NgxHmCalendarWeekViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-hm-calendar-week-view',
                        template: "<div class=\"cal-week-view\"\n     [ngClass]=\"className\">\n\n  <div class=\"cal-day-headers\">\n\n    <div class=\"cal-header\"\n         *ngFor=\"let weekDay of weekDays; let i = index; let isFirst = first; let isLast = last\"\n         [class.cal-weekend]=\"isFirst || isLast\"\n         [class.cal-today]=\"weekDay.isToday\">\n      <b>{{ weekNames[i] }}</b>\n      <br>\n      <span>{{ weekDay.day }}{{ dayName }}</span>\n    </div>\n  </div>\n\n  <div class=\"action-block\">\n    <div class=\"cal-events-row \"\n         *ngFor=\"let weekEvent of weekEvents; let i = index;\">\n      <div class=\"cal-event-container cal-starts-within-week cal-ends-within-week \"\n           [style.width]=\"weekEvent.style.width\"\n           [style.left]=\"weekEvent.style.left\"\n           [class.cal-starts-within-week]=\"weekEvent.startsBeforeWeek\"\n           [class.cal-ends-within-week]=\"weekEvent.endsAfterWeek\">\n        <div class=\"cal-event\"\n             [style.background]=\"weekEvent.style.color\">\n          <!-- <span class=\"cal-event-actions \">\n            <a class=\"cal-event-action \" href=\"javascript:;\">\n              <i class=\"fa fa-fw fa-pencil\"></i>\n            </a>\n            <a class=\"cal-event-action \" href=\"javascript:;\">\n              <i class=\"fa fa-fw fa-times\"></i>\n            </a>\n          </span> -->\n          <a class=\"cal-event-title \"\n             href=\"javascript: void(0)\"\n             (click)=\"openEvent(weekEvent.data)\">{{ weekEvent.title }}</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                        styles: [":host{min-height:50vh;max-height:85vh;display:block}.black .cal-day-headers{background:#4a4a4a}.black .cal-header{border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1;color:#fff}.black .cal-header.cal-today{background-color:#467298}.white .cal-day-headers{background:#fff}.white .cal-header{border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1}.white .cal-header.cal-today{background-color:#d7ecff}.cal-week-view{height:calc(100% - 30px);overflow-y:auto}.cal-week-view .cal-day-headers{display:flex;position:absolute;width:100%;z-index:1}.cal-week-view .cal-day-headers .cal-header{flex:1;text-align:center;padding:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:50px}.cal-week-view .action-block{padding-top:62px}.cal-week-view .cal-events-row{position:relative;height:33px}.cal-week-view .cal-event-container{display:inline-block;position:absolute}.cal-week-view .cal-ends-within-week .cal-event{border-top-right-radius:5px;border-bottom-right-radius:5px}.cal-week-view .cal-starts-within-week .cal-event{border-top-left-radius:5px;border-bottom-left-radius:5px}.cal-week-view .cal-event{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 10px;font-size:12px;margin-left:2px;margin-right:2px;height:30px;line-height:30px;background-color:#d1e8ff;border:1px solid #1e90ff;color:#1e90ff}.cal-week-view .cal-event.orange{background-color:#ffc681;border-color:#ad2121}.cal-week-view .cal-event.blue{background-color:#c4e7ff;border-color:#0834e3}a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects}.cal-week-view .cal-event-title:link{color:currentColor}"]
                    }] }
        ];
        /** @nocollapse */
        NgxHmCalendarWeekViewComponent.ctorParameters = function () { return []; };
        NgxHmCalendarWeekViewComponent.propDecorators = {
            className: [{ type: core.Input }],
            dayName: [{ type: core.Input }],
            weekNames: [{ type: core.Input }],
            weeklyEvents: [{ type: core.Input }],
            events: [{ type: core.Input }],
            nstr: [{ type: core.Input }],
            open: [{ type: core.Output }]
        };
        return NgxHmCalendarWeekViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var HOUR_SCHEMAS = [
        {
            name: '12 AM'
        },
        {
            name: '01 AM'
        },
        {
            name: '02 AM'
        },
        {
            name: '03 AM'
        },
        {
            name: '04 AM'
        },
        {
            name: '05 AM'
        },
        {
            name: '06 AM'
        },
        {
            name: '07 AM'
        },
        {
            name: '08 AM'
        },
        {
            name: '09 AM'
        },
        {
            name: '10 AM'
        },
        {
            name: '11 AM'
        },
        {
            name: '12 AM'
        },
        {
            name: '01 PM'
        },
        {
            name: '02 PM'
        },
        {
            name: '03 PM'
        },
        {
            name: '04 PM'
        },
        {
            name: '05 PM'
        },
        {
            name: '06 PM'
        },
        {
            name: '07 PM'
        },
        {
            name: '08 PM'
        },
        {
            name: '09 PM'
        },
        {
            name: '10 PM'
        },
        {
            name: '11 PM'
        }
    ];

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxHmCalendarDayViewComponent = /** @class */ (function () {
        function NgxHmCalendarDayViewComponent() {
            this.className = 'black';
            this.weeklyEvents = [];
            this.events = [];
            this.nstr = new Date(2018, 6, 16);
            this.start = '00:00';
            this.end = '24:00';
            this.split = 30;
            this.open = new core.EventEmitter();
            this.elmWidth = 110;
            this.dayEvents = [];
            this.hourSchemas = HOUR_SCHEMAS;
        }
        Object.defineProperty(NgxHmCalendarDayViewComponent.prototype, "firstDate", {
            get: /**
             * @return {?}
             */ function () {
                /** @type {?} */
                var date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
                /** @type {?} */
                var time = this.start.split(':');
                if (time.length > 0) {
                    /** @type {?} */
                    var hour = Number(time[0]);
                    /** @type {?} */
                    var minute = Number(time[1]);
                    if (hour + 1) {
                        date.setHours(hour);
                        if (minute + 1) {
                            date.setMinutes(minute);
                        }
                    }
                }
                return date;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxHmCalendarDayViewComponent.prototype, "lastDate", {
            get: /**
             * @return {?}
             */ function () {
                /** @type {?} */
                var date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
                /** @type {?} */
                var time = this.end.split(':');
                if (time.length > 0) {
                    /** @type {?} */
                    var hour = Number(time[0]);
                    /** @type {?} */
                    var minute = Number(time[1]);
                    if (hour) {
                        date.setHours(hour);
                        if (minute) {
                            date.setMinutes(minute);
                        }
                    }
                }
                if (Number(date) - Number(this.firstDate) <= 0) {
                    date.setHours(24);
                    date.setMinutes(0);
                }
                return date;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.initView();
            };
        /**
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.initView = /**
         * @return {?}
         */
            function () {
                this.setHourSchemas();
                this.setDayEvent();
                this.bindDayEventWidth();
            };
        /**
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.setHourSchemas = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var diffMs = Number(this.lastDate) - Number(this.firstDate);
                /** @type {?} */
                var diffHrs = Math.ceil(diffMs / 3600000);
                // hours
                // const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                /** @type {?} */
                var firstHour = this.firstDate.getHours();
                this.hourSchemas = [];
                for (var i = firstHour; i < firstHour + diffHrs; i++) {
                    this.hourSchemas.push({
                        name: ('0' + i).substr(-2) + " " + (i > 12 ? 'PM' : 'AM'),
                    });
                }
            };
        /**
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.setDayEvent = /**
         * @return {?}
         */
            function () {
                var _this = this;
                var _a;
                /** @type {?} */
                var width = 30;
                /** @type {?} */
                var firstdate = this.firstDate;
                /** @type {?} */
                var lastdate = this.lastDate;
                /** @type {?} */
                var getPixelForDiffSplit = function (end, start) {
                    /** @type {?} */
                    var diffMs = end.getTime() - start.getTime();
                    return (diffMs % 86400000) / (_this.split * 60 * 1000);
                };
                this.dayEvents = (_a = this.events).concat.apply(_a, __spread(this.weeklyEvents.map(getMutipleEvents(this.nstr.getFullYear(), this.nstr.getMonth())))).filter(function (e) {
                    return ((e.start >= firstdate && e.start < lastdate) ||
                        (firstdate >= e.start && firstdate <= e.end) ||
                        (firstdate >= e.start && lastdate < e.end));
                })
                    // 根據開始時間做排序
                    .sort(function (e1, e2) { return e1.start.getTime() - e2.start.getTime(); })
                    // 轉換為畫面上需要綁定的值
                    .map(function (e, i) {
                    /** @type {?} */
                    var elmDetial = {
                        style: {
                            top: 0,
                            height: 0,
                            left: i * _this.elmWidth,
                        },
                        startsBeforeWeek: true,
                        endsAfterWeek: true,
                        data: e,
                    };
                    // if event first date is bigger than firstdate
                    if (e.start >= firstdate) {
                        if (e.end < lastdate) {
                            //      |---------------------|
                            //            |---------|
                            elmDetial.style.top = getPixelForDiffSplit(e.start, firstdate) * width;
                            elmDetial.style.height = getPixelForDiffSplit(e.end, e.start) * width;
                        }
                        else if (e.start < lastdate && e.end >= lastdate) {
                            //      |---------------------|
                            //                |--------------------|
                            elmDetial.style.top = getPixelForDiffSplit(e.start, firstdate) * width;
                            elmDetial.style.height = getPixelForDiffSplit(lastdate, e.start) * width;
                            elmDetial.endsAfterWeek = false;
                        }
                    }
                    else if (e.start <= firstdate) {
                        // if event first date is bigger than firstdate
                        if (lastdate < e.end) {
                            elmDetial.style.height = _this.hourSchemas.length * 2 * width;
                            elmDetial.startsBeforeWeek = false;
                            elmDetial.endsAfterWeek = false;
                        }
                        else if (firstdate <= e.end && e.end < lastdate) {
                            elmDetial.style.height = getPixelForDiffSplit(e.end, firstdate) * width;
                            elmDetial.startsBeforeWeek = false;
                        }
                    }
                    return elmDetial;
                })
                    // 再次過濾出在這hour區間裡面的事件們
                    .filter(function (e) { return e.style.height !== 0; })
                    // 重新綁定left的順序
                    .map(function (e, i) {
                    e.style.left = i * _this.elmWidth;
                    return __assign({}, e, { style: {
                            top: e.style.top + "px",
                            height: e.style.height + "px",
                            left: e.style.left + "px",
                            background: "" + e.data.color,
                        } });
                });
            };
        /**
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.bindDayEventWidth = /**
         * @return {?}
         */
            function () {
                // 崇軒大神版本
                // let tempWidth = 0;
                // for (let index = 0; index < this.dayEvents.length; index++) {
                //   tempWidth = tempWidth + index * 10;
                // }
                var _this = this;
                setTimeout(function () {
                    // 灰塵版本 (僅供參考XD)
                    /** @type {?} */
                    var tempWidth = _this.dayEvents.length
                        ? _this.dayEvents.map(function (x, i) { return i * 10; }).reduce(function (a, b) { return a + b; })
                        : 0;
                    if (document.body.offsetWidth - 100 < 100 * _this.dayEvents.length + tempWidth) {
                        _this.bars.forEach(function (item, index) {
                            item.nativeElement.style.width = 100 * _this.dayEvents.length + tempWidth + "px";
                        });
                    }
                }, 0);
            };
        /**
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.prev = /**
         * @return {?}
         */
            function () {
                this.nstr.setDate(this.nstr.getDate() - 1);
                this.initView();
            };
        /**
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.next = /**
         * @return {?}
         */
            function () {
                this.nstr.setDate(this.nstr.getDate() + 1);
                this.initView();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.openEvent = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.open.emit(event);
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgxHmCalendarDayViewComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.nstr || changes.start || changes.end) {
                    this.initView();
                }
            };
        NgxHmCalendarDayViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-hm-calendar-day-view',
                        template: "<div [ngClass]=\"className\"\n     class=\"content\">\n  <div class=\"title\">\n    <div class=\"hour name\"\n         *ngFor=\"let hourSchema of hourSchemas\">\n      {{ hourSchema.name }}\n    </div>\n  </div>\n  <div class=\"strip\">\n    <section *ngFor=\"let hourSchema of hourSchemas; let index = index;\"\n             class=\"hour\"\n             #bar>\n      <div class=\"line\"></div>\n      <div class=\"line\"></div>\n    </section>\n\n    <!-- events -->\n    <div *ngFor=\"let dayEvent of dayEvents\"\n         class=\"bar\"\n         [ngStyle]=\"dayEvent.style\"\n         [class.cal-starts-within-day]=\"dayEvent.startsBeforeWeek\"\n         [class.cal-ends-within-day]=\"dayEvent.endsAfterWeek\">\n      <span (click)=\"openEvent(dayEvent.data)\">\n        {{ dayEvent.data.title }}\n      </span>\n    </div>\n    <!--<div style=\"background: green;\n    height: 90px;\n    width: 100px;\n    position: absolute;\n    top: 180px;\n    left: 100px;\">\n    </div>\n    <div style=\"background: pink;\n    height: 120px;\n    width: 100px;\n    position: absolute;\n    top: 180px;left: 200px;\">\n    </div>\n    <div style=\"background: paleturquoise;\n    height: 210px;\n    width: 100px;\n    position: absolute;\n    top: 180px;left: 300px;\">\n    </div> -->\n  </div>\n</div>\n",
                        styles: [":host{display:block;overflow-y:scroll;max-height:85vh}.black .hour .line{border-bottom:thin dashed #888f90}.black .hour .line:hover{background:wheat}.black .hour.name{color:#fff}.black .hour:nth-child(odd){background:#6f6e6e}.white .hour .line{border-bottom:thin dashed #000}.white .hour .line:hover{background:wheat}.white .hour:nth-child(odd){background:#fbeeee}.content{display:flex;margin-bottom:30px}.content .title{width:100px;flex:0 0 100px}.content .strip{position:relative;width:100%}.content .hour{height:60px}.content .hour.name{line-height:60px;text-align:center}.content .hour .line{height:30px;display:flex}.content .hour .line .active{width:100px;height:100%;flex:0 0 100px;box-sizing:content-box;z-index:1}.bar{border:1px solid #1e90ff;width:100px;position:absolute;color:#fff;padding:5px}.bar.cal-starts-within-day{border-top-left-radius:5px;border-top-right-radius:5px}.bar.cal-ends-within-day{border-bottom-left-radius:5px;border-bottom-right-radius:5px}"]
                    }] }
        ];
        /** @nocollapse */
        NgxHmCalendarDayViewComponent.ctorParameters = function () { return []; };
        NgxHmCalendarDayViewComponent.propDecorators = {
            className: [{ type: core.Input }],
            weeklyEvents: [{ type: core.Input }],
            events: [{ type: core.Input }],
            nstr: [{ type: core.Input }],
            start: [{ type: core.Input }],
            end: [{ type: core.Input }],
            split: [{ type: core.Input }],
            open: [{ type: core.Output }],
            bars: [{ type: core.ViewChildren, args: ['bar',] }]
        };
        return NgxHmCalendarDayViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var CalendarSelectorMode = {
        Year: 'Year',
        Month: 'Month',
        Day: 'Day',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxHmCalendarMonthPopupComponent = /** @class */ (function () {
        function NgxHmCalendarMonthPopupComponent(data) {
            this.data = data;
            this.popupData = {};
            this.mode = CalendarSelectorMode.Year;
            this.minYear = 2016;
            this.months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            this.complete = new rxjs.Subject();
            this.popupData = data;
        }
        Object.defineProperty(NgxHmCalendarMonthPopupComponent.prototype, "years", {
            get: /**
             * @return {?}
             */ function () {
                var _this = this;
                return Array.from({ length: 24 }, function (v, k) { return k + _this.minYear; });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        /**
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.prevYearRange = /**
         * @return {?}
         */
            function () {
                this.minYear = this.minYear - 24;
            };
        /**
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.nextYearRange = /**
         * @return {?}
         */
            function () {
                this.minYear = this.minYear + 24;
            };
        /**
         * @param {?} year
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.selectYear = /**
         * @param {?} year
         * @return {?}
         */
            function (year) {
                this.selectedYear = year;
                this.mode = CalendarSelectorMode.Month;
            };
        /**
         * @param {?} month
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.selectMonth = /**
         * @param {?} month
         * @return {?}
         */
            function (month) {
                this.selectedMonth = month;
                if (this.popupData.containerViewMode === NgxHmCalendarViewMode.day) {
                    this.mode = CalendarSelectorMode.Day;
                    this.calendarData = getCalendar(this.selectedYear, this.selectedMonth, []);
                }
                else {
                    this.complete.next(new Date(this.selectedYear, this.selectedMonth, 1));
                }
            };
        /**
         * @param {?} day
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.selectDay = /**
         * @param {?} day
         * @return {?}
         */
            function (day) {
                this.complete.next(day);
            };
        /**
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.backToYearSelector = /**
         * @return {?}
         */
            function () {
                this.mode = CalendarSelectorMode.Year;
            };
        /**
         * @return {?}
         */
        NgxHmCalendarMonthPopupComponent.prototype.backToMonthSelector = /**
         * @return {?}
         */
            function () {
                this.mode = CalendarSelectorMode.Month;
            };
        NgxHmCalendarMonthPopupComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-hm-calendar-month-popup',
                        template: "<div class=\"wrapper\" [ngClass]=\"popupData.theme\">\n  <header class=\"header\">\n\n    <div class=\"title\" [ngSwitch]=\"mode\">\n      <span *ngSwitchCase=\"'Year'\">{{ minYear }} ~ {{ minYear + 24 }}\u5E74</span>\n      <span *ngSwitchCase=\"'Month'\">{{ selectedYear }}\u5E74</span>\n      <span *ngSwitchCase=\"'Day'\">{{ selectedYear }}\u5E74 {{ selectedMonth  + 1 }}\u6708</span>\n    </div>\n\n\n    <ng-container [ngSwitch]=\"mode\">\n\n      <div class=\"button-block\" *ngSwitchCase=\"'Year'\">\n\n        <button class=\"header-button\" (click)=\"prevYearRange()\">\n          <div class=\"button left\"></div>\n        </button>\n        <button class=\"header-button\" (click)=\"nextYearRange()\">\n          <div class=\"button right\"></div>\n        </button>\n\n      </div>\n\n      <div class=\"button-block\" *ngSwitchCase=\"'Month'\">\n        <button class=\"header-button\" (click)=\"backToYearSelector()\">\n          \u25B2\n        </button>\n      </div>\n\n      <div class=\"button-block\" *ngSwitchCase=\"'Day'\">\n        <button class=\"header-button\" (click)=\"backToMonthSelector()\">\n          \u25B2\n        </button>\n      </div>\n\n    </ng-container>\n\n  </header>\n  <ng-container [ngSwitch]=\"mode\">\n\n    <div *ngSwitchCase=\"'Year'\" class=\"container\" (swipeleft)=\"nextYearRange()\" (swiperight)=\"prevYearRange()\">\n      <div class=\"box year\" *ngFor=\"let year of years; let i = index;\" (click)=\"selectYear(year)\">{{ year }}</div>\n    </div>\n\n    <div *ngSwitchCase=\"'Month'\" class=\"container\" (swipeup)=\"backToYearSelector()\">\n      <div class=\"box\" *ngFor=\"let month of months; let i = index;\" (click)=\"selectMonth(month)\">{{ month + 1 }}</div>\n    </div>\n\n    <div *ngSwitchCase=\"'Day'\" class=\"container\" (swipeup)=\"backToMonthSelector()\">\n      <div *ngFor=\"let week of calendarData; let i = index;\">\n        <ng-container *ngFor=\"let day of week.days; let day_index = index;\" >\n          <div class=\"box day\" [class.n-month]=\"day.other\" (click)=\"selectDay(day.date)\">{{ day.number }}</div>\n        </ng-container>\n      </div>\n    </div>\n\n  </ng-container>\n\n\n</div>\n",
                        styles: [".wrapper.black{background-color:#5e5b5b}.wrapper.black .header{background-color:#007bff}.wrapper.black .title{color:#fff}.wrapper.black .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.black .left:hover{border-color:transparent #fff transparent transparent}.wrapper.black .right{border-color:transparent transparent transparent #a09fa0}.wrapper.black .right:hover{border-color:transparent transparent transparent #fff}.wrapper.black .box{background-color:#4f4b4b;color:#fff}.wrapper.white{background-color:#fff}.wrapper.white .header{background-color:#39fbd6}.wrapper.white .title{color:#000}.wrapper.white .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.white .left:hover{border-color:transparent #fff transparent transparent}.wrapper.white .right{border-color:transparent transparent transparent #a09fa0}.wrapper.white .right:hover{border-color:transparent transparent transparent #fff}.wrapper.white .box{background-color:#f6ffcf;color:#000}.wrapper{width:300px;box-sizing:border-box}.wrapper .header{display:flex;justify-content:space-between;padding:10px}.wrapper .header .title{font-size:20px;margin:10px}.wrapper .header .button-block{display:flex;align-items:center}.wrapper .header .button-block .header-button{padding:1em;background:0 0;border:0;color:#a09fa0;cursor:pointer}.wrapper .header .button-block .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.wrapper .header .button-block .header-button .button.left{border-width:7.5px 10px 7.5px 0}.wrapper .header .button-block .header-button .button.right{border-width:7.5px 0 7.5px 10px}header a.next,header a.prev{float:right}.container:after{content:\"\";clear:both;display:table}.container{padding:10px 0 10px 10px}.wrapper .box{float:left;width:60px;height:60px;margin:0 10px 10px 0;text-align:center;transition:all 1s ease;cursor:pointer}.wrapper .box.day{float:none;display:inline-block;width:30px;height:auto;padding:5px;box-sizing:border-box}.wrapper .box.day.n-month{background-color:#837d7d}.wrapper .box::before{content:'';width:0;height:100%;display:inline-block;position:relative;vertical-align:middle;background:red}.wrapper .box:active{background-color:#ff0;color:#000}.wrapper .box.year{width:60px;height:30px}.wrapper.list-mode .container{padding-right:10px}.wrapper.list-mode .box{width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        NgxHmCalendarMonthPopupComponent.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [ngxRxModal.NGX_RX_MODAL_TOKEN,] }] }
            ];
        };
        return NgxHmCalendarMonthPopupComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var time = '150ms linear';
    var NgxHmCalendarComponent = /** @class */ (function () {
        function NgxHmCalendarComponent(_model, _factory) {
            this._model = _model;
            this._factory = _factory;
            this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            this.yearName = '年';
            this.monthName = '月';
            this.dayName = '日';
            this.eventCategorys = [];
            this.weeklyEvents = [];
            this.events = [];
            this.nstr = new Date();
            this.open = new core.EventEmitter();
            this.className = 'black';
            this.size = {
                width: '100vw',
                height: '100vh',
            };
            /**
             * 顯示模式
             */
            this.viewMode = NgxHmCalendarViewMode.month;
            this.legendOpen = 'flyOut';
            this.monthPopupComponent = this._factory.resolveComponentFactory(NgxHmCalendarMonthPopupComponent);
        }
        Object.defineProperty(NgxHmCalendarComponent.prototype, "ynow", {
            get: /**
             * @return {?}
             */ function () {
                return this.nstr.getFullYear();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxHmCalendarComponent.prototype, "mnow", {
            get: /**
             * @return {?}
             */ function () {
                return this.nstr.getMonth();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxHmCalendarComponent.prototype, "dnow", {
            get: /**
             * @return {?}
             */ function () {
                return this.nstr.getDate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgxHmCalendarComponent.prototype, "monDetail", {
            get: /**
             * @return {?}
             */ function () {
                /** @type {?} */
                var result = this.ynow + " " + this.yearName + " " + (this.mnow + 1) + " " + this.monthName;
                if (this.viewMode === NgxHmCalendarViewMode.day) {
                    result = result + " " + this.dnow + " " + this.dayName;
                }
                return result;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        NgxHmCalendarComponent.prototype.prev = /**
         * @return {?}
         */
            function () {
                switch (this.viewMode) {
                    case NgxHmCalendarViewMode.month:
                        this.monthComponent.prev();
                        break;
                    case NgxHmCalendarViewMode.week:
                        this.weekComponent.prev();
                        break;
                    case NgxHmCalendarViewMode.day:
                        this.dayComponent.prev();
                        break;
                }
            };
        /**
         * @return {?}
         */
        NgxHmCalendarComponent.prototype.next = /**
         * @return {?}
         */
            function () {
                switch (this.viewMode) {
                    case NgxHmCalendarViewMode.month:
                        this.monthComponent.next();
                        break;
                    case NgxHmCalendarViewMode.week:
                        this.weekComponent.next();
                        break;
                    case NgxHmCalendarViewMode.day:
                        this.dayComponent.next();
                        break;
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        NgxHmCalendarComponent.prototype.openEvent = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.open.emit(event);
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        NgxHmCalendarComponent.prototype.openSelector = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                var _this = this;
                this._model
                    .open(this.monthPopupComponent, {
                    disableCloseButton: true,
                    panelStyle: {
                        top: $event.offsetY + "px",
                    },
                    data: { theme: this.className, containerViewMode: this.viewMode },
                })
                    .subscribe(function (selectedDate) {
                    if (selectedDate) {
                        _this.nstr = selectedDate;
                    }
                });
            };
        /**
         * @param {?} mode
         * @return {?}
         */
        NgxHmCalendarComponent.prototype.chaneMode = /**
         * @param {?} mode
         * @return {?}
         */
            function (mode) {
                this.viewMode = mode;
            };
        /**
         * @return {?}
         */
        NgxHmCalendarComponent.prototype.legendToggle = /**
         * @return {?}
         */
            function () {
                this.legendOpen = this.legendOpen === 'flyIn' ? 'flyOut' : 'flyIn';
            };
        NgxHmCalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ngx-hm-calendar',
                        template: "<div class=\"content\"\n     [ngClass]=\"className\"\n     [ngStyle]=\"size\">\n  <div class=\"header\">\n    <span class=\"header-button\"\n          (click)=\"prev()\">\n      <div class=\"button left\"></div>\n    </span>\n    <h1 class=\"title\"\n        (click)=\"openSelector($event)\">\n      {{ monDetail }}\n    </h1>\n    <span class=\"header-button\"\n          (click)=\"next()\">\n      <div class=\"button right\"></div>\n    </span>\n  </div>\n  <div class=\"view-block\"\n       [ngSwitch]=\"viewMode\">\n\n    <ngx-hm-calendar-month-view [className]=\"className\"\n                                *ngSwitchCase=\"'month'\"\n                                [weekNames]=\"weekNames\"\n                                [yearName]=\"yearName\"\n                                [monthName]=\"monthName\"\n                                [events]=\"events\"\n                                [weeklyEvents]=\"weeklyEvents\"\n                                [nstr]=\"nstr\"\n                                (open)=\"openEvent($event)\"\n                                (swipeleft)=\"next()\"\n                                (swiperight)=\"prev()\"></ngx-hm-calendar-month-view>\n\n    <ngx-hm-calendar-week-view [className]=\"className\"\n                               *ngSwitchCase=\"'week'\"\n                               [events]=\"events\"\n                               [weeklyEvents]=\"weeklyEvents\"\n                               [nstr]=\"nstr\"\n                               (open)=\"openEvent($event)\"\n                               (swipeleft)=\"next()\"\n                               (swiperight)=\"prev()\"></ngx-hm-calendar-week-view>\n\n    <ngx-hm-calendar-day-view [className]=\"className\"\n                              *ngSwitchCase=\"'day'\"\n                              [events]=\"events\"\n                              [weeklyEvents]=\"weeklyEvents\"\n                              [nstr]=\"nstr\"\n                              start=\"9:00\"\n                              end=\"23:00\"\n                              (open)=\"openEvent($event)\"\n                              (swipeleft)=\"next()\"\n                              (swiperight)=\"prev()\"></ngx-hm-calendar-day-view>\n\n  </div>\n\n  <ul class=\"type-buttom\"\n      [@animate]=\"legendOpen\">\n    <li>\n      <button class=\"button day\"\n              type=\"button\"\n              [disabled]=\"viewMode === 'day'\"\n              (click)=\"chaneMode('day')\">\u65E5</button>\n    </li>\n\n    <li>\n      <button class=\"button week\"\n              type=\"button\"\n              [disabled]=\"viewMode === 'week'\"\n              (click)=\"chaneMode('week')\">\u5468</button>\n    </li>\n\n    <li>\n      <div style=\"display: flex;\">\n        <span class=\"open-menu\"\n              (click)=\"legendToggle()\"></span>\n        <button class=\"button month\"\n                type=\"button\"\n                [disabled]=\"viewMode === 'month'\"\n                (click)=\"chaneMode('month')\">\u6708</button>\n      </div>\n    </li>\n  </ul>\n\n  <div class=\"legend\">\n    <span class=\"entry\"\n          *ngFor=\"let category of eventCategorys\">\n      {{ category.name }}\n      <span class=\"icon\"\n            [style.background]=\"category.color\"></span>\n    </span>\n  </div>\n</div>\n",
                        animations: [
                            animations.trigger('animate', [
                                animations.state('flyOut', animations.style({
                                    transform: 'translateX(calc(100% - 55px))',
                                })),
                                animations.state('flyIn', animations.style({
                                    transform: 'translateX(0)',
                                })),
                                animations.transition('flyOut => flyIn', [
                                    animations.style({
                                        transform: 'translateX(calc(100% - 55px))',
                                    }),
                                    animations.animate(time),
                                ]),
                                animations.transition('flyIn => flyOut', [
                                    animations.style({
                                        transform: 'translateX(0)',
                                    }),
                                    animations.animate(time),
                                ]),
                            ]),
                        ],
                        styles: [".content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;overflow:hidden}.content .header{height:50px;display:flex;justify-content:space-between;align-items:center}.content .header .title{padding:0;margin:0;font-size:20px;line-height:50px;cursor:pointer}.content .header .header-button{padding:1em}.content .header .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.content .header .header-button .button.left{border-width:7.5px 10px 7.5px 0}.content .header .header-button .button.right{border-width:7.5px 0 7.5px 10px}.content .type-buttom{z-index:2;position:absolute;right:0;list-style:none;bottom:0;margin:0 0 30px;text-align:right;padding:0}.content .type-buttom .open-menu{cursor:pointer;width:50px;background:#7ef3cb;border-radius:30px 0 0 30px}.content .type-buttom .button{cursor:pointer;border:0;padding:.5em 1.5em;color:#000;line-height:40px;width:100px;transition:all .2s linear}.content .type-buttom .button.month{background:#7ef3cb}.content .type-buttom .button.week{width:80px;background:#ffd353}.content .type-buttom .button.day{width:60px;background:#de5757}.content .type-buttom .button:hover{z-index:1;-webkit-transform:scale(1.1);transform:scale(1.1);color:#fff}.content .type-buttom .button:hover.month{background:#42b991}.content .type-buttom .button:hover.week{width:80px;background:#a98623}.content .type-buttom .button:hover.day{background:#af1d1d}.content .legend{width:100%;height:30px;line-height:30px}.content.black{background:#4a4a4a}.content.black .header{background:#333}.content.black .title{color:#fff}.content.black .left{border-color:transparent #a09fa0 transparent transparent}.content.black .left:hover{border-color:transparent #fff transparent transparent}.content.black .right{border-color:transparent transparent transparent #a09fa0}.content.black .right:hover{border-color:transparent transparent transparent #fff}.content.black .legend{background:#333;color:#fff}.content.white{background:#fff}.content.white .header{background:#c7c7c7}.content.white .title{color:#000}.content.white .left{border-color:transparent #000 transparent transparent}.content.white .left:hover{border-color:transparent #fff transparent transparent}.content.white .right{border-color:transparent transparent transparent #000}.content.white .right:hover{border-color:transparent transparent transparent #fff}.content.white .legend{background:#c7c7c7;color:#000}.content .view-block{height:calc(100% - 80px);overflow-y:auto}.entry{position:relative;padding:0 0 0 25px;font-size:13px;display:inline-block;line-height:30px;background:0 0}.entry .icon{position:absolute;height:5px;width:5px;top:12px;left:14px}.mask{position:absolute;overflow:hidden;width:110%;height:100%;right:0}.mask:after{content:'';position:absolute;top:-40%;right:110%;width:30px;height:200%;background:rgba(255,255,255,.3);-webkit-transform:rotate(20deg);transform:rotate(20deg)}"]
                    }] }
        ];
        /** @nocollapse */
        NgxHmCalendarComponent.ctorParameters = function () {
            return [
                { type: ngxRxModal.NgxRxModalService },
                { type: core.ComponentFactoryResolver }
            ];
        };
        NgxHmCalendarComponent.propDecorators = {
            weekNames: [{ type: core.Input }],
            yearName: [{ type: core.Input }],
            monthName: [{ type: core.Input }],
            dayName: [{ type: core.Input }],
            eventCategorys: [{ type: core.Input }],
            weeklyEvents: [{ type: core.Input }],
            events: [{ type: core.Input }],
            nstr: [{ type: core.Input }],
            open: [{ type: core.Output }],
            className: [{ type: core.Input }],
            size: [{ type: core.Input }],
            monthComponent: [{ type: core.ViewChild, args: [NgxHmCalendarMonthViewComponent,] }],
            weekComponent: [{ type: core.ViewChild, args: [NgxHmCalendarWeekViewComponent,] }],
            dayComponent: [{ type: core.ViewChild, args: [NgxHmCalendarDayViewComponent,] }]
        };
        return NgxHmCalendarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMPONENTS = [NgxHmCalendarDayViewComponent];
    var NgxHmCalendarDayModule = /** @class */ (function () {
        function NgxHmCalendarDayModule() {
        }
        NgxHmCalendarDayModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [COMPONENTS],
                        exports: [COMPONENTS],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
                    },] }
        ];
        return NgxHmCalendarDayModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var HammerConfig = /** @class */ (function (_super) {
        __extends(HammerConfig, _super);
        function HammerConfig() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.overrides = ( /** @type {?} */({
                swipe: { direction: hammerjs.DIRECTION_ALL },
            }));
            return _this;
        }
        return HammerConfig;
    }(platformBrowser.HammerGestureConfig));
    var NgxHmCalendarMonthModule = /** @class */ (function () {
        function NgxHmCalendarMonthModule() {
        }
        NgxHmCalendarMonthModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NgxHmCalendarMonthViewComponent, NgxHmCalendarMonthPopupComponent],
                        exports: [NgxHmCalendarMonthViewComponent],
                        entryComponents: [NgxHmCalendarMonthPopupComponent],
                        providers: [
                            {
                                provide: platformBrowser.HAMMER_GESTURE_CONFIG,
                                useClass: HammerConfig,
                            },
                        ],
                    },] }
        ];
        return NgxHmCalendarMonthModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxHmCalendarWeekModule = /** @class */ (function () {
        function NgxHmCalendarWeekModule() {
        }
        NgxHmCalendarWeekModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NgxHmCalendarWeekViewComponent],
                        exports: [NgxHmCalendarWeekViewComponent],
                    },] }
        ];
        return NgxHmCalendarWeekModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgxHmCalendarModule = /** @class */ (function () {
        function NgxHmCalendarModule() {
        }
        NgxHmCalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            ngxRxModal.NgxRxModalModule,
                            NgxHmCalendarMonthModule,
                            NgxHmCalendarWeekModule,
                            NgxHmCalendarDayModule,
                        ],
                        declarations: [NgxHmCalendarComponent],
                        exports: [NgxHmCalendarComponent],
                    },] }
        ];
        return NgxHmCalendarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.NgxHmCalendarComponent = NgxHmCalendarComponent;
    exports.NgxHmCalendarModule = NgxHmCalendarModule;
    exports.NgxHmCalendarViewMode = NgxHmCalendarViewMode;
    exports.ɵc = NgxHmCalendarDayViewComponent;
    exports.ɵh = NgxHmCalendarDayModule;
    exports.ɵf = NgxHmCalendarMonthPopupComponent;
    exports.ɵa = NgxHmCalendarMonthViewComponent;
    exports.ɵd = HammerConfig;
    exports.ɵe = NgxHmCalendarMonthModule;
    exports.ɵb = NgxHmCalendarWeekViewComponent;
    exports.ɵg = NgxHmCalendarWeekModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9uZ3gtaG0tY2FsZW5kYXIubW9kZWwudHMiLG51bGwsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC91dGlscy50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQudHMiLCJuZzovL25neC1obS1jYWxlbmRhci9saWIvd2Vlay9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3L25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL2RheS9uZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcvZGF0YS50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9kYXkvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3L25neC1obS1jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQudHMiLCJuZzovL25neC1obS1jYWxlbmRhci9saWIvbW9udGgvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC5tb2RlbC50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9uZ3gtaG0tY2FsZW5kYXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL2RheS9uZ3gtaG0tY2FsZW5kYXItZGF5Lm1vZHVsZS50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgubW9kdWxlLnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL3dlZWsvbmd4LWhtLWNhbGVuZGFyLXdlZWsubW9kdWxlLnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL25neC1obS1jYWxlbmRhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBOZ3hIbUNhbGVuZGFyV2VlayB7XHJcbiAgZGF5czogTmd4SG1DYWxlbmRhckRheVtdO1xyXG4gIHNlbGVjdGVkRGF5PzogTmd4SG1DYWxlbmRhckRheTtcclxuICBzdHlsZTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5neEhtQ2FsZW5kYXJEYXkge1xyXG4gIG90aGVyPzogYm9vbGVhbjtcclxuICBkYXRlOiBEYXRlO1xyXG4gIG5hbWU/OiBudW1iZXI7XHJcbiAgbnVtYmVyPzogbnVtYmVyO1xyXG4gIGV2ZW50cz86IE5neEhtQ2FsZW5kYXJFdmVudFtdO1xyXG4gIGlzVG9kYXk/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5neEhtQ2FsZW5kYXJFdmVudENhdGVnb3J5IHtcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOZ3hIbUNhbGVuZGFyRXZlbnQge1xyXG4gIHN0YXJ0OiBEYXRlO1xyXG4gIGVuZDogRGF0ZTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNvbG9yOiBzdHJpbmc7XHJcbiAgdXJsPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5neEhtQ2FsZW5kYXJFbG1EZXRpYWw8VCA9IG51bWJlcj4ge1xyXG4gIHN0eWxlOiB7XHJcbiAgICB0b3A/OiBUO1xyXG4gICAgaGVpZ2h0PzogVDtcclxuICAgIGxlZnQ/OiBUO1xyXG4gICAgd2lkdGg/OiBUO1xyXG4gICAgY29sb3I/OiBzdHJpbmc7XHJcbiAgfTtcclxuICBzdGFydHNCZWZvcmVXZWVrOiBib29sZWFuO1xyXG4gIGVuZHNBZnRlcldlZWs6IGJvb2xlYW47XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgdXJsPzogc3RyaW5nO1xyXG4gIGRhdGE6IE5neEhtQ2FsZW5kYXJFdmVudDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOZ3hIbUNhbGVuZGFyV2Vla0RheSB7XHJcbiAgZGF0ZTogRGF0ZTtcclxuICB5ZWFyOiBudW1iZXI7XHJcbiAgbW9udGg6IG51bWJlcjtcclxuICBkYXk6IG51bWJlcjtcclxuICBpc1RvZGF5OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOZ3hIbUNhbGVuZGFyVmlld01vZGUge1xyXG4gIG1vbnRoID0gJ21vbnRoJyxcclxuICB3ZWVrID0gJ3dlZWsnLFxyXG4gIGRheSA9ICdkYXknLFxyXG59XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgTmd4SG1DYWxlbmRhckRheSwgTmd4SG1DYWxlbmRhckV2ZW50LCBOZ3hIbUNhbGVuZGFyV2VlayB9IGZyb20gJy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcblxyXG4vKiogw6XCiMKkw6bClsK3w6bCmMKvw6XCkMKmw6fCgsK6w6nClsKPw6XCucK0ICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc19sZWFwKHllYXIpIHtcclxuICByZXR1cm4geWVhciAlIDEwMCA9PT0gMCA/ICh5ZWFyICUgNDAwID09PSAwID8gMSA6IDApIDogeWVhciAlIDQgPT09IDAgPyAxIDogMDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbGVuZGFyKFxyXG4gIHlub3c6IG51bWJlcixcclxuICBtbm93OiBudW1iZXIsXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSxcclxuICB3ZWVrbHlFdmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW10sXHJcbik6IEFycmF5PE5neEhtQ2FsZW5kYXJXZWVrPiB7XHJcbiAgLy8gw6TCu8KKw6XCpMKpXHJcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gIC8vIMOnwpXCtsOmwpzCiMOnwqzCrMOkwrjCgMOlwqTCqVxyXG4gIGNvbnN0IG5sc3RyID0gbmV3IERhdGUoeW5vdywgbW5vdywgMSk7XHJcbiAgLy8gw6fCrMKsw6TCuMKAw6XCpMKpw6bCmMKfw6bCnMKfw6XCucK+XHJcbiAgY29uc3QgZmlyc3RkYXkgPSBubHN0ci5nZXREYXkoKTtcclxuICAvLyDDpsKvwo/DpcKAwovDpsKcwojDp8KawoTDpcKkwqnDpsKVwrhcclxuICBjb25zdCBtX2RheXMgPSBuZXcgQXJyYXkoMzEsIDI4ICsgaXNfbGVhcCh5bm93KSwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzEpO1xyXG4gIC8vIMOnwpXCtsOlwonCjcOmwpzCiMOlwqTCqcOmwpXCuCvDp8KswqzDpMK4woDDpcKkwqnDpsKYwq/DpsKYwp/DpsKcwp/DpcK5wr7Dp8KawoTDpsKVwrjDpcKAwrwgw6fCjcKyw6XCvsKXIMOowqHCqMOmwqDCvMOowqHCjMOmwpXCuFxyXG4gIGNvbnN0IHRyX3N0ciA9IE1hdGguY2VpbCgobV9kYXlzW21ub3ddICsgZmlyc3RkYXkpIC8gNyk7XHJcbiAgLy8gw6bCr8KPw6XCkcKow6TCusKLw6TCu8K2XHJcbiAgY29uc3QgbXV0aWxlRXZlbnRzID0gZXZlbnRzLmNvbmNhdCguLi53ZWVrbHlFdmVudHMubWFwKGdldE11dGlwbGVFdmVudHMoeW5vdywgbW5vdykpKTtcclxuICAvLyDDp8K1wpDDpsKewpxcclxuICBjb25zdCBjYWxlbmRhcjogTmd4SG1DYWxlbmRhcldlZWtbXSA9IFtdO1xyXG5cclxuICBsZXQgaSwgaywgaWR4LCBkYXRlX3N0cjtcclxuXHJcbiAgLy8gw6jCocKow6bCoMK8w6fCmsKEw6jCocKMXHJcbiAgZm9yIChpID0gMDsgaSA8IHRyX3N0cjsgaSsrKSB7XHJcbiAgICBjb25zdCB3ZWVrOiBOZ3hIbUNhbGVuZGFyV2VlayA9IHtcclxuICAgICAgZGF5czogW10sXHJcbiAgICAgIHN0eWxlOiB7fSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gw6jCocKow6bCoMK8w6bCr8KPw6jCocKMw6fCmsKEw6XClsKuw6XChcKDw6bCoMK8XHJcbiAgICBmb3IgKGsgPSAwOyBrIDwgNzsgaysrKSB7XHJcbiAgICAgIC8vIMOlwpbCrsOlwoXCg8OmwqDCvMOowofCqsOnwoTCtsOlwrrCj8OlwojCl8OowpnCn1xyXG4gICAgICBpZHggPSBpICogNyArIGs7XHJcbiAgICAgIC8vIMOowqjCiMOnwq7Cl8OmwpfCpcOmwpzCn1xyXG4gICAgICBkYXRlX3N0ciA9IGlkeCAtIGZpcnN0ZGF5ICsgMTtcclxuXHJcbiAgICAgIGxldCBjYWxlbmRhckRheTogTmd4SG1DYWxlbmRhckRheTtcclxuXHJcbiAgICAgIGlmIChkYXRlX3N0ciA8PSAwKSB7XHJcbiAgICAgICAgLy8gw6nCgcKOw6bCv8K+w6fChMKhw6bClcKIw6bCl8Klw6bCnMKfw6/CvMKIw6XCsMKPw6bClsK8w6fCrcKJw6bClsK8w6nCm8K2w6fCmsKEw6/CvMKJXHJcbiAgICAgICAgLy8gw6XCj8KWw6fClcK2w6bCnMKIw6fCrMKsw6TCuMKAw6XCpMKpXHJcbiAgICAgICAgY29uc3QgbVByZXYgPSBuZXcgRGF0ZSh5bm93LCBtbm93LCAxKTtcclxuICAgICAgICAvLyDDpcKwwofDpsKXwqXDpsKcwp8tMcOnwoLCusOkwrjCisOlwoDCi8OmwpzCiMOnwprChMOmwpzCgMOlwr7CjMOkwrjCgMOlwqTCqcOvwrzCjMOpwprCqMOowpHCl8OkwrjCisOlwoDCi8OmwpzCiMOlwqTCqcOmwpXCuMOowq7CisOlwozCllxyXG4gICAgICAgIG1QcmV2LnNldERhdGUobVByZXYuZ2V0RGF0ZSgpICsgZGF0ZV9zdHIgLSAxKTtcclxuICAgICAgICAvLyDDqMKowq3DpcKuwprDpsKXwqXDpsKcwp9cclxuICAgICAgICAvLyBkYXRlX3N0ciA9IG1QcmV2LmdldERhdGUoKTtcclxuICAgICAgICBjYWxlbmRhckRheSA9IHsgZGF0ZTogbVByZXYsIG90aGVyOiB0cnVlIH07XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0ZV9zdHIgPiBtX2RheXNbbW5vd10pIHtcclxuICAgICAgICAvLyDDqcKBwo7DpsK/wr7Dp8KEwqHDpsKVwojDpsKXwqXDpsKcwp/Dr8K8wojDpcKkwqfDpsKWwrzDpsKcwojDp8K4wr3DpcKkwqnDpsKVwrjDp8KawoTDr8K8wolcclxuICAgICAgICAvLyDDpcKPwpbDp8KVwrbDpsKcwojDp8KswqzDpMK4woDDpcKkwqlcclxuICAgICAgICBjb25zdCBtTmV4dCA9IG5ldyBEYXRlKHlub3csIG1ub3csIDEpO1xyXG4gICAgICAgIC8vIMOlwo/ClsOkwrjCi8OlwoDCi8OmwpzCiMOnwqzCrMOkwrjCgMOlwqTCqVxyXG4gICAgICAgIG1OZXh0LnNldE1vbnRoKG1OZXh0LmdldE1vbnRoKCkgKyAxKTtcclxuICAgICAgICAvLyDDqcKawqjDqMKRwpfDpMK4wovDpcKAwovDpsKcwojDpcKkwqnDpsKVwrjDqMKuworDpcKMwpZcclxuICAgICAgICBtTmV4dC5zZXREYXRlKG1OZXh0LmdldERhdGUoKSArIChkYXRlX3N0ciAtIG1fZGF5c1ttbm93XSkgLSAxKTtcclxuICAgICAgICAvLyDDqMKowq3DpcKuwprDpsKXwqXDpsKcwp9cclxuICAgICAgICAvLyBkYXRlX3N0ciA9IG1OZXh0LmdldERhdGUoKTtcclxuICAgICAgICBjYWxlbmRhckRheSA9IHsgZGF0ZTogbU5leHQsIG90aGVyOiB0cnVlIH07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2FsZW5kYXJEYXkgPSB7IGRhdGU6IG5ldyBEYXRlKHlub3csIG1ub3csIGRhdGVfc3RyKSB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjYWxlbmRhckRheS5ldmVudHMgPSBtdXRpbGVFdmVudHMuZmlsdGVyKGV2ZW50ID0+IGNvbnRhaW4oZXZlbnQsIGNhbGVuZGFyRGF5LmRhdGUpKTtcclxuICAgICAgY2FsZW5kYXJEYXkubmFtZSA9IGNhbGVuZGFyRGF5LmRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgIGNhbGVuZGFyRGF5Lm51bWJlciA9IGNhbGVuZGFyRGF5LmRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICBjYWxlbmRhckRheS5pc1RvZGF5ID1cclxuICAgICAgICBjYWxlbmRhckRheS5kYXRlLmdldEZ1bGxZZWFyKCkgPT09IHRvZGF5LmdldEZ1bGxZZWFyKCkgJiZcclxuICAgICAgICBjYWxlbmRhckRheS5kYXRlLmdldE1vbnRoKCkgPT09IHRvZGF5LmdldE1vbnRoKCkgJiZcclxuICAgICAgICBjYWxlbmRhckRheS5kYXRlLmdldERhdGUoKSA9PT0gdG9kYXkuZ2V0RGF0ZSgpO1xyXG5cclxuICAgICAgd2Vlay5kYXlzLnB1c2goY2FsZW5kYXJEYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGVuZGFyLnB1c2god2Vlayk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2FsZW5kYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWluKGV2ZW50OiBOZ3hIbUNhbGVuZGFyRXZlbnQsIGRhdGU6IERhdGUpOiBib29sZWFuIHtcclxuICBpZiAoZXZlbnQuc3RhcnQgJiYgZXZlbnQuZW5kKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKFxyXG4gICAgICBldmVudC5zdGFydC5nZXRGdWxsWWVhcigpLFxyXG4gICAgICBldmVudC5zdGFydC5nZXRNb250aCgpLFxyXG4gICAgICBldmVudC5zdGFydC5nZXREYXRlKCksXHJcbiAgICApO1xyXG4gICAgY29uc3QgZW5kID0gbmV3IERhdGUoZXZlbnQuZW5kLmdldEZ1bGxZZWFyKCksIGV2ZW50LmVuZC5nZXRNb250aCgpLCBldmVudC5lbmQuZ2V0RGF0ZSgpKTtcclxuICAgIGVuZC5zZXREYXRlKGVuZC5nZXREYXRlKCkgKyAxKTtcclxuXHJcbiAgICByZXR1cm4gc3RhcnQuZ2V0VGltZSgpIDw9IGRhdGUuZ2V0VGltZSgpICYmIGVuZC5nZXRUaW1lKCkgPiBkYXRlLmdldFRpbWUoKTtcclxuICB9XHJcblxyXG4gIGlmIChldmVudC5zdGFydCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZS5nZXRGdWxsWWVhcigpICYmXHJcbiAgICAgIGV2ZW50LnN0YXJ0LmdldE1vbnRoKCkgPT09IGRhdGUuZ2V0TW9udGgoKSAmJlxyXG4gICAgICBldmVudC5zdGFydC5nZXREYXRlKCkgPT09IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TXV0aXBsZUV2ZW50cyh5bm93OiBudW1iZXIsIG1ub3c6IG51bWJlcikge1xyXG4gIHJldHVybiAoZXZlbnQ6IE5neEhtQ2FsZW5kYXJFdmVudCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBldmVudC5zdGFydDtcclxuICAgIGNvbnN0IGRpc3RhbmNlID0gZXZlbnQuZW5kLmdldFRpbWUoKSAtIGV2ZW50LnN0YXJ0LmdldFRpbWUoKTtcclxuICAgIGNvbnN0IGN1cnJlbnREYXkgPSBzdGFydC5nZXREYXkoKTtcclxuICAgIGNvbnN0IGZpcnN0RGF0ZSA9IG5ldyBEYXRlKHlub3csIG1ub3csIDEpO1xyXG4gICAgY29uc3QgZmlyc3REYXkgPSBmaXJzdERhdGUuZ2V0RGF5KCk7XHJcbiAgICBjb25zdCBzZWNvbmREYXRlID0gbmV3IERhdGUoeW5vdywgbW5vdyArIDEsIDEpO1xyXG4gICAgY29uc3QgcmVzdWx0OiBEYXRlW10gPSBbXTtcclxuXHJcbiAgICBsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKGZpcnN0RGF0ZS5zZXREYXRlKGZpcnN0RGF0ZS5nZXREYXRlKCkgKyAoY3VycmVudERheSAtIGZpcnN0RGF5KSkpO1xyXG5cclxuICAgIG5ld0RhdGUuc2V0SG91cnMoc3RhcnQuZ2V0SG91cnMoKSk7XHJcbiAgICBuZXdEYXRlLnNldE1pbnV0ZXMoc3RhcnQuZ2V0TWludXRlcygpKTtcclxuICAgIG5ld0RhdGUuc2V0U2Vjb25kcyhzdGFydC5nZXRTZWNvbmRzKCkpO1xyXG4gICAgbmV3RGF0ZS5zZXRNaWxsaXNlY29uZHMoc3RhcnQuZ2V0TWlsbGlzZWNvbmRzKCkpO1xyXG5cclxuICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKSk7XHJcblxyXG4gICAgd2hpbGUgKG5ld0RhdGUgPCBzZWNvbmREYXRlKSB7XHJcbiAgICAgIG5ld0RhdGUgPSBuZXcgRGF0ZShuZXdEYXRlLnNldERhdGUobmV3RGF0ZS5nZXREYXRlKCkgKyA3KSk7XHJcbiAgICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKG5ld0RhdGUuZ2V0VGltZSgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5tYXAoeCA9PiB7XHJcbiAgICAgIGNvbnN0IGNlID0gT2JqZWN0LmFzc2lnbih7fSwgZXZlbnQpO1xyXG4gICAgICBjZS5zdGFydCA9IG5ldyBEYXRlKHguZ2V0VGltZSgpKTtcclxuICAgICAgY2UuZW5kID0gbmV3IERhdGUoeC5zZXRUaW1lKHguZ2V0VGltZSgpICsgZGlzdGFuY2UpKTtcclxuICAgICAgcmV0dXJuIGNlO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTmd4SG1DYWxlbmRhckRheSxcclxuICBOZ3hIbUNhbGVuZGFyRXZlbnQsXHJcbiAgTmd4SG1DYWxlbmRhcldlZWssXHJcbn0gZnJvbSAnLi4vLi4vbmd4LWhtLWNhbGVuZGFyLm1vZGVsJztcclxuaW1wb3J0IHsgZ2V0Q2FsZW5kYXIgfSBmcm9tICcuLi91dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhci1tb250aC12aWV3JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJtb250aCBuZXdcIlxyXG4gICAgIFtuZ0NsYXNzXT1cImNsYXNzTmFtZVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJ3ZWVrXCJcclxuICAgICAgICpuZ0Zvcj1cImxldCB3ZWVrIG9mIGNhbGVuZGFyRGF0YTsgdHJhY2tCeTogdHJhY2tCeUZuOyBsZXQgd2Vla19pbmRleCA9IGluZGV4O1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImRheVwiXHJcbiAgICAgICAgICpuZ0Zvcj1cImxldCBkYXkgb2Ygd2Vlay5kYXlzOyB0cmFja0J5OiB0cmFja0J5Rm47IGxldCBkYXlfaW5kZXggPSBpbmRleDtcIlxyXG4gICAgICAgICBbbmdDbGFzc109XCJ7IG90aGVyOiBkYXkub3RoZXIsIHRvZGF5OiBkYXkuaXNUb2RheSB9XCJcclxuICAgICAgICAgKGNsaWNrKT1cInNob3dFdmVudExpc3Qod2VlaywgZGF5KVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF5LW5hbWVcIj57eyB3ZWVrTmFtZXNbZGF5Lm5hbWVdIH19PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkYXktbnVtYmVyXCI+e3sgZGF5Lm51bWJlciB9fTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF5LWV2ZW50c1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGV2ZW50IG9mIGRheS5ldmVudHM7XCI+XHJcbiAgICAgICAgICA8c3BhbiBbc3R5bGUuYmFja2dyb3VuZF09XCJldmVudC5jb2xvclwiPjwvc3Bhbj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJkZXRhaWxzXCJcclxuICAgICAgICAgW25nQ2xhc3NdPVwieyAnaW4nOiB3ZWVrLnNlbGVjdGVkRGF5LCAnb3V0JzogIXdlZWsuc2VsZWN0ZWREYXkgfVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYXJyb3ctY29udGFpbmVyXCJcclxuICAgICAgICAgICAqbmdJZj1cIndlZWsuc2VsZWN0ZWREYXlcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsbFwiXHJcbiAgICAgICAgICAgICBbbmdTdHlsZV09XCJ3ZWVrLnN0eWxlXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZXZlbnRzXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIndlZWsuc2VsZWN0ZWREYXlcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJldmVudFwiXHJcbiAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiB3ZWVrLnNlbGVjdGVkRGF5LmV2ZW50cztcIlxyXG4gICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbkV2ZW50KGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXZlbnQtY2F0ZWdvcnlcIlxyXG4gICAgICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kXT1cImV2ZW50LmNvbG9yXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuPnt7IGV2ZW50LnRpdGxlIH19PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrO21heC1oZWlnaHQ6ODV2aH0ubW9udGh7b3BhY2l0eTowfS5tb250aC5uZXd7LXdlYmtpdC1hbmltYXRpb246MXMgZWFzZS1vdXQgZmFkZUluO2FuaW1hdGlvbjoxcyBlYXNlLW91dCBmYWRlSW47b3BhY2l0eToxO292ZXJmbG93LXk6c2Nyb2xsfS5tb250aC5ibGFjayAuZGF5e2NvbG9yOiNmZmZ9Lm1vbnRoLmJsYWNrIC5kYXkub3RoZXJ7Y29sb3I6IzcxNzE3MX0ubW9udGguYmxhY2sgLmRheS50b2RheXtiYWNrZ3JvdW5kOiM0NjcyOTg7Y29sb3I6IzUzYjdmZn0ubW9udGguYmxhY2sgLmRheS1uYW1le2NvbG9yOnJnYmEoMjU1LDI1NSwyNTUsLjUpfS5tb250aC5ibGFjayAuZGV0YWlsc3tiYWNrZ3JvdW5kOiNhNGE0YTQ7Y29sb3I6I2ZmZn0ubW9udGgud2hpdGUgLmRheXtjb2xvcjojMDAwfS5tb250aC53aGl0ZSAuZGF5Lm90aGVyLC5tb250aC53aGl0ZSAuZGF5Lm90aGVyIC5kYXktbmFtZXtjb2xvcjojZGFkYWRhfS5tb250aC53aGl0ZSAuZGF5LnRvZGF5e2JhY2tncm91bmQ6I2Q3ZWNmZjtjb2xvcjojNTNiN2ZmfS5tb250aC53aGl0ZSAuZGF5LW5hbWV7Y29sb3I6I2RiNDQzN30ubW9udGgud2hpdGUgLmFycm93e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZGNmZmM3fS5tb250aC53aGl0ZSAuZGV0YWlsc3tiYWNrZ3JvdW5kOiNkY2ZmYzd9Lm1vbnRoIC53ZWVre2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0ubW9udGggLndlZWsgLmRheXt6LWluZGV4OjE7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6Y2FsYygxMDAlIC8gNyk7cGFkZGluZzoxMHB4O3RleHQtYWxpZ246Y2VudGVyO2N1cnNvcjpwb2ludGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubW9udGggLndlZWsgLmRheSAuZGF5LWV2ZW50c3tsaXN0LXN0eWxlOm5vbmU7bWFyZ2luLXRvcDozcHg7dGV4dC1hbGlnbjpjZW50ZXI7bWluLWhlaWdodDoxMnB4O2xpbmUtaGVpZ2h0OjZweDtvdmVyZmxvdzpoaWRkZW59Lm1vbnRoIC53ZWVrIC5kYXkgLmRheS1ldmVudHMgc3BhbntkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDo1cHg7aGVpZ2h0OjVweDttYXJnaW46MCAxcHh9Lm1vbnRoIC53ZWVrIC5kYXkgLmRheS1uYW1le2ZvbnQtc2l6ZTo5cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO21hcmdpbi1ib3R0b206NXB4O2xldHRlci1zcGFjaW5nOi43cHh9Lm1vbnRoIC53ZWVrIC5kYXkgLmRheS1udW1iZXJ7Zm9udC1zaXplOjI0cHh9Lm1vbnRoIC53ZWVrIC5kZXRhaWxze2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTttYXgtaGVpZ2h0OjUwMDBweDt3aWR0aDoxMDAlO21hcmdpbi10b3A6NXB4O2JvcmRlci1yYWRpdXM6NHB4O2ZsZXg6MSAxIDEwMCU7bWluLXdpZHRoOjEwMCU7bWF4LXdpZHRoOjEwMCV9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzLmlue2Rpc3BsYXk6YmxvY2s7LXdlYmtpdC1hbmltYXRpb246LjVzIGN1YmljLWJlemllcigxLDAsMSwwKSBtb3ZlRnJvbVRvcEZhZGU7YW5pbWF0aW9uOi41cyBjdWJpYy1iZXppZXIoMSwwLDEsMCkgbW92ZUZyb21Ub3BGYWRlfS5tb250aCAud2VlayAuZGV0YWlscy5pbiAuZXZlbnR7LXdlYmtpdC1hbmltYXRpb246LjNzIC4zcyBib3RoIGZhZGVJbjthbmltYXRpb246LjNzIC4zcyBib3RoIGZhZGVJbn0ubW9udGggLndlZWsgLmRldGFpbHMub3V0e2Rpc3BsYXk6YmxvY2s7ei1pbmRleDotMTttYXgtaGVpZ2h0OjA7dHJhbnNpdGlvbjphbGwgLjVzIGN1YmljLWJlemllcigwLDEsMCwxKX0ubW9udGggLndlZWsgLmRldGFpbHMub3V0IC5ldmVudHstd2Via2l0LWFuaW1hdGlvbjouM3MgYm90aCBmYWRlSW47YW5pbWF0aW9uOi4zcyBib3RoIGZhZGVJbn0ubW9udGggLndlZWsgLmRldGFpbHMgLmFycm93LWNvbnRhaW5lcnt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleH0ubW9udGggLndlZWsgLmRldGFpbHMgLmFycm93LWNvbnRhaW5lciAuZmlsbHt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZX0ubW9udGggLndlZWsgLmRldGFpbHMgLmFycm93LWNvbnRhaW5lciAuYXJyb3d7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlWCgtMi41cHgpIHRyYW5zbGF0ZVkoLTVweCk7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTIuNXB4KSB0cmFuc2xhdGVZKC01cHgpO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci13aWR0aDowIDVweCA1cHg7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNhNGE0YTR9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHN7bWluLWhlaWdodDoxMjBweDtwYWRkaW5nOjdweCAwO292ZXJmbG93LXk6YXV0bztvdmVyZmxvdy14OmhpZGRlbn0ubW9udGggLndlZWsgLmRldGFpbHMgLmV2ZW50cyAuZXZlbnR7Zm9udC1zaXplOjE2cHg7bGluZS1oZWlnaHQ6MjJweDtsZXR0ZXItc3BhY2luZzouNXB4O3BhZGRpbmc6MnB4IDE2cHg7dmVydGljYWwtYWxpZ246dG9wO2Rpc3BsYXk6ZmxleH0ubW9udGggLndlZWsgLmRldGFpbHMgLmV2ZW50cyAuZXZlbnQuZW1wdHl7Y29sb3I6I2VlZX0ubW9udGggLndlZWsgLmRldGFpbHMgLmV2ZW50cyAuZXZlbnQgLmV2ZW50LWNhdGVnb3J5e2hlaWdodDoxMHB4O3dpZHRoOjEwcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjZweCA1cHggMDt2ZXJ0aWNhbC1hbGlnbjp0b3B9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50IHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowIDAgMCA3cHh9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50IHNwYW46aG92ZXJ7Y29sb3I6I2ZmMDtmb250LXNpemU6MTIwJX0ubW9udGggLndlZWsgLmRldGFpbHMgLmV2ZW50cyAuZXZlbnQgc3BhbjphY3RpdmV7Y29sb3I6cmVkfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MzIwcHgpey5kYXl7cGFkZGluZzo1cHh9fUAtd2Via2l0LWtleWZyYW1lcyBtb3ZlRnJvbVRvcEZhZGV7MCV7bWF4LWhlaWdodDowfTEwMCV7bWF4LWhlaWdodDo1MDAwcHh9fUBrZXlmcmFtZXMgbW92ZUZyb21Ub3BGYWRlezAle21heC1oZWlnaHQ6MH0xMDAle21heC1oZWlnaHQ6NTAwMHB4fX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZUluezAle29wYWNpdHk6MH19QGtleWZyYW1lcyBmYWRlSW57MCV7b3BhY2l0eTowfX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkZU91dHsxMDAle29wYWNpdHk6MH19QGtleWZyYW1lcyBmYWRlT3V0ezEwMCV7b3BhY2l0eTowfX1gLCBgLmJsdWV7YmFja2dyb3VuZDojOWNjYWVifS5vcmFuZ2V7YmFja2dyb3VuZDojZjdhNzAwfS5ncmVlbntiYWNrZ3JvdW5kOiM5OWM2NmR9LnllbGxvd3tiYWNrZ3JvdW5kOiNmOWU5MDB9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKVxyXG4gIGNsYXNzTmFtZSA9ICdibGFjayc7XHJcbiAgQElucHV0KClcclxuICB3ZWVrTmFtZXM6IHN0cmluZ1tdID0gWyfDpsKYwp/DpsKcwp/DpsKXwqUnLCAnw6bCmMKfw6bCnMKfw6TCuMKAJywgJ8OmwpjCn8OmwpzCn8OkwrrCjCcsICfDpsKYwp/DpsKcwp/DpMK4woknLCAnw6bCmMKfw6bCnMKfw6XCm8KbJywgJ8OmwpjCn8OmwpzCn8OkwrrClCcsICfDpsKYwp/DpsKcwp/DpcKFwq0nXTtcclxuICBASW5wdXQoKVxyXG4gIHllYXJOYW1lID0gJ8OlwrnCtCc7XHJcbiAgQElucHV0KClcclxuICBtb250aE5hbWUgPSAnw6bCnMKIJztcclxuICBASW5wdXQoKVxyXG4gIHdlZWtseUV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIG5zdHIgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY2FsZW5kYXJEYXRhID0gZ2V0Q2FsZW5kYXIodGhpcy55bm93LCB0aGlzLm1ub3csIHRoaXMuZXZlbnRzLCB0aGlzLndlZWtseUV2ZW50cyk7XHJcblxyXG4gIHByaXZhdGUgZWFjaFByZXNlbnQgPSAxMDAgLyAxNDtcclxuXHJcbiAgZ2V0IHlub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldEZ1bGxZZWFyKCk7XHJcbiAgfVxyXG4gIGdldCBtbm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXRNb250aCgpO1xyXG4gIH1cclxuICBnZXQgZG5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0RGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBwcmV2KCkge1xyXG4gICAgdGhpcy5uc3RyLnNldE1vbnRoKHRoaXMubnN0ci5nZXRNb250aCgpIC0gMSk7XHJcbiAgICB0aGlzLmNhbGVuZGFyRGF0YSA9IGdldENhbGVuZGFyKHRoaXMueW5vdywgdGhpcy5tbm93LCB0aGlzLmV2ZW50cywgdGhpcy53ZWVrbHlFdmVudHMpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpIHtcclxuICAgIHRoaXMubnN0ci5zZXRNb250aCh0aGlzLm5zdHIuZ2V0TW9udGgoKSArIDEpO1xyXG4gICAgdGhpcy5jYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnlub3csIHRoaXMubW5vdywgdGhpcy5ldmVudHMsIHRoaXMud2Vla2x5RXZlbnRzKTtcclxuICB9XHJcblxyXG4gIHNob3dFdmVudExpc3Qod2VlazogTmd4SG1DYWxlbmRhcldlZWssIGRheTogTmd4SG1DYWxlbmRhckRheSkge1xyXG4gICAgaWYgKGRheS5ldmVudHMubGVuZ3RoKSB7XHJcbiAgICAgIGlmICh3ZWVrLnNlbGVjdGVkRGF5ICYmIHdlZWsuc2VsZWN0ZWREYXkgPT09IGRheSkge1xyXG4gICAgICAgIHdlZWsuc2VsZWN0ZWREYXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhckRhdGEuZm9yRWFjaCh3ID0+IHtcclxuICAgICAgICAgIHcuc2VsZWN0ZWREYXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHdlZWsuc2VsZWN0ZWREYXkgPSBkYXk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByZXNlbnQgPSAoZGF5Lm5hbWUgKiAyICsgMSkgKiB0aGlzLmVhY2hQcmVzZW50O1xyXG4gICAgICAgIHdlZWsuc3R5bGUgPSB7XHJcbiAgICAgICAgICBmbGV4OiBgMSAxICR7cHJlc2VudH0lYCxcclxuICAgICAgICAgICdtYXgtd2lkdGgnOiBgJHtwcmVzZW50fSVgLFxyXG4gICAgICAgICAgJ21pbi13aWR0aCc6IGAke3ByZXNlbnR9JWAsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbkV2ZW50KGV2ZW50OiBOZ3hIbUNhbGVuZGFyRXZlbnQpIHtcclxuICAgIHRoaXMub3Blbi5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xyXG4gICAgcmV0dXJuIGluZGV4O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMuZXZlbnRzIHx8IGNoYW5nZXMubnN0cikge1xyXG4gICAgICB0aGlzLmNhbGVuZGFyRGF0YSA9IGdldENhbGVuZGFyKHRoaXMueW5vdywgdGhpcy5tbm93LCB0aGlzLmV2ZW50cywgdGhpcy53ZWVrbHlFdmVudHMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZ2V0TXV0aXBsZUV2ZW50cyB9IGZyb20gJy4uLy4uL21vbnRoL3V0aWxzJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckVsbURldGlhbCwgTmd4SG1DYWxlbmRhckV2ZW50LCBOZ3hIbUNhbGVuZGFyV2Vla0RheSB9IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhbC13ZWVrLXZpZXdcIlxyXG4gICAgIFtuZ0NsYXNzXT1cImNsYXNzTmFtZVwiPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiY2FsLWRheS1oZWFkZXJzXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImNhbC1oZWFkZXJcIlxyXG4gICAgICAgICAqbmdGb3I9XCJsZXQgd2Vla0RheSBvZiB3ZWVrRGF5czsgbGV0IGkgPSBpbmRleDsgbGV0IGlzRmlyc3QgPSBmaXJzdDsgbGV0IGlzTGFzdCA9IGxhc3RcIlxyXG4gICAgICAgICBbY2xhc3MuY2FsLXdlZWtlbmRdPVwiaXNGaXJzdCB8fCBpc0xhc3RcIlxyXG4gICAgICAgICBbY2xhc3MuY2FsLXRvZGF5XT1cIndlZWtEYXkuaXNUb2RheVwiPlxyXG4gICAgICA8Yj57eyB3ZWVrTmFtZXNbaV0gfX08L2I+XHJcbiAgICAgIDxicj5cclxuICAgICAgPHNwYW4+e3sgd2Vla0RheS5kYXkgfX17eyBkYXlOYW1lIH19PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJhY3Rpb24tYmxvY2tcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzLXJvdyBcIlxyXG4gICAgICAgICAqbmdGb3I9XCJsZXQgd2Vla0V2ZW50IG9mIHdlZWtFdmVudHM7IGxldCBpID0gaW5kZXg7XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyIGNhbC1zdGFydHMtd2l0aGluLXdlZWsgY2FsLWVuZHMtd2l0aGluLXdlZWsgXCJcclxuICAgICAgICAgICBbc3R5bGUud2lkdGhdPVwid2Vla0V2ZW50LnN0eWxlLndpZHRoXCJcclxuICAgICAgICAgICBbc3R5bGUubGVmdF09XCJ3ZWVrRXZlbnQuc3R5bGUubGVmdFwiXHJcbiAgICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLXdlZWtdPVwid2Vla0V2ZW50LnN0YXJ0c0JlZm9yZVdlZWtcIlxyXG4gICAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4td2Vla109XCJ3ZWVrRXZlbnQuZW5kc0FmdGVyV2Vla1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRcIlxyXG4gICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRdPVwid2Vla0V2ZW50LnN0eWxlLmNvbG9yXCI+XHJcbiAgICAgICAgICA8IS0tIDxzcGFuIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvbnMgXCI+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvbiBcIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1mdyBmYS1wZW5jaWxcIj48L2k+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJjYWwtZXZlbnQtYWN0aW9uIFwiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWZ3IGZhLXRpbWVzXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L3NwYW4+IC0tPlxyXG4gICAgICAgICAgPGEgY2xhc3M9XCJjYWwtZXZlbnQtdGl0bGUgXCJcclxuICAgICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OiB2b2lkKDApXCJcclxuICAgICAgICAgICAgIChjbGljayk9XCJvcGVuRXZlbnQod2Vla0V2ZW50LmRhdGEpXCI+e3sgd2Vla0V2ZW50LnRpdGxlIH19PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgOmhvc3R7bWluLWhlaWdodDo1MHZoO21heC1oZWlnaHQ6ODV2aDtkaXNwbGF5OmJsb2NrfS5ibGFjayAuY2FsLWRheS1oZWFkZXJze2JhY2tncm91bmQ6IzRhNGE0YX0uYmxhY2sgLmNhbC1oZWFkZXJ7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZTFlMWUxO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlMWUxZTE7Y29sb3I6I2ZmZn0uYmxhY2sgLmNhbC1oZWFkZXIuY2FsLXRvZGF5e2JhY2tncm91bmQtY29sb3I6IzQ2NzI5OH0ud2hpdGUgLmNhbC1kYXktaGVhZGVyc3tiYWNrZ3JvdW5kOiNmZmZ9LndoaXRlIC5jYWwtaGVhZGVye2JvcmRlci1yaWdodDoxcHggc29saWQgI2UxZTFlMTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTFlMWUxfS53aGl0ZSAuY2FsLWhlYWRlci5jYWwtdG9kYXl7YmFja2dyb3VuZC1jb2xvcjojZDdlY2ZmfS5jYWwtd2Vlay12aWV3e2hlaWdodDpjYWxjKDEwMCUgLSAzMHB4KTtvdmVyZmxvdy15OmF1dG99LmNhbC13ZWVrLXZpZXcgLmNhbC1kYXktaGVhZGVyc3tkaXNwbGF5OmZsZXg7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTAwJTt6LWluZGV4OjF9LmNhbC13ZWVrLXZpZXcgLmNhbC1kYXktaGVhZGVycyAuY2FsLWhlYWRlcntmbGV4OjE7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo1cHg7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO2hlaWdodDo1MHB4fS5jYWwtd2Vlay12aWV3IC5hY3Rpb24tYmxvY2t7cGFkZGluZy10b3A6NjJweH0uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50cy1yb3d7cG9zaXRpb246cmVsYXRpdmU7aGVpZ2h0OjMzcHh9LmNhbC13ZWVrLXZpZXcgLmNhbC1ldmVudC1jb250YWluZXJ7ZGlzcGxheTppbmxpbmUtYmxvY2s7cG9zaXRpb246YWJzb2x1dGV9LmNhbC13ZWVrLXZpZXcgLmNhbC1lbmRzLXdpdGhpbi13ZWVrIC5jYWwtZXZlbnR7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweH0uY2FsLXdlZWstdmlldyAuY2FsLXN0YXJ0cy13aXRoaW4td2VlayAuY2FsLWV2ZW50e2JvcmRlci10b3AtbGVmdC1yYWRpdXM6NXB4O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NXB4fS5jYWwtd2Vlay12aWV3IC5jYWwtZXZlbnR7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO3BhZGRpbmc6MCAxMHB4O2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1sZWZ0OjJweDttYXJnaW4tcmlnaHQ6MnB4O2hlaWdodDozMHB4O2xpbmUtaGVpZ2h0OjMwcHg7YmFja2dyb3VuZC1jb2xvcjojZDFlOGZmO2JvcmRlcjoxcHggc29saWQgIzFlOTBmZjtjb2xvcjojMWU5MGZmfS5jYWwtd2Vlay12aWV3IC5jYWwtZXZlbnQub3Jhbmdle2JhY2tncm91bmQtY29sb3I6I2ZmYzY4MTtib3JkZXItY29sb3I6I2FkMjEyMX0uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50LmJsdWV7YmFja2dyb3VuZC1jb2xvcjojYzRlN2ZmO2JvcmRlci1jb2xvcjojMDgzNGUzfWF7Y29sb3I6IzAwN2JmZjt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50Oy13ZWJraXQtdGV4dC1kZWNvcmF0aW9uLXNraXA6b2JqZWN0c30uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50LXRpdGxlOmxpbmt7Y29sb3I6Y3VycmVudENvbG9yfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgY2xhc3NOYW1lID0gJ2JsYWNrJztcclxuICBASW5wdXQoKVxyXG4gIGRheU5hbWUgPSAnw6jCmcKfJztcclxuICBASW5wdXQoKVxyXG4gIHdlZWtOYW1lczogc3RyaW5nW10gPSBbJ8OmwpjCn8OmwpzCn8OmwpfCpScsICfDpsKYwp/DpsKcwp/DpMK4woAnLCAnw6bCmMKfw6bCnMKfw6TCusKMJywgJ8OmwpjCn8OmwpzCn8OkwrjCiScsICfDpsKYwp/DpsKcwp/DpcKbwpsnLCAnw6bCmMKfw6bCnMKfw6TCusKUJywgJ8OmwpjCn8OmwpzCn8OlwoXCrSddO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgbnN0ciA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB3ZWVrRGF5czogTmd4SG1DYWxlbmRhcldlZWtEYXlbXSA9IFtdO1xyXG4gIHdlZWtFdmVudHM6IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWw8c3RyaW5nPltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0VmFsdWUoKSB7XHJcbiAgICB0aGlzLnNldFdlZWtEYXlzKCk7XHJcbiAgICB0aGlzLnNldFdlZWtFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHNldFdlZWtEYXlzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgY29uc3QgbnN0ckRheSA9IHRoaXMubnN0ci5nZXREYXkoKTtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMubnN0ci5nZXRUaW1lKCkpO1xyXG5cclxuICAgIHN0YXJ0RGF0ZS5zZXREYXRlKHN0YXJ0RGF0ZS5nZXREYXRlKCkgKyAoMCAtIG5zdHJEYXkpKTtcclxuXHJcbiAgICB0aGlzLndlZWtEYXlzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHN0YXJ0RGF0ZS5nZXRUaW1lKCkpO1xyXG5cclxuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgaSk7XHJcblxyXG4gICAgICB0aGlzLndlZWtEYXlzLnB1c2goe1xyXG4gICAgICAgIGRhdGUsXHJcbiAgICAgICAgeWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgIG1vbnRoOiBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgZGF5OiBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICBpc1RvZGF5OiBkYXRlLnRvRGF0ZVN0cmluZygpID09PSB0b2RheS50b0RhdGVTdHJpbmcoKSxcclxuICAgICAgfSBhcyBOZ3hIbUNhbGVuZGFyV2Vla0RheSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRXZWVrRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmlyc3RXZWVrRGF5ID0gdGhpcy53ZWVrRGF5c1swXTtcclxuICAgIGNvbnN0IGZpcnN0ZGF0ZSA9IG5ldyBEYXRlKGZpcnN0V2Vla0RheS55ZWFyLCBmaXJzdFdlZWtEYXkubW9udGgsIGZpcnN0V2Vla0RheS5kYXkpO1xyXG4gICAgY29uc3QgZmlyc3RkYXkgPSBmaXJzdGRhdGUuZ2V0RGF5KCk7XHJcblxyXG4gICAgY29uc3QgbGFzdFdlZWtEYXkgPSB0aGlzLndlZWtEYXlzWzZdO1xyXG4gICAgY29uc3QgbGFzdGRhdGUgPSBuZXcgRGF0ZShsYXN0V2Vla0RheS55ZWFyLCBsYXN0V2Vla0RheS5tb250aCwgbGFzdFdlZWtEYXkuZGF5KTtcclxuICAgIGNvbnN0IGxhc3RkYXkgPSBsYXN0ZGF0ZS5nZXREYXkoKTtcclxuICAgIGxhc3RkYXRlLnNldERhdGUobGFzdGRhdGUuZ2V0RGF0ZSgpICsgMSk7XHJcblxyXG4gICAgdGhpcy53ZWVrRXZlbnRzID0gdGhpcy5ldmVudHNcclxuICAgICAgLmNvbmNhdCguLi50aGlzLndlZWtseUV2ZW50cy5tYXAoZ2V0TXV0aXBsZUV2ZW50cyhmaXJzdFdlZWtEYXkueWVhciwgZmlyc3RXZWVrRGF5Lm1vbnRoKSkpXHJcbiAgICAgIC5maWx0ZXIoZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIChlLnN0YXJ0ID49IGZpcnN0ZGF0ZSAmJiBlLnN0YXJ0IDwgbGFzdGRhdGUpIHx8XHJcbiAgICAgICAgICAoZmlyc3RkYXRlID49IGUuc3RhcnQgJiYgZmlyc3RkYXRlIDw9IGUuZW5kKSB8fFxyXG4gICAgICAgICAgKGUuc3RhcnQgPD0gZmlyc3RkYXRlICYmIGxhc3RkYXRlIDwgZS5lbmQpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICAgLnNvcnQoKGUxLCBlMikgPT4gZTEuc3RhcnQuZ2V0VGltZSgpIC0gZTIuc3RhcnQuZ2V0VGltZSgpKVxyXG4gICAgICAubWFwKGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGV2ZW50OiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsPG51bWJlcj4gPSB7XHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB3aWR0aDogNyxcclxuICAgICAgICAgICAgbGVmdDogZS5zdGFydC5nZXREYXkoKSAtIGZpcnN0ZGF5LFxyXG4gICAgICAgICAgICBjb2xvcjogZS5jb2xvcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdGFydHNCZWZvcmVXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgZW5kc0FmdGVyV2VlazogdHJ1ZSxcclxuICAgICAgICAgIHRpdGxlOiBlLnRpdGxlLFxyXG4gICAgICAgICAgdXJsOiBlLnVybCxcclxuICAgICAgICAgIGRhdGE6IGUsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGUuc3RhcnQgPj0gZmlyc3RkYXRlICYmIGUuZW5kIDwgbGFzdGRhdGUpIHtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLndpZHRoID0gZS5lbmQuZ2V0RGF5KCkgLSBlLnN0YXJ0LmdldERheSgpICsgMTtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLmxlZnQgPSBlLnN0YXJ0LmdldERheSgpIC0gZmlyc3RkYXk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnN0YXJ0IDwgZmlyc3RkYXRlICYmIChmaXJzdGRhdGUgPD0gZS5lbmQgJiYgZS5lbmQgPCBsYXN0ZGF0ZSkpIHtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLndpZHRoID0gZS5lbmQuZ2V0RGF5KCkgLSBmaXJzdGRheSArIDE7XHJcbiAgICAgICAgICBldmVudC5zdHlsZS5sZWZ0ID0gMDtcclxuICAgICAgICAgIGV2ZW50LnN0YXJ0c0JlZm9yZVdlZWsgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuc3RhcnQgPj0gZmlyc3RkYXRlICYmIGUuc3RhcnQgPCBsYXN0ZGF0ZSAmJiBlLmVuZCA+PSBsYXN0ZGF0ZSkge1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUud2lkdGggPSBsYXN0ZGF5IC0gZS5zdGFydC5nZXREYXkoKSArIDE7XHJcbiAgICAgICAgICBldmVudC5zdHlsZS5sZWZ0ID0gZS5zdGFydC5nZXREYXkoKSAtIGZpcnN0ZGF5O1xyXG4gICAgICAgICAgZXZlbnQuZW5kc0FmdGVyV2VlayA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5zdGFydCA8PSBmaXJzdGRhdGUgJiYgbGFzdGRhdGUgPCBlLmVuZCkge1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUud2lkdGggPSA3O1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUubGVmdCA9IDA7XHJcbiAgICAgICAgICBldmVudC5zdGFydHNCZWZvcmVXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICBldmVudC5lbmRzQWZ0ZXJXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uZXZlbnQsXHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7KGV2ZW50LnN0eWxlLndpZHRoIC8gNykgKiAxMDB9JWAsXHJcbiAgICAgICAgICAgIGxlZnQ6IGAkeyhldmVudC5zdHlsZS5sZWZ0IC8gNykgKiAxMDB9JWAsXHJcbiAgICAgICAgICAgIGNvbG9yOiBlLmNvbG9yLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByZXYoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5zdHIuc2V0RGF0ZSh0aGlzLm5zdHIuZ2V0RGF0ZSgpIC0gNyk7XHJcbiAgICB0aGlzLmluaXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpOiB2b2lkIHtcclxuICAgIHRoaXMubnN0ci5zZXREYXRlKHRoaXMubnN0ci5nZXREYXRlKCkgKyA3KTtcclxuICAgIHRoaXMuaW5pdFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBvcGVuRXZlbnQoZXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMub3Blbi5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLm5zdHIgfHwgY2hhbmdlcy5ldmVudHMpIHtcclxuICAgICAgdGhpcy5pbml0VmFsdWUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IEhPVVJfU0NIRU1BUzogYW55W10gPSBbXHJcbiAge1xyXG4gICAgbmFtZTogJzEyIEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzAxIEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzAyIEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzAzIEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA0IEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA1IEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA2IEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA3IEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA4IEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA5IEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzEwIEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzExIEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzEyIEFNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzAxIFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzAyIFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzAzIFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA0IFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA1IFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA2IFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA3IFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA4IFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzA5IFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzEwIFBNJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogJzExIFBNJ1xyXG4gIH1cclxuXTtcclxuIiwiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZHJlbixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZ2V0TXV0aXBsZUV2ZW50cyB9IGZyb20gJy4uLy4uL21vbnRoL3V0aWxzJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckVsbURldGlhbCwgTmd4SG1DYWxlbmRhckV2ZW50IH0gZnJvbSAnLi4vLi4vbmd4LWhtLWNhbGVuZGFyLm1vZGVsJztcclxuaW1wb3J0IHsgSE9VUl9TQ0hFTUFTIH0gZnJvbSAnLi9kYXRhJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiY2xhc3NOYW1lXCJcclxuICAgICBjbGFzcz1cImNvbnRlbnRcIj5cclxuICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJob3VyIG5hbWVcIlxyXG4gICAgICAgICAqbmdGb3I9XCJsZXQgaG91clNjaGVtYSBvZiBob3VyU2NoZW1hc1wiPlxyXG4gICAgICB7eyBob3VyU2NoZW1hLm5hbWUgfX1cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJzdHJpcFwiPlxyXG4gICAgPHNlY3Rpb24gKm5nRm9yPVwibGV0IGhvdXJTY2hlbWEgb2YgaG91clNjaGVtYXM7IGxldCBpbmRleCA9IGluZGV4O1wiXHJcbiAgICAgICAgICAgICBjbGFzcz1cImhvdXJcIlxyXG4gICAgICAgICAgICAgI2Jhcj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICA8IS0tIGV2ZW50cyAtLT5cclxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGRheUV2ZW50IG9mIGRheUV2ZW50c1wiXHJcbiAgICAgICAgIGNsYXNzPVwiYmFyXCJcclxuICAgICAgICAgW25nU3R5bGVdPVwiZGF5RXZlbnQuc3R5bGVcIlxyXG4gICAgICAgICBbY2xhc3MuY2FsLXN0YXJ0cy13aXRoaW4tZGF5XT1cImRheUV2ZW50LnN0YXJ0c0JlZm9yZVdlZWtcIlxyXG4gICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLWRheV09XCJkYXlFdmVudC5lbmRzQWZ0ZXJXZWVrXCI+XHJcbiAgICAgIDxzcGFuIChjbGljayk9XCJvcGVuRXZlbnQoZGF5RXZlbnQuZGF0YSlcIj5cclxuICAgICAgICB7eyBkYXlFdmVudC5kYXRhLnRpdGxlIH19XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLTxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiBncmVlbjtcclxuICAgIGhlaWdodDogOTBweDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTgwcHg7XHJcbiAgICBsZWZ0OiAxMDBweDtcIj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IHBpbms7XHJcbiAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAxODBweDtsZWZ0OiAyMDBweDtcIj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IHBhbGV0dXJxdW9pc2U7XHJcbiAgICBoZWlnaHQ6IDIxMHB4O1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAxODBweDtsZWZ0OiAzMDBweDtcIj5cclxuICAgIDwvZGl2PiAtLT5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYDpob3N0e2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3cteTpzY3JvbGw7bWF4LWhlaWdodDo4NXZofS5ibGFjayAuaG91ciAubGluZXtib3JkZXItYm90dG9tOnRoaW4gZGFzaGVkICM4ODhmOTB9LmJsYWNrIC5ob3VyIC5saW5lOmhvdmVye2JhY2tncm91bmQ6d2hlYXR9LmJsYWNrIC5ob3VyLm5hbWV7Y29sb3I6I2ZmZn0uYmxhY2sgLmhvdXI6bnRoLWNoaWxkKG9kZCl7YmFja2dyb3VuZDojNmY2ZTZlfS53aGl0ZSAuaG91ciAubGluZXtib3JkZXItYm90dG9tOnRoaW4gZGFzaGVkICMwMDB9LndoaXRlIC5ob3VyIC5saW5lOmhvdmVye2JhY2tncm91bmQ6d2hlYXR9LndoaXRlIC5ob3VyOm50aC1jaGlsZChvZGQpe2JhY2tncm91bmQ6I2ZiZWVlZX0uY29udGVudHtkaXNwbGF5OmZsZXg7bWFyZ2luLWJvdHRvbTozMHB4fS5jb250ZW50IC50aXRsZXt3aWR0aDoxMDBweDtmbGV4OjAgMCAxMDBweH0uY29udGVudCAuc3RyaXB7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJX0uY29udGVudCAuaG91cntoZWlnaHQ6NjBweH0uY29udGVudCAuaG91ci5uYW1le2xpbmUtaGVpZ2h0OjYwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9LmNvbnRlbnQgLmhvdXIgLmxpbmV7aGVpZ2h0OjMwcHg7ZGlzcGxheTpmbGV4fS5jb250ZW50IC5ob3VyIC5saW5lIC5hY3RpdmV7d2lkdGg6MTAwcHg7aGVpZ2h0OjEwMCU7ZmxleDowIDAgMTAwcHg7Ym94LXNpemluZzpjb250ZW50LWJveDt6LWluZGV4OjF9LmJhcntib3JkZXI6MXB4IHNvbGlkICMxZTkwZmY7d2lkdGg6MTAwcHg7cG9zaXRpb246YWJzb2x1dGU7Y29sb3I6I2ZmZjtwYWRkaW5nOjVweH0uYmFyLmNhbC1zdGFydHMtd2l0aGluLWRheXtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjVweDtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czo1cHh9LmJhci5jYWwtZW5kcy13aXRoaW4tZGF5e2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NXB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweH1gXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKVxyXG4gIGNsYXNzTmFtZSA9ICdibGFjayc7XHJcbiAgQElucHV0KClcclxuICB3ZWVrbHlFdmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW107XHJcbiAgQElucHV0KClcclxuICBldmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW107XHJcbiAgQElucHV0KClcclxuICBuc3RyID0gbmV3IERhdGUoMjAxOCwgNiwgMTYpO1xyXG4gIEBJbnB1dCgpXHJcbiAgc3RhcnQgPSAnMDA6MDAnO1xyXG4gIEBJbnB1dCgpXHJcbiAgZW5kID0gJzI0OjAwJztcclxuICBASW5wdXQoKVxyXG4gIHNwbGl0ID0gMzA7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBlbG1XaWR0aCA9IDExMDtcclxuXHJcbiAgQFZpZXdDaGlsZHJlbignYmFyJykgYmFyczogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG5cclxuICBnZXQgZmlyc3REYXRlKCkge1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRoaXMubnN0ci5nZXRGdWxsWWVhcigpLCB0aGlzLm5zdHIuZ2V0TW9udGgoKSwgdGhpcy5uc3RyLmdldERhdGUoKSk7XHJcbiAgICBjb25zdCB0aW1lID0gdGhpcy5zdGFydC5zcGxpdCgnOicpO1xyXG5cclxuICAgIGlmICh0aW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgaG91ciA9IE51bWJlcih0aW1lWzBdKTtcclxuICAgICAgY29uc3QgbWludXRlID0gTnVtYmVyKHRpbWVbMV0pO1xyXG5cclxuICAgICAgaWYgKGhvdXIgKyAxKSB7XHJcbiAgICAgICAgZGF0ZS5zZXRIb3Vycyhob3VyKTtcclxuXHJcbiAgICAgICAgaWYgKG1pbnV0ZSArIDEpIHtcclxuICAgICAgICAgIGRhdGUuc2V0TWludXRlcyhtaW51dGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxhc3REYXRlKCkge1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHRoaXMubnN0ci5nZXRGdWxsWWVhcigpLCB0aGlzLm5zdHIuZ2V0TW9udGgoKSwgdGhpcy5uc3RyLmdldERhdGUoKSk7XHJcbiAgICBjb25zdCB0aW1lID0gdGhpcy5lbmQuc3BsaXQoJzonKTtcclxuXHJcbiAgICBpZiAodGltZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGhvdXIgPSBOdW1iZXIodGltZVswXSk7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IE51bWJlcih0aW1lWzFdKTtcclxuXHJcbiAgICAgIGlmIChob3VyKSB7XHJcbiAgICAgICAgZGF0ZS5zZXRIb3Vycyhob3VyKTtcclxuXHJcbiAgICAgICAgaWYgKG1pbnV0ZSkge1xyXG4gICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE51bWJlcihkYXRlKSAtIE51bWJlcih0aGlzLmZpcnN0RGF0ZSkgPD0gMCkge1xyXG4gICAgICBkYXRlLnNldEhvdXJzKDI0KTtcclxuICAgICAgZGF0ZS5zZXRNaW51dGVzKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRlO1xyXG4gIH1cclxuXHJcbiAgZGF5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsPHN0cmluZz5bXSA9IFtdO1xyXG5cclxuICBob3VyU2NoZW1hczogYW55W10gPSBIT1VSX1NDSEVNQVM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICB9XHJcblxyXG4gIGluaXRWaWV3KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXRIb3VyU2NoZW1hcygpO1xyXG4gICAgdGhpcy5zZXREYXlFdmVudCgpO1xyXG4gICAgdGhpcy5iaW5kRGF5RXZlbnRXaWR0aCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0SG91clNjaGVtYXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBkaWZmTXMgPSBOdW1iZXIodGhpcy5sYXN0RGF0ZSkgLSBOdW1iZXIodGhpcy5maXJzdERhdGUpO1xyXG4gICAgY29uc3QgZGlmZkhycyA9IE1hdGguY2VpbChkaWZmTXMgLyAzNjAwMDAwKTsgLy8gaG91cnNcclxuICAgIC8vIGNvbnN0IGRpZmZNaW5zID0gTWF0aC5yb3VuZCgoKGRpZmZNcyAlIDg2NDAwMDAwKSAlIDM2MDAwMDApIC8gNjAwMDApOyAvLyBtaW51dGVzXHJcbiAgICBjb25zdCBmaXJzdEhvdXIgPSB0aGlzLmZpcnN0RGF0ZS5nZXRIb3VycygpO1xyXG5cclxuICAgIHRoaXMuaG91clNjaGVtYXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gZmlyc3RIb3VyOyBpIDwgZmlyc3RIb3VyICsgZGlmZkhyczsgaSsrKSB7XHJcbiAgICAgIHRoaXMuaG91clNjaGVtYXMucHVzaCh7XHJcbiAgICAgICAgbmFtZTogYCR7KCcwJyArIGkpLnN1YnN0cigtMil9ICR7aSA+IDEyID8gJ1BNJyA6ICdBTSd9YCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXREYXlFdmVudCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdpZHRoID0gMzA7XHJcbiAgICBjb25zdCBmaXJzdGRhdGUgPSB0aGlzLmZpcnN0RGF0ZTtcclxuICAgIGNvbnN0IGxhc3RkYXRlID0gdGhpcy5sYXN0RGF0ZTtcclxuICAgIGNvbnN0IGdldFBpeGVsRm9yRGlmZlNwbGl0ID0gKGVuZCwgc3RhcnQpID0+IHtcclxuICAgICAgY29uc3QgZGlmZk1zID0gZW5kLmdldFRpbWUoKSAtIHN0YXJ0LmdldFRpbWUoKTtcclxuICAgICAgcmV0dXJuIChkaWZmTXMgJSA4NjQwMDAwMCkgLyAodGhpcy5zcGxpdCAqIDYwICogMTAwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZGF5RXZlbnRzID0gdGhpcy5ldmVudHNcclxuICAgICAgLmNvbmNhdChcclxuICAgICAgICAuLi50aGlzLndlZWtseUV2ZW50cy5tYXAoZ2V0TXV0aXBsZUV2ZW50cyh0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKSwgdGhpcy5uc3RyLmdldE1vbnRoKCkpKSxcclxuICAgICAgKVxyXG4gICAgICAvLyDDpcKFwojDqcKBwo7DpsK/wr7DpcKHwrrDpsKcwoPDp8K2wpPDqcKBwo7DqcKAwpnDpMK4woDDpcKkwqnDp8KawoTDpMK6wovDpMK7wrbDpcKAwpFcclxuICAgICAgLmZpbHRlcigoZTogTmd4SG1DYWxlbmRhckV2ZW50KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIChlLnN0YXJ0ID49IGZpcnN0ZGF0ZSAmJiBlLnN0YXJ0IDwgbGFzdGRhdGUpIHx8XHJcbiAgICAgICAgICAoZmlyc3RkYXRlID49IGUuc3RhcnQgJiYgZmlyc3RkYXRlIDw9IGUuZW5kKSB8fFxyXG4gICAgICAgICAgKGZpcnN0ZGF0ZSA+PSBlLnN0YXJ0ICYmIGxhc3RkYXRlIDwgZS5lbmQpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSlcclxuICAgICAgLy8gw6bCoMK5w6bCk8Kaw6nClsKLw6XCp8KLw6bCmcKCw6nClsKTw6XCgcKaw6bCjsKSw6XCusKPXHJcbiAgICAgIC5zb3J0KChlMTogTmd4SG1DYWxlbmRhckV2ZW50LCBlMjogTmd4SG1DYWxlbmRhckV2ZW50KSA9PiBlMS5zdGFydC5nZXRUaW1lKCkgLSBlMi5zdGFydC5nZXRUaW1lKCkpXHJcbiAgICAgIC8vIMOowr3CicOmwo/Cm8OnwoLCusOnwpXCq8Opwp3CosOkwrjCisOpwpzCgMOowqbCgcOnwrbCgcOlwq7CmsOnwprChMOlwoDCvFxyXG4gICAgICAubWFwKChlOiBOZ3hIbUNhbGVuZGFyRXZlbnQsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsbURldGlhbDogTmd4SG1DYWxlbmRhckVsbURldGlhbCA9IHtcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIHRvcDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICBsZWZ0OiBpICogdGhpcy5lbG1XaWR0aCxcclxuICAgICAgICAgICAgLy8gYmFja2dyb3VuZDogZS5jb2xvci50b1N0cmluZygpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc3RhcnRzQmVmb3JlV2VlazogdHJ1ZSxcclxuICAgICAgICAgIGVuZHNBZnRlcldlZWs6IHRydWUsXHJcbiAgICAgICAgICBkYXRhOiBlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gaWYgZXZlbnQgZmlyc3QgZGF0ZSBpcyBiaWdnZXIgdGhhbiBmaXJzdGRhdGVcclxuICAgICAgICBpZiAoZS5zdGFydCA+PSBmaXJzdGRhdGUpIHtcclxuICAgICAgICAgIGlmIChlLmVuZCA8IGxhc3RkYXRlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB8LS0tLS0tLS0tfFxyXG5cclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLnRvcCA9IGdldFBpeGVsRm9yRGlmZlNwbGl0KGUuc3RhcnQsIGZpcnN0ZGF0ZSkgKiB3aWR0aDtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLmhlaWdodCA9IGdldFBpeGVsRm9yRGlmZlNwbGl0KGUuZW5kLCBlLnN0YXJ0KSAqIHdpZHRoO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChlLnN0YXJ0IDwgbGFzdGRhdGUgJiYgZS5lbmQgPj0gbGFzdGRhdGUpIHtcclxuICAgICAgICAgICAgLy8gICAgICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB8LS0tLS0tLS0tLS0tLS0tLS0tLS18XHJcblxyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3R5bGUudG9wID0gZ2V0UGl4ZWxGb3JEaWZmU3BsaXQoZS5zdGFydCwgZmlyc3RkYXRlKSAqIHdpZHRoO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3R5bGUuaGVpZ2h0ID0gZ2V0UGl4ZWxGb3JEaWZmU3BsaXQobGFzdGRhdGUsIGUuc3RhcnQpICogd2lkdGg7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5lbmRzQWZ0ZXJXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnN0YXJ0IDw9IGZpcnN0ZGF0ZSkge1xyXG4gICAgICAgICAgLy8gaWYgZXZlbnQgZmlyc3QgZGF0ZSBpcyBiaWdnZXIgdGhhbiBmaXJzdGRhdGVcclxuICAgICAgICAgIGlmIChsYXN0ZGF0ZSA8IGUuZW5kKSB7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhvdXJTY2hlbWFzLmxlbmd0aCAqIDIgKiB3aWR0aDtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0YXJ0c0JlZm9yZVdlZWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLmVuZHNBZnRlcldlZWsgPSBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZmlyc3RkYXRlIDw9IGUuZW5kICYmIGUuZW5kIDwgbGFzdGRhdGUpIHtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLmhlaWdodCA9IGdldFBpeGVsRm9yRGlmZlNwbGl0KGUuZW5kLCBmaXJzdGRhdGUpICogd2lkdGg7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdGFydHNCZWZvcmVXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZWxtRGV0aWFsO1xyXG4gICAgICB9KVxyXG4gICAgICAvLyDDpcKGwo3DpsKswqHDqcKBwo7DpsK/wr7DpcKHwrrDpcKcwqjDqcKAwplob3Vyw6XCjcKAw6nClsKTw6jCo8Khw6nCncKiw6fCmsKEw6TCusKLw6TCu8K2w6XCgMKRXHJcbiAgICAgIC5maWx0ZXIoKGU6IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWwpID0+IGUuc3R5bGUuaGVpZ2h0ICE9PSAwKVxyXG4gICAgICAvLyDDqcKHwo3DpsKWwrDDp8K2woHDpcKuwppsZWZ0w6fCmsKEw6nCoMKGw6XCusKPXHJcbiAgICAgIC5tYXAoKGU6IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWwsIGkpID0+IHtcclxuICAgICAgICBlLnN0eWxlLmxlZnQgPSBpICogdGhpcy5lbG1XaWR0aDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgLi4uZSxcclxuICAgICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIHRvcDogYCR7ZS5zdHlsZS50b3B9cHhgLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2Uuc3R5bGUuaGVpZ2h0fXB4YCxcclxuICAgICAgICAgICAgbGVmdDogYCR7ZS5zdHlsZS5sZWZ0fXB4YCxcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogYCR7ZS5kYXRhLmNvbG9yfWAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYmluZERheUV2ZW50V2lkdGgoKTogdm9pZCB7XHJcbiAgICAvLyDDpcK0wofDqMK7wpLDpcKkwqfDp8Klwp7Dp8KJwojDpsKcwqxcclxuICAgIC8vIGxldCB0ZW1wV2lkdGggPSAwO1xyXG4gICAgLy8gZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZGF5RXZlbnRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgLy8gICB0ZW1wV2lkdGggPSB0ZW1wV2lkdGggKyBpbmRleCAqIDEwO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAvLyDDp8KBwrDDpcKhwrXDp8KJwojDpsKcwqwgKMOlwoPChcOkwr7Cm8Olwo/Cg8OowoDCg1hEKVxyXG4gICAgICBjb25zdCB0ZW1wV2lkdGggPSB0aGlzLmRheUV2ZW50cy5sZW5ndGhcclxuICAgICAgICA/IHRoaXMuZGF5RXZlbnRzLm1hcCgoeCwgaSkgPT4gaSAqIDEwKS5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiKVxyXG4gICAgICAgIDogMDtcclxuXHJcbiAgICAgIGlmIChkb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoIC0gMTAwIDwgMTAwICogdGhpcy5kYXlFdmVudHMubGVuZ3RoICsgdGVtcFdpZHRoKSB7XHJcbiAgICAgICAgdGhpcy5iYXJzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICBpdGVtLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHsxMDAgKiB0aGlzLmRheUV2ZW50cy5sZW5ndGggKyB0ZW1wV2lkdGh9cHhgO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHByZXYoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5zdHIuc2V0RGF0ZSh0aGlzLm5zdHIuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgfVxyXG5cclxuICBuZXh0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uc3RyLnNldERhdGUodGhpcy5uc3RyLmdldERhdGUoKSArIDEpO1xyXG4gICAgdGhpcy5pbml0VmlldygpO1xyXG4gIH1cclxuXHJcbiAgb3BlbkV2ZW50KGV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLm9wZW4uZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5uc3RyIHx8IGNoYW5nZXMuc3RhcnQgfHwgY2hhbmdlcy5lbmQpIHtcclxuICAgICAgdGhpcy5pbml0VmlldygpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ3hIbUNhbGVuZGFyVmlld01vZGUgfSBmcm9tICcuLi8uLi9uZ3gtaG0tY2FsZW5kYXIubW9kZWwnO1xyXG5cclxuZXhwb3J0IGVudW0gQ2FsZW5kYXJTZWxlY3Rvck1vZGUge1xyXG4gIFllYXIgPSAnWWVhcicsXHJcbiAgTW9udGggPSAnTW9udGgnLFxyXG4gIERheSA9ICdEYXknLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyU2VsZWN0b3JEYXRhIHtcclxuICB0aGVtZT86IHN0cmluZztcclxuICBjb250YWluZXJWaWV3TW9kZT86IE5neEhtQ2FsZW5kYXJWaWV3TW9kZTtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neFJ4TW9kYWxSZWYsIE5HWF9SWF9NT0RBTF9UT0tFTiB9IGZyb20gJ25neC1yeC1tb2RhbCc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhclZpZXdNb2RlIH0gZnJvbSAnLi4vLi4vbmd4LWhtLWNhbGVuZGFyLm1vZGVsJztcclxuaW1wb3J0IHsgZ2V0Q2FsZW5kYXIgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IENhbGVuZGFyU2VsZWN0b3JEYXRhLCBDYWxlbmRhclNlbGVjdG9yTW9kZSB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCIgW25nQ2xhc3NdPVwicG9wdXBEYXRhLnRoZW1lXCI+XHJcbiAgPGhlYWRlciBjbGFzcz1cImhlYWRlclwiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiIFtuZ1N3aXRjaF09XCJtb2RlXCI+XHJcbiAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInWWVhcidcIj57eyBtaW5ZZWFyIH19IH4ge3sgbWluWWVhciArIDI0IH19w6XCucK0PC9zcGFuPlxyXG4gICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ01vbnRoJ1wiPnt7IHNlbGVjdGVkWWVhciB9fcOlwrnCtDwvc3Bhbj5cclxuICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidEYXknXCI+e3sgc2VsZWN0ZWRZZWFyIH19w6XCucK0IHt7IHNlbGVjdGVkTW9udGggICsgMSB9fcOmwpzCiDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlXCI+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWJsb2NrXCIgKm5nU3dpdGNoQ2FzZT1cIidZZWFyJ1wiPlxyXG5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJwcmV2WWVhclJhbmdlKClcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gbGVmdFwiPjwvZGl2PlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCIgKGNsaWNrKT1cIm5leHRZZWFyUmFuZ2UoKVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiByaWdodFwiPjwvZGl2PlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uLWJsb2NrXCIgKm5nU3dpdGNoQ2FzZT1cIidNb250aCdcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJiYWNrVG9ZZWFyU2VsZWN0b3IoKVwiPlxyXG4gICAgICAgICAgw6LClsKyXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ibG9ja1wiICpuZ1N3aXRjaENhc2U9XCInRGF5J1wiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCIgKGNsaWNrKT1cImJhY2tUb01vbnRoU2VsZWN0b3IoKVwiPlxyXG4gICAgICAgICAgw6LClsKyXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICA8L2hlYWRlcj5cclxuICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJtb2RlXCI+XHJcblxyXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ1llYXInXCIgY2xhc3M9XCJjb250YWluZXJcIiAoc3dpcGVsZWZ0KT1cIm5leHRZZWFyUmFuZ2UoKVwiIChzd2lwZXJpZ2h0KT1cInByZXZZZWFyUmFuZ2UoKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYm94IHllYXJcIiAqbmdGb3I9XCJsZXQgeWVhciBvZiB5ZWFyczsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwic2VsZWN0WWVhcih5ZWFyKVwiPnt7IHllYXIgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidNb250aCdcIiBjbGFzcz1cImNvbnRhaW5lclwiIChzd2lwZXVwKT1cImJhY2tUb1llYXJTZWxlY3RvcigpXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJib3hcIiAqbmdGb3I9XCJsZXQgbW9udGggb2YgbW9udGhzOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJzZWxlY3RNb250aChtb250aClcIj57eyBtb250aCArIDEgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidEYXknXCIgY2xhc3M9XCJjb250YWluZXJcIiAoc3dpcGV1cCk9XCJiYWNrVG9Nb250aFNlbGVjdG9yKClcIj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgd2VlayBvZiBjYWxlbmRhckRhdGE7IGxldCBpID0gaW5kZXg7XCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5czsgbGV0IGRheV9pbmRleCA9IGluZGV4O1wiID5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3ggZGF5XCIgW2NsYXNzLm4tbW9udGhdPVwiZGF5Lm90aGVyXCIgKGNsaWNrKT1cInNlbGVjdERheShkYXkuZGF0ZSlcIj57eyBkYXkubnVtYmVyIH19PC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvbmctY29udGFpbmVyPlxyXG5cclxuXHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2Aud3JhcHBlci5ibGFja3tiYWNrZ3JvdW5kLWNvbG9yOiM1ZTViNWJ9LndyYXBwZXIuYmxhY2sgLmhlYWRlcntiYWNrZ3JvdW5kLWNvbG9yOiMwMDdiZmZ9LndyYXBwZXIuYmxhY2sgLnRpdGxle2NvbG9yOiNmZmZ9LndyYXBwZXIuYmxhY2sgLmxlZnR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNhMDlmYTAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIuYmxhY2sgLmxlZnQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNmZmYgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIuYmxhY2sgLnJpZ2h0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTA5ZmEwfS53cmFwcGVyLmJsYWNrIC5yaWdodDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2ZmZn0ud3JhcHBlci5ibGFjayAuYm94e2JhY2tncm91bmQtY29sb3I6IzRmNGI0Yjtjb2xvcjojZmZmfS53cmFwcGVyLndoaXRle2JhY2tncm91bmQtY29sb3I6I2ZmZn0ud3JhcHBlci53aGl0ZSAuaGVhZGVye2JhY2tncm91bmQtY29sb3I6IzM5ZmJkNn0ud3JhcHBlci53aGl0ZSAudGl0bGV7Y29sb3I6IzAwMH0ud3JhcHBlci53aGl0ZSAubGVmdHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2EwOWZhMCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0ud3JhcHBlci53aGl0ZSAubGVmdDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2ZmZiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0ud3JhcHBlci53aGl0ZSAucmlnaHR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNhMDlmYTB9LndyYXBwZXIud2hpdGUgLnJpZ2h0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmZmfS53cmFwcGVyLndoaXRlIC5ib3h7YmFja2dyb3VuZC1jb2xvcjojZjZmZmNmO2NvbG9yOiMwMDB9LndyYXBwZXJ7d2lkdGg6MzAwcHg7Ym94LXNpemluZzpib3JkZXItYm94fS53cmFwcGVyIC5oZWFkZXJ7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3BhZGRpbmc6MTBweH0ud3JhcHBlciAuaGVhZGVyIC50aXRsZXtmb250LXNpemU6MjBweDttYXJnaW46MTBweH0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2t7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2sgLmhlYWRlci1idXR0b257cGFkZGluZzoxZW07YmFja2dyb3VuZDowIDA7Ym9yZGVyOjA7Y29sb3I6I2EwOWZhMDtjdXJzb3I6cG9pbnRlcn0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2sgLmhlYWRlci1idXR0b24gLmJ1dHRvbntib3JkZXItc3R5bGU6c29saWQ7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcn0ud3JhcHBlciAuaGVhZGVyIC5idXR0b24tYmxvY2sgLmhlYWRlci1idXR0b24gLmJ1dHRvbi5sZWZ0e2JvcmRlci13aWR0aDo3LjVweCAxMHB4IDcuNXB4IDB9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9uIC5idXR0b24ucmlnaHR7Ym9yZGVyLXdpZHRoOjcuNXB4IDAgNy41cHggMTBweH1oZWFkZXIgYS5uZXh0LGhlYWRlciBhLnByZXZ7ZmxvYXQ6cmlnaHR9LmNvbnRhaW5lcjphZnRlcntjb250ZW50OlwiXCI7Y2xlYXI6Ym90aDtkaXNwbGF5OnRhYmxlfS5jb250YWluZXJ7cGFkZGluZzoxMHB4IDAgMTBweCAxMHB4fS53cmFwcGVyIC5ib3h7ZmxvYXQ6bGVmdDt3aWR0aDo2MHB4O2hlaWdodDo2MHB4O21hcmdpbjowIDEwcHggMTBweCAwO3RleHQtYWxpZ246Y2VudGVyO3RyYW5zaXRpb246YWxsIDFzIGVhc2U7Y3Vyc29yOnBvaW50ZXJ9LndyYXBwZXIgLmJveC5kYXl7ZmxvYXQ6bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDozMHB4O2hlaWdodDphdXRvO3BhZGRpbmc6NXB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ud3JhcHBlciAuYm94LmRheS5uLW1vbnRoe2JhY2tncm91bmQtY29sb3I6IzgzN2Q3ZH0ud3JhcHBlciAuYm94OjpiZWZvcmV7Y29udGVudDonJzt3aWR0aDowO2hlaWdodDoxMDAlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtiYWNrZ3JvdW5kOnJlZH0ud3JhcHBlciAuYm94OmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZjA7Y29sb3I6IzAwMH0ud3JhcHBlciAuYm94LnllYXJ7d2lkdGg6NjBweDtoZWlnaHQ6MzBweH0ud3JhcHBlci5saXN0LW1vZGUgLmNvbnRhaW5lcntwYWRkaW5nLXJpZ2h0OjEwcHh9LndyYXBwZXIubGlzdC1tb2RlIC5ib3h7d2lkdGg6MTAwJX1gXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBOZ3hSeE1vZGFsUmVmIHtcclxuICBwb3B1cERhdGE6IENhbGVuZGFyU2VsZWN0b3JEYXRhID0ge307XHJcbiAgbW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLlllYXI7XHJcbiAgbWluWWVhciA9IDIwMTY7XHJcbiAgc2VsZWN0ZWRZZWFyOiBudW1iZXI7XHJcbiAgc2VsZWN0ZWRNb250aDogbnVtYmVyO1xyXG4gIHNlbGVjdGVkRGF0ZTogRGF0ZTtcclxuICBjYWxlbmRhckRhdGE6IGFueTtcclxuICBtb250aHMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExXTtcclxuICBnZXQgeWVhcnMoKSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjQgfSwgKHYsIGspID0+IGsgKyB0aGlzLm1pblllYXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbXBsZXRlID0gbmV3IFN1YmplY3QoKTtcclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KE5HWF9SWF9NT0RBTF9UT0tFTikgcHJpdmF0ZSBkYXRhKSB7XHJcbiAgICB0aGlzLnBvcHVwRGF0YSA9IGRhdGE7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIHByZXZZZWFyUmFuZ2UoKSB7XHJcbiAgICB0aGlzLm1pblllYXIgPSB0aGlzLm1pblllYXIgLSAyNDtcclxuICB9XHJcblxyXG4gIG5leHRZZWFyUmFuZ2UoKSB7XHJcbiAgICB0aGlzLm1pblllYXIgPSB0aGlzLm1pblllYXIgKyAyNDtcclxuICB9XHJcblxyXG4gIHNlbGVjdFllYXIoeWVhcikge1xyXG4gICAgdGhpcy5zZWxlY3RlZFllYXIgPSB5ZWFyO1xyXG4gICAgdGhpcy5tb2RlID0gQ2FsZW5kYXJTZWxlY3Rvck1vZGUuTW9udGg7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RNb250aChtb250aCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gbW9udGg7XHJcblxyXG4gICAgaWYgKHRoaXMucG9wdXBEYXRhLmNvbnRhaW5lclZpZXdNb2RlID09PSBOZ3hIbUNhbGVuZGFyVmlld01vZGUuZGF5KSB7XHJcbiAgICAgIHRoaXMubW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLkRheTtcclxuICAgICAgdGhpcy5jYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnNlbGVjdGVkWWVhciwgdGhpcy5zZWxlY3RlZE1vbnRoLCBbXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbXBsZXRlLm5leHQobmV3IERhdGUodGhpcy5zZWxlY3RlZFllYXIsIHRoaXMuc2VsZWN0ZWRNb250aCwgMSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0RGF5KGRheSkge1xyXG4gICAgdGhpcy5jb21wbGV0ZS5uZXh0KGRheSk7XHJcbiAgfVxyXG5cclxuICBiYWNrVG9ZZWFyU2VsZWN0b3IoKSB7XHJcbiAgICB0aGlzLm1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5ZZWFyO1xyXG4gIH1cclxuXHJcbiAgYmFja1RvTW9udGhTZWxlY3RvcigpIHtcclxuICAgIHRoaXMubW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLk1vbnRoO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hSeE1vZGFsU2VydmljZSB9IGZyb20gJ25neC1yeC1tb2RhbCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJFdmVudCwgTmd4SG1DYWxlbmRhckV2ZW50Q2F0ZWdvcnksIE5neEhtQ2FsZW5kYXJWaWV3TW9kZSB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLm1vZGVsJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vbW9udGgvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi93ZWVrL25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcvbmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vZGF5L25neC1obS1jYWxlbmRhci1kYXktdmlldy9uZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhck1vbnRoUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IHRpbWUgPSAnMTUwbXMgbGluZWFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LWhtLWNhbGVuZGFyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250ZW50XCJcclxuICAgICBbbmdDbGFzc109XCJjbGFzc05hbWVcIlxyXG4gICAgIFtuZ1N0eWxlXT1cInNpemVcIj5cclxuICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImhlYWRlci1idXR0b25cIlxyXG4gICAgICAgICAgKGNsaWNrKT1cInByZXYoKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGxlZnRcIj48L2Rpdj5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxoMSBjbGFzcz1cInRpdGxlXCJcclxuICAgICAgICAoY2xpY2spPVwib3BlblNlbGVjdG9yKCRldmVudClcIj5cclxuICAgICAge3sgbW9uRGV0YWlsIH19XHJcbiAgICA8L2gxPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCJcclxuICAgICAgICAgIChjbGljayk9XCJuZXh0KClcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiByaWdodFwiPjwvZGl2PlxyXG4gICAgPC9zcGFuPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJ2aWV3LWJsb2NrXCJcclxuICAgICAgIFtuZ1N3aXRjaF09XCJ2aWV3TW9kZVwiPlxyXG5cclxuICAgIDxuZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldyBbY2xhc3NOYW1lXT1cImNsYXNzTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidtb250aCdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrTmFtZXNdPVwid2Vla05hbWVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbeWVhck5hbWVdPVwieWVhck5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttb250aE5hbWVdPVwibW9udGhOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRzXT1cImV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3dlZWtseUV2ZW50c109XCJ3ZWVrbHlFdmVudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuc3RyXT1cIm5zdHJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcGVuKT1cIm9wZW5FdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3dpcGVsZWZ0KT1cIm5leHQoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlcmlnaHQpPVwicHJldigpXCI+PC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldz5cclxuXHJcbiAgICA8bmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldyBbY2xhc3NOYW1lXT1cImNsYXNzTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3dlZWsnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtldmVudHNdPVwiZXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrbHlFdmVudHNdPVwid2Vla2x5RXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuc3RyXT1cIm5zdHJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wZW4pPVwib3BlbkV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlbGVmdCk9XCJuZXh0KClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlcmlnaHQpPVwicHJldigpXCI+PC9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3PlxyXG5cclxuICAgIDxuZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcgW2NsYXNzTmFtZV09XCJjbGFzc05hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ2RheSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRzXT1cImV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrbHlFdmVudHNdPVwid2Vla2x5RXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25zdHJdPVwibnN0clwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0PVwiOTowMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZD1cIjIzOjAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG9wZW4pPVwib3BlbkV2ZW50KCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3dpcGVsZWZ0KT1cIm5leHQoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZXJpZ2h0KT1cInByZXYoKVwiPjwvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3PlxyXG5cclxuICA8L2Rpdj5cclxuXHJcbiAgPHVsIGNsYXNzPVwidHlwZS1idXR0b21cIlxyXG4gICAgICBbQGFuaW1hdGVdPVwibGVnZW5kT3BlblwiPlxyXG4gICAgPGxpPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRheVwiXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInZpZXdNb2RlID09PSAnZGF5J1wiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5lTW9kZSgnZGF5JylcIj7DpsKXwqU8L2J1dHRvbj5cclxuICAgIDwvbGk+XHJcblxyXG4gICAgPGxpPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIHdlZWtcIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ2aWV3TW9kZSA9PT0gJ3dlZWsnXCJcclxuICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmVNb2RlKCd3ZWVrJylcIj7DpcKRwqg8L2J1dHRvbj5cclxuICAgIDwvbGk+XHJcblxyXG4gICAgPGxpPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDtcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cIm9wZW4tbWVudVwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImxlZ2VuZFRvZ2dsZSgpXCI+PC9zcGFuPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gbW9udGhcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidmlld01vZGUgPT09ICdtb250aCdcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5lTW9kZSgnbW9udGgnKVwiPsOmwpzCiDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbGk+XHJcbiAgPC91bD5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImxlZ2VuZFwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJlbnRyeVwiXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2F0ZWdvcnkgb2YgZXZlbnRDYXRlZ29yeXNcIj5cclxuICAgICAge3sgY2F0ZWdvcnkubmFtZSB9fVxyXG4gICAgICA8c3BhbiBjbGFzcz1cImljb25cIlxyXG4gICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZF09XCJjYXRlZ29yeS5jb2xvclwiPjwvc3Bhbj5cclxuICAgIDwvc3Bhbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5jb250ZW50ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW59LmNvbnRlbnQgLmhlYWRlcntoZWlnaHQ6NTBweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47YWxpZ24taXRlbXM6Y2VudGVyfS5jb250ZW50IC5oZWFkZXIgLnRpdGxle3BhZGRpbmc6MDttYXJnaW46MDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDo1MHB4O2N1cnNvcjpwb2ludGVyfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b257cGFkZGluZzoxZW19LmNvbnRlbnQgLmhlYWRlciAuaGVhZGVyLWJ1dHRvbiAuYnV0dG9ue2JvcmRlci1zdHlsZTpzb2xpZDtjdXJzb3I6cG9pbnRlcjt0cmFuc2l0aW9uOmFsbCAuNXMgbGluZWFyfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b24gLmJ1dHRvbi5sZWZ0e2JvcmRlci13aWR0aDo3LjVweCAxMHB4IDcuNXB4IDB9LmNvbnRlbnQgLmhlYWRlciAuaGVhZGVyLWJ1dHRvbiAuYnV0dG9uLnJpZ2h0e2JvcmRlci13aWR0aDo3LjVweCAwIDcuNXB4IDEwcHh9LmNvbnRlbnQgLnR5cGUtYnV0dG9te3otaW5kZXg6Mjtwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDowO2xpc3Qtc3R5bGU6bm9uZTtib3R0b206MDttYXJnaW46MCAwIDMwcHg7dGV4dC1hbGlnbjpyaWdodDtwYWRkaW5nOjB9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5vcGVuLW1lbnV7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6NTBweDtiYWNrZ3JvdW5kOiM3ZWYzY2I7Ym9yZGVyLXJhZGl1czozMHB4IDAgMCAzMHB4fS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9ue2N1cnNvcjpwb2ludGVyO2JvcmRlcjowO3BhZGRpbmc6LjVlbSAxLjVlbTtjb2xvcjojMDAwO2xpbmUtaGVpZ2h0OjQwcHg7d2lkdGg6MTAwcHg7dHJhbnNpdGlvbjphbGwgLjJzIGxpbmVhcn0uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbi5tb250aHtiYWNrZ3JvdW5kOiM3ZWYzY2J9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b24ud2Vla3t3aWR0aDo4MHB4O2JhY2tncm91bmQ6I2ZmZDM1M30uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbi5kYXl7d2lkdGg6NjBweDtiYWNrZ3JvdW5kOiNkZTU3NTd9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXJ7ei1pbmRleDoxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMSk7dHJhbnNmb3JtOnNjYWxlKDEuMSk7Y29sb3I6I2ZmZn0uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbjpob3Zlci5tb250aHtiYWNrZ3JvdW5kOiM0MmI5OTF9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXIud2Vla3t3aWR0aDo4MHB4O2JhY2tncm91bmQ6I2E5ODYyM30uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbjpob3Zlci5kYXl7YmFja2dyb3VuZDojYWYxZDFkfS5jb250ZW50IC5sZWdlbmR7d2lkdGg6MTAwJTtoZWlnaHQ6MzBweDtsaW5lLWhlaWdodDozMHB4fS5jb250ZW50LmJsYWNre2JhY2tncm91bmQ6IzRhNGE0YX0uY29udGVudC5ibGFjayAuaGVhZGVye2JhY2tncm91bmQ6IzMzM30uY29udGVudC5ibGFjayAudGl0bGV7Y29sb3I6I2ZmZn0uY29udGVudC5ibGFjayAubGVmdHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2EwOWZhMCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC5ibGFjayAubGVmdDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2ZmZiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC5ibGFjayAucmlnaHR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNhMDlmYTB9LmNvbnRlbnQuYmxhY2sgLnJpZ2h0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmZmfS5jb250ZW50LmJsYWNrIC5sZWdlbmR7YmFja2dyb3VuZDojMzMzO2NvbG9yOiNmZmZ9LmNvbnRlbnQud2hpdGV7YmFja2dyb3VuZDojZmZmfS5jb250ZW50LndoaXRlIC5oZWFkZXJ7YmFja2dyb3VuZDojYzdjN2M3fS5jb250ZW50LndoaXRlIC50aXRsZXtjb2xvcjojMDAwfS5jb250ZW50LndoaXRlIC5sZWZ0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjMDAwIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS5jb250ZW50LndoaXRlIC5sZWZ0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjZmZmIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS5jb250ZW50LndoaXRlIC5yaWdodHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgIzAwMH0uY29udGVudC53aGl0ZSAucmlnaHQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNmZmZ9LmNvbnRlbnQud2hpdGUgLmxlZ2VuZHtiYWNrZ3JvdW5kOiNjN2M3Yzc7Y29sb3I6IzAwMH0uY29udGVudCAudmlldy1ibG9ja3toZWlnaHQ6Y2FsYygxMDAlIC0gODBweCk7b3ZlcmZsb3cteTphdXRvfS5lbnRyeXtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjAgMCAwIDI1cHg7Zm9udC1zaXplOjEzcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7bGluZS1oZWlnaHQ6MzBweDtiYWNrZ3JvdW5kOjAgMH0uZW50cnkgLmljb257cG9zaXRpb246YWJzb2x1dGU7aGVpZ2h0OjVweDt3aWR0aDo1cHg7dG9wOjEycHg7bGVmdDoxNHB4fS5tYXNre3Bvc2l0aW9uOmFic29sdXRlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoxMTAlO2hlaWdodDoxMDAlO3JpZ2h0OjB9Lm1hc2s6YWZ0ZXJ7Y29udGVudDonJztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTQwJTtyaWdodDoxMTAlO3dpZHRoOjMwcHg7aGVpZ2h0OjIwMCU7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC4zKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMjBkZWcpfWBdLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ2FuaW1hdGUnLCBbXHJcbiAgICAgIHN0YXRlKFxyXG4gICAgICAgICdmbHlPdXQnLFxyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoY2FsYygxMDAlIC0gNTVweCkpJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgc3RhdGUoXHJcbiAgICAgICAgJ2ZseUluJyxcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyxcclxuICAgICAgICB9KSxcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbignZmx5T3V0ID0+IGZseUluJywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoY2FsYygxMDAlIC0gNTVweCkpJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKHRpbWUpLFxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignZmx5SW4gPT4gZmx5T3V0JywgW1xyXG4gICAgICAgIHN0eWxlKHtcclxuICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFuaW1hdGUodGltZSksXHJcbiAgICAgIF0pLFxyXG4gICAgXSksXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla05hbWVzOiBzdHJpbmdbXSA9IFsnw6bCmMKfw6bCnMKfw6bCl8KlJywgJ8OmwpjCn8OmwpzCn8OkwrjCgCcsICfDpsKYwp/DpsKcwp/DpMK6wownLCAnw6bCmMKfw6bCnMKfw6TCuMKJJywgJ8OmwpjCn8OmwpzCn8OlwpvCmycsICfDpsKYwp/DpsKcwp/DpMK6wpQnLCAnw6bCmMKfw6bCnMKfw6XChcKtJ107XHJcbiAgQElucHV0KClcclxuICB5ZWFyTmFtZSA9ICfDpcK5wrQnO1xyXG4gIEBJbnB1dCgpXHJcbiAgbW9udGhOYW1lID0gJ8OmwpzCiCc7XHJcbiAgQElucHV0KClcclxuICBkYXlOYW1lID0gJ8OmwpfCpSc7XHJcbiAgQElucHV0KClcclxuICBldmVudENhdGVnb3J5czogTmd4SG1DYWxlbmRhckV2ZW50Q2F0ZWdvcnlbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgbnN0ciA9IG5ldyBEYXRlKCk7XHJcbiAgQE91dHB1dCgpXHJcbiAgb3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgY2xhc3NOYW1lID0gJ2JsYWNrJztcclxuICBASW5wdXQoKVxyXG4gIHNpemUgPSB7XHJcbiAgICB3aWR0aDogJzEwMHZ3JyxcclxuICAgIGhlaWdodDogJzEwMHZoJyxcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiDDqcKhwq/Dp8KkwrrDpsKowqHDpcK8wo9cclxuICAgKi9cclxuICB2aWV3TW9kZTogTmd4SG1DYWxlbmRhclZpZXdNb2RlID0gTmd4SG1DYWxlbmRhclZpZXdNb2RlLm1vbnRoO1xyXG5cclxuICBnZXQgeW5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKTtcclxuICB9XHJcbiAgZ2V0IG1ub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldE1vbnRoKCk7XHJcbiAgfVxyXG4gIGdldCBkbm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXREYXRlKCk7XHJcbiAgfVxyXG4gIGdldCBtb25EZXRhaWwoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYCR7dGhpcy55bm93fSAke3RoaXMueWVhck5hbWV9ICR7dGhpcy5tbm93ICsgMX0gJHt0aGlzLm1vbnRoTmFtZX1gO1xyXG5cclxuICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSBOZ3hIbUNhbGVuZGFyVmlld01vZGUuZGF5KSB7XHJcbiAgICAgIHJlc3VsdCA9IGAke3Jlc3VsdH0gJHt0aGlzLmRub3d9ICR7dGhpcy5kYXlOYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGxlZ2VuZE9wZW4gPSAnZmx5T3V0JztcclxuXHJcbiAgQFZpZXdDaGlsZChOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50KVxyXG4gIHByaXZhdGUgbW9udGhDb21wb25lbnQ6IE5neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQ7XHJcblxyXG4gIEBWaWV3Q2hpbGQoTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50KVxyXG4gIHByaXZhdGUgd2Vla0NvbXBvbmVudDogTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50O1xyXG5cclxuICBAVmlld0NoaWxkKE5neEhtQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50KVxyXG4gIHByaXZhdGUgZGF5Q29tcG9uZW50OiBOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudDtcclxuXHJcbiAgcHJpdmF0ZSBtb250aFBvcHVwQ29tcG9uZW50ID0gdGhpcy5fZmFjdG9yeS5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgIE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50LFxyXG4gICk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21vZGVsOiBOZ3hSeE1vZGFsU2VydmljZSwgcHJpdmF0ZSBfZmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxyXG5cclxuICBwcmV2KCk6IHZvaWQge1xyXG4gICAgc3dpdGNoICh0aGlzLnZpZXdNb2RlKSB7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLm1vbnRoOlxyXG4gICAgICAgIHRoaXMubW9udGhDb21wb25lbnQucHJldigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS53ZWVrOlxyXG4gICAgICAgIHRoaXMud2Vla0NvbXBvbmVudC5wcmV2KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheTpcclxuICAgICAgICB0aGlzLmRheUNvbXBvbmVudC5wcmV2KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk6IHZvaWQge1xyXG4gICAgc3dpdGNoICh0aGlzLnZpZXdNb2RlKSB7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLm1vbnRoOlxyXG4gICAgICAgIHRoaXMubW9udGhDb21wb25lbnQubmV4dCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS53ZWVrOlxyXG4gICAgICAgIHRoaXMud2Vla0NvbXBvbmVudC5uZXh0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheTpcclxuICAgICAgICB0aGlzLmRheUNvbXBvbmVudC5uZXh0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvcGVuRXZlbnQoZXZlbnQ6IE5neEhtQ2FsZW5kYXJFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcGVuLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgb3BlblNlbGVjdG9yKCRldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbW9kZWxcclxuICAgICAgLm9wZW4odGhpcy5tb250aFBvcHVwQ29tcG9uZW50LCB7XHJcbiAgICAgICAgZGlzYWJsZUNsb3NlQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIHBhbmVsU3R5bGU6IHtcclxuICAgICAgICAgIHRvcDogYCR7JGV2ZW50Lm9mZnNldFl9cHhgLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTogeyB0aGVtZTogdGhpcy5jbGFzc05hbWUsIGNvbnRhaW5lclZpZXdNb2RlOiB0aGlzLnZpZXdNb2RlIH0sXHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdWJzY3JpYmUoc2VsZWN0ZWREYXRlID0+IHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWREYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLm5zdHIgPSBzZWxlY3RlZERhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGNoYW5lTW9kZShtb2RlOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMudmlld01vZGUgPSBtb2RlO1xyXG4gIH1cclxuXHJcbiAgbGVnZW5kVG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5sZWdlbmRPcGVuID0gdGhpcy5sZWdlbmRPcGVuID09PSAnZmx5SW4nID8gJ2ZseU91dCcgOiAnZmx5SW4nO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3L25neC1obS1jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgQ09NUE9ORU5UUyA9IFtOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudF07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0NPTVBPTkVOVFNdLFxyXG4gIGV4cG9ydHM6IFtDT01QT05FTlRTXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyRGF5TW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEhhbW1lckdlc3R1cmVDb25maWcsIEhBTU1FUl9HRVNUVVJFX0NPTkZJRyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBESVJFQ1RJT05fQUxMIH0gZnJvbSAnaGFtbWVyanMnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudCB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEhhbW1lckNvbmZpZyBleHRlbmRzIEhhbW1lckdlc3R1cmVDb25maWcge1xyXG4gIG92ZXJyaWRlcyA9IDxhbnk+e1xyXG4gICAgc3dpcGU6IHsgZGlyZWN0aW9uOiBESVJFQ1RJT05fQUxMIH0sXHJcbiAgfTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50LCBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW05neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnRdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW05neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogSEFNTUVSX0dFU1RVUkVfQ09ORklHLFxyXG4gICAgICB1c2VDbGFzczogSGFtbWVyQ29uZmlnLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhck1vbnRoTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnQgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcvbmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldy5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ3hIbUNhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ3hIbUNhbGVuZGFyV2Vla1ZpZXdDb21wb25lbnRdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhcldlZWtNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4UnhNb2RhbE1vZHVsZSB9IGZyb20gJ25neC1yeC1tb2RhbCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJEYXlNb2R1bGUgfSBmcm9tICcuL2RheS9uZ3gtaG0tY2FsZW5kYXItZGF5Lm1vZHVsZSc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJNb250aE1vZHVsZSB9IGZyb20gJy4vbW9udGgvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyV2Vla01vZHVsZSB9IGZyb20gJy4vd2Vlay9uZ3gtaG0tY2FsZW5kYXItd2Vlay5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBOZ3hSeE1vZGFsTW9kdWxlLFxyXG4gICAgTmd4SG1DYWxlbmRhck1vbnRoTW9kdWxlLFxyXG4gICAgTmd4SG1DYWxlbmRhcldlZWtNb2R1bGUsXHJcbiAgICBOZ3hIbUNhbGVuZGFyRGF5TW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4SG1DYWxlbmRhckNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW05neEhtQ2FsZW5kYXJDb21wb25lbnRdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhck1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGRyZW4iLCJTdWJqZWN0IiwiSW5qZWN0IiwiTkdYX1JYX01PREFMX1RPS0VOIiwidHJpZ2dlciIsInN0YXRlIiwic3R5bGUiLCJ0cmFuc2l0aW9uIiwiYW5pbWF0ZSIsIk5neFJ4TW9kYWxTZXJ2aWNlIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiVmlld0NoaWxkIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJESVJFQ1RJT05fQUxMIiwiSGFtbWVyR2VzdHVyZUNvbmZpZyIsIkhBTU1FUl9HRVNUVVJFX0NPTkZJRyIsIk5neFJ4TW9kYWxNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztRQW9ERSxPQUFRLE9BQU87UUFDZixNQUFPLE1BQU07UUFDYixLQUFNLEtBQUs7OztJQ3REYjs7Ozs7Ozs7Ozs7Ozs7SUFjQTtJQUVBLElBQUksYUFBYSxHQUFHLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDN0IsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO2FBQ2hDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0FBRUYsYUFBZ0IsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFCLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEIsU0FBUyxFQUFFLEtBQUssSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUN2QyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7QUFFRCxJQUFPLElBQUksUUFBUSxHQUFHO1FBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztvQkFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEY7WUFDRCxPQUFPLENBQUMsQ0FBQztTQUNaLENBQUE7UUFDRCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQTtBQUVELGFBNkVnQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJO1lBQ0EsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtnQkFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5RTtRQUNELE9BQU8sS0FBSyxFQUFFO1lBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO1NBQUU7Z0JBQy9CO1lBQ0osSUFBSTtnQkFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BEO29CQUNPO2dCQUFFLElBQUksQ0FBQztvQkFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFBRTtTQUNwQztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztBQUVELGFBQWdCLFFBQVE7UUFDcEIsS0FBSyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDOUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDOzs7Ozs7Ozs7OztBQ3ZJRCxhQUFnQixPQUFPLENBQUMsSUFBSTtRQUMxQixPQUFPLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRixDQUFDOzs7Ozs7OztBQUVELGFBQWdCLFdBQVcsQ0FDekIsSUFBWSxFQUNaLElBQVksRUFDWixNQUE0QixFQUM1QixZQUF1QztRQUF2Qyw2QkFBQTtZQUFBLGlCQUF1Qzs7OztZQUdqQyxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7OztZQUVsQixLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7OztZQUUvQixRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTs7O1lBRXpCLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7OztZQUVsRixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksQ0FBQyxDQUFDOzs7WUFFakQsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLE9BQWIsTUFBTSxXQUFXLFlBQVksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUM7OztZQUUvRSxRQUFRLEdBQXdCLEVBQUU7O1lBRXBDLENBQUM7O1lBQUUsQ0FBQzs7WUFBRSxHQUFHOztZQUFFLFFBQVE7O1FBR3ZCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDckIsSUFBSSxHQUFzQjtnQkFDOUIsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLEVBQUU7YUFDVjs7O2dCQUtDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBRWhCLFFBQVEsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQzs7b0JBRTFCLFdBQTZCO2dCQUVqQyxJQUFJLFFBQVEsSUFBSSxDQUFDLEVBQUU7Ozs7d0JBR1gsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztvQkFFckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7b0JBRzlDLFdBQVcsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO2lCQUM1QztxQkFBTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7Ozs7d0JBRzVCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs7b0JBRXJDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDOztvQkFFckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7b0JBRy9ELFdBQVcsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO2lCQUM1QztxQkFBTTtvQkFDTCxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUN4RDtnQkFFRCxXQUFXLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBQSxDQUFDLENBQUM7Z0JBQ3BGLFdBQVcsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDN0MsV0FBVyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoRCxXQUFXLENBQUMsT0FBTztvQkFDakIsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLENBQUMsV0FBVyxFQUFFO3dCQUN0RCxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEtBQUssQ0FBQyxRQUFRLEVBQUU7d0JBQ2hELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVqRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUM3Qjs7WUF6Q0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFOzthQXlDckI7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0FBRUQsYUFBZ0IsT0FBTyxDQUFDLEtBQXlCLEVBQUUsSUFBVTtRQUMzRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTs7Z0JBQ3RCLEtBQUssR0FBRyxJQUFJLElBQUksQ0FDcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FDdEI7O2dCQUNLLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4RixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUUvQixPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM1RTtRQUVELElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNmLFFBQ0UsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoRCxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUN4QztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7QUFFRCxhQUFnQixnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUN6RCxPQUFPLFVBQUMsS0FBeUI7O2dCQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUs7O2dCQUNuQixRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTs7Z0JBQ3RELFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFOztnQkFDM0IsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztnQkFDbkMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUU7O2dCQUM3QixVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztnQkFDeEMsTUFBTSxHQUFXLEVBQUU7O2dCQUVyQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFFeEYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztZQUVqRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFekMsT0FBTyxPQUFPLEdBQUcsVUFBVSxFQUFFO2dCQUMzQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1lBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQzs7b0JBQ1gsRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQztnQkFDbkMsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDakMsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxPQUFPLEVBQUUsQ0FBQzthQUNYLENBQUMsQ0FBQztTQUNKLENBQUM7SUFDSixDQUFDOzs7Ozs7QUM5SUQ7UUFvRkU7WUEvQkEsY0FBUyxHQUFHLE9BQU8sQ0FBQztZQUVwQixjQUFTLEdBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV4RSxhQUFRLEdBQUcsR0FBRyxDQUFDO1lBRWYsY0FBUyxHQUFHLEdBQUcsQ0FBQztZQUVoQixpQkFBWSxHQUF5QixFQUFFLENBQUM7WUFFeEMsV0FBTSxHQUF5QixFQUFFLENBQUM7WUFFbEMsU0FBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFHbEIsU0FBSSxHQUFzQixJQUFJQSxpQkFBWSxFQUFFLENBQUM7WUFFN0MsaUJBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXpFLGdCQUFXLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQVlmO1FBVmhCLHNCQUFJLGlEQUFJOzs7Z0JBQVI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2hDOzs7V0FBQTtRQUNELHNCQUFJLGlEQUFJOzs7Z0JBQVI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzdCOzs7V0FBQTtRQUNELHNCQUFJLGlEQUFJOzs7Z0JBQVI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzVCOzs7V0FBQTs7OztRQUlELDhDQUFJOzs7WUFBSjtnQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdkY7Ozs7UUFFRCw4Q0FBSTs7O1lBQUo7Z0JBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3ZGOzs7Ozs7UUFFRCx1REFBYTs7Ozs7WUFBYixVQUFjLElBQXVCLEVBQUUsR0FBcUI7Z0JBQzFELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ3JCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEdBQUcsRUFBRTt3QkFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7cUJBQzlCO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQzs0QkFDekIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7eUJBQzNCLENBQUMsQ0FBQzt3QkFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzs7NEJBRWpCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVzt3QkFDckQsSUFBSSxDQUFDLEtBQUssR0FBRzs0QkFDWCxJQUFJLEVBQUUsU0FBTyxPQUFPLE1BQUc7NEJBQ3ZCLFdBQVcsRUFBSyxPQUFPLE1BQUc7NEJBQzFCLFdBQVcsRUFBSyxPQUFPLE1BQUc7eUJBQzNCLENBQUM7cUJBQ0g7aUJBQ0Y7YUFDRjs7Ozs7UUFFRCxtREFBUzs7OztZQUFULFVBQVUsS0FBeUI7Z0JBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCOzs7Ozs7UUFFRCxtREFBUzs7Ozs7WUFBVCxVQUFVLEtBQUssRUFBRSxJQUFJO2dCQUNuQixPQUFPLEtBQUssQ0FBQzthQUNkOzs7OztRQUVELHFEQUFXOzs7O1lBQVgsVUFBWSxPQUFzQjtnQkFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDdkY7YUFDRjs7b0JBekhGQyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLDRCQUE0Qjt3QkFDdEMsUUFBUSxFQUFFLCs4Q0FzQ1g7aUNBQ1UsbW9HQUFtb0csRUFBRSwyR0FBMkc7cUJBQzF2Rzs7Ozs7Z0NBRUVDLFVBQUs7Z0NBRUxBLFVBQUs7K0JBRUxBLFVBQUs7Z0NBRUxBLFVBQUs7bUNBRUxBLFVBQUs7NkJBRUxBLFVBQUs7MkJBRUxBLFVBQUs7MkJBR0xDLFdBQU07O1FBK0RULHNDQUFDO0tBQUE7Ozs7Ozs7UUNwREM7WUFsQkEsY0FBUyxHQUFHLE9BQU8sQ0FBQztZQUVwQixZQUFPLEdBQUcsR0FBRyxDQUFDO1lBRWQsY0FBUyxHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFeEUsaUJBQVksR0FBeUIsRUFBRSxDQUFDO1lBRXhDLFdBQU0sR0FBeUIsRUFBRSxDQUFDO1lBRWxDLFNBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBR2xCLFNBQUksR0FBc0IsSUFBSUgsaUJBQVksRUFBRSxDQUFDO1lBRTdDLGFBQVEsR0FBMkIsRUFBRSxDQUFDO1lBQ3RDLGVBQVUsR0FBcUMsRUFBRSxDQUFDO1NBRWxDOzs7O1FBRWhCLGlEQUFROzs7WUFBUjtnQkFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7Ozs7UUFFTyxrREFBUzs7O1lBQWpCO2dCQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3RCOzs7O1FBRUQsb0RBQVc7OztZQUFYOztvQkFDUSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7O29CQUNsQixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7O29CQUM1QixTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFL0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOzt3QkFDcEIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRWpDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxvQkFBQzt3QkFDakIsSUFBSSxNQUFBO3dCQUNKLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUN4QixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDdEIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssS0FBSyxDQUFDLFlBQVksRUFBRTtxQkFDdEQsR0FBeUIsQ0FBQztpQkFDNUI7YUFDRjs7OztRQUVELHNEQUFhOzs7WUFBYjs7O29CQUNRLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7b0JBQy9CLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQzs7b0JBQzdFLFFBQVEsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFOztvQkFFN0IsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztvQkFDOUIsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDOztvQkFDekUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUEsS0FBQSxJQUFJLENBQUMsTUFBTSxFQUMxQixNQUFNLG9CQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQ3hGLE1BQU0sQ0FBQyxVQUFBLENBQUM7b0JBQ1AsUUFDRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUTt5QkFDMUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUM7eUJBQzNDLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQzFDO2lCQUNILENBQUM7cUJBQ0QsSUFBSSxDQUFDLFVBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSyxPQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBQSxDQUFDO3FCQUN6RCxHQUFHLENBQUMsVUFBQSxDQUFDOzt3QkFDRSxLQUFLLEdBQW1DO3dCQUM1QyxLQUFLLEVBQUU7NEJBQ0wsS0FBSyxFQUFFLENBQUM7NEJBQ1IsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUTs0QkFDakMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLO3lCQUNmO3dCQUNELGdCQUFnQixFQUFFLElBQUk7d0JBQ3RCLGFBQWEsRUFBRSxJQUFJO3dCQUNuQixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHO3dCQUNWLElBQUksRUFBRSxDQUFDO3FCQUNSO29CQUVELElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUU7d0JBQzVDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzFELEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDO3FCQUNoRDt5QkFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEVBQUU7d0JBQzFFLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQzt3QkFDbEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3FCQUNoQzt5QkFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFO3dCQUMxRSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ25ELEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDO3dCQUMvQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztxQkFDN0I7eUJBQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLFNBQVMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTt3QkFDbkQsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7d0JBQ3JCLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQy9CLEtBQUssQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO3FCQUM3QjtvQkFFRCxvQkFDSyxLQUFLLElBQ1IsS0FBSyxFQUFFOzRCQUNMLEtBQUssRUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQUc7NEJBQzFDLElBQUksRUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQUc7NEJBQ3hDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSzt5QkFDZixJQUNEO2lCQUNILENBQUMsQ0FBQzthQUNOOzs7O1FBRUQsNkNBQUk7OztZQUFKO2dCQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNsQjs7OztRQUVELDZDQUFJOzs7WUFBSjtnQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDbEI7Ozs7O1FBRUQsa0RBQVM7Ozs7WUFBVCxVQUFVLEtBQUs7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkI7Ozs7O1FBRUQsb0RBQVc7Ozs7WUFBWCxVQUFZLE9BQXNCO2dCQUNoQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNsQjthQUNGOztvQkF0TEZDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsMkJBQTJCO3dCQUNyQyxRQUFRLEVBQUUsaWpEQXlDWDtpQ0FDVSw4bkRBQThuRDtxQkFDeG9EOzs7OztnQ0FFRUMsVUFBSzs4QkFFTEEsVUFBSztnQ0FFTEEsVUFBSzttQ0FFTEEsVUFBSzs2QkFFTEEsVUFBSzsyQkFFTEEsVUFBSzsyQkFHTEMsV0FBTTs7UUEySFQscUNBQUM7S0FBQTs7Ozs7OztBQ25NRCxRQUFhLFlBQVksR0FBVTtRQUNqQztZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7UUFDRDtZQUNFLElBQUksRUFBRSxPQUFPO1NBQ2Q7S0FDRjs7Ozs7OztRQ21FQztZQXRFQSxjQUFTLEdBQUcsT0FBTyxDQUFDO1lBRXBCLGlCQUFZLEdBQXlCLEVBQUUsQ0FBQztZQUV4QyxXQUFNLEdBQXlCLEVBQUUsQ0FBQztZQUVsQyxTQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU3QixVQUFLLEdBQUcsT0FBTyxDQUFDO1lBRWhCLFFBQUcsR0FBRyxPQUFPLENBQUM7WUFFZCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBR1gsU0FBSSxHQUFzQixJQUFJSCxpQkFBWSxFQUFFLENBQUM7WUFFN0MsYUFBUSxHQUFHLEdBQUcsQ0FBQztZQWlEZixjQUFTLEdBQXFDLEVBQUUsQ0FBQztZQUVqRCxnQkFBVyxHQUFVLFlBQVksQ0FBQztTQUVqQjtRQWpEakIsc0JBQUksb0RBQVM7OztnQkFBYjs7b0JBQ1EsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztvQkFDbkYsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFFbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7d0JBQ2IsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O3dCQUN0QixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO3dCQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRXBCLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3lCQUN6QjtxQkFDRjtpQkFDRjtnQkFFRCxPQUFPLElBQUksQ0FBQzthQUNiOzs7V0FBQTtRQUVELHNCQUFJLG1EQUFROzs7Z0JBQVo7O29CQUNRLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7b0JBQ25GLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBRWhDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O3dCQUNiLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzt3QkFDdEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRTlCLElBQUksSUFBSSxFQUFFO3dCQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRXBCLElBQUksTUFBTSxFQUFFOzRCQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ3pCO3FCQUNGO2lCQUNGO2dCQUVELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQjtnQkFFRCxPQUFPLElBQUksQ0FBQzthQUNiOzs7V0FBQTs7OztRQVFELHVEQUFlOzs7WUFBZjtnQkFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDakI7Ozs7UUFFRCxnREFBUTs7O1lBQVI7Z0JBQ0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCOzs7O1FBRUQsc0RBQWM7OztZQUFkOztvQkFDUSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7b0JBQ3ZELE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7Ozs7b0JBRXJDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtnQkFFM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7Z0JBRXRCLEtBQUssSUFBSSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsR0FBRyxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzt3QkFDcEIsSUFBSSxFQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUU7cUJBQ3hELENBQUMsQ0FBQztpQkFDSjthQUNGOzs7O1FBRUQsbURBQVc7OztZQUFYO2dCQUFBLGlCQWlGQzs7O29CQWhGTyxLQUFLLEdBQUcsRUFBRTs7b0JBQ1YsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTOztvQkFDMUIsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFROztvQkFDeEIsb0JBQW9CLEdBQUcsVUFBQyxHQUFHLEVBQUUsS0FBSzs7d0JBQ2hDLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDOUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLEtBQUssS0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7aUJBQ3ZEO2dCQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQSxLQUFBLElBQUksQ0FBQyxNQUFNLEVBQ3pCLE1BQU0sb0JBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsR0FHMUYsTUFBTSxDQUFDLFVBQUMsQ0FBcUI7b0JBQzVCLFFBQ0UsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVE7eUJBQzFDLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDO3lCQUMzQyxTQUFTLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUMxQztpQkFDSCxDQUFDOztxQkFFRCxJQUFJLENBQUMsVUFBQyxFQUFzQixFQUFFLEVBQXNCLElBQUssT0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUEsQ0FBQzs7cUJBRWpHLEdBQUcsQ0FBQyxVQUFDLENBQXFCLEVBQUUsQ0FBUzs7d0JBQzlCLFNBQVMsR0FBMkI7d0JBQ3hDLEtBQUssRUFBRTs0QkFDTCxHQUFHLEVBQUUsQ0FBQzs0QkFDTixNQUFNLEVBQUUsQ0FBQzs0QkFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxRQUFRO3lCQUV4Qjt3QkFDRCxnQkFBZ0IsRUFBRSxJQUFJO3dCQUN0QixhQUFhLEVBQUUsSUFBSTt3QkFDbkIsSUFBSSxFQUFFLENBQUM7cUJBQ1I7O29CQUVELElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxTQUFTLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUU7Ozs0QkFJcEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7NEJBQ3ZFLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQzt5QkFDdkU7NkJBQU0sSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRTs7OzRCQUlsRCxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFDdkUsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7NEJBQ3pFLFNBQVMsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO3lCQUNqQztxQkFDRjt5QkFBTSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFFOzt3QkFFL0IsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRTs0QkFDcEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFDN0QsU0FBUyxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs0QkFDbkMsU0FBUyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7eUJBQ2pDOzZCQUFNLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUU7NEJBQ2pELFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDOzRCQUN4RSxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3lCQUNwQztxQkFDRjtvQkFFRCxPQUFPLFNBQVMsQ0FBQztpQkFDbEIsQ0FBQzs7cUJBRUQsTUFBTSxDQUFDLFVBQUMsQ0FBeUIsSUFBSyxPQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBQSxDQUFDOztxQkFFM0QsR0FBRyxDQUFDLFVBQUMsQ0FBeUIsRUFBRSxDQUFDO29CQUNoQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDakMsb0JBQ0ssQ0FBQyxJQUNKLEtBQUssRUFBRTs0QkFDTCxHQUFHLEVBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQUk7NEJBQ3ZCLE1BQU0sRUFBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sT0FBSTs0QkFDN0IsSUFBSSxFQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFJOzRCQUN6QixVQUFVLEVBQUUsS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQU87eUJBQzlCLElBQ0Q7aUJBQ0gsQ0FBQyxDQUFDO2FBQ047Ozs7UUFFRCx5REFBaUI7OztZQUFqQjs7Ozs7O2dCQUFBLGlCQW1CQztnQkFaQyxVQUFVLENBQUM7Ozt3QkFFSCxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNOzBCQUNuQyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsRUFBRSxHQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsR0FBQSxDQUFDOzBCQUM1RCxDQUFDO29CQUVMLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7d0JBQzdFLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUs7NEJBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBTSxHQUFHLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxPQUFJLENBQUM7eUJBQ2pGLENBQUMsQ0FBQztxQkFDSjtpQkFDRixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1A7Ozs7UUFFRCw0Q0FBSTs7O1lBQUo7Z0JBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCOzs7O1FBRUQsNENBQUk7OztZQUFKO2dCQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjs7Ozs7UUFFRCxpREFBUzs7OztZQUFULFVBQVUsS0FBSztnQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2Qjs7Ozs7UUFFRCxtREFBVzs7OztZQUFYLFVBQVksT0FBc0I7Z0JBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakI7YUFDRjs7b0JBalJGQyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjt3QkFDcEMsUUFBUSxFQUFFLHV4Q0ErQ1g7aUNBQ1UsKzhCQUErOEI7cUJBQ3o5Qjs7Ozs7Z0NBRUVDLFVBQUs7bUNBRUxBLFVBQUs7NkJBRUxBLFVBQUs7MkJBRUxBLFVBQUs7NEJBRUxBLFVBQUs7MEJBRUxBLFVBQUs7NEJBRUxBLFVBQUs7MkJBR0xDLFdBQU07MkJBS05DLGlCQUFZLFNBQUMsS0FBSzs7UUF5TXJCLG9DQUFDO0tBQUE7Ozs7Ozs7O1FDL1JDLE1BQU8sTUFBTTtRQUNiLE9BQVEsT0FBTztRQUNmLEtBQU0sS0FBSzs7Ozs7OztBQ0xiO1FBc0ZFLDBDQUFnRCxJQUFJO1lBQUosU0FBSSxHQUFKLElBQUksQ0FBQTtZQWJwRCxjQUFTLEdBQXlCLEVBQUUsQ0FBQztZQUNyQyxTQUFJLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO1lBQ2pDLFlBQU8sR0FBRyxJQUFJLENBQUM7WUFLZixXQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBS3pDLGFBQVEsR0FBRyxJQUFJQyxZQUFPLEVBQUUsQ0FBQztZQUU5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjtRQVBELHNCQUFJLG1EQUFLOzs7Z0JBQVQ7Z0JBQUEsaUJBRUM7Z0JBREMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxHQUFBLENBQUMsQ0FBQzthQUMvRDs7O1dBQUE7Ozs7UUFPRCxtREFBUTs7O1lBQVIsZUFBYTs7OztRQUViLHdEQUFhOzs7WUFBYjtnQkFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2FBQ2xDOzs7O1FBRUQsd0RBQWE7OztZQUFiO2dCQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDbEM7Ozs7O1FBRUQscURBQVU7Ozs7WUFBVixVQUFXLElBQUk7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO2FBQ3hDOzs7OztRQUVELHNEQUFXOzs7O1lBQVgsVUFBWSxLQUFLO2dCQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUUzQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEtBQUsscUJBQXFCLENBQUMsR0FBRyxFQUFFO29CQUNsRSxJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztvQkFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM1RTtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEU7YUFDRjs7Ozs7UUFFRCxvREFBUzs7OztZQUFULFVBQVUsR0FBRztnQkFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6Qjs7OztRQUVELDZEQUFrQjs7O1lBQWxCO2dCQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2FBQ3ZDOzs7O1FBRUQsOERBQW1COzs7WUFBbkI7Z0JBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7YUFDeEM7O29CQXZIRkosY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSw2QkFBNkI7d0JBQ3ZDLFFBQVEsRUFBRSx3b0VBNERYO2lDQUNVLGt6RUFBZ3pFO3FCQUMxekU7Ozs7O3dEQWVjSyxXQUFNLFNBQUNDLDZCQUFrQjs7O1FBeUN4Qyx1Q0FBQztLQUFBOzs7Ozs7QUMvSEQ7UUFnQk0sSUFBSSxHQUFHLGNBQWM7QUFFM0I7UUErTEUsZ0NBQW9CLE1BQXlCLEVBQVUsUUFBa0M7WUFBckUsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7WUFBVSxhQUFRLEdBQVIsUUFBUSxDQUEwQjtZQWpFekYsY0FBUyxHQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFeEUsYUFBUSxHQUFHLEdBQUcsQ0FBQztZQUVmLGNBQVMsR0FBRyxHQUFHLENBQUM7WUFFaEIsWUFBTyxHQUFHLEdBQUcsQ0FBQztZQUVkLG1CQUFjLEdBQWlDLEVBQUUsQ0FBQztZQUVsRCxpQkFBWSxHQUF5QixFQUFFLENBQUM7WUFFeEMsV0FBTSxHQUF5QixFQUFFLENBQUM7WUFFbEMsU0FBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFFbEIsU0FBSSxHQUFzQixJQUFJUCxpQkFBWSxFQUFFLENBQUM7WUFHN0MsY0FBUyxHQUFHLE9BQU8sQ0FBQztZQUVwQixTQUFJLEdBQUc7Z0JBQ0wsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsTUFBTSxFQUFFLE9BQU87YUFDaEIsQ0FBQzs7OztZQUtGLGFBQVEsR0FBMEIscUJBQXFCLENBQUMsS0FBSyxDQUFDO1lBcUI5RCxlQUFVLEdBQUcsUUFBUSxDQUFDO1lBV2Qsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FDakUsZ0NBQWdDLENBQ2pDLENBQUM7U0FFMkY7UUFsQzdGLHNCQUFJLHdDQUFJOzs7Z0JBQVI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2hDOzs7V0FBQTtRQUNELHNCQUFJLHdDQUFJOzs7Z0JBQVI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzdCOzs7V0FBQTtRQUNELHNCQUFJLHdDQUFJOzs7Z0JBQVI7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzVCOzs7V0FBQTtRQUNELHNCQUFJLDZDQUFTOzs7Z0JBQWI7O29CQUNNLE1BQU0sR0FBTSxJQUFJLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxRQUFRLFVBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFVBQUksSUFBSSxDQUFDLFNBQVc7Z0JBRS9FLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7b0JBQy9DLE1BQU0sR0FBTSxNQUFNLFNBQUksSUFBSSxDQUFDLElBQUksU0FBSSxJQUFJLENBQUMsT0FBUyxDQUFDO2lCQUNuRDtnQkFFRCxPQUFPLE1BQU0sQ0FBQzthQUNmOzs7V0FBQTs7OztRQW1CRCxxQ0FBSTs7O1lBQUo7Z0JBQ0UsUUFBUSxJQUFJLENBQUMsUUFBUTtvQkFDbkIsS0FBSyxxQkFBcUIsQ0FBQyxLQUFLO3dCQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUMzQixNQUFNO29CQUNSLEtBQUsscUJBQXFCLENBQUMsSUFBSTt3QkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDMUIsTUFBTTtvQkFDUixLQUFLLHFCQUFxQixDQUFDLEdBQUc7d0JBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ3pCLE1BQU07aUJBQ1Q7YUFDRjs7OztRQUVELHFDQUFJOzs7WUFBSjtnQkFDRSxRQUFRLElBQUksQ0FBQyxRQUFRO29CQUNuQixLQUFLLHFCQUFxQixDQUFDLEtBQUs7d0JBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQzNCLE1BQU07b0JBQ1IsS0FBSyxxQkFBcUIsQ0FBQyxJQUFJO3dCQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUMxQixNQUFNO29CQUNSLEtBQUsscUJBQXFCLENBQUMsR0FBRzt3QkFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDekIsTUFBTTtpQkFDVDthQUNGOzs7OztRQUVELDBDQUFTOzs7O1lBQVQsVUFBVSxLQUF5QjtnQkFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkI7Ozs7O1FBRUQsNkNBQVk7Ozs7WUFBWixVQUFhLE1BQWtCO2dCQUEvQixpQkFjQztnQkFiQyxJQUFJLENBQUMsTUFBTTtxQkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO29CQUM5QixrQkFBa0IsRUFBRSxJQUFJO29CQUN4QixVQUFVLEVBQUU7d0JBQ1YsR0FBRyxFQUFLLE1BQU0sQ0FBQyxPQUFPLE9BQUk7cUJBQzNCO29CQUNELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7aUJBQ2xFLENBQUM7cUJBQ0QsU0FBUyxDQUFDLFVBQUEsWUFBWTtvQkFDckIsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLEtBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO3FCQUMxQjtpQkFDRixDQUFDLENBQUM7YUFDTjs7Ozs7UUFFRCwwQ0FBUzs7OztZQUFULFVBQVUsSUFBUztnQkFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDdEI7Ozs7UUFFRCw2Q0FBWTs7O1lBQVo7Z0JBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxLQUFLLE9BQU8sR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDO2FBQ3BFOztvQkF2UEZDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsaUJBQWlCO3dCQUMzQixRQUFRLEVBQUUsNHZHQTJGWDt3QkFFQyxVQUFVLEVBQUU7NEJBQ1ZPLGtCQUFPLENBQUMsU0FBUyxFQUFFO2dDQUNqQkMsZ0JBQUssQ0FDSCxRQUFRLEVBQ1JDLGdCQUFLLENBQUM7b0NBQ0osU0FBUyxFQUFFLCtCQUErQjtpQ0FDM0MsQ0FBQyxDQUNIO2dDQUNERCxnQkFBSyxDQUNILE9BQU8sRUFDUEMsZ0JBQUssQ0FBQztvQ0FDSixTQUFTLEVBQUUsZUFBZTtpQ0FDM0IsQ0FBQyxDQUNIO2dDQUNEQyxxQkFBVSxDQUFDLGlCQUFpQixFQUFFO29DQUM1QkQsZ0JBQUssQ0FBQzt3Q0FDSixTQUFTLEVBQUUsK0JBQStCO3FDQUMzQyxDQUFDO29DQUNGRSxrQkFBTyxDQUFDLElBQUksQ0FBQztpQ0FDZCxDQUFDO2dDQUNGRCxxQkFBVSxDQUFDLGlCQUFpQixFQUFFO29DQUM1QkQsZ0JBQUssQ0FBQzt3Q0FDSixTQUFTLEVBQUUsZUFBZTtxQ0FDM0IsQ0FBQztvQ0FDRkUsa0JBQU8sQ0FBQyxJQUFJLENBQUM7aUNBQ2QsQ0FBQzs2QkFDSCxDQUFDO3lCQUNIO2lDQTVCUSw2NEZBQTY0RjtxQkE2QnY1Rjs7Ozs7d0JBcElRQyw0QkFBaUI7d0JBTnhCQyw2QkFBd0I7Ozs7Z0NBNEl2QlosVUFBSzsrQkFFTEEsVUFBSztnQ0FFTEEsVUFBSzs4QkFFTEEsVUFBSztxQ0FFTEEsVUFBSzttQ0FFTEEsVUFBSzs2QkFFTEEsVUFBSzsyQkFFTEEsVUFBSzsyQkFFTEMsV0FBTTtnQ0FHTkQsVUFBSzsyQkFFTEEsVUFBSztxQ0FnQ0xhLGNBQVMsU0FBQywrQkFBK0I7b0NBR3pDQSxjQUFTLFNBQUMsOEJBQThCO21DQUd4Q0EsY0FBUyxTQUFDLDZCQUE2Qjs7UUFnRTFDLDZCQUFDO0tBQUE7Ozs7OztBQzFRRDtRQUlNLFVBQVUsR0FBRyxDQUFDLDZCQUE2QixDQUFDO0FBRWxEO1FBQUE7U0FNc0M7O29CQU5yQ0MsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQkFBWSxDQUFDO3dCQUN2QixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7d0JBQzFCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQzt3QkFDckIsT0FBTyxFQUFFLENBQUNDLDJCQUFzQixDQUFDO3FCQUNsQzs7UUFDb0MsNkJBQUM7S0FBQTs7Ozs7OztRQ0xKQyxnQ0FBbUI7UUFBckQ7WUFBQSxxRUFJQztZQUhDLGVBQVMsc0JBQVE7Z0JBQ2YsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFQyxzQkFBYSxFQUFFO2FBQ3BDLEVBQUEsQ0FBQzs7U0FDSDtRQUFELG1CQUFDO0lBQUQsQ0FBQyxDQUppQ0MsbUNBQW1CLEdBSXBEOztRQUVEO1NBWXlDOztvQkFaeENMLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsQ0FBQ0MsbUJBQVksQ0FBQzt3QkFDdkIsWUFBWSxFQUFFLENBQUMsK0JBQStCLEVBQUUsZ0NBQWdDLENBQUM7d0JBQ2pGLE9BQU8sRUFBRSxDQUFDLCtCQUErQixDQUFDO3dCQUMxQyxlQUFlLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQzt3QkFDbkQsU0FBUyxFQUFFOzRCQUNUO2dDQUNFLE9BQU8sRUFBRUsscUNBQXFCO2dDQUM5QixRQUFRLEVBQUUsWUFBWTs2QkFDdkI7eUJBQ0Y7cUJBQ0Y7O1FBQ3VDLCtCQUFDO0tBQUE7Ozs7OztBQ3pCekM7UUFJQTtTQUt1Qzs7b0JBTHRDTixhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLG1CQUFZLENBQUM7d0JBQ3ZCLFlBQVksRUFBRSxDQUFDLDhCQUE4QixDQUFDO3dCQUM5QyxPQUFPLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztxQkFDMUM7O1FBQ3FDLDhCQUFDO0tBQUE7Ozs7OztBQ1R2QztRQVFBO1NBV21DOztvQkFYbENELGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BDLG1CQUFZOzRCQUNaTSwyQkFBZ0I7NEJBQ2hCLHdCQUF3Qjs0QkFDeEIsdUJBQXVCOzRCQUN2QixzQkFBc0I7eUJBQ3ZCO3dCQUNELFlBQVksRUFBRSxDQUFDLHNCQUFzQixDQUFDO3dCQUN0QyxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztxQkFDbEM7O1FBQ2lDLDBCQUFDO0tBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9