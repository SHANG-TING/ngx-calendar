import { Component, OnInit, Input, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ngx-calendar-day-view',
  templateUrl: './ngx-calendar-day-view.component.html',
  styleUrls: ['./ngx-calendar-day-view.component.scss']
})
export class NgxCalendarDayViewComponent implements OnInit, AfterViewInit {

  @ViewChildren('bar') bars: QueryList<ElementRef>;

  @Input() className = 'black';

  data = [
    {
      style: {
        top: '30px',
        height: '180px',
        background: 'yellow'
      }
    }, {
      style: {
        top: '60px',
        height: '180px',
        left: '110px',
        background: 'blue'
      }
    }, {
      style: {
        top: '30px',
        height: '180px',
        left: '220px',
        background: 'red'
      }
    },
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

  ngAfterViewInit() {
    let tempWidth = 0;
    for (let index = 0; index < this.data.length; index++) {
      tempWidth = tempWidth + index * 10;
    }

    if ((document.body.offsetWidth - 100) < (100 * this.data.length) + tempWidth) {

      this.bars.forEach(
        (item, index) => {
          item.nativeElement.style.width = `${(100 * this.data.length) + tempWidth}px`;
        }
      );

    }

  }

  ngOnInit() {
  }

}
