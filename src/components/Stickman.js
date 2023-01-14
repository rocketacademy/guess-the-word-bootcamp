import React from "react";
import './stickman.css'

export default class Stickman extends React.Component {
  // left = () => {
  //   const ctx = this.canvas.getContext('2d');
  //   ctx.moveTo(0, 0);
  //   ctx.lineTo(0, 200);
  //   ctx.stroke();
  // }
  
  
  
  render() {
    const { part, tries } = this.props

    const man = () => {
      if (tries === 1) {
        return <div className="left"/>
      } else if (tries === 2) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
          </div>
        )
      } else if (tries === 3) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
            <div className="rope"/>
          </div>
        )
      } else if (tries === 4) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
            <div className="rope"/>
            <div className="head"/>
          </div>
        )
      } else if (tries === 5) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
            <div className="rope"/>
            <div className="head"/>
            <div className="body"/>
          </div>
        )
      } else if (tries === 6) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
            <div className="rope"/>
            <div className="head"/>
            <div className="body"/>
            <div className="leftarm"/>
          </div>
        )
      } else if (tries === 7) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
            <div className="rope"/>
            <div className="head"/>
            <div className="body"/>
            <div className="leftarm"/>
            <div className="rightarm"/>
          </div>
        )
      } else if (tries === 8) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
            <div className="rope"/>
            <div className="head"/>
            <div className="body"/>
            <div className="leftarm"/>
            <div className="rightarm"/>
            <div className="leftleg"/>
          </div>
        )
      } else if (tries === 9) {
        return (
          <div>
            <div className="left"/>
            <div className="top"/>
            <div className="rope"/>
            <div className="head"/>
            <div className="body"/>
            <div className="leftarm"/>
            <div className="rightarm"/>
            <div className="leftleg"/>
            <div className="rightleg"/>
          </div>
        )
      }
    }


    return (
      <div>
        {/* <canvas ref={node => {this.canvas = node}} width='500' height='500' />
        {this.left} */}
        {man()}
      </div>
    )
  }
}