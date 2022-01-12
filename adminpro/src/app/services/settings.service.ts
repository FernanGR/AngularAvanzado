import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme  = document.querySelector('#theme');
     
  

  constructor() { 
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
   
    if(this.linkTheme){
      this.linkTheme.setAttribute('href', url);
      
    }
  }

  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`;
    if (this.linkTheme) {
      this.linkTheme.setAttribute('href', url);
      localStorage.setItem('theme', url);
    }
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    if (links) {

      links.forEach((elem: any) => {

        elem.classList.remove('working');
        const btnTheme = elem.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        if (this.linkTheme) {
          const currentTheme = this.linkTheme.getAttribute('href');
          if (btnThemeUrl === currentTheme) {
             elem.classList.add('working');
          }
        }
        btnTheme === localStorage.getItem('theme') ? elem.classList.add('working') : '';

      });
    }

  }


}
