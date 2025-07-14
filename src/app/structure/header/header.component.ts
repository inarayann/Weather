import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  options = [{ label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' }]
}
