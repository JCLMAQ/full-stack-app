import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MATERIAL } from '@fe/material';

@Component({
  selector: 'confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MATERIAL],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public message: string) {
  }

}
