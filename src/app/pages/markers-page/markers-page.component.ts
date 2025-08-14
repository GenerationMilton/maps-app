import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLat, LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { v4 as UUIDv4} from 'uuid';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id:string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit{
 
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);


   async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;

    // await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map= new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.28271567674129, 4.7340802238330498],
      zoom: 14,
    });

    // const marker = new mapboxgl.Marker({
    //   draggable: true,
    //   color: 'blue'
    // })
    //   .setLngLat([-74.28271567674129, 4.734080223833049 ])
    //   .addTo(map);

    // marker.on('dragend', (event)=>{
    //   console.log(event);
    // });

     this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map){
    
    map.on('click',(event)=> this.mapClick(event));
    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent){

    if(!this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
    ((Math.random() * 16) | 0).toString(16)
    );
    
    const mapboxMarker = new mapboxgl.Marker({
      color: color,
    })

    .setLngLat(coords)
    .addTo(map);

    const newMarker: Marker = {
      id:UUIDv4(),
      mapboxMarker: mapboxMarker
    }
    this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());
  }


  //go to marker
  flyToMarker(lngLat: LngLatLike){
    if(!this.map()) return;

    this.map()?.flyTo({
      center: lngLat,
    });
  }

 }
