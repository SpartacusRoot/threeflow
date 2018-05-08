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

import * as d3 from 'd3';
import {
  hierarchy,
  HierarchyNode,
  HierarchyPointNode,
  HierarchyLink,
  HierarchyPointLink,
  StratifyOperator,
  TreeLayout,
  tree
} from 'd3-hierarchy';



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
data: any;
parent = null;
children = [];
_root: any;

jsonRes: any;

 flatData = [
  {
    '_id': '5a8b3836e07dee4ec559dedc',
    'type': 'payload',
    'board': {
        'draft': false,
        'broadcast_id': [],
        'page_id': '5a8b1c71c582b1460eb50509',
        'user_creator': '5a33b10e15fca883ce43a325',
        'descr': 'BOARD_DESCRIPTION',
        'name': 'ultimo'
    },
    'context': {
        'step': 3,
        'context': '5a8b377bf77e724eca6b9a3d',
        'end': true,
        'fallback': true,
        'start': false
    },
    'payload': 'ULTIMO',
    'updated_at': '2018-02-19T20:48:54.213Z',
    'created_at': '2018-02-19T20:48:54.213Z',
    'delay': [],
    'messages': [
        {
            'text': 'Con questo messaggio il flusso è finito!'
        },
        {
            'text': 'Adesso posso tornare a parlare di altre cose al di fuori del flusso!'
        },
        {
            'text': 'Chiedimi quello che vuoi! :)'
        }
    ],
    'tags': []
},
{
    '_id': '5a8b37af214d0d4ec8acbc0d',
    'type': 'text',
    'board': {
        'draft': false,
        'broadcast_id': [],
        'name': 'inizio',
        'descr': 'BOARD_DESCRIPTION',
        'user_creator': '5a33b10e15fca883ce43a325',
        'page_id': '5a8b1c71c582b1460eb50509'
    },
    'context': {
        'step': 0,
        'context': '5a8b377bf77e724eca6b9a3d',
        'end': false,
        'fallback': false,
        'start': true
    },
    'payload': 'INIZIO',
    'updated_at': '2018-02-19T20:46:39.675Z',
    'created_at': '2018-02-19T20:46:39.675Z',
    'delay': [],
    'messages': [
        {
            'text': 'Hai mai fatto un flusso? :D'
        },
        {
            'text': 'Con il primo step di un flusso, sono in grado di risponderti in maniera sequenziale.'
        },
        {
            'text': 'In questo caso avendo impostato il repeat devi per forza cliccare su uno dei due tasti! :D',
            'quick_replies': [
                {
                    'payload': 'SI_FLUSSO',
                    'action': {
                        'from': '5a8b37af214d0d4ec8acbc0d',
                        'go_to': '5a8b37a15f260f4ecb31b496'
                    },
                    'title': 'Si',
                    'content_type': 'text'
                },
                {
                    'payload': 'NO_FLUSSO',
                    'action': {
                        'from': '5a8b37af214d0d4ec8acbc0d',
                        'go_to': '5a8b37a9f77e724eca6b9a40'
                    },
                    'title': 'No',
                    'content_type': 'text'
                }
            ]
        }
    ],
    'tags': [
        'flusso'
    ]
},
{
    '_id': '5a8b3815214d0d4ec8acbc14',
    'type': 'payload',
    'board': {
        'draft': false,
        'broadcast_id': [],
        'name': 'fallback',
        'descr': 'BOARD_DESCRIPTION',
        'user_creator': '5a33b10e15fca883ce43a325',
        'page_id': '5a8b1c71c582b1460eb50509'
    },
    'context': {
        'step': 2,
        'context': '5a8b377bf77e724eca6b9a3d',
        'end': false,
        'fallback': true,
        'start': false
    },
    'payload': 'FALLBACK',
    'updated_at': '2018-02-19T20:48:21.856Z',
    'created_at': '2018-02-19T20:48:21.856Z',
    'delay': [],
    'messages': [
        {
            'text': 'benissimo! Questo è un fallback!' +
            ' Appare quando un utente scrive all\'interno di un flusso senza cliccare un pulsante! :D',
            'quick_replies': [
                {
                    'payload': 'ULTIMO',
                    'action': {
                        'from': '5a8b3815214d0d4ec8acbc14',
                        'go_to': '5a8b3836e07dee4ec559dedc'
                    },
                    'title': 'Si',
                    'content_type': 'text'
                }
            ]
        }
    ],
    'tags': []
},
{
    '_id': '5a8b37a15f260f4ecb31b496',
    'type': 'payload',
    'board': {
        'draft': false,
        'broadcast_id': [],
        'name': 'si flusso',
        'descr': 'BOARD_DESCRIPTION',
        'user_creator': '5a33b10e15fca883ce43a325',
        'page_id': '5a8b1c71c582b1460eb50509'
    },
    'context': {
        'step': 1,
        'context': '5a8b377bf77e724eca6b9a3d',
        'end': false,
        'fallback': false,
        'start': false
    },
    'payload': 'SI_FLUSSO',
    'updated_at': '2018-02-19T20:46:25.002Z',
    'created_at': '2018-02-19T20:46:25.002Z',
    'delay': [],
    'messages': [
        {
            'text': 'Ottimo! Sei arrivato qui perchè questo messaggio era collegato al bottone "SI"'
        },
        {
            'text': 'Se però mi scrivi qualcosa, ti farò andare allo step successivo!'
        },
        {
            'text': 'Scrivimi qualsiasi cosa! :D'
        }
    ],
    'action': {
        'from': '5a8b37a15f260f4ecb31b496',
        'go_to': '5a8b3815214d0d4ec8acbc14'
    }
},
{
    '_id': '5a8b37a9f77e724eca6b9a40',
    'type': 'payload',
    'board': {
        'draft': false,
        'broadcast_id': [],
        'name': 'no flusso',
        'descr': 'BOARD_DESCRIPTION',
        'user_creator': '5a33b10e15fca883ce43a325',
        'page_id': '5a8b1c71c582b1460eb50509'
    },
    'context': {
        'step': 1,
        'context': '5a8b377bf77e724eca6b9a3d',
        'end': false,
        'fallback': false,
        'start': false
    },
    'payload': 'NO_FLUSSO',
    'updated_at': '2018-02-19T20:46:33.954Z',
    'created_at': '2018-02-19T20:46:33.954Z',
    'delay': [],
    'messages': [
        {
            'text': 'Ottimo! Sei arrivato qui perchè questo messaggio era collegato al bottone "No"'
        },
        {
            'text': 'Se però mi scrivi qualcosa, ti farò andare allo step successivo!'
        },
        {
            'text': 'Scrivimi qualsiasi cosa! :D se non lo fai con la funzione "engage" tanto ti ricontatto! :D'
        }
    ],
    'action': {
        'from': '5a8b37a9f77e724eca6b9a40',
        'go_to': '5a8b3815214d0d4ec8acbc14'
    },
    'tags': []
}
];

 treeData = d3.stratify()
  .id(function(d) { return d._id; })
  .parentId(function(d) { return d.context.context; })
  (this.flatData);

  constructor(private json: JsonService) {



//     function Node(data) {
//       this.data = data;
//       this.parent = null;
//       this.children = [];
//     }

//    function  Tree(data) {
//       const node = new Node(data);
//       this._root = node;
//     }

//     const tree = new Tree('prova');

// // {data: 'prova', parent: null, children: []}
// console.log(tree);


   }




get() {
return this.json.getJson().subscribe(data => {
this.jsonRes = data;
 });


}





  ngOnInit() {
    this.get();
    console.log(this.treeData);

  }



}




