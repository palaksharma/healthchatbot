import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


import { AppSharedService } from './services/app-shared.service';
import { DataService } from './services/data.service';
import { LoginComponent } from 'app/login/login.component';
import { ParticlesModule } from 'angular-particle';
import {ChatService} from './chat.service';
import {SpeechRecognitionService} from './speech_recognition.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    MatProgressBarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    ParticlesModule,
    Ng2GoogleChartsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent

  ],
  providers: [
    DataService,
    ChatService,
    SpeechRecognitionService,
    AppSharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
