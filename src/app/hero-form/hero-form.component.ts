import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  model?: Hero;
  isNewHero = false;
  submitted = false;
  powers = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    if (heroId) {
      this.heroService.getHero(heroId).subscribe(data => {
        if (data) {
          this.isNewHero = false;
          this.submitted = true;
          this.model = data;
        }
      })
    } else {
      this.isNewHero = true;

      this.model =  {id:"", name:'Dr IQ', power: this.powers[0], alterEgo: 'Chuck Overstreet'}
    }
  }

  goBack(): void{
    this.location.back()
  }

  onSubmit(){
    this.submitted = true;
  }

  save(): void{
    if (this.model) {
      if (this.isNewHero) {
        this.heroService.addHero(this.model).subscribe(data =>{
          console.log(data);
          this.goBack();
        })
      } else{
        this.heroService.updateHero(this.model).subscribe(data =>{
          console.log(data);
          this.goBack();
        })
      }

    }
  }

}