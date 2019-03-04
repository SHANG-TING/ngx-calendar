/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren, } from '@angular/core';
import { getMutipleEvents } from '../../month/utils';
import { HOUR_SCHEMAS } from './data';
var NgxHmCalendarDayViewComponent = /** @class */ (function () {
    function NgxHmCalendarDayViewComponent() {
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
    Object.defineProperty(NgxHmCalendarDayViewComponent.prototype, "firstDate", {
        get: /**
         * @return {?}
         */
        function () {
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
         */
        function () {
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
        this.dayEvents = (_a = this.events).concat.apply(_a, tslib_1.__spread(this.weeklyEvents.map(getMutipleEvents(this.nstr.getFullYear(), this.nstr.getMonth())))).filter(function (e) {
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
            return tslib_1.__assign({}, e, { style: {
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
        { type: Component, args: [{
                    selector: 'ngx-hm-calendar-day-view',
                    template: "<div [ngClass]=\"className\"\n     class=\"content\">\n  <div class=\"title\">\n    <div class=\"hour name\"\n         *ngFor=\"let hourSchema of hourSchemas\">\n      {{ hourSchema.name }}\n    </div>\n  </div>\n  <div class=\"strip\">\n    <section *ngFor=\"let hourSchema of hourSchemas; let index = index;\"\n             class=\"hour\"\n             #bar>\n      <div class=\"line\"></div>\n      <div class=\"line\"></div>\n    </section>\n\n    <!-- events -->\n    <div *ngFor=\"let dayEvent of dayEvents\"\n         class=\"bar\"\n         [ngStyle]=\"dayEvent.style\"\n         [class.cal-starts-within-day]=\"dayEvent.startsBeforeWeek\"\n         [class.cal-ends-within-day]=\"dayEvent.endsAfterWeek\">\n      <span (click)=\"openEvent(dayEvent.data)\">\n        {{ dayEvent.data.title }}\n      </span>\n    </div>\n    <!--<div style=\"background: green;\n    height: 90px;\n    width: 100px;\n    position: absolute;\n    top: 180px;\n    left: 100px;\">\n    </div>\n    <div style=\"background: pink;\n    height: 120px;\n    width: 100px;\n    position: absolute;\n    top: 180px;left: 200px;\">\n    </div>\n    <div style=\"background: paleturquoise;\n    height: 210px;\n    width: 100px;\n    position: absolute;\n    top: 180px;left: 300px;\">\n    </div> -->\n  </div>\n</div>\n",
                    styles: [":host{display:block;overflow-y:scroll;max-height:85vh}.black .hour .line{border-bottom:thin dashed #888f90}.black .hour .line:hover{background:wheat}.black .hour.name{color:#fff}.black .hour:nth-child(odd){background:#6f6e6e}.white .hour .line{border-bottom:thin dashed #000}.white .hour .line:hover{background:wheat}.white .hour:nth-child(odd){background:#fbeeee}.content{display:flex;margin-bottom:30px}.content .title{width:100px;flex:0 0 100px}.content .strip{position:relative;width:100%}.content .hour{height:60px}.content .hour.name{line-height:60px;text-align:center}.content .hour .line{height:30px;display:flex}.content .hour .line .active{width:100px;height:100%;flex:0 0 100px;box-sizing:content-box;z-index:1}.bar{border:1px solid #1e90ff;width:100px;position:absolute;color:#fff;padding:5px}.bar.cal-starts-within-day{border-top-left-radius:5px;border-top-right-radius:5px}.bar.cal-ends-within-day{border-bottom-left-radius:5px;border-bottom-right-radius:5px}"]
                }] }
    ];
    /** @nocollapse */
    NgxHmCalendarDayViewComponent.ctorParameters = function () { return []; };
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
    return NgxHmCalendarDayViewComponent;
}());
export { NgxHmCalendarDayViewComponent };
if (false) {
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.className;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.weeklyEvents;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.events;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.nstr;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.start;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.end;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.split;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.open;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.elmWidth;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.bars;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.dayEvents;
    /** @type {?} */
    NgxHmCalendarDayViewComponent.prototype.hourSchemas;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWhtLWNhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1obS1jYWxlbmRhci8iLCJzb3VyY2VzIjpbImxpYi9kYXkvbmd4LWhtLWNhbGVuZGFyLWRheS12aWV3L25neC1obS1jYWxlbmRhci1kYXktdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFFVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUV0QztJQTRIRTtRQXRFQSxjQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXBCLGlCQUFZLEdBQXlCLEVBQUUsQ0FBQztRQUV4QyxXQUFNLEdBQXlCLEVBQUUsQ0FBQztRQUVsQyxTQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU3QixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBRWhCLFFBQUcsR0FBRyxPQUFPLENBQUM7UUFFZCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsU0FBSSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTdDLGFBQVEsR0FBRyxHQUFHLENBQUM7UUFpRGYsY0FBUyxHQUFxQyxFQUFFLENBQUM7UUFFakQsZ0JBQVcsR0FBVSxZQUFZLENBQUM7SUFFbEIsQ0FBQztJQWpEakIsc0JBQUksb0RBQVM7Ozs7UUFBYjs7Z0JBQ1EsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9B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QWlEOztJQUVqRCxvREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0NoaWxkcmVuLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBnZXRNdXRpcGxlRXZlbnRzIH0gZnJvbSAnLi4vLi4vbW9udGgvdXRpbHMnO1xyXG5pbXBvcnQgeyBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsLCBOZ3hIbUNhbGVuZGFyRXZlbnQgfSBmcm9tICcuLi8uLi9uZ3gtaG0tY2FsZW5kYXIubW9kZWwnO1xyXG5pbXBvcnQgeyBIT1VSX1NDSEVNQVMgfSBmcm9tICcuL2RhdGEnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtaG0tY2FsZW5kYXItZGF5LXZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdDbGFzc109XCJjbGFzc05hbWVcIlxyXG4gICAgIGNsYXNzPVwiY29udGVudFwiPlxyXG4gIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImhvdXIgbmFtZVwiXHJcbiAgICAgICAgICpuZ0Zvcj1cImxldCBob3VyU2NoZW1hIG9mIGhvdXJTY2hlbWFzXCI+XHJcbiAgICAgIHt7IGhvdXJTY2hlbWEubmFtZSB9fVxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInN0cmlwXCI+XHJcbiAgICA8c2VjdGlvbiAqbmdGb3I9XCJsZXQgaG91clNjaGVtYSBvZiBob3VyU2NoZW1hczsgbGV0IGluZGV4ID0gaW5kZXg7XCJcclxuICAgICAgICAgICAgIGNsYXNzPVwiaG91clwiXHJcbiAgICAgICAgICAgICAjYmFyPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibGluZVwiPjwvZGl2PlxyXG4gICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDwhLS0gZXZlbnRzIC0tPlxyXG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgZGF5RXZlbnQgb2YgZGF5RXZlbnRzXCJcclxuICAgICAgICAgY2xhc3M9XCJiYXJcIlxyXG4gICAgICAgICBbbmdTdHlsZV09XCJkYXlFdmVudC5zdHlsZVwiXHJcbiAgICAgICAgIFtjbGFzcy5jYWwtc3RhcnRzLXdpdGhpbi1kYXldPVwiZGF5RXZlbnQuc3RhcnRzQmVmb3JlV2Vla1wiXHJcbiAgICAgICAgIFtjbGFzcy5jYWwtZW5kcy13aXRoaW4tZGF5XT1cImRheUV2ZW50LmVuZHNBZnRlcldlZWtcIj5cclxuICAgICAgPHNwYW4gKGNsaWNrKT1cIm9wZW5FdmVudChkYXlFdmVudC5kYXRhKVwiPlxyXG4gICAgICAgIHt7IGRheUV2ZW50LmRhdGEudGl0bGUgfX1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6IGdyZWVuO1xyXG4gICAgaGVpZ2h0OiA5MHB4O1xyXG4gICAgd2lkdGg6IDEwMHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAxODBweDtcclxuICAgIGxlZnQ6IDEwMHB4O1wiPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogcGluaztcclxuICAgIGhlaWdodDogMTIwcHg7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDE4MHB4O2xlZnQ6IDIwMHB4O1wiPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogcGFsZXR1cnF1b2lzZTtcclxuICAgIGhlaWdodDogMjEwcHg7XHJcbiAgICB3aWR0aDogMTAwcHg7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDE4MHB4O2xlZnQ6IDMwMHB4O1wiPlxyXG4gICAgPC9kaXY+IC0tPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgOmhvc3R7ZGlzcGxheTpibG9jaztvdmVyZmxvdy15OnNjcm9sbDttYXgtaGVpZ2h0Ojg1dmh9LmJsYWNrIC5ob3VyIC5saW5le2JvcmRlci1ib3R0b206dGhpbiBkYXNoZWQgIzg4OGY5MH0uYmxhY2sgLmhvdXIgLmxpbmU6aG92ZXJ7YmFja2dyb3VuZDp3aGVhdH0uYmxhY2sgLmhvdXIubmFtZXtjb2xvcjojZmZmfS5ibGFjayAuaG91cjpudGgtY2hpbGQob2RkKXtiYWNrZ3JvdW5kOiM2ZjZlNmV9LndoaXRlIC5ob3VyIC5saW5le2JvcmRlci1ib3R0b206dGhpbiBkYXNoZWQgIzAwMH0ud2hpdGUgLmhvdXIgLmxpbmU6aG92ZXJ7YmFja2dyb3VuZDp3aGVhdH0ud2hpdGUgLmhvdXI6bnRoLWNoaWxkKG9kZCl7YmFja2dyb3VuZDojZmJlZWVlfS5jb250ZW50e2Rpc3BsYXk6ZmxleDttYXJnaW4tYm90dG9tOjMwcHh9LmNvbnRlbnQgLnRpdGxle3dpZHRoOjEwMHB4O2ZsZXg6MCAwIDEwMHB4fS5jb250ZW50IC5zdHJpcHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlfS5jb250ZW50IC5ob3Vye2hlaWdodDo2MHB4fS5jb250ZW50IC5ob3VyLm5hbWV7bGluZS1oZWlnaHQ6NjBweDt0ZXh0LWFsaWduOmNlbnRlcn0uY29udGVudCAuaG91ciAubGluZXtoZWlnaHQ6MzBweDtkaXNwbGF5OmZsZXh9LmNvbnRlbnQgLmhvdXIgLmxpbmUgLmFjdGl2ZXt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwJTtmbGV4OjAgMCAxMDBweDtib3gtc2l6aW5nOmNvbnRlbnQtYm94O3otaW5kZXg6MX0uYmFye2JvcmRlcjoxcHggc29saWQgIzFlOTBmZjt3aWR0aDoxMDBweDtwb3NpdGlvbjphYnNvbHV0ZTtjb2xvcjojZmZmO3BhZGRpbmc6NXB4fS5iYXIuY2FsLXN0YXJ0cy13aXRoaW4tZGF5e2JvcmRlci10b3AtbGVmdC1yYWRpdXM6NXB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjVweH0uYmFyLmNhbC1lbmRzLXdpdGhpbi1kYXl7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czo1cHg7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NXB4fWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SG1DYWxlbmRhckRheVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgY2xhc3NOYW1lID0gJ2JsYWNrJztcclxuICBASW5wdXQoKVxyXG4gIHdlZWtseUV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIGV2ZW50czogTmd4SG1DYWxlbmRhckV2ZW50W10gPSBbXTtcclxuICBASW5wdXQoKVxyXG4gIG5zdHIgPSBuZXcgRGF0ZSgyMDE4LCA2LCAxNik7XHJcbiAgQElucHV0KClcclxuICBzdGFydCA9ICcwMDowMCc7XHJcbiAgQElucHV0KClcclxuICBlbmQgPSAnMjQ6MDAnO1xyXG4gIEBJbnB1dCgpXHJcbiAgc3BsaXQgPSAzMDtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb3BlbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGVsbVdpZHRoID0gMTEwO1xyXG5cclxuICBAVmlld0NoaWxkcmVuKCdiYXInKSBiYXJzOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XHJcblxyXG4gIGdldCBmaXJzdERhdGUoKSB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGhpcy5uc3RyLmdldEZ1bGxZZWFyKCksIHRoaXMubnN0ci5nZXRNb250aCgpLCB0aGlzLm5zdHIuZ2V0RGF0ZSgpKTtcclxuICAgIGNvbnN0IHRpbWUgPSB0aGlzLnN0YXJ0LnNwbGl0KCc6Jyk7XHJcblxyXG4gICAgaWYgKHRpbWUubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBob3VyID0gTnVtYmVyKHRpbWVbMF0pO1xyXG4gICAgICBjb25zdCBtaW51dGUgPSBOdW1iZXIodGltZVsxXSk7XHJcblxyXG4gICAgICBpZiAoaG91ciArIDEpIHtcclxuICAgICAgICBkYXRlLnNldEhvdXJzKGhvdXIpO1xyXG5cclxuICAgICAgICBpZiAobWludXRlICsgMSkge1xyXG4gICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXQgbGFzdERhdGUoKSB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGhpcy5uc3RyLmdldEZ1bGxZZWFyKCksIHRoaXMubnN0ci5nZXRNb250aCgpLCB0aGlzLm5zdHIuZ2V0RGF0ZSgpKTtcclxuICAgIGNvbnN0IHRpbWUgPSB0aGlzLmVuZC5zcGxpdCgnOicpO1xyXG5cclxuICAgIGlmICh0aW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgaG91ciA9IE51bWJlcih0aW1lWzBdKTtcclxuICAgICAgY29uc3QgbWludXRlID0gTnVtYmVyKHRpbWVbMV0pO1xyXG5cclxuICAgICAgaWYgKGhvdXIpIHtcclxuICAgICAgICBkYXRlLnNldEhvdXJzKGhvdXIpO1xyXG5cclxuICAgICAgICBpZiAobWludXRlKSB7XHJcbiAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMobWludXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoTnVtYmVyKGRhdGUpIC0gTnVtYmVyKHRoaXMuZmlyc3REYXRlKSA8PSAwKSB7XHJcbiAgICAgIGRhdGUuc2V0SG91cnMoMjQpO1xyXG4gICAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGU7XHJcbiAgfVxyXG5cclxuICBkYXlFdmVudHM6IE5neEhtQ2FsZW5kYXJFbG1EZXRpYWw8c3RyaW5nPltdID0gW107XHJcblxyXG4gIGhvdXJTY2hlbWFzOiBhbnlbXSA9IEhPVVJfU0NIRU1BUztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pbml0VmlldygpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFZpZXcoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldEhvdXJTY2hlbWFzKCk7XHJcbiAgICB0aGlzLnNldERheUV2ZW50KCk7XHJcbiAgICB0aGlzLmJpbmREYXlFdmVudFdpZHRoKCk7XHJcbiAgfVxyXG5cclxuICBzZXRIb3VyU2NoZW1hcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRpZmZNcyA9IE51bWJlcih0aGlzLmxhc3REYXRlKSAtIE51bWJlcih0aGlzLmZpcnN0RGF0ZSk7XHJcbiAgICBjb25zdCBkaWZmSHJzID0gTWF0aC5jZWlsKGRpZmZNcyAvIDM2MDAwMDApOyAvLyBob3Vyc1xyXG4gICAgLy8gY29uc3QgZGlmZk1pbnMgPSBNYXRoLnJvdW5kKCgoZGlmZk1zICUgODY0MDAwMDApICUgMzYwMDAwMCkgLyA2MDAwMCk7IC8vIG1pbnV0ZXNcclxuICAgIGNvbnN0IGZpcnN0SG91ciA9IHRoaXMuZmlyc3REYXRlLmdldEhvdXJzKCk7XHJcblxyXG4gICAgdGhpcy5ob3VyU2NoZW1hcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSBmaXJzdEhvdXI7IGkgPCBmaXJzdEhvdXIgKyBkaWZmSHJzOyBpKyspIHtcclxuICAgICAgdGhpcy5ob3VyU2NoZW1hcy5wdXNoKHtcclxuICAgICAgICBuYW1lOiBgJHsoJzAnICsgaSkuc3Vic3RyKC0yKX0gJHtpID4gMTIgPyAnUE0nIDogJ0FNJ31gLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldERheUV2ZW50KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgd2lkdGggPSAzMDtcclxuICAgIGNvbnN0IGZpcnN0ZGF0ZSA9IHRoaXMuZmlyc3REYXRlO1xyXG4gICAgY29uc3QgbGFzdGRhdGUgPSB0aGlzLmxhc3REYXRlO1xyXG4gICAgY29uc3QgZ2V0UGl4ZWxGb3JEaWZmU3BsaXQgPSAoZW5kLCBzdGFydCkgPT4ge1xyXG4gICAgICBjb25zdCBkaWZmTXMgPSBlbmQuZ2V0VGltZSgpIC0gc3RhcnQuZ2V0VGltZSgpO1xyXG4gICAgICByZXR1cm4gKGRpZmZNcyAlIDg2NDAwMDAwKSAvICh0aGlzLnNwbGl0ICogNjAgKiAxMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kYXlFdmVudHMgPSB0aGlzLmV2ZW50c1xyXG4gICAgICAuY29uY2F0KFxyXG4gICAgICAgIC4uLnRoaXMud2Vla2x5RXZlbnRzLm1hcChnZXRNdXRpcGxlRXZlbnRzKHRoaXMubnN0ci5nZXRGdWxsWWVhcigpLCB0aGlzLm5zdHIuZ2V0TW9udGgoKSkpLFxyXG4gICAgICApXHJcbiAgICAgIC8vIOWFiOmBjua/vuWHuuacg+e2k+mBjumAmeS4gOWkqeeahOS6i+S7tuWAkVxyXG4gICAgICAuZmlsdGVyKChlOiBOZ3hIbUNhbGVuZGFyRXZlbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgKGUuc3RhcnQgPj0gZmlyc3RkYXRlICYmIGUuc3RhcnQgPCBsYXN0ZGF0ZSkgfHxcclxuICAgICAgICAgIChmaXJzdGRhdGUgPj0gZS5zdGFydCAmJiBmaXJzdGRhdGUgPD0gZS5lbmQpIHx8XHJcbiAgICAgICAgICAoZmlyc3RkYXRlID49IGUuc3RhcnQgJiYgbGFzdGRhdGUgPCBlLmVuZClcclxuICAgICAgICApO1xyXG4gICAgICB9KVxyXG4gICAgICAvLyDmoLnmk5rplovlp4vmmYLplpPlgZrmjpLluo9cclxuICAgICAgLnNvcnQoKGUxOiBOZ3hIbUNhbGVuZGFyRXZlbnQsIGUyOiBOZ3hIbUNhbGVuZGFyRXZlbnQpID0+IGUxLnN0YXJ0LmdldFRpbWUoKSAtIGUyLnN0YXJ0LmdldFRpbWUoKSlcclxuICAgICAgLy8g6L2J5o+b54K655Wr6Z2i5LiK6ZyA6KaB57aB5a6a55qE5YC8XHJcbiAgICAgIC5tYXAoKGU6IE5neEhtQ2FsZW5kYXJFdmVudCwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWxtRGV0aWFsOiBOZ3hIbUNhbGVuZGFyRWxtRGV0aWFsID0ge1xyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICAgIGxlZnQ6IGkgKiB0aGlzLmVsbVdpZHRoLFxyXG4gICAgICAgICAgICAvLyBiYWNrZ3JvdW5kOiBlLmNvbG9yLnRvU3RyaW5nKClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdGFydHNCZWZvcmVXZWVrOiB0cnVlLFxyXG4gICAgICAgICAgZW5kc0FmdGVyV2VlazogdHJ1ZSxcclxuICAgICAgICAgIGRhdGE6IGUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBpZiBldmVudCBmaXJzdCBkYXRlIGlzIGJpZ2dlciB0aGFuIGZpcnN0ZGF0ZVxyXG4gICAgICAgIGlmIChlLnN0YXJ0ID49IGZpcnN0ZGF0ZSkge1xyXG4gICAgICAgICAgaWYgKGUuZW5kIDwgbGFzdGRhdGUpIHtcclxuICAgICAgICAgICAgLy8gICAgICB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHwtLS0tLS0tLS18XHJcblxyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3R5bGUudG9wID0gZ2V0UGl4ZWxGb3JEaWZmU3BsaXQoZS5zdGFydCwgZmlyc3RkYXRlKSAqIHdpZHRoO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3R5bGUuaGVpZ2h0ID0gZ2V0UGl4ZWxGb3JEaWZmU3BsaXQoZS5lbmQsIGUuc3RhcnQpICogd2lkdGg7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGUuc3RhcnQgPCBsYXN0ZGF0ZSAmJiBlLmVuZCA+PSBsYXN0ZGF0ZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLXxcclxuXHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS50b3AgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChlLnN0YXJ0LCBmaXJzdGRhdGUpICogd2lkdGg7XHJcbiAgICAgICAgICAgIGVsbURldGlhbC5zdHlsZS5oZWlnaHQgPSBnZXRQaXhlbEZvckRpZmZTcGxpdChsYXN0ZGF0ZSwgZS5zdGFydCkgKiB3aWR0aDtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLmVuZHNBZnRlcldlZWsgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGUuc3RhcnQgPD0gZmlyc3RkYXRlKSB7XHJcbiAgICAgICAgICAvLyBpZiBldmVudCBmaXJzdCBkYXRlIGlzIGJpZ2dlciB0aGFuIGZpcnN0ZGF0ZVxyXG4gICAgICAgICAgaWYgKGxhc3RkYXRlIDwgZS5lbmQpIHtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0eWxlLmhlaWdodCA9IHRoaXMuaG91clNjaGVtYXMubGVuZ3RoICogMiAqIHdpZHRoO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3RhcnRzQmVmb3JlV2VlayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuZW5kc0FmdGVyV2VlayA9IGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChmaXJzdGRhdGUgPD0gZS5lbmQgJiYgZS5lbmQgPCBsYXN0ZGF0ZSkge1xyXG4gICAgICAgICAgICBlbG1EZXRpYWwuc3R5bGUuaGVpZ2h0ID0gZ2V0UGl4ZWxGb3JEaWZmU3BsaXQoZS5lbmQsIGZpcnN0ZGF0ZSkgKiB3aWR0aDtcclxuICAgICAgICAgICAgZWxtRGV0aWFsLnN0YXJ0c0JlZm9yZVdlZWsgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbG1EZXRpYWw7XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIOWGjeasoemBjua/vuWHuuWcqOmAmWhvdXLljYDplpPoo6HpnaLnmoTkuovku7blgJFcclxuICAgICAgLmZpbHRlcigoZTogTmd4SG1DYWxlbmRhckVsbURldGlhbCkgPT4gZS5zdHlsZS5oZWlnaHQgIT09IDApXHJcbiAgICAgIC8vIOmHjeaWsOe2geWummxlZnTnmoTpoIbluo9cclxuICAgICAgLm1hcCgoZTogTmd4SG1DYWxlbmRhckVsbURldGlhbCwgaSkgPT4ge1xyXG4gICAgICAgIGUuc3R5bGUubGVmdCA9IGkgKiB0aGlzLmVsbVdpZHRoO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAuLi5lLFxyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgdG9wOiBgJHtlLnN0eWxlLnRvcH1weGAsXHJcbiAgICAgICAgICAgIGhlaWdodDogYCR7ZS5zdHlsZS5oZWlnaHR9cHhgLFxyXG4gICAgICAgICAgICBsZWZ0OiBgJHtlLnN0eWxlLmxlZnR9cHhgLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBgJHtlLmRhdGEuY29sb3J9YCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBiaW5kRGF5RXZlbnRXaWR0aCgpOiB2b2lkIHtcclxuICAgIC8vIOW0h+i7kuWkp+elnueJiOacrFxyXG4gICAgLy8gbGV0IHRlbXBXaWR0aCA9IDA7XHJcbiAgICAvLyBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5kYXlFdmVudHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAvLyAgIHRlbXBXaWR0aCA9IHRlbXBXaWR0aCArIGluZGV4ICogMTA7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIC8vIOeBsOWhteeJiOacrCAo5YOF5L6b5Y+D6ICDWEQpXHJcbiAgICAgIGNvbnN0IHRlbXBXaWR0aCA9IHRoaXMuZGF5RXZlbnRzLmxlbmd0aFxyXG4gICAgICAgID8gdGhpcy5kYXlFdmVudHMubWFwKCh4LCBpKSA9PiBpICogMTApLnJlZHVjZSgoYSwgYikgPT4gYSArIGIpXHJcbiAgICAgICAgOiAwO1xyXG5cclxuICAgICAgaWYgKGRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLSAxMDAgPCAxMDAgKiB0aGlzLmRheUV2ZW50cy5sZW5ndGggKyB0ZW1wV2lkdGgpIHtcclxuICAgICAgICB0aGlzLmJhcnMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgIGl0ZW0ubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IGAkezEwMCAqIHRoaXMuZGF5RXZlbnRzLmxlbmd0aCArIHRlbXBXaWR0aH1weGA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgcHJldigpOiB2b2lkIHtcclxuICAgIHRoaXMubnN0ci5zZXREYXRlKHRoaXMubnN0ci5nZXREYXRlKCkgLSAxKTtcclxuICAgIHRoaXMuaW5pdFZpZXcoKTtcclxuICB9XHJcblxyXG4gIG5leHQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5zdHIuc2V0RGF0ZSh0aGlzLm5zdHIuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgfVxyXG5cclxuICBvcGVuRXZlbnQoZXZlbnQpOiB2b2lkIHtcclxuICAgIHRoaXMub3Blbi5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLm5zdHIgfHwgY2hhbmdlcy5zdGFydCB8fCBjaGFuZ2VzLmVuZCkge1xyXG4gICAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==