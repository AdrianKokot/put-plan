import { Component, OnInit } from '@angular/core';
import { firebaseConfig } from 'src/environments/firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const gTag = document.createElement('script');
    gTag.type = 'text/javascript';
    gTag.async = true;
    gTag.src = `https://www.googletagmanager.com/gtag/js?id=${firebaseConfig.measurementId}`;
    gTag.onload = function () {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      function gtag() { window.dataLayer.push(arguments); }
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', firebaseConfig.measurementId);

    }
    document.body.appendChild(gTag);
  }

}
