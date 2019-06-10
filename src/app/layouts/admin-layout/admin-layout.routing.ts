import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import {ChatDialogComponent} from  '../../chat/chat-dialog/chat-dialog.component';
import { JobComponent } from '../../jobs/jobs.component';
import {RedshiftComponent} from '../../redshift/redshift.component';
import { IntromessageComponent } from '../../intromessage/intromessage.component';
import {SchedulingComponent} from '../../scheduling/scheduling.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',component: DashboardComponent },
    { path: 'chat',  component: ChatDialogComponent},
    { path: 'ngo',component: JobComponent },
    { path: 'introMessage',component: IntromessageComponent },
    { path:'scheduling', component: SchedulingComponent},
    { path: 'appointment', component: RedshiftComponent}
    ]
