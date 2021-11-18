import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() nombre:string | undefined; //desde el componente padre ubicado en app.componente.html <app-slider></app-slider>
  @Input() size: string | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
