
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invite } from '../../models/Invite.model';
import { InvitesService } from '../../services/invites.service';

@Component({
  selector: 'app-add-invite-dialog',
  templateUrl: './add-invite-dialog.component.html',
  styleUrls: ['./add-invite-dialog.component.scss']
})
export class AddInviteDialogComponent implements OnInit {

  private invite: Invite;
  private id:number;
  edit: boolean = false;
  inviteForm: FormGroup;
  constructor(
    public inviteService: InvitesService,
    public dialogRef: MatDialogRef<AddInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    if (data) {
      this.edit = true;
      this.invite = data.invite;
      this.id = data.id;
    }



    this.inviteForm = new FormGroup({
      name: new FormControl(this.invite?.name, Validators.required),
      last_name: new FormControl(this.invite?.last_name, Validators.required),
      dni: new FormControl(this.invite?.dni, [Validators.required, Validators.min(0), Validators.max(99999999), Validators.pattern("^[0-9]*$"),]),
      direction: new FormControl(this.invite?.direction, Validators.required),
      birthdate: new FormControl(this.invite?.birthdate, Validators.required),
    });
  }



  ngOnInit(): void {
  }


  close(): void{
    this.dialogRef.close()
  }
  save(): void{
  
    if (this.inviteForm.invalid) {
      return;
    }
    const invite: Invite = {
      name: this.inviteForm.controls["name"].value,
      last_name: this.inviteForm.controls["last_name"].value,
      dni: this.inviteForm.controls["dni"].value,
      direction: this.inviteForm.controls["direction"].value,
      birthdate: this.inviteForm.controls["birthdate"].value
    }
    if (this.edit) { 
      this.inviteService.updateInvite(this.id,invite)
    }
    else{
      this.inviteService.addInvite(invite)
    }


    this.dialogRef.close()
  }
}
