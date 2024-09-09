import { Component } from '@angular/core';
import { DialogService } from '../components/dialog/dialog.service';
import { CardFormComponent } from '../cards/card-form/card-form.component';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private dialogService: DialogService) { }

  openCardFormDialog() {
    this.dialogService.open(CardFormComponent)
  }
}
