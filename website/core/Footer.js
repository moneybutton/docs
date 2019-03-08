/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

class Footer extends React.Component {
  docUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc
  }

  pageUrl (doc, language) {
    const baseUrl = this.props.config.baseUrl
    return baseUrl + (language ? language + '/' : '') + doc
  }

  render () {
    return (
      <footer className='nav-footer' id='footer'>
        <section className='sitemap'>
          <a href={this.props.config.baseUrl} className='nav-home'>
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width='66'
                height='58'
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('mb-overview.html', this.props.language)}>
              Money Button
            </a>
            <a href={this.docUrl('api-overview.html', this.props.language)}>
              API
            </a>
            <a href={this.docUrl('design-overview.html', this.props.language)}>
              Design
            </a>
            <a href={this.docUrl('bsv-overview.html', this.props.language)}>
              bsv
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href='https://www.reddit.com/r/moneybutton'
              target='_blank'
              rel='noreferrer noopener'
            >
              reddit
            </a>
            <a
              href='https://www.youtube.com/c/moneybutton'
              target='_blank'
              rel='noreferrer noopener'
            >
              Youtube
            </a>
            <a href='https://t.me/moneybuttonhelp'>Telegram</a>
            <a
              href='https://twitter.com/money_button'
              target='_blank'
              rel='noreferrer noopener'
            >
              Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href='https://blog.moneybutton.com'>Blog</a>
            <a href='https://www.instagram.com/money_button'>Instagram</a>
            <a href='https://github.com/moneybutton'>GitHub</a>
            <a
              className='github-button'
              href='https://github.com/moneybutton'
              data-icon='octicon-star'
              data-count-href='/react-money-button'
              data-show-count={false}
              data-count-aria-label='# stargazers on GitHub'
              aria-label='Star this project on GitHub'
            >
              Star
            </a>
          </div>
        </section>

        {/* <a
          href='https://code.facebook.com/projects/'
          target='_blank'
          rel='noreferrer noopener'
          className='fbOpenSource'
        >
          <img
            src={this.props.config.baseUrl + 'img/oss_logo.png'}
            alt='Facebook Open Source'
            width='170'
            height='45'
          />
        </a> */}
        <section className='copyright'>
          See an error in our documentation? <a target='_blank' href='https://github.com/moneybutton/docs'>Issue a pull request to fix it.</a><br />
          {this.props.config.copyright}
        </section>
      </footer>
    )
  }
}

module.exports = Footer
