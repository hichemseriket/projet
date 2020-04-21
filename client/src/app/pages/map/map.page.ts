import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IApi} from "../../../../../core/IApi";
import {ApiService} from "../../services/api/api.service";



@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    waypoints = {
        lat: 0,
        lng: 0
    };
    points = [];

    constructor(private route: ActivatedRoute,
                private apiService: ApiService) { }

    ngOnInit() {
    }

    /**
     * Event when we enter in this page
     */
    ionViewWillEnter() {
        this.getCoordUrl();
        this.getHouseList();
    }

    /**
     * retrieve latitude, longitude location information.
     */
    getCoordUrl() {
        this.waypoints = {
            lat: Number(this.route.snapshot.paramMap.get('lat')),
            lng: Number(this.route.snapshot.paramMap.get('lng'))
        };
    }

    /**
     * recover the points (location) of the houses in the list
     */
    getHouseList() {
        this.apiService.postApi('house', 'getHouseList')
            .then((res: IApi) => {
           res.list.forEach((house) => {
                this.points.push(house.ref);
            });
        });
    }


}
