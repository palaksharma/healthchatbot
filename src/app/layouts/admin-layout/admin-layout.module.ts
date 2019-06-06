import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {ChatDialogComponent} from  '../../chat/chat-dialog/chat-dialog.component';
import { JobComponent } from '../../jobs/jobs.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import {MatNativeDateModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import { RedshiftComponent } from 'app/redshift/redshift.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import { IntromessageComponent } from '../../intromessage/intromessage.component'
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import {SchedulingComponent} from '../../scheduling/scheduling.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFileUploaderModule } from "angular-file-uploader";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    ChartsModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatTableModule,
    MatGridListModule,
    MatTabsModule,
    MatTabsModule,
    MatIconModule,
    Ng2GoogleChartsModule,
    ModalModule.forRoot(),
    AngularFileUploaderModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    DashboardComponent,
    ChatDialogComponent,
    IntromessageComponent,
    SchedulingComponent,
    JobComponent,
    RedshiftComponent
  ]
})

export class AdminLayoutModule {}
