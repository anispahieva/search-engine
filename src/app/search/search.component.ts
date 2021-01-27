import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { results } from '../results';
import { SearchService } from '../search.service';
import { HomeComponent } from "../home/home.component"
import {HttpParams} from '@angular/common/http'
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  
  results$: results[] = [];
  //searchQueries[] = [];
  //query = '';

  //proxyurl = "https://cors-anywhere.herokuapp.com/";
  url = "http://localhost:8983/solr/wiki/select?q=*%3A*"
  apiUrl= 'http://localhost:8983/solr/wiki/select?q=extract%3A';
  //query = "";

  constructor(private http: HttpClient, private homeComponent: HomeComponent) {
    //console.log(this.apiUrl+query)
    
  }
  ngOnInit(): void {

    console.log(this.apiUrl)
    this.http.get<any>(this.url, {observe: 'body'})
    .subscribe(resp => {
      this.results$ = resp["response"]["docs"];
     // this.results$
      console.log(this.results$);
    });
    console.log(this.results$)
    //console.log(this.query)
   /* console.log(this._searchservice.getResults()
     .subscribe(data => this.results$ = data)) */

     //console.log(data)

  }

  searchQuery(query: string) {
    this.apiUrl = 'http://localhost:8983/solr/wiki/select?q=extract%3A'
    console.log(query);
    this.apiUrl += query + "%20title%3A" + query;
    console.log(this.apiUrl)

    this.http.get<any>(this.apiUrl, {observe: 'body'})
    .subscribe(resp => {
      this.results$ = resp["response"]["docs"];
     // this.results$
      console.log(this.results$);
    });
  }



}
