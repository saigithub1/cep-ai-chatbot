import { Component } from '@angular/core';
import { ChatbotService } from './services/chatbot.service';
import { Message } from './models/message.model';
import { ChatInputComponent } from "./components/chat-input/chat-input.component";
import { ChatBodyComponent } from "./components/chat-body/chat-body.component";
import { ChatHeaderComponent } from "./components/chat-header/chat-header.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ChatInputComponent, ChatBodyComponent, ChatHeaderComponent],
  standalone: true,

})
export class AppComponent {
  messages: Message[] = [];
  isMinimized: boolean = false; // Tracks whether the chat is minimized

  constructor(private chatbotService: ChatbotService) {}

  sendMessage(message: string) {
    if (message.trim()) {
      const userMessage: Message = { sender: 'user', content: message, timestamp: new Date() };
      const botMessage: Message = { sender: 'bot', content: 'Please wait till I fetch results ...', timestamp: new Date() };

      this.messages = [...this.messages, userMessage, botMessage];
      this.chatbotService.sendMessage1(message).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          const botMessage: Message = { sender: 'bot', content: response, timestamp: new Date() };
          this.messages = [...this.messages, botMessage];
        },
        (error) => {
          const botMessage: Message = { sender: 'bot', content: 'Please try again', timestamp: new Date() };
          this.messages = [...this.messages, botMessage];
          console.error('Error sending message:', error);
        }
      );
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized; // Toggle the minimized state
  }
}