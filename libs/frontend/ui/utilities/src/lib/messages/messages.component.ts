import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessagesService } from './messages.service';

// From Angular university: Angular Signal cours
@Component({
  selector: 'full-stack-app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {

  messagesService = inject(MessagesService);

  message = this.messagesService.message;

  onClose() {
    this.messagesService.clear();
  }
}
