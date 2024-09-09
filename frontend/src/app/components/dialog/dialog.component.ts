import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { DialogData } from './dialog.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, PortalModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  componentPortal: ComponentPortal<unknown>;

  constructor(@Inject(MAT_DIALOG_DATA) dialogData: DialogData) {
    this.componentPortal = new ComponentPortal(dialogData.content);
    console.log(dialogData);
  }
}
