import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatbotService } from './services/chatbot.service';
import { Message } from './models/message.model';
import { ChatInputComponent } from "./components/chat-input/chat-input.component";
import { ChatBodyComponent } from "./components/chat-body/chat-body.component";
import { ChatHeaderComponent } from "./components/chat-header/chat-header.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, ChatInputComponent, ChatBodyComponent, ChatHeaderComponent],
})
export class AppComponent {
  messages: Message[] = [];
  isMinimized: boolean = false; // Tracks whether the chat is minimized
  items: any[] = [];
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;


  constructor(private chatbotService: ChatbotService) {
    this.items = this.generateItems(20);

  }
  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  sendMessage(message: string) {
    if (message.trim()) {
      const userMessage: Message = { sender: 'user', content: message, timestamp: new Date() };
      const botMessage: Message = { sender: 'bot', content: 'Please wait till I fetch results ...', timestamp: new Date() };

      this.messages = [...this.messages, userMessage, botMessage];
      this.chatbotService.sendMessage1(message).subscribe(
        (response) => {
          console.log('Response from backend:', response);
          this.items = response;
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

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.loadMoreItems();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    });

    observer.observe(this.scrollAnchor.nativeElement);
  }

  getKeys(item: any): string[] {
    return Object.keys(item);
  }

  generateItems(count: number): any[] {
    const items: any[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        title: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`
      });
    }
    return items;
  }

  loadMoreItems() {
    const newItems = this.generateItems(10);
    this.items = [...this.items, ...newItems];
  }
}