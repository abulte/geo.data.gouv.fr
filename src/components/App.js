import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import PageLayout from './PageLayout'
import ScrollToTop from './ScrollToTop'
import TrackPageViews from './TrackPageViews'

import DatasetRoute from '../routes/Dataset'
import CatalogRoute from '../routes/Catalogs'
import EventsRoute from '../routes/Events'
import PublicationRoute from '../routes/Publication'

import NotFoundRoute from '../routes/NotFound'

import '../styles/global.scss'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const { store } = this.props

    return (
      <Provider store={store}>
        <BrowserRouter>
          <PageLayout>
            <ScrollToTop />
            <TrackPageViews />

            <Switch>
              <Route path='/datasets/:datasetId' component={DatasetRoute} />
              <Route path='/catalogs' component={CatalogRoute} />
              <Route path='/events' component={EventsRoute} />
              <Route path='/publication' component={PublicationRoute} />

              <Route component={NotFoundRoute} />
            </Switch>
          </PageLayout>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
