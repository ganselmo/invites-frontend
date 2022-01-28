import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Invite } from '../../models/Invite.model';
import { InvitesService } from '../../services/invites.service';
import { AddInviteDialogComponent } from '../add-invite-dialog/add-invite-dialog.component';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  @Input() inviteLine: { id: number, invite: Invite }

  @Input() unconfirmed: boolean;
  constructor(public dialog: MatDialog,public inviteService:InvitesService) { }

  ngOnInit(): void {
  }

  edit(): void {
    this.dialog.open(AddInviteDialogComponent, { data: this.inviteLine });
  }

  delete(): void {
    this.inviteService.deleteInvite(this.inviteLine.id)
  }



}
