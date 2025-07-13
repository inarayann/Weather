import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
interface FeatureItem {
  title: string;
  description: string;
  iconClass: string; // For Bootstrap Icons or Font Awesome
  routerPath: string;
}
@Component({
  selector: 'app-home',
  imports: [NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit , OnDestroy {
  featureHighlights:FeatureItem[] = [];
 heroGradientOverlay: string = '';
  heroIconClass: string = ''; // Property to hold the dynamic icon class
  heroIconColorClass: string = '';
  private intervalId: any;
  constructor(private title:Title){}
  ngOnInit(): void {
    this.title.setTitle('Weather - Home')
    this.featureHighlights = [
      {
        title: 'Astronomy Insights',
        description: 'Explore meteor showers, moon phases, and celestial events based on your location.',
        iconClass: 'bi bi-stars', // Example Bootstrap Icon
        routerPath: '/astronomy'
      },
      {
        title: 'Advanced Forecasting',
        description: 'Access detailed hourly predictions, 10-day outlooks, and interactive weather maps.',
        iconClass: 'bi bi-cloud-haze2-fill', // Example Bootstrap Icon
        routerPath: '/forecasting'
      }
    ];
     this.updateHeroVisuals();

    // Update background every minute to reflect time changes
    this.intervalId = setInterval(() => {
      this.updateHeroVisuals();
    }, 60 * 5000); // Check and update every 5 minute
  }

   ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

 private updateHeroVisuals(): void {
    const now = new Date();
    const hours = now.getHours(); // Get current hour (0-23)
    const minutes = now.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    let gradient: string;
    let iconClass: string;
    let iconColorClass: string;

    // Define time ranges in minutes from midnight
    const MORNING_START = 5 * 60;    // 5:00 AM
    const AFTERNOON_START = 12 * 60;   // 12:00 PM (Noon)
    const EVENING_START = 17 * 60;   // 5:00 PM
    const NIGHT_START = 21 * 60;     // 9:00 PM
    if (timeInMinutes >= MORNING_START && timeInMinutes < AFTERNOON_START) {
      // Morning (e.g., 5 AM - 11:59 AM)
      gradient = 'linear-gradient(to top, rgba(135,206,235,0.6), rgba(255,255,150,0.6), rgba(255,255,255,0.6))';
      iconClass = 'bi-brightness-high'; // Bright sun icon
      iconColorClass = 'text-warning'; // Yellow for sun
    } else if (timeInMinutes >= AFTERNOON_START && timeInMinutes < EVENING_START) {
      // Afternoon (e.g., 12 PM - 4:59 PM)
      gradient = 'linear-gradient(to bottom, rgb(229 142 69), rgb(143 144 146 / 45%))';
      iconClass = 'bi-sunset'; // Sunset icon
      iconColorClass = 'text-info'; // Light blue for sky
    } else if (timeInMinutes >= EVENING_START && timeInMinutes < NIGHT_START) {
      // Evening (e.g., 5 PM - 8:59 PM)
      iconClass = 'bi-cloud-sun'; // Sun with light cloud
      gradient = 'linear-gradient(to bottom, rgb(250 198 135 / 71%), #2a2a4bba)';
      iconColorClass = 'text-orange-custom'; // Custom orange color
    } else {
      // Night (e.g., 9 PM - 4:59 AM)
      gradient = 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(25,25,112,0.7), rgba(75,0,130,0.7))';
      iconClass = 'bi-moon-stars'; // Moon with stars icon
      iconColorClass = 'text-light'; // White/light color for moon/stars
    }

    // Update component properties
    this.heroGradientOverlay = gradient;
    this.heroIconClass = iconClass;
    this.heroIconColorClass = iconColorClass;
  }
}
