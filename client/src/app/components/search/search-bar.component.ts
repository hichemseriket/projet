import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '../../services/search/search.service';

@Component({
  selector: `app-searchComponent`,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() reactiveSearch = false;

  constructor(public searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
  }

  /**
   * Recuperer valeur inpute barre de recherche
   */
    getItems(event) {
      this.searchService.searchValue = event.detail.value;
      if (this.reactiveSearch) {
        this.searchService.getSearchHouse();
      }
    }

    /**
     * redirect to the homepage so much if reactiveSearch the request
     */
    onRouterLink() {
      if (!this.reactiveSearch) {
        this.router.navigate(['search']);
      }
    }
}
