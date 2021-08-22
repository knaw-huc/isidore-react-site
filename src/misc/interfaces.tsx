export interface IResultManuscript {
    shelfmark: string,
    bischoff: string,
    cla: string,
    material_type: string,
    designed_as: string,
    absolute_places: IAbsolutePlace[],
    library: IModernPlace[],
    scaled_dates: IScaledDate[],
    physical_state: string,
    certainty: string,
    no_of_folia: string,
    page_height_min: string,
    page_width_min: string,
    image: string;
    additional_content_scaled: string,
    books_latin: string,
    id: string,
}

export interface IAbsolutePlace {
    place_absolute: string,
    latitude: number,
    longitude: number
}

export interface IModernPlace {
    place_name: string,
    latitude: number,
    longitude: number
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
    search: boolean,
    geo: boolean,
    dateLabel: boolean,
    book: boolean,
    dimensions: boolean,
    filters: boolean,
    physicalState: boolean,
    script: boolean,
    manuscript: boolean,
    layout: boolean,
    transmitted: boolean,
    provenance: boolean,
    authors: boolean,
    currentplace: boolean,
    region: boolean,
    diagrams: boolean,
    innovations: boolean,
    annotations: boolean,
    relations: boolean,
    digitized: boolean,
    larger: boolean,
    exclude: boolean
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
    page_length: number,
    sortorder: string,
    is_list: boolean;
}

export interface IManuscript {
    id: string,
    shelfmark: string,
    former_shelfmarks: string,
    siglum: string,
    steinova: string,
    bischoff: string,
    anspach: string,
    bischoff_cla_date: string,
    cla: string,
    source_dating: string,
    designed_as: string,
    physical_state_scaled: string,
    physical_state: string;
    place_absolute: string,
    material_type: string,
    uncertainty: string,
    provenances: IProvenance[],
    no_of_folia: string,
    layout: string[],
    script: string,
    content: IManuscriptContent[],
    type: string,
    additional_content: string[],
    larger_unit: string[],
    related_manuscripts: IRelatedManuscripts[],
    interpolations: IInterpolation[],
    easter_tables: IEaster_table[],
    annotations: IAnnotation[],
    diagrams: IDiagram[],
    innovations: string,
    additional_observations: string,
    bibliography: IStringList[],
    digitized_at: IDigitized[],
    url_other: string,
    image: string,
    page_number: string,
    iiif: string,
    created_by: string,
    created_on: string,
    contributions_from: string,
    completeness_of_the_record: string,
    last_updated_on: string
}

export interface IDigitized {
    other_links: string,
    label: string
}

export interface IProvenance {
    provenance: string;
}

export interface IInterpolation {
    interpolation: string,
    folia: string,
    description: string
}

export interface IDiagram {
    diagram_type: string,
    folia: string,
    description: string
}

export interface IEaster_table {
    easter_table_type: string,
    folia: string,
    remarks: string
}

export interface IAnnotation {
    number_of_annotations: string,
    books: string,
    language: string,
    remarks: string
}

export interface IRelatedManuscripts {
    reason: string,
    intern: IInsideRelations[],
    extern: IOutsideRelations[]
}

export interface IInsideRelations {
    id: string,
    shelfmark: string
}

export interface IOutsideRelations {
    name: string
}

export interface IStringList {
    item: string
}

export interface IRelations {
    item: string
}

export interface IManuscriptContent {
    material_type: string,
    books_included: string,
    details: IManuscriptContentPair[]
}

export interface IManuscriptContentPair {
    details: string,
    locations: string
}

export interface facetData {
    key: string,
    doc_count: number
}

export interface facetList {
    buckets: facetData[]
}

export interface filterNumbers {
    annotations: number,
    digitized: number,
    excluded: number,
    part: number
}

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface ISendCandidate {
    (data: IFacetCandidate):void
}

export interface ISearchValues {
    name: string,
    field: string,
    values: string[]
}

export interface IRemoveFacet {
    (field: string, value: string): void
}

export interface IResetFacets {
    (): void
}

export interface ISortFacetValue {
    facetValue: string,
    amount: number
}