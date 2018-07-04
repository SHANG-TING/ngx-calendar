import { Component, OnInit, Input, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { CalendarEvent } from '../../@core/models';

@Component({
  selector: 'ngx-calendar-day-view',
  templateUrl: './ngx-calendar-day-view.component.html',
  styleUrls: ['./ngx-calendar-day-view.component.scss']
})
export class NgxCalendarDayViewComponent implements OnInit, AfterViewInit {

  @Input() className = 'black';
  @Input() events: CalendarEvent[] = [];
  @Input() nstr = new Date(2018, 6, 16);
  @Input() start = '10:00';
  @Input() end = '23:00';
  @Input() split = 30;

  @ViewChildren('bar') bars: QueryList<ElementRef>;

  dayEvents: any[] = [
    // {
    //   style: {
    //     top: '30px',
    //     height: '180px',
    //     background: 'yellow'
    //   },
    //   data: {}
    // }, {
    //   style: {
    //     top: '60px',
    //     height: '180px',
    //     left: '110px',
    //     background: 'blue'
    //   },
    //   data: {}
    // }, {
    //   style: {
    //     top: '30px',
    //     height: '180px',
    //     left: '220px',
    //     background: 'red'
    //   },
    //   data: {}
    // },
  ];

  hour = [
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

  constructor() { }

  ngOnInit() {
    this.setDayEvent();
  }

  ngAfterViewInit() {
    // 崇軒大神版本
    // let tempWidth = 0;
    // for (let index = 0; index < this.dayEvents.length; index++) {
    //   tempWidth = tempWidth + index * 10;
    // }

    // 灰塵版本 (僅供參考XD)
    const tempWidth = this.dayEvents.map((x, i) => i * 10).reduce((a, b) => a + b);

    if ((document.body.offsetWidth - 100) < (100 * this.dayEvents.length) + tempWidth) {

      this.bars.forEach(
        (item, index) => {
          item.nativeElement.style.width = `${(100 * this.dayEvents.length) + tempWidth}px`;
        }
      );
    }
  }

  setDayEvent() {
    const firstdate = new Date(this.nstr.getFullYear(), this.nstr.getMonth(), this.nstr.getDate());
    const lastdate = new Date(firstdate.getTime());
    lastdate.setDate(lastdate.getDate() + 1);

    const width = 30;
    const getPixelForDiffSplit = (end, start) => {
      const diffMs = (end.getTime() - start.getTime());
      return (diffMs % 86400000) / (this.split * 60 * 1000);
    };

    this.dayEvents = this.events
      .filter(e => {
        return (e.start >= firstdate && e.start < lastdate) ||
          (firstdate >= e.start && firstdate <= e.end) ||
          (firstdate >= e.start  && lastdate < e.end);
      })
      .sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
      .map((e, i) => {
        const event = {
          style: {
            top: '0px',
            height: '0px',
            left: `${i * 110}px`,
            background: e.color.toString()
          },
          data: e
        };

        if (e.start >= firstdate && e.end < lastdate) {

          //      |---------------------|
          //            |---------|

          event.style.top = `${getPixelForDiffSplit(e.start, firstdate) * width}px`;
          event.style.height = `${getPixelForDiffSplit(e.end, e.start) * width}px`;

        } else if (e.start < firstdate && (firstdate <= e.end && e.end < lastdate)) {

          //      |---------------------|
          // |----------------|

          event.style.top = `0px`;
          event.style.height = `${getPixelForDiffSplit(e.end, firstdate) * width}px`;

        } else if ((e.start >= firstdate && e.start < lastdate) && e.end >= lastdate) {

          //      |---------------------|
          //                |--------------------|

          event.style.top = `${getPixelForDiffSplit(e.start, firstdate) * width}px`;
          event.style.height = `${getPixelForDiffSplit(lastdate, e.start) * width}px`;

        } else if (e.start <= firstdate && lastdate < e.end) {

          //      |---------------------|
          // |-------------------------------|

          event.style.top = `0px`;
          event.style.height = `${24 * 2 * width}px`;
        }

        return event;
      });
  }

}
