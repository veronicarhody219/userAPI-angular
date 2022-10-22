import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../../interface/user';
import { Response } from '../../interface/response';
import { UserService } from '../../service/user.service';
import * as L from 'leaflet';
import { Coordinate } from '../../interface/coordinate';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  response: Response;
  user: User;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save changes' | 'Edit' = 'Edit';
  marker = new L.Icon.Default();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = <User>(
      this.activatedRoute.snapshot.data['resolvedResponse'].results[0]
    );
    this.loadMap(this.user.coordinate);
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   console.log('User id: ', params.get('uuid')!);
    //   this.userService
    //     .getUser(params.get('uuid')!)
    //     .subscribe((response: any) => {
    //       console.log(response);
    //       this.response = response;
    //       this.user = this.response.results[0];
    //     });
    // });
  }
  changeMode(mode: 'edit' | 'locked'): void {
    console.log(mode);
    this.mode = this.mode === 'locked' ? 'edit' : 'locked';
    this.buttonText = this.buttonText === 'Edit' ? 'Save changes' : 'Edit';
  }
  private loadMap(coordinate: Coordinate): void {
    const map = L.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: 8,
    });
    const mainLayer = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }
    ).addTo(map);
    const myIcon = L.icon({
      iconUrl: '../../assets/push_pin_FILL0_wght400_GRAD0_opsz48.png',
      iconSize: [20, 35],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],

      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });
    const marker = L.marker([coordinate.latitude, coordinate.longitude], {
      icon: myIcon,
    }).addTo(map);
    const popup = L.popup()
      .setLatLng([coordinate.latitude, coordinate.longitude])
      .setContent(`${this.user.firstName} is here`)
      .openOn(map);
  }
}
