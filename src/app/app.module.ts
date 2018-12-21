import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxRxModalModule } from 'ngx-rx-modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCalendarModule } from './ngx-calendar/ngx-calendar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxRxModalModule,
    NgxCalendarModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
