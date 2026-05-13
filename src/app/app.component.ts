import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LaunchpadComponent } from './launchpad/launchpad.component';

type AppMode = 'landing' | 'keys' | 'launchpad';

const MODE_KEY = 'keys-app-mode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LaunchpadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  mode = signal<AppMode>(this.loadMode());

  private loadMode(): AppMode {
    const saved = localStorage.getItem(MODE_KEY);
    if (saved === 'keys' || saved === 'launchpad') return saved;
    return 'landing';
  }

  enter(m: 'keys' | 'launchpad'): void {
    localStorage.setItem(MODE_KEY, m);
    this.mode.set(m);
  }

  switchTo(m: 'keys' | 'launchpad'): void {
    this.enter(m);
  }
}
