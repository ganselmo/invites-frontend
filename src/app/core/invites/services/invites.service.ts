import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invite } from '../models/Invite.model';

@Injectable({
  providedIn: 'root'
})
export class InvitesService {


  nextId: number = 0;
  unconfirmed: BehaviorSubject<{ id: number, invite: Invite }[]>;
  confirmed: BehaviorSubject<{ id: number, invite: Invite }[]>;

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private datePipe:DatePipe) {

    this.unconfirmed = new BehaviorSubject<{ id: number, invite: Invite }[]>([]);
    this.confirmed = new BehaviorSubject<{ id: number, invite: Invite }[]>([]);
  }

  getUnconfirmed(): BehaviorSubject<{ id: number, invite: Invite }[]> {
    return this.unconfirmed;
  }

  getConfirmed(): BehaviorSubject<{ id: number, invite: Invite }[]> {
    return this.confirmed;
  }

  addInvite(invite: Invite): void {
    this.unconfirmed.next([...this.unconfirmed.value, { id: this.getNextId(), invite }])
  }
  updateInvite(id: number, invite: Invite): void {

    let values = this.unconfirmed.value;
    let inviteUpdate = values.find((data) => data.id == id)

    if (inviteUpdate) {
      inviteUpdate.invite = invite;
      this.unconfirmed.next([...values])

      return
    }

  }

  deleteInvite(id: number): void{
    let values = this.unconfirmed.value;
    let filtered = values.filter((data) => data.id != id)
    this.unconfirmed.next(filtered);
  }
  getNextId():number{
    this.nextId++
    return this.nextId;
  }
  clean(){
    this.confirmed.next([])
  }

  saveInvites():Observable<any> {
  
    const toSend = this.confirmed.value.map(data => {

      let date = data.invite.birthdate
      let newdate = this.datePipe.transform(date, 'yyyy-MM-dd');
      
      return {
        ...data.invite,
        birthdate:newdate
      }
    });
    return this.http.post<any>(this.apiUrl+"/invites", toSend)
    .pipe(
      catchError(async (error)=>console.error("error",error))
    );

  }



}
