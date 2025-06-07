import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      name: 'TikTok',
      icon: 'tiktok.png',
      url: '#',
      ariaLabel: 'Siga-nos no TikTok'
    },
    {
      name: 'Twitter/X',
      icon: 'x.png',
      url: '#',
      ariaLabel: 'Siga-nos no Twitter'
    },
    {
      name: 'Instagram',
      icon: 'instagram.png',
      url: '#',
      ariaLabel: 'Siga-nos no Instagram'
    },
    {
      name: 'Facebook',
      icon: 'facebook.png',
      url: '#',
      ariaLabel: 'Siga-nos no Facebook'
    },
    {
      name: 'YouTube',
      icon: 'youtube.png',
      url: '#',
      ariaLabel: 'Inscreva-se no nosso canal'
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin.png',
      url: '#',
      ariaLabel: 'Conecte-se conosco no LinkedIn'
    }
  ];

  // Método para scroll suave
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
