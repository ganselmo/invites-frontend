import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInviteDialogComponent } from './add-invite-dialog.component';

describe('AddInviteDialogComponent', () => {
  let component: AddInviteDialogComponent;
  let fixture: ComponentFixture<AddInviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInviteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
