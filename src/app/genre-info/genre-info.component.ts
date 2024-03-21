import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss']
})
export class GenreInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)

  public data: {
    Name: string,
    Description: string
  }
  ) {}

  ngOnInit(): void {

  }

}