import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isEvenWeek: boolean;
  weekTypeCorrect = false;

  constructor() {
    const now = new Date();
    const date = new Date(now.getFullYear(), 0, 1);
    this.isEvenWeek = (Math.ceil(((new Date(now.getFullYear(), now.getMonth(), now.getDate() - date.getDate()).getTime() / 86400000) + date.getDay() + 1) / 7) % 2 == 0) === this.weekTypeCorrect;
  }

  changeWeek($e: { preventDefault: () => void; } | null = null) {
    if ($e != null) {
      $e.preventDefault();
    }
    this.isEvenWeek = !this.isEvenWeek;
  }
}
