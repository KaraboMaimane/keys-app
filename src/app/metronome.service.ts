import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MetronomeService {
  bpm      = signal(60);
  isPlaying = signal(false);
  beat      = signal(0);          // 0-indexed beat within the bar (0 = downbeat)
  beatsPerBar = signal(4);

  private ctx: AudioContext | null = null;
  private nextBeatTime  = 0;
  private currentBeat   = 0;
  private scheduleId    = 0;
  private lookahead     = 25;    // ms — how often the scheduler runs
  private scheduleAhead = 0.1;   // seconds — how far ahead to schedule

  private getCtx(): AudioContext {
    if (!this.ctx) this.ctx = new AudioContext();
    return this.ctx;
  }

  private scheduleClick(time: number, isAccent: boolean): void {
    const ctx  = this.getCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = isAccent ? 1000 : 800;
    gain.gain.setValueAtTime(isAccent ? 0.9 : 0.6, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.06);
  }

  private scheduler(): void {
    const ctx = this.getCtx();
    const secondsPerBeat = 60 / this.bpm();

    while (this.nextBeatTime < ctx.currentTime + this.scheduleAhead) {
      const isAccent = (this.currentBeat % this.beatsPerBar()) === 0;
      this.scheduleClick(this.nextBeatTime, isAccent);

      // Update signal on the Angular zone — visual pulse
      const beatSnapshot = this.currentBeat % this.beatsPerBar();
      setTimeout(() => this.beat.set(beatSnapshot),
        Math.max(0, (this.nextBeatTime - ctx.currentTime) * 1000));

      this.nextBeatTime += secondsPerBeat;
      this.currentBeat++;
    }

    this.scheduleId = window.setTimeout(() => this.scheduler(), this.lookahead);
  }

  start(): void {
    if (this.isPlaying()) return;
    const ctx = this.getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    this.currentBeat  = 0;
    this.nextBeatTime = ctx.currentTime + 0.05;
    this.isPlaying.set(true);
    this.scheduler();
  }

  stop(): void {
    if (!this.isPlaying()) return;
    clearTimeout(this.scheduleId);
    this.isPlaying.set(false);
    this.beat.set(0);
  }

  toggle(): void {
    this.isPlaying() ? this.stop() : this.start();
  }

  /** Restart with the new BPM without stopping the feel of continuity */
  setBpm(bpm: number): void {
    this.bpm.set(Math.min(200, Math.max(20, bpm)));
    if (this.isPlaying()) {
      // The scheduler naturally picks up the new bpm next tick
    }
  }

  tapTempos: number[] = [];
  tap(): void {
    const now = Date.now();
    if (this.tapTempos.length && (now - this.tapTempos[this.tapTempos.length - 1]) > 3000) {
      this.tapTempos = [];
    }
    this.tapTempos.push(now);
    if (this.tapTempos.length >= 2) {
      const gaps = this.tapTempos.slice(1).map((t, i) => t - this.tapTempos[i]);
      const avg  = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      this.setBpm(Math.round(60000 / avg));
    }
    if (this.tapTempos.length > 8) this.tapTempos.shift();
  }
}
