export interface IMultiSelect {
    attribute: string;
    form: any;
    optionLabel?:string;
    maxSelectedLabels?:number;
    fieldType?: 'top-label' | 'no-label';
}
