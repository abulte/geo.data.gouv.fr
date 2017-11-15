import React from 'react'
import PropTypes from 'prop-types'

export const Content = ({ children, clouds }) => (
  <main>
    {children}

    <style jsx>{`
      @import 'colors';

      main {
        background-color: $white;
        padding: 2em 0 10em;
        display: flex;
        flex-direction: column;
        flex: 1;

        ${clouds && (`
          background: url('/static/images/clouds.svg') bottom -120px right 0, linear-gradient(to top, #41dcd7, #3083b2);
          background-repeat: no-repeat;
          background-size: 100%;
        `)}
      }
    `}</style>
  </main>
)

Content.propTypes = {
  children: PropTypes.node,
  clouds: PropTypes.bool
}

Content.defaultProps = {
  clouds: false
}

export default Content
