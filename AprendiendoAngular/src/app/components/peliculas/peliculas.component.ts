import { Component, OnInit } from '@angular/core';
//importaremos la clase creada peliculas.ts creada en la carpeta models 
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  public peliculas: Array<Pelicula> ;
  //public peliculas: Pelicula[] ;
  public favorita: Pelicula ;

  constructor() {
    /*this.peliculas =[
      {year:2001, title: "Spiderman 4", image:'https://sm.ign.com/t/ign_latam/screenshot/default/duende_8j96.1280.jpg'},
      {year:2005, title: "Los Vengadores end Game", image:'https://images.mediotiempo.com/siXTAVstHfAKrGEOgHwyID0zLCs=/958x596/uploads/media/2021/03/19/avengers-endgame-1.jpg'},
      {year:2008, title: "Nausicaa del Valle del viento", image:'assets/images/nausicaa.jpg'},
      {year:2010, title: "Totoro", image:'assets/images/totoro.jpg'},
      ];
    */
   this.peliculas=[
     new Pelicula("Spiderman 4",2001,"https://sm.ign.com/t/ign_latam/screenshot/default/duende_8j96.1280.jpg"),
     new Pelicula("Los Vengadores end Game",2005, 'https://images.mediotiempo.com/siXTAVstHfAKrGEOgHwyID0zLCs=/958x596/uploads/media/2021/03/19/avengers-endgame-1.jpg'),
     new Pelicula("Nausicaa del valle del viento",2008, 'assets/images/nausicaa.jpg'),
     new Pelicula("Totoro",2010,'assets/images/totoro.jpg' )
    ];
    
  }

  ngOnInit(): void {
    //console.log(this.peliculas);

  }

  mostrarFavorita(event: any){
    this.favorita = event.pelicula;
    //console.log(event);
    console.log(this.favorita);

  }

}
