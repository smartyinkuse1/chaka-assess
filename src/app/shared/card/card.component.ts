import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardObj: Card = {
    value: 0,
    title: "",
    symbol: ""
  }
  constructor() { }

  ngOnInit(): void {
  }

}
