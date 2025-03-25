import { Component, Input, OnChanges } from '@angular/core';
import { Message } from '../../models/message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.css'],
  imports: [CommonModule]

})
export class ChatBodyComponent  {
  @Input() messages: Message[] = [];


}
