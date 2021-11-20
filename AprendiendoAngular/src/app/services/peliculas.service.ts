import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()
export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas=[
            new Pelicula("Spiderman 4",2001,"https://sm.ign.com/t/ign_latam/screenshot/default/duende_8j96.1280.jpg"),
            new Pelicula("Los Vengadores end Game",2005, 'https://images.mediotiempo.com/siXTAVstHfAKrGEOgHwyID0zLCs=/958x596/uploads/media/2021/03/19/avengers-endgame-1.jpg'),
            new Pelicula("Nausicaa del valle del viento",2008, 'assets/images/nausicaa.jpg'),
            new Pelicula("Totoro",2010,'assets/images/totoro.jpg' )
           ];
    }

    holaMundo(){
        return 'Hola Mundo desde servicio de Angular';
    }

    getPeliculas(){
       return this.peliculas;
    }
}