import { withTranslation } from 'react-i18next'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '../shared/components/Tooltip'
import { renderXRP } from '../shared/utils'
import PauseIcon from '../shared/images/ic_pause.svg'
import ResumeIcon from '../shared/images/ic_play.svg'
import './css/ledgerMetrics.scss'
import SocketContext from '../shared/SocketContext'

const DEFAULTS = {
  load_fee: '--',
  txn_sec: '--',
  txn_ledger: '--',
  ledger_interval: '--',
  avg_fee: '--',
  quorum: '--',
  nUnl: [],
}

class LedgerMetrics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltip: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...prevState, ...nextProps }
  }

  showTooltip = (event) => {
    const { nUnl } = this.state.data
    this.setState({
      tooltip: {
        data: { nUnl },
        mode: 'nUnl',
        v: nUnl,
        x: event.currentTarget.offsetLeft,
        y: event.currentTarget.offsetTop,
      },
    })
  }

  hideTooltip = () => this.setState({ tooltip: null })

  renderPause() {
    const { t, onPause, paused } = this.props
    const Icon = paused ? ResumeIcon : PauseIcon
    const text = paused ? 'resume' : 'pause'

    return (
      <div
        tabIndex={0}
        role="button"
        className="pause-resume"
        onClick={onPause}
        onKeyUp={onPause}
      >
        <Icon className="icon" alt={t(text)} />
        <span>{t(text)}</span>
      </div>
    )
  }

  render() {
    const { language, t } = this.props
    const { data: stateData } = this.state
    const data = { ...DEFAULTS, ...stateData }

    if (data.load_fee === '--') {
      data.load_fee = data.base_fee || '--'
    }
    delete data.base_fee
    const items = Object.keys(data)
      .map((key) => {
        let content = null

        let className = 'label'
        if (data[key] === undefined && key !== 'nUnl') {
          content = '--'
        } else if (key.includes('fee') && !isNaN(data[key])) {
          content = renderXRP(data[key], language)
        } else if (key === 'ledger_interval' && data[key] !== '--') {
          content = `${data[key]} ${t('seconds_short')}`
        } else if (key === 'nUnl' && data[key]?.length === 0) {
          return null
        } else if (key === 'nUnl') {
          content = data[key].length
          className = 'label n-unl-metric'
          return (
            <div
              role="link"
              className="cell"
              onFocus={() => {}}
              onBlur={() => {}}
              onMouseOver={(e) => this.showTooltip(e)}
              onMouseOut={this.hideTooltip}
              tabIndex={0}
              key={key}
            >
              <a
                key={`link ${key}`}
                href="https://xrpl.org/negative-unl.html"
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {t(key)}
              </a>
              <span>{content}</span>
            </div>
          )
        } else {
          content = data[key]
        }

        return (
          <div className="cell" key={key}>
            <div className={className}>{t(key)}</div>
            <span>{content}</span>
          </div>
        )
      })
      .reverse()

    const { tooltip } = this.state

    // eslint-disable-next-line react/destructuring-assignment
    const isOnline = this.context.getState().online

    return (
      <div className="metrics-control">
        {isOnline && (
          <>
            <div className="control">{this.renderPause()}</div>
            <div className="metrics">{items}</div>
            <Tooltip tooltip={tooltip} />
          </>
        )}
      </div>
    )
  }
}

LedgerMetrics.contextType = SocketContext

LedgerMetrics.propTypes = {
  data: PropTypes.shape({}),
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
}

LedgerMetrics.defaultProps = {
  data: {},
}

export default withTranslation()(LedgerMetrics)
