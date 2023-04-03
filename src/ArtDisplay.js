import React from "react";
import summer_0 from "./summer/summer_0.png";
import summer_1 from "./summer/summer_1.png";
import summer_2 from "./summer/summer_2.png";
import summer_3 from "./summer/summer_3.png";
import summer_4 from "./summer/summer_4.png";
import summer_5 from "./summer/summer_5.png";
import summer_6 from "./summer/summer_6.png";
import summer_7 from "./summer/summer_7.png";
import summer_8 from "./summer/summer_8.png";
import summer_9 from "./summer/summer_9.png";
import winter_0 from "./winter/winter_0.png";
import winter_1 from "./winter/winter_1.png";
import winter_2 from "./winter/winter_2.png";
import winter_3 from "./winter/winter_3.png";
import winter_4 from "./winter/winter_4.png";
import winter_5 from "./winter/winter_5.png";
import winter_6 from "./winter/winter_6.png";
import winter_7 from "./winter/winter_7.png";
import winter_8 from "./winter/winter_8.png";
import winter_9 from "./winter/winter_9.png";

class ArtDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summer: [
        summer_0,
        summer_1,
        summer_2,
        summer_3,
        summer_4,
        summer_5,
        summer_6,
        summer_7,
        summer_8,
        summer_9,
      ],
      winter: [
        winter_0,
        winter_1,
        winter_2,
        winter_3,
        winter_4,
        winter_5,
        winter_6,
        winter_7,
        winter_8,
        winter_9,
      ],
    };
  }

  render() {
    return (
      <div className="portrait">
        {this.state.winter.map((element) => {
          console.log(element);
          return (
            <img
              src={element}
              alt={element.toString()}
              key={element}
              className="portrait-segment"
            />
          );
        })}
        {this.state.summer.map((element) => {
          console.log(element);
          return (
            <img
              src={element}
              alt={element.toString()}
              key={element}
              className="portrait-segment"
            />
          );
        })}
      </div>
    );
  }
}

export default ArtDisplay;
