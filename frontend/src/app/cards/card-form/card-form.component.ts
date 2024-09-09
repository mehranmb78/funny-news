import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
})
export class CardFormComponent {
  form = this.nonNullableFormBuilder.group({
    title: this.nonNullableFormBuilder.control('', [Validators.required]),
    description: this.nonNullableFormBuilder.control('', [Validators.required]),
  });

  constructor(private nonNullableFormBuilder: NonNullableFormBuilder) {}
}
