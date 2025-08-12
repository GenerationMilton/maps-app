import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit{
 
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);

   async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map= new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.28271567674129, 4.7340802238330498],
      zoom: 14,
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
      color: 'blue'
    })
      .setLngLat([-74.28271567674129, 4.734080223833049 ])
      .addTo(map);

    marker.on('dragend', (event)=>{
      console.log(event);
    });

     this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map){
    console.log('object')
  }

 }
