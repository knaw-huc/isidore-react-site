export interface IResultManuscript {
    shelfmark: string,
    bischoff: string,
    cla: string,
    material_type: string,
    designed_as: string,
    absolute_places: IAbsolutePlace[],
    scaled_dates: IScaledDate[],
    physical_state: string,
    certainty: string,
    no_of_folia: string,
    page_height_min: string,
    page_width_min: string,
    image: string;
    additional_content_scaled: string,
    books_latin: string,
    id: string
}

export interface IAbsolutePlace {
    place_absolute: string
}

export interface IScaledDate {
    date: string;
}

export interface IResultManuscriptList {
    amount: number,
    pages: number,
    manuscripts: IResultManuscript[]
}

export interface IFacetState {
    search: boolean;
}

export interface ISearchValues {
    name: string,
    field: string,
    values: string[]
}

export interface ISearchObject {
    facetstate: IFacetState,
    searchvalues: ISearchValues[] | string,
    page: number,
    sortorder: string;
}

export interface IManuscript {
    shelfmark: string,
    steinova: string,
    bischoff: string,
    anspach: string,
    bischoff_cla_date: string,
    place_absolute: string,
    material_type: string,
    uncertainty: string,
    provenance: string,
    no_of_folia: string,
    layout: string[],
    script: string,
    content: IManuscriptContent[],
    type: string,
    additional_content: string[],
    larger_unit: string[],
    related_manuscripts: IRelatedManuscripts[],
    annotations: string,
    innovations: string,
    additional_observations: string,
    bibliography: IStringList[],
    digitized_at: IStringList[],
    image: string;
}

export interface IRelatedManuscripts {
    reason: string,
    intern: IInsideRelations[],
    extern: IRelations[]
}

export interface IInsideRelations {
    id: string,
    shelfmark: string
}

export interface IStringList {
    item: string
}

export interface IRelations {
    item: string
}

export interface IManuscriptContent {
    details: string,
    locations: string
}
