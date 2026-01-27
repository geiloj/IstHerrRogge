import {Component, inject, signal, WritableSignal} from '@angular/core';
import {WikiService} from './wikipedia'; // Pfad anpassen

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <style>
      /* Gemeinsame Basis für alle drei IDs */
      #ja, #nein, #nau {
        display: flex;
        justify-content: center; /* Horizontal mittig */
        align-items: center;     /* Vertikal mittig */
        height: 100vh;           /* Volle Bildschirmhöhe */
        width: 100%;             /* Volle Breite */
        margin: 0;
        font-family: sans-serif;
        font-size: 5rem;         /* Schön groß */
        font-weight: bold;
        text-transform: uppercase;
      }

      /* JA: Schwarzer Hintergrund, weißer Text */
      #nein {
        background-color: black;
        color: white;
      }

      /* NEIN: Weißer Hintergrund, schwarzer Text (umgekehrt) */
      #ja {
        background-color: white;
        color: black;
      }

      /* NAU: Grauer Hintergrund */
      #nau {
        background-color: gray;
        color: white; /* Weißer Text liest sich auf Grau meist besser */
      }
    </style>
    {{Hallo}}
    @if(false){
    {{meinSatz()}}
    }
  @if(meinSatz() == "ist"){
    <h1 id="nein">NEIN</h1>
  } @else if (meinSatz() == "war"){
    <h1 id="ja">JA</h1>
  }@else{
    <h1 id="nau">überlege...</h1>
  }
  `
})
export class AppComponent {
    wiki = inject(WikiService);
    meinSatz = signal<string>("f"); // Hier wird der String gespeichert
    Hallo = '';

    async ngOnInit() {
      // Speichert den ersten Satz von Jan-Uwe Rogge in der Variable
      this.meinSatz.set(await this.wiki.getSatz('Jan-Uwe_Rogge'));
      this.meinSatz.set(this.meinSatz().split(" ")[6]);
    }

}
