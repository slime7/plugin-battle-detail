
import { PacketCompat } from 'lib/compat'

const {clipboard} = require('electron')
const {React, ReactBootstrap, remote, __, html2canvas, $} = window
const {Panel, Grid, Row, Col, Button, ButtonGroup, FormControl} = ReactBootstrap

class OptionArea extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.props.battle === nextProps.battle
    )
  }

  onClickExport = () => {
    let isSuccessful = false
    try {
      const {battle} = this.props
      if (battle != null) {
        let data = JSON.stringify(battle)
        clipboard.writeText(data)
        isSuccessful = true
      }
    }
    catch (err) {
      // Do nothing
    }
    if (isSuccessful) {
      window.showModal({
        title: __("Copy Data"),
        body : [__("The battle packet was copied to clipboard."),
                __("You can send your friends the packet to share the battle.")],
      })
    } else {
      window.showModal({
        title: __("Copy Data"),
        body : __("Failed to copy battle packet to clipboard!"),
      })
    }
  }

  onClickImport = () => {
    try {
      const data = clipboard.readText()
      let battle = JSON.parse(data)
      this.props.updateBattle(battle)
    }
    finally {
      window.showModal({
        title: __("Paste Data"),
        body : [__("A battle packet was pasted from clipboard."),
                __("If you see no battle detail, you may have a broken packet.")],
      })
    }
  }

  onClickSave = () => {
    html2canvas($('#battle-area'), {
      background: window.isVibrant ? "rgba(38,38,38,0.8)" : undefined,
      onrendered: (canvas) => {
        remote.getCurrentWebContents().downloadURL(canvas.toDataURL("image/png"))} ,
    })
  }

  render() {
    const {battle} = this.props
    let title = battle == null ? '' : PacketCompat.fmtTitle(battle)
    return (
      <div id="option-area">
        <Panel>
          <Grid>
            <Row>
              <Col xs={6}>
                <FormControl disabled value={title}></FormControl>
              </Col>
              <Col xs={6}>
                <ButtonGroup>
                  <Button bsStyle='primary' onClick={this.onClickExport}>{__("Copy Data")}</Button>
                  <Button bsStyle='primary' onClick={this.onClickImport}>{__("Paste Data")}</Button>
                  <Button bsStyle='primary' onClick={this.onClickSave}>{__("Save as Image")}</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    )
  }
}

export default OptionArea
