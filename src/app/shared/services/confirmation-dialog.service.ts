import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ title }}</h2>
    <mat-dialog-content>{{ message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="onYes()" cdkFocusInitial>Sim</button>
      <button matButton (click)="onNo()">Não</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef)
  data = inject(MAT_DIALOG_DATA)

  title = this.data?.title
  message = this.data?.message

  onNo() {
    this.matDialogRef.close(false)
  }

  onYes() {
    this.matDialogRef.close(true)
  }
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog)

  openDialog(options?: { title?: string, message?: string }): Observable<boolean> {
    return this.matDialog
      .open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: options?.title,
          message: options?.message,
        }
      })
      .afterClosed()
  }
}
