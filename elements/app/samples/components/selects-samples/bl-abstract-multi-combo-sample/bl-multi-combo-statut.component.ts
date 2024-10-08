import { AfterViewInit, ChangeDetectorRef, Component, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BlBasicObject, BlMultiComboAbstractComponent } from '@esedit-md/shared-ui';
import { StaticBddService } from '../../../../services/static-bdd.service';
import { Input } from 'postcss';

@Component({
    selector: 'bl-multi-combo-statut',
    template: `
        <bl-multi-combo-abstract [label]="'sample.status.list.title' "
                                 [data]="lst"
                                 [displayCode]="displayCode"
                                 [placeholder]="'sample.status.list.none' "
                                 [formControl]="formControl"
                                 [id]="id"
                                 [testLabelValue]="testLabelValue"
                                 [appearance]="appearance"
                                 [readOnly]="readOnly"
                                 (selectableListChangeEvent)="selectableListChangeEvent.emit($event)"
                                 [autoSelectIfOneElement]="autoSelectIfOneElement"
        >
        </bl-multi-combo-abstract>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BlMultiComboStatutComponent),
            multi: true
        }
    ]
})
export class BlMultiComboStatutComponent extends BlMultiComboAbstractComponent implements AfterViewInit {

    public lst: BlBasicObject[];
    constructor(private staticBddService: StaticBddService,
        private changeDetectorRef: ChangeDetectorRef) {
        super();
        this.id = 'mcStatut';

    }
    public OneElement: BlBasicObject[] = [];
    /* override */ ngAfterViewInit(): void {
        this.loadList();
        this.OneElement.push({
            id: 102,
            code: 'One Element',
            label: 'Un seul élement!',
        });
       
        if (this.autoSelectIfOneElement) {

            this.lst = this.OneElement;
        }
    }


    private loadList(): void {
        this.staticBddService.listStatus().subscribe((c: BlBasicObject[]) => {
            this.lst = c;
            this.changeDetectorRef.detectChanges();
        });
    }


}
