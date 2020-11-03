import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Survey } from 'src/app/models/survey';

@Component({
  selector: 'app-surveys-author',
  templateUrl: './surveys-author.component.html',
  styleUrls: ['./surveys-author.component.css']
})
export class SurveysAuthorComponent implements OnInit {

  sortDesc = {
    order: "Rastuce",// a/descending
    type: "Po nazivu",
  }
  surveys: any;
  surveysToShow: any;
  searchPattern: string;
  empty = false;

  constructor(private authorService: AuthorService, private app: AppComponent, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.check("author")) {
      let currUser = this.app.currUserDetails;
      if (!currUser) {
        this.app.getUserService().getUser(JSON.parse(sessionStorage.getItem('currUser')).username).subscribe(user => {
          currUser = user[0];
          this.authorService.getSurveys().subscribe(res => {
            this.surveys = res;
            this.surveysToShow = res;
            for (let i = 0; i < this.surveys.length; i++) {
              this.surveys[i].date_begins = new Date(this.surveys[i].date_begins);
              this.surveys[i].date_ends = new Date(this.surveys[i].date_ends);
              this.surveysToShow[i].date_begins = new Date(this.surveysToShow[i].date_begins);
              this.surveysToShow[i].date_ends = new Date(this.surveysToShow[i].date_ends);
            }
            if (this.surveys.length == 0) this.empty = true;
          })
        })
      } else {
        this.authorService.getSurveys().subscribe(res => {
          this.surveys = res;
          this.surveysToShow = res;
          for (let i = 0; i < this.surveys.length; i++) {
            this.surveys[i].date_begins = new Date(this.surveys[i].date_begins);
            this.surveys[i].date_ends = new Date(this.surveys[i].date_ends);
            this.surveysToShow[i].date_begins = new Date(this.surveysToShow[i].date_begins);
            this.surveysToShow[i].date_ends = new Date(this.surveysToShow[i].date_ends);
          }
          if (this.surveys.length == 0) this.empty = true;
        })
      }
    }
  }

  search() {
    this.surveysToShow = new Array<Survey>();
    for (let i = 0; i < this.surveys.length; ++i) {
      if (this.surveys[i].name.includes(this.searchPattern)) {
        this.surveysToShow.push(this.surveys[i]);
      }
    }
    if (this.surveysToShow.length == 0) this.empty = true;
    else this.empty = false;
    this.searchPattern = ""
  }

  sort() {
    if (this.sortDesc.order == "Rastuce") {
      if (this.sortDesc.type == "Po nazivu") {
        for (let i = 0; i < this.surveysToShow.length - 1; i++) {
          for (let j = i + 1; j < this.surveysToShow.length; j++) {
            if (String(this.surveysToShow[i].name).toUpperCase() > String(this.surveysToShow[j]).toUpperCase()) {
              let curr = this.surveysToShow[i];
              this.surveysToShow[i] = this.surveysToShow[j];
              this.surveysToShow[j] = curr;
            }
          }
        }
      }

      if (this.sortDesc.type == "Po datumu pocetka") {
        for (let i = 0; i < this.surveysToShow.length - 1; i++) {
          for (let j = i + 1; j < this.surveysToShow.length; j++) {
            if (this.surveysToShow[i].date_begins > this.surveysToShow[j].date_begins) {
              let curr = this.surveysToShow[i];
              this.surveysToShow[i] = this.surveysToShow[j];
              this.surveysToShow[j] = curr;
            }
          }
        }
      }

      if (this.sortDesc.type == "Po datumu isteka") {
        for (let i = 0; i < this.surveysToShow.length - 1; i++) {
          for (let j = i + 1; j < this.surveysToShow.length; j++) {
            if (this.surveysToShow[i].date_ends > this.surveysToShow[j].date_ends) {
              let curr = this.surveysToShow[i];
              this.surveysToShow[i] = this.surveysToShow[j];
              this.surveysToShow[j] = curr;
            }
          }
        }
      }

    }
    else {
      if (this.sortDesc.type == "Po nazivu") {
        for (let i = 0; i < this.surveysToShow.length - 1; i++) {
          for (let j = i + 1; j < this.surveysToShow.length; j++) {
            if (String(this.surveysToShow[i].name).toUpperCase() < String(this.surveysToShow[j]).toUpperCase()) {
              let curr = this.surveysToShow[i];
              this.surveysToShow[i] = this.surveysToShow[j];
              this.surveysToShow[j] = curr;
            }
          }
        }
      }

      if (this.sortDesc.type == "Po datumu pocetka") {
        for (let i = 0; i < this.surveysToShow.length - 1; i++) {
          for (let j = i + 1; j < this.surveysToShow.length; j++) {
            if (this.surveysToShow[i].date_begins < this.surveysToShow[j].date_begins) {
              let curr = this.surveysToShow[i];
              this.surveysToShow[i] = this.surveysToShow[j];
              this.surveysToShow[j] = curr;
            }
          }
        }
      }

      if (this.sortDesc.type == "Po datumu isteka") {
        for (let i = 0; i < this.surveysToShow.length - 1; i++) {
          for (let j = i + 1; j < this.surveysToShow.length; j++) {
            if (this.surveysToShow[i].date_ends < this.surveysToShow[j].date_ends) {
              let curr = this.surveysToShow[i];
              this.surveysToShow[i] = this.surveysToShow[j];
              this.surveysToShow[j] = curr;
            }
          }
        }
      }

    }
    //console.log(this.surveys);
    //this.ngOnInit();
  }

  surveyDetails(survey) {
    sessionStorage.setItem('currSurveyNameAuthor', JSON.stringify(survey.name));
    this.router.navigate(['author/surveys/details']);
  }

  goBack() {
    this.router.navigate(['']);
  }


}
