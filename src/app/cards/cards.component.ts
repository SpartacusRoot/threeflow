import { Component, OnInit } from '@angular/core';
import { JsonService } from '../service/json.service';
import { map,  filter } from 'rxjs/operators';
import {
  
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  AbstractControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
// end: boolean;
// start: boolean;
// fallback: boolean;
// hidden: boolean;


jsonRes: object;
tree = {};
  constructor(private json: JsonService) { }

get() {
  return this.json.getJson().subscribe(data => {
 this.jsonRes = data;
 console.log(this.jsonRes);
  });
}

filter () {
  return this.json.firstStep().subscribe(data => {
this.jsonRes = data;
console.log(this.jsonRes);
  });
}


next() {
 


}

  ngOnInit() {
    this.get();
    // this.filter();

  }




}
