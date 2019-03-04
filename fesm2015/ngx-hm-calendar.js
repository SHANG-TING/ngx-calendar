import { Component, EventEmitter, Input, Output, ViewChildren, Inject, ComponentFactoryResolver, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NGX_RX_MODAL_TOKEN, NgxRxModalService, NgxRxModalModule } from 'ngx-rx-modal';
import { Subject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { DIRECTION_ALL } from 'hammerjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @enum {string} */
const NgxHmCalendarViewMode = {
    month: 'month',
    week: 'week',
    day: 'day',
};

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
function getCalendar(ynow, mnow, events, weeklyEvents = []) {
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
function contain(event, date) {
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
function getMutipleEvents(ynow, mnow) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgxHmCalendarMonthViewComponent {
    constructor() {
        this.className = 'black';
        this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        this.yearName = '年';
        this.monthName = '月';
        this.weeklyEvents = [];
        this.events = [];
        this.nstr = new Date();
        this.open = new EventEmitter();
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
        this.eachPresent = 100 / 14;
    }
    /**
     * @return {?}
     */
    get ynow() {
        return this.nstr.getFullYear();
    }
    /**
     * @return {?}
     */
    get mnow() {
        return this.nstr.getMonth();
    }
    /**
     * @return {?}
     */
    get dnow() {
        return this.nstr.getDate();
    }
    /**
     * @return {?}
     */
    prev() {
        this.nstr.setMonth(this.nstr.getMonth() - 1);
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
    }
    /**
     * @return {?}
     */
    next() {
        this.nstr.setMonth(this.nstr.getMonth() + 1);
        this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
    }
    /**
     * @param {?} week
     * @param {?} day
     * @return {?}
     */
    showEventList(week, day) {
        if (day.events.length) {
            if (week.selectedDay && week.selectedDay === day) {
                week.selectedDay = undefined;
            }
            else {
                this.calendarData.forEach(w => {
                    w.selectedDay = undefined;
                });
                week.selectedDay = day;
                /** @type {?} */
                const present = (day.name * 2 + 1) * this.eachPresent;
                week.style = {
                    flex: `1 1 ${present}%`,
                    'max-width': `${present}%`,
                    'min-width': `${present}%`,
                };
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openEvent(event) {
        this.open.emit(event);
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return index;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.events || changes.nstr) {
            this.calendarData = getCalendar(this.ynow, this.mnow, this.events, this.weeklyEvents);
        }
    }
}
NgxHmCalendarMonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar-month-view',
                template: `<div class="month new"
     [ngClass]="className">
  <div class="week"
       *ngFor="let week of calendarData; trackBy: trackByFn; let week_index = index;">
    <div class="day"
         *ngFor="let day of week.days; trackBy: trackByFn; let day_index = index;"
         [ngClass]="{ other: day.other, today: day.isToday }"
         (click)="showEventList(week, day)">
      <div class="day-name">{{ weekNames[day.name] }}</div>
      <div class="day-number">{{ day.number }}</div>
      <div class="day-events">
        <ng-container *ngFor="let event of day.events;">
          <span [style.background]="event.color"></span>
        </ng-container>
      </div>
    </div>
    <div class="details"
         [ngClass]="{ 'in': week.selectedDay, 'out': !week.selectedDay }">
      <div class="arrow-container"
           *ngIf="week.selectedDay">
        <div class="fill"
             [ngStyle]="week.style"></div>
        <div class="arrow"></div>
      </div>
      <div class="events">
        <ng-container *ngIf="week.selectedDay">
          <div class="event"
               *ngFor="let event of week.selectedDay.events;"
               (click)="openEvent(event)">
            <div class="event-category"
                 [style.background]="event.color"></div>
            <span>{{ event.title }}</span>
          </div>
        </ng-container>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`:host{display:block;max-height:85vh}.month{opacity:0}.month.new{-webkit-animation:1s ease-out fadeIn;animation:1s ease-out fadeIn;opacity:1;overflow-y:scroll}.month.black .day{color:#fff}.month.black .day.other{color:#717171}.month.black .day.today{background:#467298;color:#53b7ff}.month.black .day-name{color:rgba(255,255,255,.5)}.month.black .details{background:#a4a4a4;color:#fff}.month.white .day{color:#000}.month.white .day.other,.month.white .day.other .day-name{color:#dadada}.month.white .day.today{background:#d7ecff;color:#53b7ff}.month.white .day-name{color:#db4437}.month.white .arrow{border-color:transparent transparent #dcffc7}.month.white .details{background:#dcffc7}.month .week{display:flex;flex-wrap:wrap}.month .week .day{z-index:1;display:inline-block;width:calc(100% / 7);padding:10px;text-align:center;cursor:pointer;box-sizing:border-box}.month .week .day .day-events{list-style:none;margin-top:3px;text-align:center;min-height:12px;line-height:6px;overflow:hidden}.month .week .day .day-events span{display:inline-block;width:5px;height:5px;margin:0 1px}.month .week .day .day-name{font-size:9px;text-transform:uppercase;margin-bottom:5px;letter-spacing:.7px}.month .week .day .day-number{font-size:24px}.month .week .details{display:none;position:relative;max-height:5000px;width:100%;margin-top:5px;border-radius:4px;flex:1 1 100%;min-width:100%;max-width:100%}.month .week .details.in{display:block;-webkit-animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade;animation:.5s cubic-bezier(1,0,1,0) moveFromTopFade}.month .week .details.in .event{-webkit-animation:.3s .3s both fadeIn;animation:.3s .3s both fadeIn}.month .week .details.out{display:block;z-index:-1;max-height:0;transition:all .5s cubic-bezier(0,1,0,1)}.month .week .details.out .event{-webkit-animation:.3s both fadeIn;animation:.3s both fadeIn}.month .week .details .arrow-container{width:100%;display:flex}.month .week .details .arrow-container .fill{transition:all .3s ease}.month .week .details .arrow-container .arrow{-webkit-transform:translateX(-2.5px) translateY(-5px);transform:translateX(-2.5px) translateY(-5px);width:0;height:0;border-style:solid;border-width:0 5px 5px;border-color:transparent transparent #a4a4a4}.month .week .details .events{min-height:120px;padding:7px 0;overflow-y:auto;overflow-x:hidden}.month .week .details .events .event{font-size:16px;line-height:22px;letter-spacing:.5px;padding:2px 16px;vertical-align:top;display:flex}.month .week .details .events .event.empty{color:#eee}.month .week .details .events .event .event-category{height:10px;width:10px;display:inline-block;margin:6px 5px 0;vertical-align:top}.month .week .details .events .event span{display:inline-block;padding:0 0 0 7px}.month .week .details .events .event span:hover{color:#ff0;font-size:120%}.month .week .details .events .event span:active{color:red}@media screen and (max-width:320px){.day{padding:5px}}@-webkit-keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@keyframes moveFromTopFade{0%{max-height:0}100%{max-height:5000px}}@-webkit-keyframes fadeIn{0%{opacity:0}}@keyframes fadeIn{0%{opacity:0}}@-webkit-keyframes fadeOut{100%{opacity:0}}@keyframes fadeOut{100%{opacity:0}}`, `.blue{background:#9ccaeb}.orange{background:#f7a700}.green{background:#99c66d}.yellow{background:#f9e900}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarMonthViewComponent.ctorParameters = () => [];
NgxHmCalendarMonthViewComponent.propDecorators = {
    className: [{ type: Input }],
    weekNames: [{ type: Input }],
    yearName: [{ type: Input }],
    monthName: [{ type: Input }],
    weeklyEvents: [{ type: Input }],
    events: [{ type: Input }],
    nstr: [{ type: Input }],
    open: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgxHmCalendarWeekViewComponent {
    constructor() {
        this.className = 'black';
        this.dayName = '號';
        this.weekNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        this.weeklyEvents = [];
        this.events = [];
        this.nstr = new Date();
        this.open = new EventEmitter();
        this.weekDays = [];
        this.weekEvents = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initValue();
    }
    /**
     * @return {?}
     */
    initValue() {
        this.setWeekDays();
        this.setWeekEvents();
    }
    /**
     * @return {?}
     */
    setWeekDays() {
        /** @type {?} */
        const today = new Date();
        /** @type {?} */
        const nstrDay = this.nstr.getDay();
        /** @type {?} */
        const startDate = new Date(this.nstr.getTime());
        startDate.setDate(startDate.getDate() + (0 - nstrDay));
        this.weekDays = [];
        for (let i = 0; i < 7; i++) {
            /** @type {?} */
            const date = new Date(startDate.getTime());
            date.setDate(date.getDate() + i);
            this.weekDays.push((/** @type {?} */ ({
                date,
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                isToday: date.toDateString() === today.toDateString(),
            })));
        }
    }
    /**
     * @return {?}
     */
    setWeekEvents() {
        /** @type {?} */
        const firstWeekDay = this.weekDays[0];
        /** @type {?} */
        const firstdate = new Date(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day);
        /** @type {?} */
        const firstday = firstdate.getDay();
        /** @type {?} */
        const lastWeekDay = this.weekDays[6];
        /** @type {?} */
        const lastdate = new Date(lastWeekDay.year, lastWeekDay.month, lastWeekDay.day);
        /** @type {?} */
        const lastday = lastdate.getDay();
        lastdate.setDate(lastdate.getDate() + 1);
        this.weekEvents = this.events
            .concat(...this.weeklyEvents.map(getMutipleEvents(firstWeekDay.year, firstWeekDay.month)))
            .filter(e => {
            return ((e.start >= firstdate && e.start < lastdate) ||
                (firstdate >= e.start && firstdate <= e.end) ||
                (e.start <= firstdate && lastdate < e.end));
        })
            .sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
            .map(e => {
            /** @type {?} */
            const event = {
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
            return Object.assign({}, event, { style: {
                    width: `${(event.style.width / 7) * 100}%`,
                    left: `${(event.style.left / 7) * 100}%`,
                    color: e.color,
                } });
        });
    }
    /**
     * @return {?}
     */
    prev() {
        this.nstr.setDate(this.nstr.getDate() - 7);
        this.initValue();
    }
    /**
     * @return {?}
     */
    next() {
        this.nstr.setDate(this.nstr.getDate() + 7);
        this.initValue();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openEvent(event) {
        this.open.emit(event);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.nstr || changes.events) {
            this.initValue();
        }
    }
}
NgxHmCalendarWeekViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar-week-view',
                template: `<div class="cal-week-view"
     [ngClass]="className">

  <div class="cal-day-headers">

    <div class="cal-header"
         *ngFor="let weekDay of weekDays; let i = index; let isFirst = first; let isLast = last"
         [class.cal-weekend]="isFirst || isLast"
         [class.cal-today]="weekDay.isToday">
      <b>{{ weekNames[i] }}</b>
      <br>
      <span>{{ weekDay.day }}{{ dayName }}</span>
    </div>
  </div>

  <div class="action-block">
    <div class="cal-events-row "
         *ngFor="let weekEvent of weekEvents; let i = index;">
      <div class="cal-event-container cal-starts-within-week cal-ends-within-week "
           [style.width]="weekEvent.style.width"
           [style.left]="weekEvent.style.left"
           [class.cal-starts-within-week]="weekEvent.startsBeforeWeek"
           [class.cal-ends-within-week]="weekEvent.endsAfterWeek">
        <div class="cal-event"
             [style.background]="weekEvent.style.color">
          <!-- <span class="cal-event-actions ">
            <a class="cal-event-action " href="javascript:;">
              <i class="fa fa-fw fa-pencil"></i>
            </a>
            <a class="cal-event-action " href="javascript:;">
              <i class="fa fa-fw fa-times"></i>
            </a>
          </span> -->
          <a class="cal-event-title "
             href="javascript: void(0)"
             (click)="openEvent(weekEvent.data)">{{ weekEvent.title }}</a>
        </div>
      </div>
    </div>
  </div>
</div>
`,
                styles: [`:host{min-height:50vh;max-height:85vh;display:block}.black .cal-day-headers{background:#4a4a4a}.black .cal-header{border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1;color:#fff}.black .cal-header.cal-today{background-color:#467298}.white .cal-day-headers{background:#fff}.white .cal-header{border-right:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1}.white .cal-header.cal-today{background-color:#d7ecff}.cal-week-view{height:calc(100% - 30px);overflow-y:auto}.cal-week-view .cal-day-headers{display:flex;position:absolute;width:100%;z-index:1}.cal-week-view .cal-day-headers .cal-header{flex:1;text-align:center;padding:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:50px}.cal-week-view .action-block{padding-top:62px}.cal-week-view .cal-events-row{position:relative;height:33px}.cal-week-view .cal-event-container{display:inline-block;position:absolute}.cal-week-view .cal-ends-within-week .cal-event{border-top-right-radius:5px;border-bottom-right-radius:5px}.cal-week-view .cal-starts-within-week .cal-event{border-top-left-radius:5px;border-bottom-left-radius:5px}.cal-week-view .cal-event{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 10px;font-size:12px;margin-left:2px;margin-right:2px;height:30px;line-height:30px;background-color:#d1e8ff;border:1px solid #1e90ff;color:#1e90ff}.cal-week-view .cal-event.orange{background-color:#ffc681;border-color:#ad2121}.cal-week-view .cal-event.blue{background-color:#c4e7ff;border-color:#0834e3}a{color:#007bff;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects}.cal-week-view .cal-event-title:link{color:currentColor}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarWeekViewComponent.ctorParameters = () => [];
NgxHmCalendarWeekViewComponent.propDecorators = {
    className: [{ type: Input }],
    dayName: [{ type: Input }],
    weekNames: [{ type: Input }],
    weeklyEvents: [{ type: Input }],
    events: [{ type: Input }],
    nstr: [{ type: Input }],
    open: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const HOUR_SCHEMAS = [
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
class NgxHmCalendarDayViewComponent {
    constructor() {
        this.className = 'black';
        this.weeklyEvents = [];
        this.events = [];
        this.nstr = new Date(2018, 6, 16);
        this.start = '00:00';
        this.end = '24:00';
        this.split = 30;
        this.open = new EventEmitter();
        this.elmWidth = 110;
        this.dayEvents = [];
        this.hourSchemas = HOUR_SCHEMAS;
    }
    /**
     * @return {?}
     */
    get firstDate() {
        /** @type {?} */
        const date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
        /** @type {?} */
        const time = this.start.split(':');
        if (time.length > 0) {
            /** @type {?} */
            const hour = Number(time[0]);
            /** @type {?} */
            const minute = Number(time[1]);
            if (hour + 1) {
                date.setHours(hour);
                if (minute + 1) {
                    date.setMinutes(minute);
                }
            }
        }
        return date;
    }
    /**
     * @return {?}
     */
    get lastDate() {
        /** @type {?} */
        const date = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
        /** @type {?} */
        const time = this.end.split(':');
        if (time.length > 0) {
            /** @type {?} */
            const hour = Number(time[0]);
            /** @type {?} */
            const minute = Number(time[1]);
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initView();
    }
    /**
     * @return {?}
     */
    initView() {
        this.setHourSchemas();
        this.setDayEvent();
        this.bindDayEventWidth();
    }
    /**
     * @return {?}
     */
    setHourSchemas() {
        /** @type {?} */
        const diffMs = Number(this.lastDate) - Number(this.firstDate);
        /** @type {?} */
        const diffHrs = Math.ceil(diffMs / 3600000);
        // hours
        // const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        /** @type {?} */
        const firstHour = this.firstDate.getHours();
        this.hourSchemas = [];
        for (let i = firstHour; i < firstHour + diffHrs; i++) {
            this.hourSchemas.push({
                name: `${('0' + i).substr(-2)} ${i > 12 ? 'PM' : 'AM'}`,
            });
        }
    }
    /**
     * @return {?}
     */
    setDayEvent() {
        /** @type {?} */
        const width = 30;
        /** @type {?} */
        const firstdate = this.firstDate;
        /** @type {?} */
        const lastdate = this.lastDate;
        /** @type {?} */
        const getPixelForDiffSplit = (end, start) => {
            /** @type {?} */
            const diffMs = end.getTime() - start.getTime();
            return (diffMs % 86400000) / (this.split * 60 * 1000);
        };
        this.dayEvents = this.events
            .concat(...this.weeklyEvents.map(getMutipleEvents(this.nstr.getFullYear(), this.nstr.getMonth())))
            // 先過濾出會經過這一天的事件們
            .filter((e) => {
            return ((e.start >= firstdate && e.start < lastdate) ||
                (firstdate >= e.start && firstdate <= e.end) ||
                (firstdate >= e.start && lastdate < e.end));
        })
            // 根據開始時間做排序
            .sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
            // 轉換為畫面上需要綁定的值
            .map((e, i) => {
            /** @type {?} */
            const elmDetial = {
                style: {
                    top: 0,
                    height: 0,
                    left: i * this.elmWidth,
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
                    elmDetial.style.height = this.hourSchemas.length * 2 * width;
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
            .filter((e) => e.style.height !== 0)
            // 重新綁定left的順序
            .map((e, i) => {
            e.style.left = i * this.elmWidth;
            return Object.assign({}, e, { style: {
                    top: `${e.style.top}px`,
                    height: `${e.style.height}px`,
                    left: `${e.style.left}px`,
                    background: `${e.data.color}`,
                } });
        });
    }
    /**
     * @return {?}
     */
    bindDayEventWidth() {
        // 崇軒大神版本
        // let tempWidth = 0;
        // for (let index = 0; index < this.dayEvents.length; index++) {
        //   tempWidth = tempWidth + index * 10;
        // }
        setTimeout(() => {
            // 灰塵版本 (僅供參考XD)
            /** @type {?} */
            const tempWidth = this.dayEvents.length
                ? this.dayEvents.map((x, i) => i * 10).reduce((a, b) => a + b)
                : 0;
            if (document.body.offsetWidth - 100 < 100 * this.dayEvents.length + tempWidth) {
                this.bars.forEach((item, index) => {
                    item.nativeElement.style.width = `${100 * this.dayEvents.length + tempWidth}px`;
                });
            }
        }, 0);
    }
    /**
     * @return {?}
     */
    prev() {
        this.nstr.setDate(this.nstr.getDate() - 1);
        this.initView();
    }
    /**
     * @return {?}
     */
    next() {
        this.nstr.setDate(this.nstr.getDate() + 1);
        this.initView();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openEvent(event) {
        this.open.emit(event);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.nstr || changes.start || changes.end) {
            this.initView();
        }
    }
}
NgxHmCalendarDayViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar-day-view',
                template: `<div [ngClass]="className"
     class="content">
  <div class="title">
    <div class="hour name"
         *ngFor="let hourSchema of hourSchemas">
      {{ hourSchema.name }}
    </div>
  </div>
  <div class="strip">
    <section *ngFor="let hourSchema of hourSchemas; let index = index;"
             class="hour"
             #bar>
      <div class="line"></div>
      <div class="line"></div>
    </section>

    <!-- events -->
    <div *ngFor="let dayEvent of dayEvents"
         class="bar"
         [ngStyle]="dayEvent.style"
         [class.cal-starts-within-day]="dayEvent.startsBeforeWeek"
         [class.cal-ends-within-day]="dayEvent.endsAfterWeek">
      <span (click)="openEvent(dayEvent.data)">
        {{ dayEvent.data.title }}
      </span>
    </div>
    <!--<div style="background: green;
    height: 90px;
    width: 100px;
    position: absolute;
    top: 180px;
    left: 100px;">
    </div>
    <div style="background: pink;
    height: 120px;
    width: 100px;
    position: absolute;
    top: 180px;left: 200px;">
    </div>
    <div style="background: paleturquoise;
    height: 210px;
    width: 100px;
    position: absolute;
    top: 180px;left: 300px;">
    </div> -->
  </div>
</div>
`,
                styles: [`:host{display:block;overflow-y:scroll;max-height:85vh}.black .hour .line{border-bottom:thin dashed #888f90}.black .hour .line:hover{background:wheat}.black .hour.name{color:#fff}.black .hour:nth-child(odd){background:#6f6e6e}.white .hour .line{border-bottom:thin dashed #000}.white .hour .line:hover{background:wheat}.white .hour:nth-child(odd){background:#fbeeee}.content{display:flex;margin-bottom:30px}.content .title{width:100px;flex:0 0 100px}.content .strip{position:relative;width:100%}.content .hour{height:60px}.content .hour.name{line-height:60px;text-align:center}.content .hour .line{height:30px;display:flex}.content .hour .line .active{width:100px;height:100%;flex:0 0 100px;box-sizing:content-box;z-index:1}.bar{border:1px solid #1e90ff;width:100px;position:absolute;color:#fff;padding:5px}.bar.cal-starts-within-day{border-top-left-radius:5px;border-top-right-radius:5px}.bar.cal-ends-within-day{border-bottom-left-radius:5px;border-bottom-right-radius:5px}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarDayViewComponent.ctorParameters = () => [];
NgxHmCalendarDayViewComponent.propDecorators = {
    className: [{ type: Input }],
    weeklyEvents: [{ type: Input }],
    events: [{ type: Input }],
    nstr: [{ type: Input }],
    start: [{ type: Input }],
    end: [{ type: Input }],
    split: [{ type: Input }],
    open: [{ type: Output }],
    bars: [{ type: ViewChildren, args: ['bar',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalendarSelectorMode = {
    Year: 'Year',
    Month: 'Month',
    Day: 'Day',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgxHmCalendarMonthPopupComponent {
    /**
     * @param {?} data
     */
    constructor(data) {
        this.data = data;
        this.popupData = {};
        this.mode = CalendarSelectorMode.Year;
        this.minYear = 2016;
        this.months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        this.complete = new Subject();
        this.popupData = data;
    }
    /**
     * @return {?}
     */
    get years() {
        return Array.from({ length: 24 }, (v, k) => k + this.minYear);
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    prevYearRange() {
        this.minYear = this.minYear - 24;
    }
    /**
     * @return {?}
     */
    nextYearRange() {
        this.minYear = this.minYear + 24;
    }
    /**
     * @param {?} year
     * @return {?}
     */
    selectYear(year) {
        this.selectedYear = year;
        this.mode = CalendarSelectorMode.Month;
    }
    /**
     * @param {?} month
     * @return {?}
     */
    selectMonth(month) {
        this.selectedMonth = month;
        if (this.popupData.containerViewMode === NgxHmCalendarViewMode.day) {
            this.mode = CalendarSelectorMode.Day;
            this.calendarData = getCalendar(this.selectedYear, this.selectedMonth, []);
        }
        else {
            this.complete.next(new Date(this.selectedYear, this.selectedMonth, 1));
        }
    }
    /**
     * @param {?} day
     * @return {?}
     */
    selectDay(day) {
        this.complete.next(day);
    }
    /**
     * @return {?}
     */
    backToYearSelector() {
        this.mode = CalendarSelectorMode.Year;
    }
    /**
     * @return {?}
     */
    backToMonthSelector() {
        this.mode = CalendarSelectorMode.Month;
    }
}
NgxHmCalendarMonthPopupComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar-month-popup',
                template: `<div class="wrapper" [ngClass]="popupData.theme">
  <header class="header">

    <div class="title" [ngSwitch]="mode">
      <span *ngSwitchCase="'Year'">{{ minYear }} ~ {{ minYear + 24 }}年</span>
      <span *ngSwitchCase="'Month'">{{ selectedYear }}年</span>
      <span *ngSwitchCase="'Day'">{{ selectedYear }}年 {{ selectedMonth  + 1 }}月</span>
    </div>


    <ng-container [ngSwitch]="mode">

      <div class="button-block" *ngSwitchCase="'Year'">

        <button class="header-button" (click)="prevYearRange()">
          <div class="button left"></div>
        </button>
        <button class="header-button" (click)="nextYearRange()">
          <div class="button right"></div>
        </button>

      </div>

      <div class="button-block" *ngSwitchCase="'Month'">
        <button class="header-button" (click)="backToYearSelector()">
          ▲
        </button>
      </div>

      <div class="button-block" *ngSwitchCase="'Day'">
        <button class="header-button" (click)="backToMonthSelector()">
          ▲
        </button>
      </div>

    </ng-container>

  </header>
  <ng-container [ngSwitch]="mode">

    <div *ngSwitchCase="'Year'" class="container" (swipeleft)="nextYearRange()" (swiperight)="prevYearRange()">
      <div class="box year" *ngFor="let year of years; let i = index;" (click)="selectYear(year)">{{ year }}</div>
    </div>

    <div *ngSwitchCase="'Month'" class="container" (swipeup)="backToYearSelector()">
      <div class="box" *ngFor="let month of months; let i = index;" (click)="selectMonth(month)">{{ month + 1 }}</div>
    </div>

    <div *ngSwitchCase="'Day'" class="container" (swipeup)="backToMonthSelector()">
      <div *ngFor="let week of calendarData; let i = index;">
        <ng-container *ngFor="let day of week.days; let day_index = index;" >
          <div class="box day" [class.n-month]="day.other" (click)="selectDay(day.date)">{{ day.number }}</div>
        </ng-container>
      </div>
    </div>

  </ng-container>


</div>
`,
                styles: [`.wrapper.black{background-color:#5e5b5b}.wrapper.black .header{background-color:#007bff}.wrapper.black .title{color:#fff}.wrapper.black .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.black .left:hover{border-color:transparent #fff transparent transparent}.wrapper.black .right{border-color:transparent transparent transparent #a09fa0}.wrapper.black .right:hover{border-color:transparent transparent transparent #fff}.wrapper.black .box{background-color:#4f4b4b;color:#fff}.wrapper.white{background-color:#fff}.wrapper.white .header{background-color:#39fbd6}.wrapper.white .title{color:#000}.wrapper.white .left{border-color:transparent #a09fa0 transparent transparent}.wrapper.white .left:hover{border-color:transparent #fff transparent transparent}.wrapper.white .right{border-color:transparent transparent transparent #a09fa0}.wrapper.white .right:hover{border-color:transparent transparent transparent #fff}.wrapper.white .box{background-color:#f6ffcf;color:#000}.wrapper{width:300px;box-sizing:border-box}.wrapper .header{display:flex;justify-content:space-between;padding:10px}.wrapper .header .title{font-size:20px;margin:10px}.wrapper .header .button-block{display:flex;align-items:center}.wrapper .header .button-block .header-button{padding:1em;background:0 0;border:0;color:#a09fa0;cursor:pointer}.wrapper .header .button-block .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.wrapper .header .button-block .header-button .button.left{border-width:7.5px 10px 7.5px 0}.wrapper .header .button-block .header-button .button.right{border-width:7.5px 0 7.5px 10px}header a.next,header a.prev{float:right}.container:after{content:"";clear:both;display:table}.container{padding:10px 0 10px 10px}.wrapper .box{float:left;width:60px;height:60px;margin:0 10px 10px 0;text-align:center;transition:all 1s ease;cursor:pointer}.wrapper .box.day{float:none;display:inline-block;width:30px;height:auto;padding:5px;box-sizing:border-box}.wrapper .box.day.n-month{background-color:#837d7d}.wrapper .box::before{content:'';width:0;height:100%;display:inline-block;position:relative;vertical-align:middle;background:red}.wrapper .box:active{background-color:#ff0;color:#000}.wrapper .box.year{width:60px;height:30px}.wrapper.list-mode .container{padding-right:10px}.wrapper.list-mode .box{width:100%}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarMonthPopupComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NGX_RX_MODAL_TOKEN,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const time = '150ms linear';
class NgxHmCalendarComponent {
    /**
     * @param {?} _model
     * @param {?} _factory
     */
    constructor(_model, _factory) {
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
        this.open = new EventEmitter();
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
    /**
     * @return {?}
     */
    get ynow() {
        return this.nstr.getFullYear();
    }
    /**
     * @return {?}
     */
    get mnow() {
        return this.nstr.getMonth();
    }
    /**
     * @return {?}
     */
    get dnow() {
        return this.nstr.getDate();
    }
    /**
     * @return {?}
     */
    get monDetail() {
        /** @type {?} */
        let result = `${this.ynow} ${this.yearName} ${this.mnow + 1} ${this.monthName}`;
        if (this.viewMode === NgxHmCalendarViewMode.day) {
            result = `${result} ${this.dnow} ${this.dayName}`;
        }
        return result;
    }
    /**
     * @return {?}
     */
    prev() {
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
    }
    /**
     * @return {?}
     */
    next() {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    openEvent(event) {
        this.open.emit(event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    openSelector($event) {
        this._model
            .open(this.monthPopupComponent, {
            disableCloseButton: true,
            panelStyle: {
                top: `${$event.offsetY}px`,
            },
            data: { theme: this.className, containerViewMode: this.viewMode },
        })
            .subscribe(selectedDate => {
            if (selectedDate) {
                this.nstr = selectedDate;
            }
        });
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    chaneMode(mode) {
        this.viewMode = mode;
    }
    /**
     * @return {?}
     */
    legendToggle() {
        this.legendOpen = this.legendOpen === 'flyIn' ? 'flyOut' : 'flyIn';
    }
}
NgxHmCalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-hm-calendar',
                template: `<div class="content"
     [ngClass]="className"
     [ngStyle]="size">
  <div class="header">
    <span class="header-button"
          (click)="prev()">
      <div class="button left"></div>
    </span>
    <h1 class="title"
        (click)="openSelector($event)">
      {{ monDetail }}
    </h1>
    <span class="header-button"
          (click)="next()">
      <div class="button right"></div>
    </span>
  </div>
  <div class="view-block"
       [ngSwitch]="viewMode">

    <ngx-hm-calendar-month-view [className]="className"
                                *ngSwitchCase="'month'"
                                [weekNames]="weekNames"
                                [yearName]="yearName"
                                [monthName]="monthName"
                                [events]="events"
                                [weeklyEvents]="weeklyEvents"
                                [nstr]="nstr"
                                (open)="openEvent($event)"
                                (swipeleft)="next()"
                                (swiperight)="prev()"></ngx-hm-calendar-month-view>

    <ngx-hm-calendar-week-view [className]="className"
                               *ngSwitchCase="'week'"
                               [events]="events"
                               [weeklyEvents]="weeklyEvents"
                               [nstr]="nstr"
                               (open)="openEvent($event)"
                               (swipeleft)="next()"
                               (swiperight)="prev()"></ngx-hm-calendar-week-view>

    <ngx-hm-calendar-day-view [className]="className"
                              *ngSwitchCase="'day'"
                              [events]="events"
                              [weeklyEvents]="weeklyEvents"
                              [nstr]="nstr"
                              start="9:00"
                              end="23:00"
                              (open)="openEvent($event)"
                              (swipeleft)="next()"
                              (swiperight)="prev()"></ngx-hm-calendar-day-view>

  </div>

  <ul class="type-buttom"
      [@animate]="legendOpen">
    <li>
      <button class="button day"
              type="button"
              [disabled]="viewMode === 'day'"
              (click)="chaneMode('day')">日</button>
    </li>

    <li>
      <button class="button week"
              type="button"
              [disabled]="viewMode === 'week'"
              (click)="chaneMode('week')">周</button>
    </li>

    <li>
      <div style="display: flex;">
        <span class="open-menu"
              (click)="legendToggle()"></span>
        <button class="button month"
                type="button"
                [disabled]="viewMode === 'month'"
                (click)="chaneMode('month')">月</button>
      </div>
    </li>
  </ul>

  <div class="legend">
    <span class="entry"
          *ngFor="let category of eventCategorys">
      {{ category.name }}
      <span class="icon"
            [style.background]="category.color"></span>
    </span>
  </div>
</div>
`,
                animations: [
                    trigger('animate', [
                        state('flyOut', style({
                            transform: 'translateX(calc(100% - 55px))',
                        })),
                        state('flyIn', style({
                            transform: 'translateX(0)',
                        })),
                        transition('flyOut => flyIn', [
                            style({
                                transform: 'translateX(calc(100% - 55px))',
                            }),
                            animate(time),
                        ]),
                        transition('flyIn => flyOut', [
                            style({
                                transform: 'translateX(0)',
                            }),
                            animate(time),
                        ]),
                    ]),
                ],
                styles: [`.content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;overflow:hidden}.content .header{height:50px;display:flex;justify-content:space-between;align-items:center}.content .header .title{padding:0;margin:0;font-size:20px;line-height:50px;cursor:pointer}.content .header .header-button{padding:1em}.content .header .header-button .button{border-style:solid;cursor:pointer;transition:all .5s linear}.content .header .header-button .button.left{border-width:7.5px 10px 7.5px 0}.content .header .header-button .button.right{border-width:7.5px 0 7.5px 10px}.content .type-buttom{z-index:2;position:absolute;right:0;list-style:none;bottom:0;margin:0 0 30px;text-align:right;padding:0}.content .type-buttom .open-menu{cursor:pointer;width:50px;background:#7ef3cb;border-radius:30px 0 0 30px}.content .type-buttom .button{cursor:pointer;border:0;padding:.5em 1.5em;color:#000;line-height:40px;width:100px;transition:all .2s linear}.content .type-buttom .button.month{background:#7ef3cb}.content .type-buttom .button.week{width:80px;background:#ffd353}.content .type-buttom .button.day{width:60px;background:#de5757}.content .type-buttom .button:hover{z-index:1;-webkit-transform:scale(1.1);transform:scale(1.1);color:#fff}.content .type-buttom .button:hover.month{background:#42b991}.content .type-buttom .button:hover.week{width:80px;background:#a98623}.content .type-buttom .button:hover.day{background:#af1d1d}.content .legend{width:100%;height:30px;line-height:30px}.content.black{background:#4a4a4a}.content.black .header{background:#333}.content.black .title{color:#fff}.content.black .left{border-color:transparent #a09fa0 transparent transparent}.content.black .left:hover{border-color:transparent #fff transparent transparent}.content.black .right{border-color:transparent transparent transparent #a09fa0}.content.black .right:hover{border-color:transparent transparent transparent #fff}.content.black .legend{background:#333;color:#fff}.content.white{background:#fff}.content.white .header{background:#c7c7c7}.content.white .title{color:#000}.content.white .left{border-color:transparent #000 transparent transparent}.content.white .left:hover{border-color:transparent #fff transparent transparent}.content.white .right{border-color:transparent transparent transparent #000}.content.white .right:hover{border-color:transparent transparent transparent #fff}.content.white .legend{background:#c7c7c7;color:#000}.content .view-block{height:calc(100% - 80px);overflow-y:auto}.entry{position:relative;padding:0 0 0 25px;font-size:13px;display:inline-block;line-height:30px;background:0 0}.entry .icon{position:absolute;height:5px;width:5px;top:12px;left:14px}.mask{position:absolute;overflow:hidden;width:110%;height:100%;right:0}.mask:after{content:'';position:absolute;top:-40%;right:110%;width:30px;height:200%;background:rgba(255,255,255,.3);-webkit-transform:rotate(20deg);transform:rotate(20deg)}`]
            }] }
];
/** @nocollapse */
NgxHmCalendarComponent.ctorParameters = () => [
    { type: NgxRxModalService },
    { type: ComponentFactoryResolver }
];
NgxHmCalendarComponent.propDecorators = {
    weekNames: [{ type: Input }],
    yearName: [{ type: Input }],
    monthName: [{ type: Input }],
    dayName: [{ type: Input }],
    eventCategorys: [{ type: Input }],
    weeklyEvents: [{ type: Input }],
    events: [{ type: Input }],
    nstr: [{ type: Input }],
    open: [{ type: Output }],
    className: [{ type: Input }],
    size: [{ type: Input }],
    monthComponent: [{ type: ViewChild, args: [NgxHmCalendarMonthViewComponent,] }],
    weekComponent: [{ type: ViewChild, args: [NgxHmCalendarWeekViewComponent,] }],
    dayComponent: [{ type: ViewChild, args: [NgxHmCalendarDayViewComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
const COMPONENTS = [NgxHmCalendarDayViewComponent];
class NgxHmCalendarDayModule {
}
NgxHmCalendarDayModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [COMPONENTS],
                exports: [COMPONENTS],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class HammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = (/** @type {?} */ ({
            swipe: { direction: DIRECTION_ALL },
        }));
    }
}
class NgxHmCalendarMonthModule {
}
NgxHmCalendarMonthModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NgxHmCalendarMonthViewComponent, NgxHmCalendarMonthPopupComponent],
                exports: [NgxHmCalendarMonthViewComponent],
                entryComponents: [NgxHmCalendarMonthPopupComponent],
                providers: [
                    {
                        provide: HAMMER_GESTURE_CONFIG,
                        useClass: HammerConfig,
                    },
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgxHmCalendarWeekModule {
}
NgxHmCalendarWeekModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NgxHmCalendarWeekViewComponent],
                exports: [NgxHmCalendarWeekViewComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgxHmCalendarModule {
}
NgxHmCalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    NgxRxModalModule,
                    NgxHmCalendarMonthModule,
                    NgxHmCalendarWeekModule,
                    NgxHmCalendarDayModule,
                ],
                declarations: [NgxHmCalendarComponent],
                exports: [NgxHmCalendarComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NgxHmCalendarComponent, NgxHmCalendarModule, NgxHmCalendarViewMode, NgxHmCalendarDayViewComponent as ɵc, NgxHmCalendarDayModule as ɵh, NgxHmCalendarMonthPopupComponent as ɵf, NgxHmCalendarMonthViewComponent as ɵa, HammerConfig as ɵd, NgxHmCalendarMonthModule as ɵe, NgxHmCalendarWeekViewComponent as ɵb, NgxHmCalendarWeekModule as ɵg };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL25neC1obS1jYWxlbmRhci5tb2RlbC50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC91dGlscy50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy9uZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQudHMiLCJuZzovL25neC1obS1jYWxlbmRhci9saWIvd2Vlay9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3L25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL2RheS9uZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcvZGF0YS50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9kYXkvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3L25neC1obS1jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQudHMiLCJuZzovL25neC1obS1jYWxlbmRhci9saWIvbW9udGgvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC5tb2RlbC50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9uZ3gtaG0tY2FsZW5kYXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL2RheS9uZ3gtaG0tY2FsZW5kYXItZGF5Lm1vZHVsZS50cyIsIm5nOi8vbmd4LWhtLWNhbGVuZGFyL2xpYi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgubW9kdWxlLnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL3dlZWsvbmd4LWhtLWNhbGVuZGFyLXdlZWsubW9kdWxlLnRzIiwibmc6Ly9uZ3gtaG0tY2FsZW5kYXIvbGliL25neC1obS1jYWxlbmRhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBOZ3hIbUNhbGVuZGFyV2VlayB7XHJcbiAgZGF5czogTmd4SG1DYWxlbmRhckRheVtdO1xyXG4gIHNlbGVjdGVkRGF5PzogTmd4SG1DYWxlbmRhckRheTtcclxuICBzdHlsZTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5neEhtQ2FsZW5kYXJEYXkge1xyXG4gIG90aGVyPzogYm9vbGVhbjtcclxuICBkYXRlOiBEYXRlO1xyXG4gIG5hbWU/OiBudW1iZXI7XHJcbiAgbnVtYmVyPzogbnVtYmVyO1xyXG4gIGV2ZW50cz86IE5neEhtQ2FsZW5kYXJFdmVudFtdO1xyXG4gIGlzVG9kYXk/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5neEhtQ2FsZW5kYXJFdmVudENhdGVnb3J5IHtcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOZ3hIbUNhbGVuZGFyRXZlbnQge1xyXG4gIHN0YXJ0OiBEYXRlO1xyXG4gIGVuZDogRGF0ZTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNvbG9yOiBzdHJpbmc7XHJcbiAgdXJsPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE5neEhtQ2FsZW5kYXJFbG1EZXRpYWw8VCA9IG51bWJlcj4ge1xyXG4gIHN0eWxlOiB7XHJcbiAgICB0b3A/OiBUO1xyXG4gICAgaGVpZ2h0PzogVDtcclxuICAgIGxlZnQ/OiBUO1xyXG4gICAgd2lkdGg/OiBUO1xyXG4gICAgY29sb3I/OiBzdHJpbmc7XHJcbiAgfTtcclxuICBzdGFydHNCZWZvcmVXZWVrOiBib29sZWFuO1xyXG4gIGVuZHNBZnRlcldlZWs6IGJvb2xlYW47XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgdXJsPzogc3RyaW5nO1xyXG4gIGRhdGE6IE5neEhtQ2FsZW5kYXJFdmVudDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOZ3hIbUNhbGVuZGFyV2Vla0RheSB7XHJcbiAgZGF0ZTogRGF0ZTtcclxuICB5ZWFyOiBudW1iZXI7XHJcbiAgbW9udGg6IG51bWJlcjtcclxuICBkYXk6IG51bWJlcjtcclxuICBpc1RvZGF5OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBOZ3hIbUNhbGVuZGFyVmlld01vZGUge1xyXG4gIG1vbnRoID0gJ21vbnRoJyxcclxuICB3ZWVrID0gJ3dlZWsnLFxyXG4gIGRheSA9ICdkYXknLFxyXG59XHJcbiIsImltcG9ydCB7IE5neEhtQ2FsZW5kYXJEYXksIE5neEhtQ2FsZW5kYXJFdmVudCwgTmd4SG1DYWxlbmRhcldlZWsgfSBmcm9tICcuLi9uZ3gtaG0tY2FsZW5kYXIubW9kZWwnO1xyXG5cclxuLyoqIMOlwojCpMOmwpbCt8OmwpjCr8OlwpDCpsOnwoLCusOpwpbCj8OlwrnCtCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNfbGVhcCh5ZWFyKSB7XHJcbiAgcmV0dXJuIHllYXIgJSAxMDAgPT09IDAgPyAoeWVhciAlIDQwMCA9PT0gMCA/IDEgOiAwKSA6IHllYXIgJSA0ID09PSAwID8gMSA6IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYWxlbmRhcihcclxuICB5bm93OiBudW1iZXIsXHJcbiAgbW5vdzogbnVtYmVyLFxyXG4gIGV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10sXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdLFxyXG4pOiBBcnJheTxOZ3hIbUNhbGVuZGFyV2Vlaz4ge1xyXG4gIC8vIMOkwrvCisOlwqTCqVxyXG4gIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAvLyDDp8KVwrbDpsKcwojDp8KswqzDpMK4woDDpcKkwqlcclxuICBjb25zdCBubHN0ciA9IG5ldyBEYXRlKHlub3csIG1ub3csIDEpO1xyXG4gIC8vIMOnwqzCrMOkwrjCgMOlwqTCqcOmwpjCn8OmwpzCn8OlwrnCvlxyXG4gIGNvbnN0IGZpcnN0ZGF5ID0gbmxzdHIuZ2V0RGF5KCk7XHJcbiAgLy8gw6bCr8KPw6XCgMKLw6bCnMKIw6fCmsKEw6XCpMKpw6bClcK4XHJcbiAgY29uc3QgbV9kYXlzID0gbmV3IEFycmF5KDMxLCAyOCArIGlzX2xlYXAoeW5vdyksIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxKTtcclxuICAvLyDDp8KVwrbDpcKJwo3DpsKcwojDpcKkwqnDpsKVwrgrw6fCrMKsw6TCuMKAw6XCpMKpw6bCmMKvw6bCmMKfw6bCnMKfw6XCucK+w6fCmsKEw6bClcK4w6XCgMK8IMOnwo3CssOlwr7ClyDDqMKhwqjDpsKgwrzDqMKhwozDpsKVwrhcclxuICBjb25zdCB0cl9zdHIgPSBNYXRoLmNlaWwoKG1fZGF5c1ttbm93XSArIGZpcnN0ZGF5KSAvIDcpO1xyXG4gIC8vIMOmwq/Cj8OlwpHCqMOkwrrCi8OkwrvCtlxyXG4gIGNvbnN0IG11dGlsZUV2ZW50cyA9IGV2ZW50cy5jb25jYXQoLi4ud2Vla2x5RXZlbnRzLm1hcChnZXRNdXRpcGxlRXZlbnRzKHlub3csIG1ub3cpKSk7XHJcbiAgLy8gw6fCtcKQw6bCnsKcXHJcbiAgY29uc3QgY2FsZW5kYXI6IE5neEhtQ2FsZW5kYXJXZWVrW10gPSBbXTtcclxuXHJcbiAgbGV0IGksIGssIGlkeCwgZGF0ZV9zdHI7XHJcblxyXG4gIC8vIMOowqHCqMOmwqDCvMOnwprChMOowqHCjFxyXG4gIGZvciAoaSA9IDA7IGkgPCB0cl9zdHI7IGkrKykge1xyXG4gICAgY29uc3Qgd2VlazogTmd4SG1DYWxlbmRhcldlZWsgPSB7XHJcbiAgICAgIGRheXM6IFtdLFxyXG4gICAgICBzdHlsZToge30sXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIMOowqHCqMOmwqDCvMOmwq/Cj8OowqHCjMOnwprChMOlwpbCrsOlwoXCg8OmwqDCvFxyXG4gICAgZm9yIChrID0gMDsgayA8IDc7IGsrKykge1xyXG4gICAgICAvLyDDpcKWwq7DpcKFwoPDpsKgwrzDqMKHwqrDp8KEwrbDpcK6wo/DpcKIwpfDqMKZwp9cclxuICAgICAgaWR4ID0gaSAqIDcgKyBrO1xyXG4gICAgICAvLyDDqMKowojDp8KuwpfDpsKXwqXDpsKcwp9cclxuICAgICAgZGF0ZV9zdHIgPSBpZHggLSBmaXJzdGRheSArIDE7XHJcblxyXG4gICAgICBsZXQgY2FsZW5kYXJEYXk6IE5neEhtQ2FsZW5kYXJEYXk7XHJcblxyXG4gICAgICBpZiAoZGF0ZV9zdHIgPD0gMCkge1xyXG4gICAgICAgIC8vIMOpwoHCjsOmwr/CvsOnwoTCocOmwpXCiMOmwpfCpcOmwpzCn8OvwrzCiMOlwrDCj8OmwpbCvMOnwq3CicOmwpbCvMOpwpvCtsOnwprChMOvwrzCiVxyXG4gICAgICAgIC8vIMOlwo/ClsOnwpXCtsOmwpzCiMOnwqzCrMOkwrjCgMOlwqTCqVxyXG4gICAgICAgIGNvbnN0IG1QcmV2ID0gbmV3IERhdGUoeW5vdywgbW5vdywgMSk7XHJcbiAgICAgICAgLy8gw6XCsMKHw6bCl8Klw6bCnMKfLTHDp8KCwrrDpMK4worDpcKAwovDpsKcwojDp8KawoTDpsKcwoDDpcK+wozDpMK4woDDpcKkwqnDr8K8wozDqcKawqjDqMKRwpfDpMK4worDpcKAwovDpsKcwojDpcKkwqnDpsKVwrjDqMKuworDpcKMwpZcclxuICAgICAgICBtUHJldi5zZXREYXRlKG1QcmV2LmdldERhdGUoKSArIGRhdGVfc3RyIC0gMSk7XHJcbiAgICAgICAgLy8gw6jCqMKtw6XCrsKaw6bCl8Klw6bCnMKfXHJcbiAgICAgICAgLy8gZGF0ZV9zdHIgPSBtUHJldi5nZXREYXRlKCk7XHJcbiAgICAgICAgY2FsZW5kYXJEYXkgPSB7IGRhdGU6IG1QcmV2LCBvdGhlcjogdHJ1ZSB9O1xyXG4gICAgICB9IGVsc2UgaWYgKGRhdGVfc3RyID4gbV9kYXlzW21ub3ddKSB7XHJcbiAgICAgICAgLy8gw6nCgcKOw6bCv8K+w6fChMKhw6bClcKIw6bCl8Klw6bCnMKfw6/CvMKIw6XCpMKnw6bClsK8w6bCnMKIw6fCuMK9w6XCpMKpw6bClcK4w6fCmsKEw6/CvMKJXHJcbiAgICAgICAgLy8gw6XCj8KWw6fClcK2w6bCnMKIw6fCrMKsw6TCuMKAw6XCpMKpXHJcbiAgICAgICAgY29uc3QgbU5leHQgPSBuZXcgRGF0ZSh5bm93LCBtbm93LCAxKTtcclxuICAgICAgICAvLyDDpcKPwpbDpMK4wovDpcKAwovDpsKcwojDp8KswqzDpMK4woDDpcKkwqlcclxuICAgICAgICBtTmV4dC5zZXRNb250aChtTmV4dC5nZXRNb250aCgpICsgMSk7XHJcbiAgICAgICAgLy8gw6nCmsKow6jCkcKXw6TCuMKLw6XCgMKLw6bCnMKIw6XCpMKpw6bClcK4w6jCrsKKw6XCjMKWXHJcbiAgICAgICAgbU5leHQuc2V0RGF0ZShtTmV4dC5nZXREYXRlKCkgKyAoZGF0ZV9zdHIgLSBtX2RheXNbbW5vd10pIC0gMSk7XHJcbiAgICAgICAgLy8gw6jCqMKtw6XCrsKaw6bCl8Klw6bCnMKfXHJcbiAgICAgICAgLy8gZGF0ZV9zdHIgPSBtTmV4dC5nZXREYXRlKCk7XHJcbiAgICAgICAgY2FsZW5kYXJEYXkgPSB7IGRhdGU6IG1OZXh0LCBvdGhlcjogdHJ1ZSB9O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNhbGVuZGFyRGF5ID0geyBkYXRlOiBuZXcgRGF0ZSh5bm93LCBtbm93LCBkYXRlX3N0cikgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FsZW5kYXJEYXkuZXZlbnRzID0gbXV0aWxlRXZlbnRzLmZpbHRlcihldmVudCA9PiBjb250YWluKGV2ZW50LCBjYWxlbmRhckRheS5kYXRlKSk7XHJcbiAgICAgIGNhbGVuZGFyRGF5Lm5hbWUgPSBjYWxlbmRhckRheS5kYXRlLmdldERheSgpO1xyXG4gICAgICBjYWxlbmRhckRheS5udW1iZXIgPSBjYWxlbmRhckRheS5kYXRlLmdldERhdGUoKTtcclxuICAgICAgY2FsZW5kYXJEYXkuaXNUb2RheSA9XHJcbiAgICAgICAgY2FsZW5kYXJEYXkuZGF0ZS5nZXRGdWxsWWVhcigpID09PSB0b2RheS5nZXRGdWxsWWVhcigpICYmXHJcbiAgICAgICAgY2FsZW5kYXJEYXkuZGF0ZS5nZXRNb250aCgpID09PSB0b2RheS5nZXRNb250aCgpICYmXHJcbiAgICAgICAgY2FsZW5kYXJEYXkuZGF0ZS5nZXREYXRlKCkgPT09IHRvZGF5LmdldERhdGUoKTtcclxuXHJcbiAgICAgIHdlZWsuZGF5cy5wdXNoKGNhbGVuZGFyRGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxlbmRhci5wdXNoKHdlZWspO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbGVuZGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbihldmVudDogTmd4SG1DYWxlbmRhckV2ZW50LCBkYXRlOiBEYXRlKTogYm9vbGVhbiB7XHJcbiAgaWYgKGV2ZW50LnN0YXJ0ICYmIGV2ZW50LmVuZCkge1xyXG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0TW9udGgoKSxcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RGF0ZSgpLFxyXG4gICAgKTtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBEYXRlKGV2ZW50LmVuZC5nZXRGdWxsWWVhcigpLCBldmVudC5lbmQuZ2V0TW9udGgoKSwgZXZlbnQuZW5kLmdldERhdGUoKSk7XHJcbiAgICBlbmQuc2V0RGF0ZShlbmQuZ2V0RGF0ZSgpICsgMSk7XHJcblxyXG4gICAgcmV0dXJuIHN0YXJ0LmdldFRpbWUoKSA8PSBkYXRlLmdldFRpbWUoKSAmJiBlbmQuZ2V0VGltZSgpID4gZGF0ZS5nZXRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBpZiAoZXZlbnQuc3RhcnQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIGV2ZW50LnN0YXJ0LmdldEZ1bGxZZWFyKCkgPT09IGRhdGUuZ2V0RnVsbFllYXIoKSAmJlxyXG4gICAgICBldmVudC5zdGFydC5nZXRNb250aCgpID09PSBkYXRlLmdldE1vbnRoKCkgJiZcclxuICAgICAgZXZlbnQuc3RhcnQuZ2V0RGF0ZSgpID09PSBkYXRlLmdldERhdGUoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE11dGlwbGVFdmVudHMoeW5vdzogbnVtYmVyLCBtbm93OiBudW1iZXIpIHtcclxuICByZXR1cm4gKGV2ZW50OiBOZ3hIbUNhbGVuZGFyRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gZXZlbnQuc3RhcnQ7XHJcbiAgICBjb25zdCBkaXN0YW5jZSA9IGV2ZW50LmVuZC5nZXRUaW1lKCkgLSBldmVudC5zdGFydC5nZXRUaW1lKCk7XHJcbiAgICBjb25zdCBjdXJyZW50RGF5ID0gc3RhcnQuZ2V0RGF5KCk7XHJcbiAgICBjb25zdCBmaXJzdERhdGUgPSBuZXcgRGF0ZSh5bm93LCBtbm93LCAxKTtcclxuICAgIGNvbnN0IGZpcnN0RGF5ID0gZmlyc3REYXRlLmdldERheSgpO1xyXG4gICAgY29uc3Qgc2Vjb25kRGF0ZSA9IG5ldyBEYXRlKHlub3csIG1ub3cgKyAxLCAxKTtcclxuICAgIGNvbnN0IHJlc3VsdDogRGF0ZVtdID0gW107XHJcblxyXG4gICAgbGV0IG5ld0RhdGUgPSBuZXcgRGF0ZShmaXJzdERhdGUuc2V0RGF0ZShmaXJzdERhdGUuZ2V0RGF0ZSgpICsgKGN1cnJlbnREYXkgLSBmaXJzdERheSkpKTtcclxuXHJcbiAgICBuZXdEYXRlLnNldEhvdXJzKHN0YXJ0LmdldEhvdXJzKCkpO1xyXG4gICAgbmV3RGF0ZS5zZXRNaW51dGVzKHN0YXJ0LmdldE1pbnV0ZXMoKSk7XHJcbiAgICBuZXdEYXRlLnNldFNlY29uZHMoc3RhcnQuZ2V0U2Vjb25kcygpKTtcclxuICAgIG5ld0RhdGUuc2V0TWlsbGlzZWNvbmRzKHN0YXJ0LmdldE1pbGxpc2Vjb25kcygpKTtcclxuXHJcbiAgICByZXN1bHQucHVzaChuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSkpO1xyXG5cclxuICAgIHdoaWxlIChuZXdEYXRlIDwgc2Vjb25kRGF0ZSkge1xyXG4gICAgICBuZXdEYXRlID0gbmV3IERhdGUobmV3RGF0ZS5zZXREYXRlKG5ld0RhdGUuZ2V0RGF0ZSgpICsgNykpO1xyXG4gICAgICByZXN1bHQucHVzaChuZXcgRGF0ZShuZXdEYXRlLmdldFRpbWUoKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQubWFwKHggPT4ge1xyXG4gICAgICBjb25zdCBjZSA9IE9iamVjdC5hc3NpZ24oe30sIGV2ZW50KTtcclxuICAgICAgY2Uuc3RhcnQgPSBuZXcgRGF0ZSh4LmdldFRpbWUoKSk7XHJcbiAgICAgIGNlLmVuZCA9IG5ldyBEYXRlKHguc2V0VGltZSh4LmdldFRpbWUoKSArIGRpc3RhbmNlKSk7XHJcbiAgICAgIHJldHVybiBjZTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIE5neEhtQ2FsZW5kYXJEYXksXHJcbiAgTmd4SG1DYWxlbmRhckV2ZW50LFxyXG4gIE5neEhtQ2FsZW5kYXJXZWVrLFxyXG59IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IGdldENhbGVuZGFyIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtaG0tY2FsZW5kYXItbW9udGgtdmlldycsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibW9udGggbmV3XCJcclxuICAgICBbbmdDbGFzc109XCJjbGFzc05hbWVcIj5cclxuICA8ZGl2IGNsYXNzPVwid2Vla1wiXHJcbiAgICAgICAqbmdGb3I9XCJsZXQgd2VlayBvZiBjYWxlbmRhckRhdGE7IHRyYWNrQnk6IHRyYWNrQnlGbjsgbGV0IHdlZWtfaW5kZXggPSBpbmRleDtcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJkYXlcIlxyXG4gICAgICAgICAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5czsgdHJhY2tCeTogdHJhY2tCeUZuOyBsZXQgZGF5X2luZGV4ID0gaW5kZXg7XCJcclxuICAgICAgICAgW25nQ2xhc3NdPVwieyBvdGhlcjogZGF5Lm90aGVyLCB0b2RheTogZGF5LmlzVG9kYXkgfVwiXHJcbiAgICAgICAgIChjbGljayk9XCJzaG93RXZlbnRMaXN0KHdlZWssIGRheSlcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImRheS1uYW1lXCI+e3sgd2Vla05hbWVzW2RheS5uYW1lXSB9fTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZGF5LW51bWJlclwiPnt7IGRheS5udW1iZXIgfX08L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImRheS1ldmVudHNcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBldmVudCBvZiBkYXkuZXZlbnRzO1wiPlxyXG4gICAgICAgICAgPHNwYW4gW3N0eWxlLmJhY2tncm91bmRdPVwiZXZlbnQuY29sb3JcIj48L3NwYW4+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsc1wiXHJcbiAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ2luJzogd2Vlay5zZWxlY3RlZERheSwgJ291dCc6ICF3ZWVrLnNlbGVjdGVkRGF5IH1cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImFycm93LWNvbnRhaW5lclwiXHJcbiAgICAgICAgICAgKm5nSWY9XCJ3ZWVrLnNlbGVjdGVkRGF5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbGxcIlxyXG4gICAgICAgICAgICAgW25nU3R5bGVdPVwid2Vlay5zdHlsZVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImV2ZW50c1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ3ZWVrLnNlbGVjdGVkRGF5XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXZlbnRcIlxyXG4gICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgZXZlbnQgb2Ygd2Vlay5zZWxlY3RlZERheS5ldmVudHM7XCJcclxuICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9wZW5FdmVudChldmVudClcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImV2ZW50LWNhdGVnb3J5XCJcclxuICAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZF09XCJldmVudC5jb2xvclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8c3Bhbj57eyBldmVudC50aXRsZSB9fTwvc3Bhbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9jazttYXgtaGVpZ2h0Ojg1dmh9Lm1vbnRoe29wYWNpdHk6MH0ubW9udGgubmV3ey13ZWJraXQtYW5pbWF0aW9uOjFzIGVhc2Utb3V0IGZhZGVJbjthbmltYXRpb246MXMgZWFzZS1vdXQgZmFkZUluO29wYWNpdHk6MTtvdmVyZmxvdy15OnNjcm9sbH0ubW9udGguYmxhY2sgLmRheXtjb2xvcjojZmZmfS5tb250aC5ibGFjayAuZGF5Lm90aGVye2NvbG9yOiM3MTcxNzF9Lm1vbnRoLmJsYWNrIC5kYXkudG9kYXl7YmFja2dyb3VuZDojNDY3Mjk4O2NvbG9yOiM1M2I3ZmZ9Lm1vbnRoLmJsYWNrIC5kYXktbmFtZXtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LC41KX0ubW9udGguYmxhY2sgLmRldGFpbHN7YmFja2dyb3VuZDojYTRhNGE0O2NvbG9yOiNmZmZ9Lm1vbnRoLndoaXRlIC5kYXl7Y29sb3I6IzAwMH0ubW9udGgud2hpdGUgLmRheS5vdGhlciwubW9udGgud2hpdGUgLmRheS5vdGhlciAuZGF5LW5hbWV7Y29sb3I6I2RhZGFkYX0ubW9udGgud2hpdGUgLmRheS50b2RheXtiYWNrZ3JvdW5kOiNkN2VjZmY7Y29sb3I6IzUzYjdmZn0ubW9udGgud2hpdGUgLmRheS1uYW1le2NvbG9yOiNkYjQ0Mzd9Lm1vbnRoLndoaXRlIC5hcnJvd3tib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2RjZmZjN30ubW9udGgud2hpdGUgLmRldGFpbHN7YmFja2dyb3VuZDojZGNmZmM3fS5tb250aCAud2Vla3tkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9Lm1vbnRoIC53ZWVrIC5kYXl7ei1pbmRleDoxO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOmNhbGMoMTAwJSAvIDcpO3BhZGRpbmc6MTBweDt0ZXh0LWFsaWduOmNlbnRlcjtjdXJzb3I6cG9pbnRlcjtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1vbnRoIC53ZWVrIC5kYXkgLmRheS1ldmVudHN7bGlzdC1zdHlsZTpub25lO21hcmdpbi10b3A6M3B4O3RleHQtYWxpZ246Y2VudGVyO21pbi1oZWlnaHQ6MTJweDtsaW5lLWhlaWdodDo2cHg7b3ZlcmZsb3c6aGlkZGVufS5tb250aCAud2VlayAuZGF5IC5kYXktZXZlbnRzIHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6NXB4O2hlaWdodDo1cHg7bWFyZ2luOjAgMXB4fS5tb250aCAud2VlayAuZGF5IC5kYXktbmFtZXtmb250LXNpemU6OXB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW4tYm90dG9tOjVweDtsZXR0ZXItc3BhY2luZzouN3B4fS5tb250aCAud2VlayAuZGF5IC5kYXktbnVtYmVye2ZvbnQtc2l6ZToyNHB4fS5tb250aCAud2VlayAuZGV0YWlsc3tkaXNwbGF5Om5vbmU7cG9zaXRpb246cmVsYXRpdmU7bWF4LWhlaWdodDo1MDAwcHg7d2lkdGg6MTAwJTttYXJnaW4tdG9wOjVweDtib3JkZXItcmFkaXVzOjRweDtmbGV4OjEgMSAxMDAlO21pbi13aWR0aDoxMDAlO21heC13aWR0aDoxMDAlfS5tb250aCAud2VlayAuZGV0YWlscy5pbntkaXNwbGF5OmJsb2NrOy13ZWJraXQtYW5pbWF0aW9uOi41cyBjdWJpYy1iZXppZXIoMSwwLDEsMCkgbW92ZUZyb21Ub3BGYWRlO2FuaW1hdGlvbjouNXMgY3ViaWMtYmV6aWVyKDEsMCwxLDApIG1vdmVGcm9tVG9wRmFkZX0ubW9udGggLndlZWsgLmRldGFpbHMuaW4gLmV2ZW50ey13ZWJraXQtYW5pbWF0aW9uOi4zcyAuM3MgYm90aCBmYWRlSW47YW5pbWF0aW9uOi4zcyAuM3MgYm90aCBmYWRlSW59Lm1vbnRoIC53ZWVrIC5kZXRhaWxzLm91dHtkaXNwbGF5OmJsb2NrO3otaW5kZXg6LTE7bWF4LWhlaWdodDowO3RyYW5zaXRpb246YWxsIC41cyBjdWJpYy1iZXppZXIoMCwxLDAsMSl9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzLm91dCAuZXZlbnR7LXdlYmtpdC1hbmltYXRpb246LjNzIGJvdGggZmFkZUluO2FuaW1hdGlvbjouM3MgYm90aCBmYWRlSW59Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5hcnJvdy1jb250YWluZXJ7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXh9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5hcnJvdy1jb250YWluZXIgLmZpbGx7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2V9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5hcnJvdy1jb250YWluZXIgLmFycm93ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTIuNXB4KSB0cmFuc2xhdGVZKC01cHgpO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC0yLjVweCkgdHJhbnNsYXRlWSgtNXB4KTt3aWR0aDowO2hlaWdodDowO2JvcmRlci1zdHlsZTpzb2xpZDtib3JkZXItd2lkdGg6MCA1cHggNXB4O2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTRhNGE0fS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRze21pbi1oZWlnaHQ6MTIwcHg7cGFkZGluZzo3cHggMDtvdmVyZmxvdy15OmF1dG87b3ZlcmZsb3cteDpoaWRkZW59Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50e2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjIycHg7bGV0dGVyLXNwYWNpbmc6LjVweDtwYWRkaW5nOjJweCAxNnB4O3ZlcnRpY2FsLWFsaWduOnRvcDtkaXNwbGF5OmZsZXh9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50LmVtcHR5e2NvbG9yOiNlZWV9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50IC5ldmVudC1jYXRlZ29yeXtoZWlnaHQ6MTBweDt3aWR0aDoxMHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbjo2cHggNXB4IDA7dmVydGljYWwtYWxpZ246dG9wfS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudCBzcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MCAwIDAgN3B4fS5tb250aCAud2VlayAuZGV0YWlscyAuZXZlbnRzIC5ldmVudCBzcGFuOmhvdmVye2NvbG9yOiNmZjA7Zm9udC1zaXplOjEyMCV9Lm1vbnRoIC53ZWVrIC5kZXRhaWxzIC5ldmVudHMgLmV2ZW50IHNwYW46YWN0aXZle2NvbG9yOnJlZH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjMyMHB4KXsuZGF5e3BhZGRpbmc6NXB4fX1ALXdlYmtpdC1rZXlmcmFtZXMgbW92ZUZyb21Ub3BGYWRlezAle21heC1oZWlnaHQ6MH0xMDAle21heC1oZWlnaHQ6NTAwMHB4fX1Aa2V5ZnJhbWVzIG1vdmVGcm9tVG9wRmFkZXswJXttYXgtaGVpZ2h0OjB9MTAwJXttYXgtaGVpZ2h0OjUwMDBweH19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVJbnswJXtvcGFjaXR5OjB9fUBrZXlmcmFtZXMgZmFkZUluezAle29wYWNpdHk6MH19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGVPdXR7MTAwJXtvcGFjaXR5OjB9fUBrZXlmcmFtZXMgZmFkZU91dHsxMDAle29wYWNpdHk6MH19YCwgYC5ibHVle2JhY2tncm91bmQ6IzljY2FlYn0ub3Jhbmdle2JhY2tncm91bmQ6I2Y3YTcwMH0uZ3JlZW57YmFja2dyb3VuZDojOTljNjZkfS55ZWxsb3d7YmFja2dyb3VuZDojZjllOTAwfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KClcclxuICBjbGFzc05hbWUgPSAnYmxhY2snO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla05hbWVzOiBzdHJpbmdbXSA9IFsnw6bCmMKfw6bCnMKfw6bCl8KlJywgJ8OmwpjCn8OmwpzCn8OkwrjCgCcsICfDpsKYwp/DpsKcwp/DpMK6wownLCAnw6bCmMKfw6bCnMKfw6TCuMKJJywgJ8OmwpjCn8OmwpzCn8OlwpvCmycsICfDpsKYwp/DpsKcwp/DpMK6wpQnLCAnw6bCmMKfw6bCnMKfw6XChcKtJ107XHJcbiAgQElucHV0KClcclxuICB5ZWFyTmFtZSA9ICfDpcK5wrQnO1xyXG4gIEBJbnB1dCgpXHJcbiAgbW9udGhOYW1lID0gJ8OmwpzCiCc7XHJcbiAgQElucHV0KClcclxuICB3ZWVrbHlFdmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW107XHJcbiAgQElucHV0KClcclxuICBldmVudHM6IE5neEhtQ2FsZW5kYXJFdmVudFtdID0gW107XHJcbiAgQElucHV0KClcclxuICBuc3RyID0gbmV3IERhdGUoKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNhbGVuZGFyRGF0YSA9IGdldENhbGVuZGFyKHRoaXMueW5vdywgdGhpcy5tbm93LCB0aGlzLmV2ZW50cywgdGhpcy53ZWVrbHlFdmVudHMpO1xyXG5cclxuICBwcml2YXRlIGVhY2hQcmVzZW50ID0gMTAwIC8gMTQ7XHJcblxyXG4gIGdldCB5bm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXRGdWxsWWVhcigpO1xyXG4gIH1cclxuICBnZXQgbW5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0TW9udGgoKTtcclxuICB9XHJcbiAgZ2V0IGRub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldERhdGUoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHJldigpIHtcclxuICAgIHRoaXMubnN0ci5zZXRNb250aCh0aGlzLm5zdHIuZ2V0TW9udGgoKSAtIDEpO1xyXG4gICAgdGhpcy5jYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnlub3csIHRoaXMubW5vdywgdGhpcy5ldmVudHMsIHRoaXMud2Vla2x5RXZlbnRzKTtcclxuICB9XHJcblxyXG4gIG5leHQoKSB7XHJcbiAgICB0aGlzLm5zdHIuc2V0TW9udGgodGhpcy5uc3RyLmdldE1vbnRoKCkgKyAxKTtcclxuICAgIHRoaXMuY2FsZW5kYXJEYXRhID0gZ2V0Q2FsZW5kYXIodGhpcy55bm93LCB0aGlzLm1ub3csIHRoaXMuZXZlbnRzLCB0aGlzLndlZWtseUV2ZW50cyk7XHJcbiAgfVxyXG5cclxuICBzaG93RXZlbnRMaXN0KHdlZWs6IE5neEhtQ2FsZW5kYXJXZWVrLCBkYXk6IE5neEhtQ2FsZW5kYXJEYXkpIHtcclxuICAgIGlmIChkYXkuZXZlbnRzLmxlbmd0aCkge1xyXG4gICAgICBpZiAod2Vlay5zZWxlY3RlZERheSAmJiB3ZWVrLnNlbGVjdGVkRGF5ID09PSBkYXkpIHtcclxuICAgICAgICB3ZWVrLnNlbGVjdGVkRGF5ID0gdW5kZWZpbmVkO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJEYXRhLmZvckVhY2godyA9PiB7XHJcbiAgICAgICAgICB3LnNlbGVjdGVkRGF5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB3ZWVrLnNlbGVjdGVkRGF5ID0gZGF5O1xyXG5cclxuICAgICAgICBjb25zdCBwcmVzZW50ID0gKGRheS5uYW1lICogMiArIDEpICogdGhpcy5lYWNoUHJlc2VudDtcclxuICAgICAgICB3ZWVrLnN0eWxlID0ge1xyXG4gICAgICAgICAgZmxleDogYDEgMSAke3ByZXNlbnR9JWAsXHJcbiAgICAgICAgICAnbWF4LXdpZHRoJzogYCR7cHJlc2VudH0lYCxcclxuICAgICAgICAgICdtaW4td2lkdGgnOiBgJHtwcmVzZW50fSVgLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9wZW5FdmVudChldmVudDogTmd4SG1DYWxlbmRhckV2ZW50KSB7XHJcbiAgICB0aGlzLm9wZW4uZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICB0cmFja0J5Rm4oaW5kZXgsIGl0ZW0pIHtcclxuICAgIHJldHVybiBpbmRleDtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLmV2ZW50cyB8fCBjaGFuZ2VzLm5zdHIpIHtcclxuICAgICAgdGhpcy5jYWxlbmRhckRhdGEgPSBnZXRDYWxlbmRhcih0aGlzLnlub3csIHRoaXMubW5vdywgdGhpcy5ldmVudHMsIHRoaXMud2Vla2x5RXZlbnRzKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGdldE11dGlwbGVFdmVudHMgfSBmcm9tICcuLi8uLi9tb250aC91dGlscyc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWwsIE5neEhtQ2FsZW5kYXJFdmVudCwgTmd4SG1DYWxlbmRhcldlZWtEYXkgfSBmcm9tICcuLi8uLi9uZ3gtaG0tY2FsZW5kYXIubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjYWwtd2Vlay12aWV3XCJcclxuICAgICBbbmdDbGFzc109XCJjbGFzc05hbWVcIj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cImNhbC1kYXktaGVhZGVyc1wiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJjYWwtaGVhZGVyXCJcclxuICAgICAgICAgKm5nRm9yPVwibGV0IHdlZWtEYXkgb2Ygd2Vla0RheXM7IGxldCBpID0gaW5kZXg7IGxldCBpc0ZpcnN0ID0gZmlyc3Q7IGxldCBpc0xhc3QgPSBsYXN0XCJcclxuICAgICAgICAgW2NsYXNzLmNhbC13ZWVrZW5kXT1cImlzRmlyc3QgfHwgaXNMYXN0XCJcclxuICAgICAgICAgW2NsYXNzLmNhbC10b2RheV09XCJ3ZWVrRGF5LmlzVG9kYXlcIj5cclxuICAgICAgPGI+e3sgd2Vla05hbWVzW2ldIH19PC9iPlxyXG4gICAgICA8YnI+XHJcbiAgICAgIDxzcGFuPnt7IHdlZWtEYXkuZGF5IH19e3sgZGF5TmFtZSB9fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWJsb2NrXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50cy1yb3cgXCJcclxuICAgICAgICAgKm5nRm9yPVwibGV0IHdlZWtFdmVudCBvZiB3ZWVrRXZlbnRzOyBsZXQgaSA9IGluZGV4O1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50LWNvbnRhaW5lciBjYWwtc3RhcnRzLXdpdGhpbi13ZWVrIGNhbC1lbmRzLXdpdGhpbi13ZWVrIFwiXHJcbiAgICAgICAgICAgW3N0eWxlLndpZHRoXT1cIndlZWtFdmVudC5zdHlsZS53aWR0aFwiXHJcbiAgICAgICAgICAgW3N0eWxlLmxlZnRdPVwid2Vla0V2ZW50LnN0eWxlLmxlZnRcIlxyXG4gICAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi13ZWVrXT1cIndlZWtFdmVudC5zdGFydHNCZWZvcmVXZWVrXCJcclxuICAgICAgICAgICBbY2xhc3MuY2FsLWVuZHMtd2l0aGluLXdlZWtdPVwid2Vla0V2ZW50LmVuZHNBZnRlcldlZWtcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLWV2ZW50XCJcclxuICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kXT1cIndlZWtFdmVudC5zdHlsZS5jb2xvclwiPlxyXG4gICAgICAgICAgPCEtLSA8c3BhbiBjbGFzcz1cImNhbC1ldmVudC1hY3Rpb25zIFwiPlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cImNhbC1ldmVudC1hY3Rpb24gXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZncgZmEtcGVuY2lsXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiY2FsLWV2ZW50LWFjdGlvbiBcIiBocmVmPVwiamF2YXNjcmlwdDo7XCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1mdyBmYS10aW1lc1wiPjwvaT5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9zcGFuPiAtLT5cclxuICAgICAgICAgIDxhIGNsYXNzPVwiY2FsLWV2ZW50LXRpdGxlIFwiXHJcbiAgICAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDogdm9pZCgwKVwiXHJcbiAgICAgICAgICAgICAoY2xpY2spPVwib3BlbkV2ZW50KHdlZWtFdmVudC5kYXRhKVwiPnt7IHdlZWtFdmVudC50aXRsZSB9fTwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYDpob3N0e21pbi1oZWlnaHQ6NTB2aDttYXgtaGVpZ2h0Ojg1dmg7ZGlzcGxheTpibG9ja30uYmxhY2sgLmNhbC1kYXktaGVhZGVyc3tiYWNrZ3JvdW5kOiM0YTRhNGF9LmJsYWNrIC5jYWwtaGVhZGVye2JvcmRlci1yaWdodDoxcHggc29saWQgI2UxZTFlMTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTFlMWUxO2NvbG9yOiNmZmZ9LmJsYWNrIC5jYWwtaGVhZGVyLmNhbC10b2RheXtiYWNrZ3JvdW5kLWNvbG9yOiM0NjcyOTh9LndoaXRlIC5jYWwtZGF5LWhlYWRlcnN7YmFja2dyb3VuZDojZmZmfS53aGl0ZSAuY2FsLWhlYWRlcntib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNlMWUxZTE7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2UxZTFlMX0ud2hpdGUgLmNhbC1oZWFkZXIuY2FsLXRvZGF5e2JhY2tncm91bmQtY29sb3I6I2Q3ZWNmZn0uY2FsLXdlZWstdmlld3toZWlnaHQ6Y2FsYygxMDAlIC0gMzBweCk7b3ZlcmZsb3cteTphdXRvfS5jYWwtd2Vlay12aWV3IC5jYWwtZGF5LWhlYWRlcnN7ZGlzcGxheTpmbGV4O3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7ei1pbmRleDoxfS5jYWwtd2Vlay12aWV3IC5jYWwtZGF5LWhlYWRlcnMgLmNhbC1oZWFkZXJ7ZmxleDoxO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6NXB4O292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDtoZWlnaHQ6NTBweH0uY2FsLXdlZWstdmlldyAuYWN0aW9uLWJsb2Nre3BhZGRpbmctdG9wOjYycHh9LmNhbC13ZWVrLXZpZXcgLmNhbC1ldmVudHMtcm93e3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDozM3B4fS5jYWwtd2Vlay12aWV3IC5jYWwtZXZlbnQtY29udGFpbmVye2Rpc3BsYXk6aW5saW5lLWJsb2NrO3Bvc2l0aW9uOmFic29sdXRlfS5jYWwtd2Vlay12aWV3IC5jYWwtZW5kcy13aXRoaW4td2VlayAuY2FsLWV2ZW50e2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHh9LmNhbC13ZWVrLXZpZXcgLmNhbC1zdGFydHMtd2l0aGluLXdlZWsgLmNhbC1ldmVudHtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjVweH0uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50e292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcDtwYWRkaW5nOjAgMTBweDtmb250LXNpemU6MTJweDttYXJnaW4tbGVmdDoycHg7bWFyZ2luLXJpZ2h0OjJweDtoZWlnaHQ6MzBweDtsaW5lLWhlaWdodDozMHB4O2JhY2tncm91bmQtY29sb3I6I2QxZThmZjtib3JkZXI6MXB4IHNvbGlkICMxZTkwZmY7Y29sb3I6IzFlOTBmZn0uY2FsLXdlZWstdmlldyAuY2FsLWV2ZW50Lm9yYW5nZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmM2ODE7Ym9yZGVyLWNvbG9yOiNhZDIxMjF9LmNhbC13ZWVrLXZpZXcgLmNhbC1ldmVudC5ibHVle2JhY2tncm91bmQtY29sb3I6I2M0ZTdmZjtib3JkZXItY29sb3I6IzA4MzRlM31he2NvbG9yOiMwMDdiZmY7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDstd2Via2l0LXRleHQtZGVjb3JhdGlvbi1za2lwOm9iamVjdHN9LmNhbC13ZWVrLXZpZXcgLmNhbC1ldmVudC10aXRsZTpsaW5re2NvbG9yOmN1cnJlbnRDb2xvcn1gXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKVxyXG4gIGNsYXNzTmFtZSA9ICdibGFjayc7XHJcbiAgQElucHV0KClcclxuICBkYXlOYW1lID0gJ8OowpnCnyc7XHJcbiAgQElucHV0KClcclxuICB3ZWVrTmFtZXM6IHN0cmluZ1tdID0gWyfDpsKYwp/DpsKcwp/DpsKXwqUnLCAnw6bCmMKfw6bCnMKfw6TCuMKAJywgJ8OmwpjCn8OmwpzCn8OkwrrCjCcsICfDpsKYwp/DpsKcwp/DpMK4woknLCAnw6bCmMKfw6bCnMKfw6XCm8KbJywgJ8OmwpjCn8OmwpzCn8OkwrrClCcsICfDpsKYwp/DpsKcwp/DpcKFwq0nXTtcclxuICBASW5wdXQoKVxyXG4gIHdlZWtseUV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIG5zdHIgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgd2Vla0RheXM6IE5neEhtQ2FsZW5kYXJXZWVrRGF5W10gPSBbXTtcclxuICB3ZWVrRXZlbnRzOiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsPHN0cmluZz5bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbml0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFZhbHVlKCkge1xyXG4gICAgdGhpcy5zZXRXZWVrRGF5cygpO1xyXG4gICAgdGhpcy5zZXRXZWVrRXZlbnRzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRXZWVrRGF5cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IHRvZGF5ID0gbmV3IERhdGUoKTtcclxuICAgIGNvbnN0IG5zdHJEYXkgPSB0aGlzLm5zdHIuZ2V0RGF5KCk7XHJcbiAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZSh0aGlzLm5zdHIuZ2V0VGltZSgpKTtcclxuXHJcbiAgICBzdGFydERhdGUuc2V0RGF0ZShzdGFydERhdGUuZ2V0RGF0ZSgpICsgKDAgLSBuc3RyRGF5KSk7XHJcblxyXG4gICAgdGhpcy53ZWVrRGF5cyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShzdGFydERhdGUuZ2V0VGltZSgpKTtcclxuXHJcbiAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSArIGkpO1xyXG5cclxuICAgICAgdGhpcy53ZWVrRGF5cy5wdXNoKHtcclxuICAgICAgICBkYXRlLFxyXG4gICAgICAgIHllYXI6IGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBtb250aDogZGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgIGRheTogZGF0ZS5nZXREYXRlKCksXHJcbiAgICAgICAgaXNUb2RheTogZGF0ZS50b0RhdGVTdHJpbmcoKSA9PT0gdG9kYXkudG9EYXRlU3RyaW5nKCksXHJcbiAgICAgIH0gYXMgTmd4SG1DYWxlbmRhcldlZWtEYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0V2Vla0V2ZW50cygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpcnN0V2Vla0RheSA9IHRoaXMud2Vla0RheXNbMF07XHJcbiAgICBjb25zdCBmaXJzdGRhdGUgPSBuZXcgRGF0ZShmaXJzdFdlZWtEYXkueWVhciwgZmlyc3RXZWVrRGF5Lm1vbnRoLCBmaXJzdFdlZWtEYXkuZGF5KTtcclxuICAgIGNvbnN0IGZpcnN0ZGF5ID0gZmlyc3RkYXRlLmdldERheSgpO1xyXG5cclxuICAgIGNvbnN0IGxhc3RXZWVrRGF5ID0gdGhpcy53ZWVrRGF5c1s2XTtcclxuICAgIGNvbnN0IGxhc3RkYXRlID0gbmV3IERhdGUobGFzdFdlZWtEYXkueWVhciwgbGFzdFdlZWtEYXkubW9udGgsIGxhc3RXZWVrRGF5LmRheSk7XHJcbiAgICBjb25zdCBsYXN0ZGF5ID0gbGFzdGRhdGUuZ2V0RGF5KCk7XHJcbiAgICBsYXN0ZGF0ZS5zZXREYXRlKGxhc3RkYXRlLmdldERhdGUoKSArIDEpO1xyXG5cclxuICAgIHRoaXMud2Vla0V2ZW50cyA9IHRoaXMuZXZlbnRzXHJcbiAgICAgIC5jb25jYXQoLi4udGhpcy53ZWVrbHlFdmVudHMubWFwKGdldE11dGlwbGVFdmVudHMoZmlyc3RXZWVrRGF5LnllYXIsIGZpcnN0V2Vla0RheS5tb250aCkpKVxyXG4gICAgICAuZmlsdGVyKGUgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAoZS5zdGFydCA+PSBmaXJzdGRhdGUgJiYgZS5zdGFydCA8IGxhc3RkYXRlKSB8fFxyXG4gICAgICAgICAgKGZpcnN0ZGF0ZSA+PSBlLnN0YXJ0ICYmIGZpcnN0ZGF0ZSA8PSBlLmVuZCkgfHxcclxuICAgICAgICAgIChlLnN0YXJ0IDw9IGZpcnN0ZGF0ZSAmJiBsYXN0ZGF0ZSA8IGUuZW5kKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zb3J0KChlMSwgZTIpID0+IGUxLnN0YXJ0LmdldFRpbWUoKSAtIGUyLnN0YXJ0LmdldFRpbWUoKSlcclxuICAgICAgLm1hcChlID0+IHtcclxuICAgICAgICBjb25zdCBldmVudDogTmd4SG1DYWxlbmRhckVsbURldGlhbDxudW1iZXI+ID0ge1xyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IDcsXHJcbiAgICAgICAgICAgIGxlZnQ6IGUuc3RhcnQuZ2V0RGF5KCkgLSBmaXJzdGRheSxcclxuICAgICAgICAgICAgY29sb3I6IGUuY29sb3IsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc3RhcnRzQmVmb3JlV2VlazogdHJ1ZSxcclxuICAgICAgICAgIGVuZHNBZnRlcldlZWs6IHRydWUsXHJcbiAgICAgICAgICB0aXRsZTogZS50aXRsZSxcclxuICAgICAgICAgIHVybDogZS51cmwsXHJcbiAgICAgICAgICBkYXRhOiBlLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChlLnN0YXJ0ID49IGZpcnN0ZGF0ZSAmJiBlLmVuZCA8IGxhc3RkYXRlKSB7XHJcbiAgICAgICAgICBldmVudC5zdHlsZS53aWR0aCA9IGUuZW5kLmdldERheSgpIC0gZS5zdGFydC5nZXREYXkoKSArIDE7XHJcbiAgICAgICAgICBldmVudC5zdHlsZS5sZWZ0ID0gZS5zdGFydC5nZXREYXkoKSAtIGZpcnN0ZGF5O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5zdGFydCA8IGZpcnN0ZGF0ZSAmJiAoZmlyc3RkYXRlIDw9IGUuZW5kICYmIGUuZW5kIDwgbGFzdGRhdGUpKSB7XHJcbiAgICAgICAgICBldmVudC5zdHlsZS53aWR0aCA9IGUuZW5kLmdldERheSgpIC0gZmlyc3RkYXkgKyAxO1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUubGVmdCA9IDA7XHJcbiAgICAgICAgICBldmVudC5zdGFydHNCZWZvcmVXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlLnN0YXJ0ID49IGZpcnN0ZGF0ZSAmJiBlLnN0YXJ0IDwgbGFzdGRhdGUgJiYgZS5lbmQgPj0gbGFzdGRhdGUpIHtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLndpZHRoID0gbGFzdGRheSAtIGUuc3RhcnQuZ2V0RGF5KCkgKyAxO1xyXG4gICAgICAgICAgZXZlbnQuc3R5bGUubGVmdCA9IGUuc3RhcnQuZ2V0RGF5KCkgLSBmaXJzdGRheTtcclxuICAgICAgICAgIGV2ZW50LmVuZHNBZnRlcldlZWsgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGUuc3RhcnQgPD0gZmlyc3RkYXRlICYmIGxhc3RkYXRlIDwgZS5lbmQpIHtcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLndpZHRoID0gNztcclxuICAgICAgICAgIGV2ZW50LnN0eWxlLmxlZnQgPSAwO1xyXG4gICAgICAgICAgZXZlbnQuc3RhcnRzQmVmb3JlV2VlayA9IGZhbHNlO1xyXG4gICAgICAgICAgZXZlbnQuZW5kc0FmdGVyV2VlayA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLmV2ZW50LFxyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgd2lkdGg6IGAkeyhldmVudC5zdHlsZS53aWR0aCAvIDcpICogMTAwfSVgLFxyXG4gICAgICAgICAgICBsZWZ0OiBgJHsoZXZlbnQuc3R5bGUubGVmdCAvIDcpICogMTAwfSVgLFxyXG4gICAgICAgICAgICBjb2xvcjogZS5jb2xvcixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcmV2KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uc3RyLnNldERhdGUodGhpcy5uc3RyLmdldERhdGUoKSAtIDcpO1xyXG4gICAgdGhpcy5pbml0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIG5leHQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5zdHIuc2V0RGF0ZSh0aGlzLm5zdHIuZ2V0RGF0ZSgpICsgNyk7XHJcbiAgICB0aGlzLmluaXRWYWx1ZSgpO1xyXG4gIH1cclxuXHJcbiAgb3BlbkV2ZW50KGV2ZW50KTogdm9pZCB7XHJcbiAgICB0aGlzLm9wZW4uZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5uc3RyIHx8IGNoYW5nZXMuZXZlbnRzKSB7XHJcbiAgICAgIHRoaXMuaW5pdFZhbHVlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBIT1VSX1NDSEVNQVM6IGFueVtdID0gW1xyXG4gIHtcclxuICAgIG5hbWU6ICcxMiBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwMSBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwMiBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwMyBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNCBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNSBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNiBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNyBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwOCBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwOSBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcxMCBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcxMSBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcxMiBBTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwMSBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwMiBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwMyBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNCBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNSBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNiBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwNyBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwOCBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcwOSBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcxMCBQTSdcclxuICB9LFxyXG4gIHtcclxuICAgIG5hbWU6ICcxMSBQTSdcclxuICB9XHJcbl07XHJcbiIsImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE91dHB1dCxcclxuICBRdWVyeUxpc3QsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGRyZW4sXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGdldE11dGlwbGVFdmVudHMgfSBmcm9tICcuLi8uLi9tb250aC91dGlscyc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWwsIE5neEhtQ2FsZW5kYXJFdmVudCB9IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IEhPVVJfU0NIRU1BUyB9IGZyb20gJy4vZGF0YSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhci1kYXktdmlldycsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ0NsYXNzXT1cImNsYXNzTmFtZVwiXHJcbiAgICAgY2xhc3M9XCJjb250ZW50XCI+XHJcbiAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaG91ciBuYW1lXCJcclxuICAgICAgICAgKm5nRm9yPVwibGV0IGhvdXJTY2hlbWEgb2YgaG91clNjaGVtYXNcIj5cclxuICAgICAge3sgaG91clNjaGVtYS5uYW1lIH19XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwic3RyaXBcIj5cclxuICAgIDxzZWN0aW9uICpuZ0Zvcj1cImxldCBob3VyU2NoZW1hIG9mIGhvdXJTY2hlbWFzOyBsZXQgaW5kZXggPSBpbmRleDtcIlxyXG4gICAgICAgICAgICAgY2xhc3M9XCJob3VyXCJcclxuICAgICAgICAgICAgICNiYXI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+PC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgPCEtLSBldmVudHMgLS0+XHJcbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkYXlFdmVudCBvZiBkYXlFdmVudHNcIlxyXG4gICAgICAgICBjbGFzcz1cImJhclwiXHJcbiAgICAgICAgIFtuZ1N0eWxlXT1cImRheUV2ZW50LnN0eWxlXCJcclxuICAgICAgICAgW2NsYXNzLmNhbC1zdGFydHMtd2l0aGluLWRheV09XCJkYXlFdmVudC5zdGFydHNCZWZvcmVXZWVrXCJcclxuICAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi1kYXldPVwiZGF5RXZlbnQuZW5kc0FmdGVyV2Vla1wiPlxyXG4gICAgICA8c3BhbiAoY2xpY2spPVwib3BlbkV2ZW50KGRheUV2ZW50LmRhdGEpXCI+XHJcbiAgICAgICAge3sgZGF5RXZlbnQuZGF0YS50aXRsZSB9fVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS08ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogZ3JlZW47XHJcbiAgICBoZWlnaHQ6IDkwcHg7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDE4MHB4O1xyXG4gICAgbGVmdDogMTAwcHg7XCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiBwaW5rO1xyXG4gICAgaGVpZ2h0OiAxMjBweDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTgwcHg7bGVmdDogMjAwcHg7XCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiBwYWxldHVycXVvaXNlO1xyXG4gICAgaGVpZ2h0OiAyMTBweDtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTgwcHg7bGVmdDogMzAwcHg7XCI+XHJcbiAgICA8L2Rpdj4gLS0+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2A6aG9zdHtkaXNwbGF5OmJsb2NrO292ZXJmbG93LXk6c2Nyb2xsO21heC1oZWlnaHQ6ODV2aH0uYmxhY2sgLmhvdXIgLmxpbmV7Ym9yZGVyLWJvdHRvbTp0aGluIGRhc2hlZCAjODg4ZjkwfS5ibGFjayAuaG91ciAubGluZTpob3ZlcntiYWNrZ3JvdW5kOndoZWF0fS5ibGFjayAuaG91ci5uYW1le2NvbG9yOiNmZmZ9LmJsYWNrIC5ob3VyOm50aC1jaGlsZChvZGQpe2JhY2tncm91bmQ6IzZmNmU2ZX0ud2hpdGUgLmhvdXIgLmxpbmV7Ym9yZGVyLWJvdHRvbTp0aGluIGRhc2hlZCAjMDAwfS53aGl0ZSAuaG91ciAubGluZTpob3ZlcntiYWNrZ3JvdW5kOndoZWF0fS53aGl0ZSAuaG91cjpudGgtY2hpbGQob2RkKXtiYWNrZ3JvdW5kOiNmYmVlZWV9LmNvbnRlbnR7ZGlzcGxheTpmbGV4O21hcmdpbi1ib3R0b206MzBweH0uY29udGVudCAudGl0bGV7d2lkdGg6MTAwcHg7ZmxleDowIDAgMTAwcHh9LmNvbnRlbnQgLnN0cmlwe3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9LmNvbnRlbnQgLmhvdXJ7aGVpZ2h0OjYwcHh9LmNvbnRlbnQgLmhvdXIubmFtZXtsaW5lLWhlaWdodDo2MHB4O3RleHQtYWxpZ246Y2VudGVyfS5jb250ZW50IC5ob3VyIC5saW5le2hlaWdodDozMHB4O2Rpc3BsYXk6ZmxleH0uY29udGVudCAuaG91ciAubGluZSAuYWN0aXZle3dpZHRoOjEwMHB4O2hlaWdodDoxMDAlO2ZsZXg6MCAwIDEwMHB4O2JveC1zaXppbmc6Y29udGVudC1ib3g7ei1pbmRleDoxfS5iYXJ7Ym9yZGVyOjFweCBzb2xpZCAjMWU5MGZmO3dpZHRoOjEwMHB4O3Bvc2l0aW9uOmFic29sdXRlO2NvbG9yOiNmZmY7cGFkZGluZzo1cHh9LmJhci5jYWwtc3RhcnRzLXdpdGhpbi1kYXl7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4fS5iYXIuY2FsLWVuZHMtd2l0aGluLWRheXtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjVweDtib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHh9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KClcclxuICBjbGFzc05hbWUgPSAnYmxhY2snO1xyXG4gIEBJbnB1dCgpXHJcbiAgd2Vla2x5RXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRzOiBOZ3hIbUNhbGVuZGFyRXZlbnRbXSA9IFtdO1xyXG4gIEBJbnB1dCgpXHJcbiAgbnN0ciA9IG5ldyBEYXRlKDIwMTgsIDYsIDE2KTtcclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0ID0gJzAwOjAwJztcclxuICBASW5wdXQoKVxyXG4gIGVuZCA9ICcyNDowMCc7XHJcbiAgQElucHV0KClcclxuICBzcGxpdCA9IDMwO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZWxtV2lkdGggPSAxMTA7XHJcblxyXG4gIEBWaWV3Q2hpbGRyZW4oJ2JhcicpIGJhcnM6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcclxuXHJcbiAgZ2V0IGZpcnN0RGF0ZSgpIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKSwgdGhpcy5uc3RyLmdldE1vbnRoKCksIHRoaXMubnN0ci5nZXREYXRlKCkpO1xyXG4gICAgY29uc3QgdGltZSA9IHRoaXMuc3RhcnQuc3BsaXQoJzonKTtcclxuXHJcbiAgICBpZiAodGltZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGhvdXIgPSBOdW1iZXIodGltZVswXSk7XHJcbiAgICAgIGNvbnN0IG1pbnV0ZSA9IE51bWJlcih0aW1lWzFdKTtcclxuXHJcbiAgICAgIGlmIChob3VyICsgMSkge1xyXG4gICAgICAgIGRhdGUuc2V0SG91cnMoaG91cik7XHJcblxyXG4gICAgICAgIGlmIChtaW51dGUgKyAxKSB7XHJcbiAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMobWludXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldCBsYXN0RGF0ZSgpIHtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLm5zdHIuZ2V0RnVsbFllYXIoKSwgdGhpcy5uc3RyLmdldE1vbnRoKCksIHRoaXMubnN0ci5nZXREYXRlKCkpO1xyXG4gICAgY29uc3QgdGltZSA9IHRoaXMuZW5kLnNwbGl0KCc6Jyk7XHJcblxyXG4gICAgaWYgKHRpbWUubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBob3VyID0gTnVtYmVyKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtaW51dGUgPSBOdW1iZXIodGltZVsxXSk7XHJcblxyXG4gICAgICBpZiAoaG91cikge1xyXG4gICAgICAgIGRhdGUuc2V0SG91cnMoaG91cik7XHJcblxyXG4gICAgICAgIGlmIChtaW51dGUpIHtcclxuICAgICAgICAgIGRhdGUuc2V0TWludXRlcyhtaW51dGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChOdW1iZXIoZGF0ZSkgLSBOdW1iZXIodGhpcy5maXJzdERhdGUpIDw9IDApIHtcclxuICAgICAgZGF0ZS5zZXRIb3VycygyNCk7XHJcbiAgICAgIGRhdGUuc2V0TWludXRlcygwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcblxyXG4gIGRheUV2ZW50czogTmd4SG1DYWxlbmRhckVsbURldGlhbDxzdHJpbmc+W10gPSBbXTtcclxuXHJcbiAgaG91clNjaGVtYXM6IGFueVtdID0gSE9VUl9TQ0hFTUFTO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgfVxyXG5cclxuICBpbml0VmlldygpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0SG91clNjaGVtYXMoKTtcclxuICAgIHRoaXMuc2V0RGF5RXZlbnQoKTtcclxuICAgIHRoaXMuYmluZERheUV2ZW50V2lkdGgoKTtcclxuICB9XHJcblxyXG4gIHNldEhvdXJTY2hlbWFzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlmZk1zID0gTnVtYmVyKHRoaXMubGFzdERhdGUpIC0gTnVtYmVyKHRoaXMuZmlyc3REYXRlKTtcclxuICAgIGNvbnN0IGRpZmZIcnMgPSBNYXRoLmNlaWwoZGlmZk1zIC8gMzYwMDAwMCk7IC8vIGhvdXJzXHJcbiAgICAvLyBjb25zdCBkaWZmTWlucyA9IE1hdGgucm91bmQoKChkaWZmTXMgJSA4NjQwMDAwMCkgJSAzNjAwMDAwKSAvIDYwMDAwKTsgLy8gbWludXRlc1xyXG4gICAgY29uc3QgZmlyc3RIb3VyID0gdGhpcy5maXJzdERhdGUuZ2V0SG91cnMoKTtcclxuXHJcbiAgICB0aGlzLmhvdXJTY2hlbWFzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0SG91cjsgaSA8IGZpcnN0SG91ciArIGRpZmZIcnM7IGkrKykge1xyXG4gICAgICB0aGlzLmhvdXJTY2hlbWFzLnB1c2goe1xyXG4gICAgICAgIG5hbWU6IGAkeygnMCcgKyBpKS5zdWJzdHIoLTIpfSAke2kgPiAxMiA/ICdQTScgOiAnQU0nfWAsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RGF5RXZlbnQoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3aWR0aCA9IDMwO1xyXG4gICAgY29uc3QgZmlyc3RkYXRlID0gdGhpcy5maXJzdERhdGU7XHJcbiAgICBjb25zdCBsYXN0ZGF0ZSA9IHRoaXMubGFzdERhdGU7XHJcbiAgICBjb25zdCBnZXRQaXhlbEZvckRpZmZTcGxpdCA9IChlbmQsIHN0YXJ0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGRpZmZNcyA9IGVuZC5nZXRUaW1lKCkgLSBzdGFydC5nZXRUaW1lKCk7XHJcbiAgICAgIHJldHVybiAoZGlmZk1zICUgODY0MDAwMDApIC8gKHRoaXMuc3BsaXQgKiA2MCAqIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRheUV2ZW50cyA9IHRoaXMuZXZlbnRzXHJcbiAgICAgIC5jb25jYXQoXHJcbiAgICAgICAgLi4udGhpcy53ZWVrbHlFdmVudHMubWFwKGdldE11dGlwbGVFdmVudHModGhpcy5uc3RyLmdldEZ1bGxZZWFyKCksIHRoaXMubnN0ci5nZXRNb250aCgpKSksXHJcbiAgICAgIClcclxuICAgICAgLy8gw6XChcKIw6nCgcKOw6bCv8K+w6XCh8K6w6bCnMKDw6fCtsKTw6nCgcKOw6nCgMKZw6TCuMKAw6XCpMKpw6fCmsKEw6TCusKLw6TCu8K2w6XCgMKRXHJcbiAgICAgIC5maWx0ZXIoKGU6IE5neEhtQ2FsZW5kYXJFdmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAoZS5zdGFydCA+PSBmaXJzdGRhdGUgJiYgZS5zdGFydCA8IGxhc3RkYXRlKSB8fFxyXG4gICAgICAgICAgKGZpcnN0ZGF0ZSA+PSBlLnN0YXJ0ICYmIGZpcnN0ZGF0ZSA8PSBlLmVuZCkgfHxcclxuICAgICAgICAgIChmaXJzdGRhdGUgPj0gZS5zdGFydCAmJiBsYXN0ZGF0ZSA8IGUuZW5kKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIMOmwqDCucOmwpPCmsOpwpbCi8OlwqfCi8OmwpnCgsOpwpbCk8OlwoHCmsOmwo7CksOlwrrCj1xyXG4gICAgICAuc29ydCgoZTE6IE5neEhtQ2FsZW5kYXJFdmVudCwgZTI6IE5neEhtQ2FsZW5kYXJFdmVudCkgPT4gZTEuc3RhcnQuZ2V0VGltZSgpIC0gZTIuc3RhcnQuZ2V0VGltZSgpKVxyXG4gICAgICAvLyDDqMK9wonDpsKPwpvDp8KCwrrDp8KVwqvDqcKdwqLDpMK4worDqcKcwoDDqMKmwoHDp8K2woHDpcKuwprDp8KawoTDpcKAwrxcclxuICAgICAgLm1hcCgoZTogTmd4SG1DYWxlbmRhckV2ZW50LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBlbG1EZXRpYWw6IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWwgPSB7XHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgICAgbGVmdDogaSAqIHRoaXMuZWxtV2lkdGgsXHJcbiAgICAgICAgICAgIC8vIGJhY2tncm91bmQ6IGUuY29sb3IudG9TdHJpbmcoKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN0YXJ0c0JlZm9yZVdlZWs6IHRydWUsXHJcbiAgICAgICAgICBlbmRzQWZ0ZXJXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgZGF0YTogZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGlmIGV2ZW50IGZpcnN0IGRhdGUgaXMgYmlnZ2VyIHRoYW4gZmlyc3RkYXRlXHJcbiAgICAgICAgaWYgKGUuc3RhcnQgPj0gZmlyc3RkYXRlKSB7XHJcbiAgICAgICAgICBpZiAoZS5lbmQgPCBsYXN0ZGF0ZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgfC0tLS0tLS0tLXxcclxuXHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS50b3AgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChlLnN0YXJ0LCBmaXJzdGRhdGUpICogd2lkdGg7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS5oZWlnaHQgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChlLmVuZCwgZS5zdGFydCkgKiB3aWR0aDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZS5zdGFydCA8IGxhc3RkYXRlICYmIGUuZW5kID49IGxhc3RkYXRlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfC0tLS0tLS0tLS0tLS0tLS0tLS0tfFxyXG5cclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLnRvcCA9IGdldFBpeGVsRm9yRGlmZlNwbGl0KGUuc3RhcnQsIGZpcnN0ZGF0ZSkgKiB3aWR0aDtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLmhlaWdodCA9IGdldFBpeGVsRm9yRGlmZlNwbGl0KGxhc3RkYXRlLCBlLnN0YXJ0KSAqIHdpZHRoO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuZW5kc0FmdGVyV2VlayA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5zdGFydCA8PSBmaXJzdGRhdGUpIHtcclxuICAgICAgICAgIC8vIGlmIGV2ZW50IGZpcnN0IGRhdGUgaXMgYmlnZ2VyIHRoYW4gZmlyc3RkYXRlXHJcbiAgICAgICAgICBpZiAobGFzdGRhdGUgPCBlLmVuZCkge1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3R5bGUuaGVpZ2h0ID0gdGhpcy5ob3VyU2NoZW1hcy5sZW5ndGggKiAyICogd2lkdGg7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdGFydHNCZWZvcmVXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5lbmRzQWZ0ZXJXZWVrID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0ZGF0ZSA8PSBlLmVuZCAmJiBlLmVuZCA8IGxhc3RkYXRlKSB7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS5oZWlnaHQgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChlLmVuZCwgZmlyc3RkYXRlKSAqIHdpZHRoO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3RhcnRzQmVmb3JlV2VlayA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsbURldGlhbDtcclxuICAgICAgfSlcclxuICAgICAgLy8gw6XChsKNw6bCrMKhw6nCgcKOw6bCv8K+w6XCh8K6w6XCnMKow6nCgMKZaG91csOlwo3CgMOpwpbCk8OowqPCocOpwp3CosOnwprChMOkwrrCi8OkwrvCtsOlwoDCkVxyXG4gICAgICAuZmlsdGVyKChlOiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsKSA9PiBlLnN0eWxlLmhlaWdodCAhPT0gMClcclxuICAgICAgLy8gw6nCh8KNw6bClsKww6fCtsKBw6XCrsKabGVmdMOnwprChMOpwqDChsOlwrrCj1xyXG4gICAgICAubWFwKChlOiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsLCBpKSA9PiB7XHJcbiAgICAgICAgZS5zdHlsZS5sZWZ0ID0gaSAqIHRoaXMuZWxtV2lkdGg7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIC4uLmUsXHJcbiAgICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICB0b3A6IGAke2Uuc3R5bGUudG9wfXB4YCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBgJHtlLnN0eWxlLmhlaWdodH1weGAsXHJcbiAgICAgICAgICAgIGxlZnQ6IGAke2Uuc3R5bGUubGVmdH1weGAsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGAke2UuZGF0YS5jb2xvcn1gLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGJpbmREYXlFdmVudFdpZHRoKCk6IHZvaWQge1xyXG4gICAgLy8gw6XCtMKHw6jCu8KSw6XCpMKnw6fCpcKew6fCicKIw6bCnMKsXHJcbiAgICAvLyBsZXQgdGVtcFdpZHRoID0gMDtcclxuICAgIC8vIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmRheUV2ZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgIC8vICAgdGVtcFdpZHRoID0gdGVtcFdpZHRoICsgaW5kZXggKiAxMDtcclxuICAgIC8vIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgLy8gw6fCgcKww6XCocK1w6fCicKIw6bCnMKsICjDpcKDwoXDpMK+wpvDpcKPwoPDqMKAwoNYRClcclxuICAgICAgY29uc3QgdGVtcFdpZHRoID0gdGhpcy5kYXlFdmVudHMubGVuZ3RoXHJcbiAgICAgICAgPyB0aGlzLmRheUV2ZW50cy5tYXAoKHgsIGkpID0+IGkgKiAxMCkucmVkdWNlKChhLCBiKSA9PiBhICsgYilcclxuICAgICAgICA6IDA7XHJcblxyXG4gICAgICBpZiAoZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCAtIDEwMCA8IDEwMCAqIHRoaXMuZGF5RXZlbnRzLmxlbmd0aCArIHRlbXBXaWR0aCkge1xyXG4gICAgICAgIHRoaXMuYmFycy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgaXRlbS5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gYCR7MTAwICogdGhpcy5kYXlFdmVudHMubGVuZ3RoICsgdGVtcFdpZHRofXB4YDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICBwcmV2KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uc3RyLnNldERhdGUodGhpcy5uc3RyLmdldERhdGUoKSAtIDEpO1xyXG4gICAgdGhpcy5pbml0VmlldygpO1xyXG4gIH1cclxuXHJcbiAgbmV4dCgpOiB2b2lkIHtcclxuICAgIHRoaXMubnN0ci5zZXREYXRlKHRoaXMubnN0ci5nZXREYXRlKCkgKyAxKTtcclxuICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICB9XHJcblxyXG4gIG9wZW5FdmVudChldmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcGVuLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMubnN0ciB8fCBjaGFuZ2VzLnN0YXJ0IHx8IGNoYW5nZXMuZW5kKSB7XHJcbiAgICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmd4SG1DYWxlbmRhclZpZXdNb2RlIH0gZnJvbSAnLi4vLi4vbmd4LWhtLWNhbGVuZGFyLm1vZGVsJztcclxuXHJcbmV4cG9ydCBlbnVtIENhbGVuZGFyU2VsZWN0b3JNb2RlIHtcclxuICBZZWFyID0gJ1llYXInLFxyXG4gIE1vbnRoID0gJ01vbnRoJyxcclxuICBEYXkgPSAnRGF5JyxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDYWxlbmRhclNlbGVjdG9yRGF0YSB7XHJcbiAgdGhlbWU/OiBzdHJpbmc7XHJcbiAgY29udGFpbmVyVmlld01vZGU/OiBOZ3hIbUNhbGVuZGFyVmlld01vZGU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hSeE1vZGFsUmVmLCBOR1hfUlhfTU9EQUxfVE9LRU4gfSBmcm9tICduZ3gtcngtbW9kYWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJWaWV3TW9kZSB9IGZyb20gJy4uLy4uL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IGdldENhbGVuZGFyIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBDYWxlbmRhclNlbGVjdG9yRGF0YSwgQ2FsZW5kYXJTZWxlY3Rvck1vZGUgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cCcsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiIFtuZ0NsYXNzXT1cInBvcHVwRGF0YS50aGVtZVwiPlxyXG4gIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXJcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIiBbbmdTd2l0Y2hdPVwibW9kZVwiPlxyXG4gICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ1llYXInXCI+e3sgbWluWWVhciB9fSB+IHt7IG1pblllYXIgKyAyNCB9fcOlwrnCtDwvc3Bhbj5cclxuICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidNb250aCdcIj57eyBzZWxlY3RlZFllYXIgfX3DpcK5wrQ8L3NwYW4+XHJcbiAgICAgIDxzcGFuICpuZ1N3aXRjaENhc2U9XCInRGF5J1wiPnt7IHNlbGVjdGVkWWVhciB9fcOlwrnCtCB7eyBzZWxlY3RlZE1vbnRoICArIDEgfX3DpsKcwog8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibW9kZVwiPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ibG9ja1wiICpuZ1N3aXRjaENhc2U9XCInWWVhcidcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idXR0b25cIiAoY2xpY2spPVwicHJldlllYXJSYW5nZSgpXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9uIGxlZnRcIj48L2Rpdj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJuZXh0WWVhclJhbmdlKClcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gcmlnaHRcIj48L2Rpdj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1ibG9ja1wiICpuZ1N3aXRjaENhc2U9XCInTW9udGgnXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhlYWRlci1idXR0b25cIiAoY2xpY2spPVwiYmFja1RvWWVhclNlbGVjdG9yKClcIj5cclxuICAgICAgICAgIMOiwpbCslxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tYmxvY2tcIiAqbmdTd2l0Y2hDYXNlPVwiJ0RheSdcIj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiIChjbGljayk9XCJiYWNrVG9Nb250aFNlbGVjdG9yKClcIj5cclxuICAgICAgICAgIMOiwpbCslxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPC9oZWFkZXI+XHJcbiAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwibW9kZVwiPlxyXG5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidZZWFyJ1wiIGNsYXNzPVwiY29udGFpbmVyXCIgKHN3aXBlbGVmdCk9XCJuZXh0WWVhclJhbmdlKClcIiAoc3dpcGVyaWdodCk9XCJwcmV2WWVhclJhbmdlKClcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJveCB5ZWFyXCIgKm5nRm9yPVwibGV0IHllYXIgb2YgeWVhcnM7IGxldCBpID0gaW5kZXg7XCIgKGNsaWNrKT1cInNlbGVjdFllYXIoeWVhcilcIj57eyB5ZWFyIH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInTW9udGgnXCIgY2xhc3M9XCJjb250YWluZXJcIiAoc3dpcGV1cCk9XCJiYWNrVG9ZZWFyU2VsZWN0b3IoKVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYm94XCIgKm5nRm9yPVwibGV0IG1vbnRoIG9mIG1vbnRoczsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwic2VsZWN0TW9udGgobW9udGgpXCI+e3sgbW9udGggKyAxIH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInRGF5J1wiIGNsYXNzPVwiY29udGFpbmVyXCIgKHN3aXBldXApPVwiYmFja1RvTW9udGhTZWxlY3RvcigpXCI+XHJcbiAgICAgIDxkaXYgKm5nRm9yPVwibGV0IHdlZWsgb2YgY2FsZW5kYXJEYXRhOyBsZXQgaSA9IGluZGV4O1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGRheSBvZiB3ZWVrLmRheXM7IGxldCBkYXlfaW5kZXggPSBpbmRleDtcIiA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm94IGRheVwiIFtjbGFzcy5uLW1vbnRoXT1cImRheS5vdGhlclwiIChjbGljayk9XCJzZWxlY3REYXkoZGF5LmRhdGUpXCI+e3sgZGF5Lm51bWJlciB9fTwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcblxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLndyYXBwZXIuYmxhY2t7YmFja2dyb3VuZC1jb2xvcjojNWU1YjVifS53cmFwcGVyLmJsYWNrIC5oZWFkZXJ7YmFja2dyb3VuZC1jb2xvcjojMDA3YmZmfS53cmFwcGVyLmJsYWNrIC50aXRsZXtjb2xvcjojZmZmfS53cmFwcGVyLmJsYWNrIC5sZWZ0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjYTA5ZmEwIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS53cmFwcGVyLmJsYWNrIC5sZWZ0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCAjZmZmIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50fS53cmFwcGVyLmJsYWNrIC5yaWdodHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2EwOWZhMH0ud3JhcHBlci5ibGFjayAucmlnaHQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNmZmZ9LndyYXBwZXIuYmxhY2sgLmJveHtiYWNrZ3JvdW5kLWNvbG9yOiM0ZjRiNGI7Y29sb3I6I2ZmZn0ud3JhcHBlci53aGl0ZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LndyYXBwZXIud2hpdGUgLmhlYWRlcntiYWNrZ3JvdW5kLWNvbG9yOiMzOWZiZDZ9LndyYXBwZXIud2hpdGUgLnRpdGxle2NvbG9yOiMwMDB9LndyYXBwZXIud2hpdGUgLmxlZnR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNhMDlmYTAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIud2hpdGUgLmxlZnQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNmZmYgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LndyYXBwZXIud2hpdGUgLnJpZ2h0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTA5ZmEwfS53cmFwcGVyLndoaXRlIC5yaWdodDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2ZmZn0ud3JhcHBlci53aGl0ZSAuYm94e2JhY2tncm91bmQtY29sb3I6I2Y2ZmZjZjtjb2xvcjojMDAwfS53cmFwcGVye3dpZHRoOjMwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ud3JhcHBlciAuaGVhZGVye2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtwYWRkaW5nOjEwcHh9LndyYXBwZXIgLmhlYWRlciAudGl0bGV7Zm9udC1zaXplOjIwcHg7bWFyZ2luOjEwcHh9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2Nre2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9ue3BhZGRpbmc6MWVtO2JhY2tncm91bmQ6MCAwO2JvcmRlcjowO2NvbG9yOiNhMDlmYTA7Y3Vyc29yOnBvaW50ZXJ9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9uIC5idXR0b257Ym9yZGVyLXN0eWxlOnNvbGlkO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246YWxsIC41cyBsaW5lYXJ9LndyYXBwZXIgLmhlYWRlciAuYnV0dG9uLWJsb2NrIC5oZWFkZXItYnV0dG9uIC5idXR0b24ubGVmdHtib3JkZXItd2lkdGg6Ny41cHggMTBweCA3LjVweCAwfS53cmFwcGVyIC5oZWFkZXIgLmJ1dHRvbi1ibG9jayAuaGVhZGVyLWJ1dHRvbiAuYnV0dG9uLnJpZ2h0e2JvcmRlci13aWR0aDo3LjVweCAwIDcuNXB4IDEwcHh9aGVhZGVyIGEubmV4dCxoZWFkZXIgYS5wcmV2e2Zsb2F0OnJpZ2h0fS5jb250YWluZXI6YWZ0ZXJ7Y29udGVudDpcIlwiO2NsZWFyOmJvdGg7ZGlzcGxheTp0YWJsZX0uY29udGFpbmVye3BhZGRpbmc6MTBweCAwIDEwcHggMTBweH0ud3JhcHBlciAuYm94e2Zsb2F0OmxlZnQ7d2lkdGg6NjBweDtoZWlnaHQ6NjBweDttYXJnaW46MCAxMHB4IDEwcHggMDt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOmFsbCAxcyBlYXNlO2N1cnNvcjpwb2ludGVyfS53cmFwcGVyIC5ib3guZGF5e2Zsb2F0Om5vbmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MzBweDtoZWlnaHQ6YXV0bztwYWRkaW5nOjVweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LndyYXBwZXIgLmJveC5kYXkubi1tb250aHtiYWNrZ3JvdW5kLWNvbG9yOiM4MzdkN2R9LndyYXBwZXIgLmJveDo6YmVmb3Jle2NvbnRlbnQ6Jyc7d2lkdGg6MDtoZWlnaHQ6MTAwJTtkaXNwbGF5OmlubGluZS1ibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7YmFja2dyb3VuZDpyZWR9LndyYXBwZXIgLmJveDphY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZmYwO2NvbG9yOiMwMDB9LndyYXBwZXIgLmJveC55ZWFye3dpZHRoOjYwcHg7aGVpZ2h0OjMwcHh9LndyYXBwZXIubGlzdC1tb2RlIC5jb250YWluZXJ7cGFkZGluZy1yaWdodDoxMHB4fS53cmFwcGVyLmxpc3QtbW9kZSAuYm94e3dpZHRoOjEwMCV9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgTmd4UnhNb2RhbFJlZiB7XHJcbiAgcG9wdXBEYXRhOiBDYWxlbmRhclNlbGVjdG9yRGF0YSA9IHt9O1xyXG4gIG1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5ZZWFyO1xyXG4gIG1pblllYXIgPSAyMDE2O1xyXG4gIHNlbGVjdGVkWWVhcjogbnVtYmVyO1xyXG4gIHNlbGVjdGVkTW9udGg6IG51bWJlcjtcclxuICBzZWxlY3RlZERhdGU6IERhdGU7XHJcbiAgY2FsZW5kYXJEYXRhOiBhbnk7XHJcbiAgbW9udGhzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMV07XHJcbiAgZ2V0IHllYXJzKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IDI0IH0sICh2LCBrKSA9PiBrICsgdGhpcy5taW5ZZWFyKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb21wbGV0ZSA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChOR1hfUlhfTU9EQUxfVE9LRU4pIHByaXZhdGUgZGF0YSkge1xyXG4gICAgdGhpcy5wb3B1cERhdGEgPSBkYXRhO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBwcmV2WWVhclJhbmdlKCkge1xyXG4gICAgdGhpcy5taW5ZZWFyID0gdGhpcy5taW5ZZWFyIC0gMjQ7XHJcbiAgfVxyXG5cclxuICBuZXh0WWVhclJhbmdlKCkge1xyXG4gICAgdGhpcy5taW5ZZWFyID0gdGhpcy5taW5ZZWFyICsgMjQ7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RZZWFyKHllYXIpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRZZWFyID0geWVhcjtcclxuICAgIHRoaXMubW9kZSA9IENhbGVuZGFyU2VsZWN0b3JNb2RlLk1vbnRoO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0TW9udGgobW9udGgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRNb250aCA9IG1vbnRoO1xyXG5cclxuICAgIGlmICh0aGlzLnBvcHVwRGF0YS5jb250YWluZXJWaWV3TW9kZSA9PT0gTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheSkge1xyXG4gICAgICB0aGlzLm1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5EYXk7XHJcbiAgICAgIHRoaXMuY2FsZW5kYXJEYXRhID0gZ2V0Q2FsZW5kYXIodGhpcy5zZWxlY3RlZFllYXIsIHRoaXMuc2VsZWN0ZWRNb250aCwgW10pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jb21wbGV0ZS5uZXh0KG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWRZZWFyLCB0aGlzLnNlbGVjdGVkTW9udGgsIDEpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdERheShkYXkpIHtcclxuICAgIHRoaXMuY29tcGxldGUubmV4dChkYXkpO1xyXG4gIH1cclxuXHJcbiAgYmFja1RvWWVhclNlbGVjdG9yKCkge1xyXG4gICAgdGhpcy5tb2RlID0gQ2FsZW5kYXJTZWxlY3Rvck1vZGUuWWVhcjtcclxuICB9XHJcblxyXG4gIGJhY2tUb01vbnRoU2VsZWN0b3IoKSB7XHJcbiAgICB0aGlzLm1vZGUgPSBDYWxlbmRhclNlbGVjdG9yTW9kZS5Nb250aDtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4UnhNb2RhbFNlcnZpY2UgfSBmcm9tICduZ3gtcngtbW9kYWwnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRXZlbnQsIE5neEhtQ2FsZW5kYXJFdmVudENhdGVnb3J5LCBOZ3hIbUNhbGVuZGFyVmlld01vZGUgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci5tb2RlbCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJNb250aFZpZXdDb21wb25lbnQgfSBmcm9tICcuL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC12aWV3L25neC1obS1jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudCB9IGZyb20gJy4vd2Vlay9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3L25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckRheVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2RheS9uZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5neEhtQ2FsZW5kYXJNb250aFBvcHVwQ29tcG9uZW50IH0gZnJvbSAnLi9tb250aC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXBvcHVwLmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCB0aW1lID0gJzE1MG1zIGxpbmVhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1obS1jYWxlbmRhcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGVudFwiXHJcbiAgICAgW25nQ2xhc3NdPVwiY2xhc3NOYW1lXCJcclxuICAgICBbbmdTdHlsZV09XCJzaXplXCI+XHJcbiAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJoZWFkZXItYnV0dG9uXCJcclxuICAgICAgICAgIChjbGljayk9XCJwcmV2KClcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbiBsZWZ0XCI+PC9kaXY+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9wZW5TZWxlY3RvcigkZXZlbnQpXCI+XHJcbiAgICAgIHt7IG1vbkRldGFpbCB9fVxyXG4gICAgPC9oMT5cclxuICAgIDxzcGFuIGNsYXNzPVwiaGVhZGVyLWJ1dHRvblwiXHJcbiAgICAgICAgICAoY2xpY2spPVwibmV4dCgpXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24gcmlnaHRcIj48L2Rpdj5cclxuICAgIDwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwidmlldy1ibG9ja1wiXHJcbiAgICAgICBbbmdTd2l0Y2hdPVwidmlld01vZGVcIj5cclxuXHJcbiAgICA8bmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcgW2NsYXNzTmFtZV09XCJjbGFzc05hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbd2Vla05hbWVzXT1cIndlZWtOYW1lc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3llYXJOYW1lXT1cInllYXJOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbW9udGhOYW1lXT1cIm1vbnRoTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2V2ZW50c109XCJldmVudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt3ZWVrbHlFdmVudHNdPVwid2Vla2x5RXZlbnRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbnN0cl09XCJuc3RyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3Blbik9XCJvcGVuRXZlbnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlbGVmdCk9XCJuZXh0KClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZXJpZ2h0KT1cInByZXYoKVwiPjwvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXc+XHJcblxyXG4gICAgPG5neC1obS1jYWxlbmRhci13ZWVrLXZpZXcgW2NsYXNzTmFtZV09XCJjbGFzc05hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIid3ZWVrJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZXZlbnRzXT1cImV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbd2Vla2x5RXZlbnRzXT1cIndlZWtseUV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbnN0cl09XCJuc3RyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcGVuKT1cIm9wZW5FdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZWxlZnQpPVwibmV4dCgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzd2lwZXJpZ2h0KT1cInByZXYoKVwiPjwvbmd4LWhtLWNhbGVuZGFyLXdlZWstdmlldz5cclxuXHJcbiAgICA8bmd4LWhtLWNhbGVuZGFyLWRheS12aWV3IFtjbGFzc05hbWVdPVwiY2xhc3NOYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidkYXknXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2V2ZW50c109XCJldmVudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbd2Vla2x5RXZlbnRzXT1cIndlZWtseUV2ZW50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuc3RyXT1cIm5zdHJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydD1cIjk6MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ9XCIyMzowMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvcGVuKT1cIm9wZW5FdmVudCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN3aXBlbGVmdCk9XCJuZXh0KClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc3dpcGVyaWdodCk9XCJwcmV2KClcIj48L25neC1obS1jYWxlbmRhci1kYXktdmlldz5cclxuXHJcbiAgPC9kaXY+XHJcblxyXG4gIDx1bCBjbGFzcz1cInR5cGUtYnV0dG9tXCJcclxuICAgICAgW0BhbmltYXRlXT1cImxlZ2VuZE9wZW5cIj5cclxuICAgIDxsaT5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkYXlcIlxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJ2aWV3TW9kZSA9PT0gJ2RheSdcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZU1vZGUoJ2RheScpXCI+w6bCl8KlPC9idXR0b24+XHJcbiAgICA8L2xpPlxyXG5cclxuICAgIDxsaT5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiB3ZWVrXCJcclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwidmlld01vZGUgPT09ICd3ZWVrJ1wiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5lTW9kZSgnd2VlaycpXCI+w6XCkcKoPC9idXR0b24+XHJcbiAgICA8L2xpPlxyXG5cclxuICAgIDxsaT5cclxuICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJvcGVuLW1lbnVcIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJsZWdlbmRUb2dnbGUoKVwiPjwvc3Bhbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIG1vbnRoXCJcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cInZpZXdNb2RlID09PSAnbW9udGgnXCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZU1vZGUoJ21vbnRoJylcIj7DpsKcwog8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2xpPlxyXG4gIDwvdWw+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJsZWdlbmRcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiZW50cnlcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIGV2ZW50Q2F0ZWdvcnlzXCI+XHJcbiAgICAgIHt7IGNhdGVnb3J5Lm5hbWUgfX1cclxuICAgICAgPHNwYW4gY2xhc3M9XCJpY29uXCJcclxuICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRdPVwiY2F0ZWdvcnkuY29sb3JcIj48L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuY29udGVudHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVufS5jb250ZW50IC5oZWFkZXJ7aGVpZ2h0OjUwcHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlcn0uY29udGVudCAuaGVhZGVyIC50aXRsZXtwYWRkaW5nOjA7bWFyZ2luOjA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6NTBweDtjdXJzb3I6cG9pbnRlcn0uY29udGVudCAuaGVhZGVyIC5oZWFkZXItYnV0dG9ue3BhZGRpbmc6MWVtfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b24gLmJ1dHRvbntib3JkZXItc3R5bGU6c29saWQ7Y3Vyc29yOnBvaW50ZXI7dHJhbnNpdGlvbjphbGwgLjVzIGxpbmVhcn0uY29udGVudCAuaGVhZGVyIC5oZWFkZXItYnV0dG9uIC5idXR0b24ubGVmdHtib3JkZXItd2lkdGg6Ny41cHggMTBweCA3LjVweCAwfS5jb250ZW50IC5oZWFkZXIgLmhlYWRlci1idXR0b24gLmJ1dHRvbi5yaWdodHtib3JkZXItd2lkdGg6Ny41cHggMCA3LjVweCAxMHB4fS5jb250ZW50IC50eXBlLWJ1dHRvbXt6LWluZGV4OjI7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6MDtsaXN0LXN0eWxlOm5vbmU7Ym90dG9tOjA7bWFyZ2luOjAgMCAzMHB4O3RleHQtYWxpZ246cmlnaHQ7cGFkZGluZzowfS5jb250ZW50IC50eXBlLWJ1dHRvbSAub3Blbi1tZW51e2N1cnNvcjpwb2ludGVyO3dpZHRoOjUwcHg7YmFja2dyb3VuZDojN2VmM2NiO2JvcmRlci1yYWRpdXM6MzBweCAwIDAgMzBweH0uY29udGVudCAudHlwZS1idXR0b20gLmJ1dHRvbntjdXJzb3I6cG9pbnRlcjtib3JkZXI6MDtwYWRkaW5nOi41ZW0gMS41ZW07Y29sb3I6IzAwMDtsaW5lLWhlaWdodDo0MHB4O3dpZHRoOjEwMHB4O3RyYW5zaXRpb246YWxsIC4ycyBsaW5lYXJ9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b24ubW9udGh7YmFja2dyb3VuZDojN2VmM2NifS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9uLndlZWt7d2lkdGg6ODBweDtiYWNrZ3JvdW5kOiNmZmQzNTN9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b24uZGF5e3dpZHRoOjYwcHg7YmFja2dyb3VuZDojZGU1NzU3fS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9uOmhvdmVye3otaW5kZXg6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjEpO3RyYW5zZm9ybTpzY2FsZSgxLjEpO2NvbG9yOiNmZmZ9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXIubW9udGh7YmFja2dyb3VuZDojNDJiOTkxfS5jb250ZW50IC50eXBlLWJ1dHRvbSAuYnV0dG9uOmhvdmVyLndlZWt7d2lkdGg6ODBweDtiYWNrZ3JvdW5kOiNhOTg2MjN9LmNvbnRlbnQgLnR5cGUtYnV0dG9tIC5idXR0b246aG92ZXIuZGF5e2JhY2tncm91bmQ6I2FmMWQxZH0uY29udGVudCAubGVnZW5ke3dpZHRoOjEwMCU7aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweH0uY29udGVudC5ibGFja3tiYWNrZ3JvdW5kOiM0YTRhNGF9LmNvbnRlbnQuYmxhY2sgLmhlYWRlcntiYWNrZ3JvdW5kOiMzMzN9LmNvbnRlbnQuYmxhY2sgLnRpdGxle2NvbG9yOiNmZmZ9LmNvbnRlbnQuYmxhY2sgLmxlZnR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNhMDlmYTAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LmNvbnRlbnQuYmxhY2sgLmxlZnQ6aG92ZXJ7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50ICNmZmYgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnR9LmNvbnRlbnQuYmxhY2sgLnJpZ2h0e2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjYTA5ZmEwfS5jb250ZW50LmJsYWNrIC5yaWdodDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgI2ZmZn0uY29udGVudC5ibGFjayAubGVnZW5ke2JhY2tncm91bmQ6IzMzMztjb2xvcjojZmZmfS5jb250ZW50LndoaXRle2JhY2tncm91bmQ6I2ZmZn0uY29udGVudC53aGl0ZSAuaGVhZGVye2JhY2tncm91bmQ6I2M3YzdjN30uY29udGVudC53aGl0ZSAudGl0bGV7Y29sb3I6IzAwMH0uY29udGVudC53aGl0ZSAubGVmdHtib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgIzAwMCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC53aGl0ZSAubGVmdDpob3Zlcntib3JkZXItY29sb3I6dHJhbnNwYXJlbnQgI2ZmZiB0cmFuc3BhcmVudCB0cmFuc3BhcmVudH0uY29udGVudC53aGl0ZSAucmlnaHR7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICMwMDB9LmNvbnRlbnQud2hpdGUgLnJpZ2h0OmhvdmVye2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmZmfS5jb250ZW50LndoaXRlIC5sZWdlbmR7YmFja2dyb3VuZDojYzdjN2M3O2NvbG9yOiMwMDB9LmNvbnRlbnQgLnZpZXctYmxvY2t7aGVpZ2h0OmNhbGMoMTAwJSAtIDgwcHgpO292ZXJmbG93LXk6YXV0b30uZW50cnl7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzowIDAgMCAyNXB4O2ZvbnQtc2l6ZToxM3B4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2xpbmUtaGVpZ2h0OjMwcHg7YmFja2dyb3VuZDowIDB9LmVudHJ5IC5pY29ue3Bvc2l0aW9uOmFic29sdXRlO2hlaWdodDo1cHg7d2lkdGg6NXB4O3RvcDoxMnB4O2xlZnQ6MTRweH0ubWFza3twb3NpdGlvbjphYnNvbHV0ZTtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MTEwJTtoZWlnaHQ6MTAwJTtyaWdodDowfS5tYXNrOmFmdGVye2NvbnRlbnQ6Jyc7cG9zaXRpb246YWJzb2x1dGU7dG9wOi00MCU7cmlnaHQ6MTEwJTt3aWR0aDozMHB4O2hlaWdodDoyMDAlO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuMyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDIwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDIwZGVnKX1gXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdhbmltYXRlJywgW1xyXG4gICAgICBzdGF0ZShcclxuICAgICAgICAnZmx5T3V0JyxcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKGNhbGMoMTAwJSAtIDU1cHgpKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHN0YXRlKFxyXG4gICAgICAgICdmbHlJbicsXHJcbiAgICAgICAgc3R5bGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2ZseU91dCA9PiBmbHlJbicsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKGNhbGMoMTAwJSAtIDU1cHgpKScsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSh0aW1lKSxcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ2ZseUluID0+IGZseU91dCcsIFtcclxuICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhbmltYXRlKHRpbWUpLFxyXG4gICAgICBdKSxcclxuICAgIF0pLFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hIbUNhbGVuZGFyQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIHdlZWtOYW1lczogc3RyaW5nW10gPSBbJ8OmwpjCn8OmwpzCn8OmwpfCpScsICfDpsKYwp/DpsKcwp/DpMK4woAnLCAnw6bCmMKfw6bCnMKfw6TCusKMJywgJ8OmwpjCn8OmwpzCn8OkwrjCiScsICfDpsKYwp/DpsKcwp/DpcKbwpsnLCAnw6bCmMKfw6bCnMKfw6TCusKUJywgJ8OmwpjCn8OmwpzCn8OlwoXCrSddO1xyXG4gIEBJbnB1dCgpXHJcbiAgeWVhck5hbWUgPSAnw6XCucK0JztcclxuICBASW5wdXQoKVxyXG4gIG1vbnRoTmFtZSA9ICfDpsKcwognO1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF5TmFtZSA9ICfDpsKXwqUnO1xyXG4gIEBJbnB1dCgpXHJcbiAgZXZlbnRDYXRlZ29yeXM6IE5neEhtQ2FsZW5kYXJFdmVudENhdGVnb3J5W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIHdlZWtseUV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIG5zdHIgPSBuZXcgRGF0ZSgpO1xyXG4gIEBPdXRwdXQoKVxyXG4gIG9wZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNsYXNzTmFtZSA9ICdibGFjayc7XHJcbiAgQElucHV0KClcclxuICBzaXplID0ge1xyXG4gICAgd2lkdGg6ICcxMDB2dycsXHJcbiAgICBoZWlnaHQ6ICcxMDB2aCcsXHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogw6nCocKvw6fCpMK6w6bCqMKhw6XCvMKPXHJcbiAgICovXHJcbiAgdmlld01vZGU6IE5neEhtQ2FsZW5kYXJWaWV3TW9kZSA9IE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5tb250aDtcclxuXHJcbiAgZ2V0IHlub3coKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uc3RyLmdldEZ1bGxZZWFyKCk7XHJcbiAgfVxyXG4gIGdldCBtbm93KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubnN0ci5nZXRNb250aCgpO1xyXG4gIH1cclxuICBnZXQgZG5vdygpIHtcclxuICAgIHJldHVybiB0aGlzLm5zdHIuZ2V0RGF0ZSgpO1xyXG4gIH1cclxuICBnZXQgbW9uRGV0YWlsKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IGAke3RoaXMueW5vd30gJHt0aGlzLnllYXJOYW1lfSAke3RoaXMubW5vdyArIDF9ICR7dGhpcy5tb250aE5hbWV9YDtcclxuXHJcbiAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gTmd4SG1DYWxlbmRhclZpZXdNb2RlLmRheSkge1xyXG4gICAgICByZXN1bHQgPSBgJHtyZXN1bHR9ICR7dGhpcy5kbm93fSAke3RoaXMuZGF5TmFtZX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBsZWdlbmRPcGVuID0gJ2ZseU91dCc7XHJcblxyXG4gIEBWaWV3Q2hpbGQoTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudClcclxuICBwcml2YXRlIG1vbnRoQ29tcG9uZW50OiBOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50O1xyXG5cclxuICBAVmlld0NoaWxkKE5neEhtQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudClcclxuICBwcml2YXRlIHdlZWtDb21wb25lbnQ6IE5neEhtQ2FsZW5kYXJXZWVrVmlld0NvbXBvbmVudDtcclxuXHJcbiAgQFZpZXdDaGlsZChOZ3hIbUNhbGVuZGFyRGF5Vmlld0NvbXBvbmVudClcclxuICBwcml2YXRlIGRheUNvbXBvbmVudDogTmd4SG1DYWxlbmRhckRheVZpZXdDb21wb25lbnQ7XHJcblxyXG4gIHByaXZhdGUgbW9udGhQb3B1cENvbXBvbmVudCA9IHRoaXMuX2ZhY3RvcnkucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICBOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudCxcclxuICApO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tb2RlbDogTmd4UnhNb2RhbFNlcnZpY2UsIHByaXZhdGUgX2ZhY3Rvcnk6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge31cclxuXHJcbiAgcHJldigpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3TW9kZSkge1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5tb250aDpcclxuICAgICAgICB0aGlzLm1vbnRoQ29tcG9uZW50LnByZXYoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBOZ3hIbUNhbGVuZGFyVmlld01vZGUud2VlazpcclxuICAgICAgICB0aGlzLndlZWtDb21wb25lbnQucHJldigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5kYXk6XHJcbiAgICAgICAgdGhpcy5kYXlDb21wb25lbnQucHJldigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3TW9kZSkge1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5tb250aDpcclxuICAgICAgICB0aGlzLm1vbnRoQ29tcG9uZW50Lm5leHQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBOZ3hIbUNhbGVuZGFyVmlld01vZGUud2VlazpcclxuICAgICAgICB0aGlzLndlZWtDb21wb25lbnQubmV4dCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIE5neEhtQ2FsZW5kYXJWaWV3TW9kZS5kYXk6XHJcbiAgICAgICAgdGhpcy5kYXlDb21wb25lbnQubmV4dCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb3BlbkV2ZW50KGV2ZW50OiBOZ3hIbUNhbGVuZGFyRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMub3Blbi5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIG9wZW5TZWxlY3RvcigkZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMuX21vZGVsXHJcbiAgICAgIC5vcGVuKHRoaXMubW9udGhQb3B1cENvbXBvbmVudCwge1xyXG4gICAgICAgIGRpc2FibGVDbG9zZUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBwYW5lbFN0eWxlOiB7XHJcbiAgICAgICAgICB0b3A6IGAkeyRldmVudC5vZmZzZXRZfXB4YCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGE6IHsgdGhlbWU6IHRoaXMuY2xhc3NOYW1lLCBjb250YWluZXJWaWV3TW9kZTogdGhpcy52aWV3TW9kZSB9LFxyXG4gICAgICB9KVxyXG4gICAgICAuc3Vic2NyaWJlKHNlbGVjdGVkRGF0ZSA9PiB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkRGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5uc3RyID0gc2VsZWN0ZWREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFuZU1vZGUobW9kZTogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnZpZXdNb2RlID0gbW9kZTtcclxuICB9XHJcblxyXG4gIGxlZ2VuZFRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubGVnZW5kT3BlbiA9IHRoaXMubGVnZW5kT3BlbiA9PT0gJ2ZseUluJyA/ICdmbHlPdXQnIDogJ2ZseUluJztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhckRheVZpZXdDb21wb25lbnQgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci1kYXktdmlldy9uZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50JztcclxuXHJcbmNvbnN0IENPTVBPTkVOVFMgPSBbTmd4SG1DYWxlbmRhckRheVZpZXdDb21wb25lbnRdO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtDT01QT05FTlRTXSxcclxuICBleHBvcnRzOiBbQ09NUE9ORU5UU10sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhckRheU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIYW1tZXJHZXN0dXJlQ29uZmlnLCBIQU1NRVJfR0VTVFVSRV9DT05GSUcgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRElSRUNUSU9OX0FMTCB9IGZyb20gJ2hhbW1lcmpzJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCB9IGZyb20gJy4vbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcvbmd4LWhtLWNhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhck1vbnRoUG9wdXBDb21wb25lbnQgfSBmcm9tICcuL25neC1obS1jYWxlbmRhci1tb250aC1wb3B1cC9uZ3gtaG0tY2FsZW5kYXItbW9udGgtcG9wdXAuY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBIYW1tZXJDb25maWcgZXh0ZW5kcyBIYW1tZXJHZXN0dXJlQ29uZmlnIHtcclxuICBvdmVycmlkZXMgPSA8YW55PntcclxuICAgIHN3aXBlOiB7IGRpcmVjdGlvbjogRElSRUNUSU9OX0FMTCB9LFxyXG4gIH07XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4SG1DYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudCwgTmd4SG1DYWxlbmRhck1vbnRoUG9wdXBDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ3hIbUNhbGVuZGFyTW9udGhWaWV3Q29tcG9uZW50XSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtOZ3hIbUNhbGVuZGFyTW9udGhQb3B1cENvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRyxcclxuICAgICAgdXNlQ2xhc3M6IEhhbW1lckNvbmZpZyxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJNb250aE1vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaG0tY2FsZW5kYXItd2Vlay12aWV3L25neC1obS1jYWxlbmRhci13ZWVrLXZpZXcuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmd4SG1DYWxlbmRhcldlZWtWaWV3Q29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJXZWVrTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neFJ4TW9kYWxNb2R1bGUgfSBmcm9tICduZ3gtcngtbW9kYWwnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRGF5TW9kdWxlIH0gZnJvbSAnLi9kYXkvbmd4LWhtLWNhbGVuZGFyLWRheS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyTW9udGhNb2R1bGUgfSBmcm9tICcuL21vbnRoL25neC1obS1jYWxlbmRhci1tb250aC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaG0tY2FsZW5kYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmd4SG1DYWxlbmRhcldlZWtNb2R1bGUgfSBmcm9tICcuL3dlZWsvbmd4LWhtLWNhbGVuZGFyLXdlZWsubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTmd4UnhNb2RhbE1vZHVsZSxcclxuICAgIE5neEhtQ2FsZW5kYXJNb250aE1vZHVsZSxcclxuICAgIE5neEhtQ2FsZW5kYXJXZWVrTW9kdWxlLFxyXG4gICAgTmd4SG1DYWxlbmRhckRheU1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05neEhtQ2FsZW5kYXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ3hIbUNhbGVuZGFyQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEhtQ2FsZW5kYXJNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBb0RFLE9BQVEsT0FBTztJQUNmLE1BQU8sTUFBTTtJQUNiLEtBQU0sS0FBSzs7Ozs7Ozs7Ozs7O0FDbkRiLFNBQWdC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