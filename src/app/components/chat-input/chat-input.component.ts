import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';
import { Message } from '../../models/message.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],

})
export class ChatInputComponent {
  userInput: string = '';

  @Output() messageSent: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}
  
  sendMessage() {
    if (this.userInput.trim()) {
      this.messageSent.emit(this.userInput);
      this.userInput = '';
    }
  }
}