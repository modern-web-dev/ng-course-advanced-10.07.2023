import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.scss']
})
export class PublisherDetailsComponent implements OnInit{

  readonly formGroup: FormGroup;

  constructor() {
    console.log('PublisherDetails component constructor');
    this.formGroup = new FormGroup({
      publisher: new FormControl(),
      publishYear: new FormControl(),
      editionNumber: new FormControl()
    });
  }

  ngOnInit(): void {
    console.log('PublishedDetails component ngOnInit');
  }
}
