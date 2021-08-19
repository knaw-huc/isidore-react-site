import React from 'react';
import { Provider } from 'react-redux'
import PluginProvider from 'mirador';
import MiradorApp from 'mirador'
import createStore from 'mirador'
import createRootReducer from 'mirador';
import settings from 'mirador'
import * as actions from 'mirador'


class Viewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        const store = createStore()
        settings.theme.palette.type = 'dark'
        store.dispatch(actions.setConfig(settings))
        store.dispatch(actions.setWorkspaceAddVisibility(true))
        this.setState({ store: store })
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <PluginProvider plugins={[]} createRootReducer={createRootReducer}>
                    <MiradorApp/>
                </PluginProvider>
            </Provider>
        )
    }
}