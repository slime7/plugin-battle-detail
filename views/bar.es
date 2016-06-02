"use strict"

const {React, ReactBootstrap} = window
const {ProgressBar} = ReactBootstrap
const {SlotitemIcon} = require(`${ROOT}/views/components/etc/icon`)

export class FABar extends React.Component {
  render() {
    let {max, now, icon} = this.props
    let pcnt = Math.round(100 * now / max)
    if (! (max && now)) {
      max = now = 0
      pcnt = 100
    }
    return (
      // <ProgressBar className="fa-bar" style={{'background-color': 'rgba(0,0,0,1)'}} now={pcnt} label={`${now}/${max} (${pcnt}%)`} />
      <span className='fa-bar'>
        <img src={`file://${ROOT}/assets/img/material/0${icon}.png`} />
        {`${pcnt}%`}
      </span>
    )
  }
}

export class HPBar extends React.Component {
  getHpStyle(percent) {
    if (percent <= 25)
      return 'danger'
    else if (percent <= 50)
      return 'warning'
    else if (percent <= 75)
      return 'info'
    else
      return 'success'
  }

  render() {
    let {max, from, to, damage, item} = this.props
    if (from > max) from = max
    if (to < 0) to = 0

    let now = 100 * to / max
    let lost = 100 * (from - to) / max
    let additions = []
    if (damage !== 0) {
      additions.push(`${-damage}`)
    }
    if (item && $slotitems[item]) {
      let itemIcon = $slotitems[item].api_type[3]
      additions.push(<SlotitemIcon slotitemId={itemIcon} />)
    }

    let labels = []
    labels.push(<span key={-1}>{`${to} / ${max}`}</span>)
    if (additions.length > 0) {
      labels.push(<span key={-2}>{' ('}</span>)
      additions.map((addition, i) => {
        labels.push(<span key={i*2+0}>{addition}</span>)
        labels.push(<span key={i*2+1}>{', '}</span>)
      })
      labels.pop()  // Remove last comma
      labels.push(<span key={-3}>{')'}</span>)
    }

    return (
      <ProgressBar className="hp-bar">
        <ProgressBar className="hp-bar" bsStyle={this.getHpStyle(now)} now={now} label={<span>{labels}</span>} />
        <ProgressBar className="hp-bar lost" now={lost} />
      </ProgressBar>
    )
  }
}
