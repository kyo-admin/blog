import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  @Input() pelicula: Pelicula;
  @Output() MarcarFavorita = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(event: any, pelicula: any){
    this.MarcarFavorita.emit({
      pelicula:pelicula
    });
    //console.log(event);
    //console.log(pelicula)
    
  }

}
