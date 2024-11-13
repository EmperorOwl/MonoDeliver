import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';

import { BACKEND_URL } from '../../../config';

@Component({
  selector: 'app-convert-licence',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './convert-licence.component.html',
  styleUrl: './convert-licence.component.css',
})
export class ConvertLicenceComponent {
  @Input() _id: string = '';
  @Input() licence: string = '';
  voices: { name: string; code: string }[] = [
    { name: 'English', code: 'en-US' },
    { name: 'Japanese', code: 'ja-JP' },
    { name: 'Spanish', code: 'es-ES' },
    { name: 'French', code: 'fr-FR' },
  ];
  voice: any = this.voices[0].code;
  audioUrl: string = '';
  socket: any;

  constructor() {
    this.socket = io(BACKEND_URL);
  }

  ngOnInit() {
    this.convert();
    this.socket.on('conversion', (data: any) => {
      const blob = new Blob([data.audioContent], { type: 'audio/mp3' });
      this.audioUrl = URL.createObjectURL(blob);
    });
  }

  convert() {
    const conversion = {
      text: this.licence,
      language: this.voice,
    };
    this.socket.emit('newConversion', conversion);
  }
}
