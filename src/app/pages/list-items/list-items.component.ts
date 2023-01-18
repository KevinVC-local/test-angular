import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Devolucion, Result } from '../models/pokemon-list.model';
import { DetailPokemon } from '../models/detail-pokemon.model';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormPokemon } from '../models/form-pokemon.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  // List
  public listPokemons: Result[] = [];
  public listPokemonsTotal: Result[] = [];
  public selectPokemon: any = null;
  // Loading
  public isLoadingPokemon = false;
  public isLoadingDetail = false;
  // Variable
  public offset = 0;
  public limit = 20;
  public totalElements = 20;
  public currentPage = 1;
  // Filter
  public keyword: string = 'name';
  public filterPokemon = new Subject<any>();
  // Abecedario
  public arrayPokemonByAlphabet: any = [];
  public abecedario = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
    this.filterNamePokemon();
    this.efectHover();
  }

  private loadPokemon(): void {
    this.isLoadingPokemon = true;
    this.pokemonService.listItemsPokemons(this.offset, this.limit).subscribe({
      next: (data) => {
        this.listPokemons = data.results;
        this.totalElements = data.count;
        this.isLoadingPokemon = false;
        this.loadPokemonTotal();
      },
      error: () => (this.isLoadingPokemon = false),
    });
  }

  private loadPokemonTotal(): void {
    this.arrayPokemonByAlphabet = [];
    this.pokemonService
      .listItemsPokemons(this.offset, this.totalElements)
      .subscribe({
        next: (data) => {
          this.listPokemonsTotal = data.results;
          this.isLoadingPokemon = false;
          this.pokemonByAlphabet();
        },
        error: () => (this.isLoadingPokemon = false),
      });
  }

  public handleSelectPokemon(pokemon: Result) {
    this.isLoadingDetail = true;
    if (!pokemon.name) return;
    this.pokemonService.getDetailPokemon(pokemon.name).subscribe({
      next: (data) => {
        this.selectPokemon = data;
        this.isLoadingDetail = false;
      },
      error: (e) => {
        this.isLoadingDetail = false;
      },
    });
  }

  public handleLoadPage(page: number): void {
    this.offset = (page - 1) * this.limit;
    this.loadPokemon();
  }

  public completePokemon(event: any) {
    this.handleSelectPokemon(event);
  }

  public cleanPokemon(event: any) {
    if (event === undefined) {
      this.selectPokemon = null;
    }
  }

  /* FUNCTION USE FILTER AUTOCOMPLETE */
  public filterNamePokemon(): void {
    this.filterPokemon
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.handleSelectPokemon({ name: value, url: '' });
      });
  }

  /* FILTER POKEMON BY ALPHABET */
  public pokemonByAlphabet() {
    this.abecedario.forEach((alphabet) => {
      let group = this.listPokemonsTotal.filter(
        (pokemon) => pokemon.name.split('')[0].toUpperCase() === alphabet
      );
      this.arrayPokemonByAlphabet.push(group);
    });
  }

  /* FUNCTION EVENT MOUSEMOVE */
  private efectHover() {
    const cards: any = document.querySelector('.cards');
    const images = document.querySelectorAll('.card__img');
    const backgrounds = document.querySelectorAll('.card__bg');
    const range = 40;

    // const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
    const calcValue = (a: any, b: any) =>
      ((a / b) * range - range / 2).toFixed(1); // thanks @alice-mx

    let timeout: any;
    document.addEventListener(
      'mousemove',
      ({ x, y }) => {
        if (timeout) {
          window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
          const yValue: any = calcValue(y, window.innerHeight);
          const xValue: any = calcValue(x, window.innerWidth);

          cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

          [].forEach.call(images, (image: any) => {
            image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
          });

          [].forEach.call(backgrounds, (background: any) => {
            background.style.backgroundPosition = `${xValue * 0.45}px ${
              -yValue * 0.45
            }px`;
          });
        });
      },
      false
    );
  }
}
