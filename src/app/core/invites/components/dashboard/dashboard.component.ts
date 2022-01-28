
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddInviteDialogComponent } from '../add-invite-dialog/add-invite-dialog.component';
import { Invite } from '../../models/Invite.model';
import { InvitesService } from '../../services/invites.service';
import { BehaviorSubject } from 'rxjs';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  unconfirmed :{id:number,invite:Invite}[];
  confirmed:{id:number,invite:Invite}[];

  constructor(public dialog: MatDialog,public inviteService:InvitesService) {
   
  }

  ngOnInit(): void {
    this.inviteService.getUnconfirmed().subscribe(
      (data)=>this.unconfirmed = data
    );
    this.inviteService.getConfirmed().subscribe(
      (data)=>this.confirmed = data
    );
  }

  drop(event: CdkDragDrop<{id:number,invite:Invite}[]>): void {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addInvite(): void{
    this.dialog.open(AddInviteDialogComponent);

  }

  saveInvites(): void{
    if(this.confirmed.length===0)
    {
      return
    }
    this.inviteService.saveInvites().subscribe(
      ()=> this.successDialog()
    )


  }

  successDialog(): void{
  
      const dialogRef = this.dialog.open(SuccessComponent);
  
      dialogRef.afterClosed().subscribe(() => {
        this.inviteService.clean();
      });
  }
}