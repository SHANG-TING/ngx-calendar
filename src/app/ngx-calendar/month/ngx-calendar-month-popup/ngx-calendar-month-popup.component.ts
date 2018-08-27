import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { getCalendar } from '../utils';
import { NgxRxModalRef, NGX_RX_MODAL_TOKEN } from 'ngx-rx-modal';
import { CalendarViewMode } from '../../ngx-calendar.model';

export enum CalendarSelectorMode {
  Year = 'Year', Month = 'Month', Day = 'Day'
}

export interface CalendarSelectorData {
  theme?: string;
  containerViewMode?: CalendarViewMode;
}

@Component({
  selector: 'ngx-calendar-month-popup',
  templateUrl: './ngx-calendar-month-popup.component.html',
  styleUrls: ['./ngx-calendar-month-popup.component.scss']
})
export class NgxCalendarMonthPopupComponent implements OnInit, NgxRxModalRef {
  popupData: CalendarSelectorData = {};
  mode = CalendarSelectorMode.Year;
  minYear = 2016;
  selectedYear: number;
  selectedMonth: number;
  selectedDate: Date;
  calendarData: any;
  months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  get years() {
    return Array.from({ length: 24 }, (v, k) => k + this.minYear);
  }

  public complete = new Subject();
  constructor(@Inject(NGX_RX_MODAL_TOKEN) private data) {
    this.popupData = data;
  }

  ngOnInit() {
  }

  prevYearRange() {
    this.minYear = this.minYear - 24;
  }

  nextYearRange() {
    this.minYear = this.minYear + 24;
  }

  selectYear(year) {
    this.selectedYear = year;
    this.mode = CalendarSelectorMode.Month;
  }

  selectMonth(month) {
    this.selectedMonth = month;

    if (this.popupData.containerViewMode === CalendarViewMode.day) {
      this.mode = CalendarSelectorMode.Day;
      this.calendarData = getCalendar(new Date(this.selectedYear, this.selectedMonth, 1),
        this.selectedYear, this.selectedMonth, 1, []);
    } else {
      this.complete.next(new Date(this.selectedYear, this.selectedMonth, 1));
    }
  }

  selectDay(day) {
    this.complete.next(day);
  }

  backToYearSelector() {
    this.mode = CalendarSelectorMode.Year;
  }

  backToMonthSelector() {
    this.mode = CalendarSelectorMode.Month;
  }

}
