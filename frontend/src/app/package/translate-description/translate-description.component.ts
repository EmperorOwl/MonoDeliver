import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

import { BACKEND_URL } from '../../../config';

@Component({
  selector: 'app-translate-description',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './translate-description.component.html',
  styleUrl: './translate-description.component.css',
})
export class TranslateDescriptionComponent {
  @Input() _id: string = '';
  @Input() description: string = '';
  languages: { name: string; code: string }[] = [
    { name: 'Japanese', code: 'ja' },
    { name: 'Spanish', code: 'es' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Chinese', code: 'zh' },
    { name: 'Korean', code: 'ko' },
    { name: 'Italian', code: 'it' },
    { name: 'Russian', code: 'ru' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Arabic', code: 'ar' },
  ];
  language: string = this.languages[0].code;
  translation: string = '';
  socket: any;

  constructor() {
    this.socket = io(BACKEND_URL);
  }

  ngOnInit() {
    this.translate();
    this.socket.on('translation', (data: string) => {
      this.translation = data;
    });
  }

  translate() {
    const translation = {
      text: this.description,
      language: this.language,
    };
    this.socket.emit('newTranslation', translation);
  }
}
