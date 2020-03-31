/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const siteConfig = require(process.cwd() + '/siteConfig.js')

function docUrl (doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc
}

class Button extends React.Component {
  render () {
    return (
      <div className='pluginWrapper buttonWrapper'>
        <a className='button' href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    )
  }
}

Button.defaultProps = {
  target: '_self'
}

const SplashContainer = props => (
  <div className='homeContainer'>
    <div className='homeSplashFade'>
      <div className='wrapper homeWrapper'>{props.children}</div>
    </div>
  </div>
)

const ProjectTitle = props => (
  <h2 className='projectTitle'>
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
)

const PromoSection = props => (
  <div className='section promoSection'>
    <div className='promoRow'>
      <div className='pluginRowBlock'>{props.children}</div>
    </div>
  </div>
)

class HomeSplash extends React.Component {
  render () {
    let language = this.props.language || ''
    return (
      <SplashContainer>
        <div className='inner'>
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('mb-overview.html', language)}>Money Button</Button>
            <Button href={docUrl('api-overview.html', language)}>API</Button>
            <Button href={docUrl('ex-overview.html', language)}>Examples</Button>
            <Button href={docUrl('paymail-overview.html', language)}>Paymail</Button>
            <Button href={docUrl('bsv-overview.html', language)}>bsv</Button>
          </PromoSection>
          <p style={{ maxWidth: '600px', textAlign: 'left', margin: '20px auto' }}>
            Money Button is an API and a UI/UX layer for the Bitcoin SV blockchain. It is
            very easy to add a Money Button to websites and apps to accept payments. In a
            few lines of code, you can accept tips or display content behind a pay wall.
          </p>

          <p style={{ maxWidth: '600px', textAlign: 'left', margin: '20px auto' }}>
            However, Money Button is far more than that. There is built-in currency
            conversion, authentication, smart contracts, support for multiple outputs, and
            the ability to write data such as files, receipts or invoices to the blockchain.
            Additionally, with our API, design components, and bsv library, one can build
            sophisticated full-featured on-chain apps. Our technical mission is to support
            every feature of Bitcoin SV in a manner that is as easy to use as possible, both
            for developers and end-users.
          </p>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render () {
    let language = this.props.language || ''

    return (
      <div>
        <HomeSplash language={language} />
        <div className='mainContainer'>
          {/* <Features /> */}
          {/* <FeatureCallout /> */}
          {/* <LearnHow /> */}
          {/* <TryOut /> */}
          {/* <Description /> */}
        </div>
      </div>
    )
  }
}

module.exports = Index
