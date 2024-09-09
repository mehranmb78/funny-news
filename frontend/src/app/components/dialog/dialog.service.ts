import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { DialogData } from './dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  open(content: ComponentType<unknown>): MatDialogRef<DialogComponent> {
    return this.dialog.open(DialogComponent, {
      data: {
        content,
      },
      width: '750px',
    });
  }
}
