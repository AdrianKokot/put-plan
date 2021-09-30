import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firebaseConfig } from 'src/environments/firebase';

declare global {
  interface Window {
    dataLayer: (string | Date | (string | Date)[])[];
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

    if (environment.production) {
      this.addGTag(firebaseConfig.measurementId);
    }

  }

  private addGTag(gtagId: string): void {
    const gTag = document.createElement('script');
    gTag.type = 'text/javascript';
    gTag.async = true;
    gTag.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    gTag.onload = function () {

      window.dataLayer = window.dataLayer || [];

      function gtag(...args: (string | Date)[]) { window.dataLayer.push(args); }

      gtag('js', new Date());
      gtag('config', gtagId);

    }
    document.body.appendChild(gTag);
  }

}
