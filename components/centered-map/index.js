import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import mapboxGl, {Source, Layer, Popup} from 'react-mapbox-gl'
import bbox from '@turf/bbox'

import ErrorWrapper from '../error-wrapper'

import Events from './events'
import Feature from './feature'

const mapStyle = 'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json'

class CenteredMap extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    frozen: PropTypes.bool,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    frozen: false
  }

  constructor(props) {
    super(props)

    this.MapComponent = mapboxGl({
      interactive: !props.frozen
    })

    this.initialRender = true

    this.state = {
      bbox: bbox(props.data),
      marker: null
    }
  }

  componentDidMount() {
    this.initialRender = false
  }

  componentWillReceiveProps(newProps) {
    const {data} = this.props

    if (data !== newProps.data) {
      this.initialRender = true

      this.setState({
        bbox: bbox(newProps.data)
      })
    }
  }

  onMouseEnter = (layer, event) => {
    const canvas = event.target.getCanvas()
    canvas.style.cursor = 'pointer'

    let coordinates = event.lngLat
    const [feature] = event.features

    if (layer === 'point') {
      coordinates = feature.geometry.coordinates.slice()
    }

    this.setState({
      marker: {
        feature,
        coordinates,
        count: event.features.length
      }
    })
  }

  onMouseLeave = (layer, event) => {
    const canvas = event.target.getCanvas()
    canvas.style.cursor = ''

    this.setState({
      marker: null
    })
  }

  render() {
    const Map = this.MapComponent
    const {
      data, frozen,
      t
    } = this.props
    const {bbox, marker} = this.state

    const bounds = [
      [bbox[0], bbox[1]],
      [bbox[2], bbox[3]]
    ]

    return (
      <ErrorWrapper message={t('errors.map')}>
        <Map
          fitBounds={this.initialRender && bounds}
          fitBoundsOptions={{padding: 30, linear: true}}
          style={mapStyle} /* eslint-disable-line react/style-prop-object */
          flyToOptions={{speed: 0.8}}
          containerStyle={{
            height: '100%',
            width: '100%'
          }}
        >
          <Source id='centered-map' geoJsonSource={{
            type: 'geojson',
            data
          }} />

          {/* Point */}
          <Layer
            sourceId='centered-map'
            id='point'
            type='circle'
            filter={['in', '$type', 'Point']}
            paint={{
              'circle-radius': 5,
              'circle-color': '#3099df',
              'circle-opacity': 0.6
            }}
          />

          {/* Polygon */}
          <Layer
            sourceId='centered-map'
            id='polygon'
            type='fill'
            filter={['==', '$type', 'Polygon']}
            paint={{
              'fill-color': '#3099df',
              'fill-opacity': 0.3
            }}
          />

          <Layer
            sourceId='centered-map'
            id='polygon-outline'
            type='line'
            filter={['==', '$type', 'Polygon']}
            paint={{
              'line-color': '#4790E5',
              'line-width': 2
            }}
          />

          {/* LineString */}
          <Layer
            id='line'
            sourceId='centered-map'
            type='line'
            filter={['==', '$type', 'LineString']}
            paint={{
              'line-color': '#3099df',
              'line-width': 5,
              'line-opacity': 0.8
            }}
          />

          {!frozen && (
            <Events
              layers={['point', 'polygon', 'line']}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            />
          )}

          {marker && (
            <Popup coordinates={marker.coordinates}>
              <Feature feature={marker.feature} otherFeaturesCount={marker.count - 1} />
            </Popup>
          )}
        </Map>
      </ErrorWrapper>
    )
  }
}

export default translate()(CenteredMap)
