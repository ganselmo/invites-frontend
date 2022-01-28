import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AddInviteDialogComponent } from './components/add-invite-dialog/add-invite-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InviteComponent } from './components/invite/invite.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { InvitesService } from './services/invites.service';
import { SuccessComponent } from './components/success/success.component';
const routes: Routes = [
  {
    path: '',
    component:DashboardComponent
  },
];
@NgModule({
  declarations: [DashboardComponent, AddInviteDialogComponent, InviteComponent, SuccessComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
    

  ],
  providers:[InvitesService,DatePipe]
})
export class InvitesModule { }
