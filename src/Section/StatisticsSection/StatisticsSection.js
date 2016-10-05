import React from 'react'
import MediaQuery from 'react-responsive'
import DoughnutChart from '../../Charts/DoughnutChart/DoughnutChart'
import BarChart from '../../Charts/BarChart/BarChart'
import Percent from '../../Statistics/Percent/Percent'

const StatisticsSection = ({metrics}) => {
  const styles = {
    section: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    column:{
      display: 'flex',
      flexDirection: 'column',
    },
    chart: {
      margin: '3em',
    },
  }
    return (
      <div style={styles.section}>
        <div style={styles.chart}>
          <Percent value={metrics.partitions['openness'] ? metrics.partitions['openness'].yes : 0} total={metrics.totalCount} label="openness" icon="unlock alternate icon" description="Percentage of open source data." />
        </div>

        <div style={styles.chart}>
          <Percent value={metrics.partitions['download'] ? metrics.partitions['download'].yes : 0} total={metrics.totalCount} label="download" icon="download" description="Percentage of successfully downloaded data." />
        </div>

        <div style={styles.chart}>
          <DoughnutChart data={metrics.partitions.recordType} title={'Record Type'} description={'Distribution of record types'} />
        </div>

        <div style={styles.chart}>
          <DoughnutChart data={metrics.partitions.metadataType} title={'Metadata Type'} description={'Distribution of metadata types'} />
        </div>

        <MediaQuery style={styles.chart} maxWidth={550} >
          <BarChart data={metrics.partitions.dataType} title={'Data Type'} description={'Distribution of data types'} width={260} height={180} />
        </MediaQuery>

        <MediaQuery style={styles.chart} minWidth={551}>
          <BarChart data={metrics.partitions.dataType} title={'Data Type'} description={'Distribution of data types'} width={420} height={260} />
        </MediaQuery>

      </div>
    )
}

export default StatisticsSection
