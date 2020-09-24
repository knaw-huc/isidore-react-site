import {assign, Machine} from "xstate";

export const IsiMachine = Machine<{
    search_string: string
}, {
    states: {
        fourOhFour: {},
        detail: {},
        search: {},
    }
}>(
    {
        id: 'fetch',
        initial: 'detail',
        context: {
            search_string: "none"
        },
        on: {
            detail: "detail",
            search: {
                actions: assign({
                    search_string: (context, event) => event.search_string
                }),
                target: "search"
            },
            "*": "fourOhFour"
        },
        states: {
            fourOhFour: {},
            detail: {
                on: {
                    search: "search"
                }
            },
            search: {
                on: {
                    item: "detail"
                }
            }
        }
    }
);