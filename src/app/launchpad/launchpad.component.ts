import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadSettingsComponent } from './launchpad-settings.component';
import { LaunchpadLibraryComponent } from './launchpad-library.component';
import { LaunchpadLessonComponent } from './launchpad-lesson.component';
import { GridConfig } from './launchpad.models';
import { DEFAULT_GRID_CONFIG } from './launchpad.data';

type LpTab = 'library' | 'lessons';

@Component({
  selector: 'app-launchpad',
  standalone: true,
  imports: [
    CommonModule,
    LaunchpadSettingsComponent,
    LaunchpadLibraryComponent,
    LaunchpadLessonComponent,
  ],
  styles: [`
    :host { display: block; min-height: 100vh; background: transparent; }

    .lp-page {
      max-width: 960px;
      margin: 0 auto;
      padding: 16px 16px 80px;
      font-family: 'Outfit', sans-serif;
    }

    /* Header */
    .lp-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .lp-title-group { flex: 1; }
    .lp-eyebrow {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      font-family: 'Orbitron', sans-serif;
    }
    .lp-title {
      font-size: 22px;
      font-weight: 700;
      color: rgba(255,255,255,0.95);
      line-height: 1.2;
      font-family: 'Orbitron', sans-serif;
    }

    .lp-badge {
      padding: 4px 12px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      background: rgba(249,115,22,0.15);
      border: 1px solid rgba(249,115,22,0.3);
      color: #fb923c;
      letter-spacing: 0.5px;
    }

    /* Settings sticky area */
    .settings-wrap {
      position: sticky;
      top: 0;
      z-index: 10;
      margin-bottom: 16px;
      padding-top: 4px;
    }

    /* Tab bar */
    .tab-bar {
      display: flex;
      gap: 4px;
      margin-bottom: 20px;
      padding: 4px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      width: fit-content;
    }
    .tab-btn {
      padding: 7px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      border: none;
      background: transparent;
      color: rgba(255,255,255,0.5);
      cursor: pointer;
      transition: all 0.15s ease;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tab-btn.active {
      background: rgba(124,58,237,0.4);
      color: #fff;
      box-shadow: 0 2px 8px rgba(124,58,237,0.3);
    }
    .tab-btn i { font-size: 15px; }

    /* Mode description */
    .mode-desc {
      margin-bottom: 16px;
      padding: 10px 14px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      font-size: 12px;
      color: rgba(255,255,255,0.45);
      line-height: 1.5;
    }
  `],
  template: `
    <div class="lp-page">

      <!-- Header -->
      <div class="lp-header">
        <div class="lp-title-group">
          <div class="lp-eyebrow">Novation</div>
          <div class="lp-title">Launchpad X</div>
        </div>
        <span class="lp-badge">Visual Guide</span>
      </div>

      <!-- Settings bar (sticky) -->
      <div class="settings-wrap">
        <app-launchpad-settings
          [config]="config()"
          (configChange)="onConfigChange($event)"
        />
      </div>

      <!-- Tab bar -->
      <div class="tab-bar">
        <button class="tab-btn" [class.active]="tab() === 'library'" (click)="setTab('library')">
          <i class="ti ti-layout-grid"></i> Reference Library
        </button>
        <button class="tab-btn" [class.active]="tab() === 'lessons'" (click)="setTab('lessons')">
          <i class="ti ti-school"></i> Lessons
        </button>
      </div>

      <!-- Mode description -->
      <div class="mode-desc" *ngIf="tab() === 'library'">
        <strong style="color:rgba(255,255,255,0.6);">Reference Library</strong> — Explore how scales, chord shapes, and progressions look on the grid for any combination of overlap, mode, scale, and root note. Change settings above to see the layout update in real time.
      </div>
      <div class="mode-desc" *ngIf="tab() === 'lessons'">
        <strong style="color:rgba(255,255,255,0.6);">Step-through Lessons</strong> — Guided lessons for scales, chord shapes, licks, runs, and progressions. Select a lesson from the list and follow the pad highlights one step at a time.
      </div>

      <!-- Content -->
      <app-launchpad-library
        *ngIf="tab() === 'library'"
        [config]="config()"
      />

      <app-launchpad-lesson
        *ngIf="tab() === 'lessons'"
        [config]="config()"
      />

    </div>
  `,
})
export class LaunchpadComponent {
  config = signal<GridConfig>({ ...DEFAULT_GRID_CONFIG });
  tab = signal<LpTab>('library');

  onConfigChange(cfg: GridConfig): void {
    this.config.set(cfg);
  }

  setTab(t: LpTab): void {
    this.tab.set(t);
  }
}
