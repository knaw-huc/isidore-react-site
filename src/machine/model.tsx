import {assign, Machine} from "xstate";

export const IsiMachine = Machine<{
    search_string: string,
    manuscript_id: string
}, {
    states: {
        fourOhFour: {},
        detail: {},
        search: {},
        viewer: {}
    }
}>(
    {
        id: 'fetch',
        initial: 'search',
        context: {
            search_string: "none",
            manuscript_id: "",
        },
        on: {
            detail: {
                actions: assign({
                    manuscript_id: (context, event) => event.manuscript_id
                }),
                target: "detail"
            },
            search: {
                actions: assign({
                    search_string: (context, event) => event.search_string
                }),
                target: "search"
            },
            viewer: {
               actions: assign({
                   manuscript_id: (context, event) => event.manuscript_id
               }),
                target: "viewer"
            },
            "*": "fourOhFour"
        },
        states: {
            fourOhFour: {},
            detail: {
                on: {
                    search: "search",
                    detail: "detail",
                    viewer: "viewer"
                }
            },
            search: {
                on: {
                    item: "detail",
                    viewer: "viewer"
                }
            },
            viewer: {}
        }
    }
);