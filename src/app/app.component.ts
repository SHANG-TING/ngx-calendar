import { Component } from '@angular/core';
import { CalendarEvent, colors } from './ngx-calendar/@core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  events: CalendarEvent[] = [
    {
      title: '上班(5月第一個禮拜)',
      start: new Date(2018, 3, 30),
      end: new Date(2018, 4, 3),
      color: colors.orange
    } as CalendarEvent,
    {
      title: '上班(5月第二個禮拜)',
      start: new Date(2018, 4, 7),
      end: new Date(2018, 4, 11),
      color: colors.orange
    } as CalendarEvent,
    {
      title: '下午打慢速壘球比賽',
      start: new Date(2018, 4, 12),
      color: colors.blue
    } as CalendarEvent,
    {
      title: '早上9點和丞恩去威秀影城看復仇者聯盟3',
      start: new Date(2018, 3, 29),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 4, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 6, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: '晚上和銘峰還有丞恩一起去吃台北橋的披薩',
      start: new Date(2018, 6, 9),
      color: colors.yellow
    } as CalendarEvent,
    {
      title: 'Angular線上讀書會',
      start: new Date(2018, 4, 8),
      color: colors.green
    } as CalendarEvent,
    {
      title: '和有舜去澎湖參加100km自行車挑戰賽',
      start: new Date(2018, 4, 3),
      end: new Date(2018, 4, 6),
      color: colors.green
    } as CalendarEvent
  ];

  onOpenEvent($event) {
    alert(JSON.stringify($event));
  }
}
