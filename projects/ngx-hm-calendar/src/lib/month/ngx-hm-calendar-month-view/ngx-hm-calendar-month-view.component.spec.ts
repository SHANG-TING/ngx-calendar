import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { getCalendar, is_leap } from '../utils';
import { NgxHmCalendarMonthViewComponent } from './ngx-hm-calendar-month-view.component';

describe('NgxHmCalendarMonthViewComponent', () => {
  let component: NgxHmCalendarMonthViewComponent;
  let fixture: ComponentFixture<NgxHmCalendarMonthViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxHmCalendarMonthViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHmCalendarMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('utils #is_leap', () => {
    expect(is_leap(2020)).toBe(1);
  });

  it('utils #getCalendar week length', () => {
    const event = {
      start: new Date(2019, 1, 28),
      end: new Date(2019, 1, 28),
      title: 'www',
      color: 'red',
    };
    const calendar = getCalendar(2019, 1, [event]);
    expect(calendar[4].days[4].events[0]).toBe(event);
  });
});
