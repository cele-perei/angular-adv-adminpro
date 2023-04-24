import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import {retry, take, map, filter} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor () {
    
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs: ', valor),
    //   (err) => console.warn('Error:', err),
    //   () => console.info('Obs terminado')
    // );

    this.intervalSubs = this.retornaIntervalo()
    .subscribe(
      (valor) => console.log(valor)
    )

  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    return interval(100)
          .pipe(
            take(10),
            map( valor => valor + 1),
            filter(valor => (valor % 2 === 0)? true:false),
          );
  }

  retornaObservable(): Observable<number>{
    let i = -1;

    return new Observable<number>( observer => {
      
      const intervalo = setInterval( () =>  {

        i++;
        observer.next(i);

        if ( i === 4 ){
          clearInterval(intervalo);
          observer.complete();
        }
        if ( i === 2 ){
          observer.error('i llegó a 2');
        }

      }, 1000);

    });
  }

}
