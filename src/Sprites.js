import React from "react";

const Sprite = (props) => {
  const sprite1Url =
    "https://mario.wiki.gallery/images/c/c7/HM_Bowser_walk.gif";
  const sprite2Url =
    "https://mario.wiki.gallery/images/d/d2/Peach_and_Perry.gif";

  const { numGuessLeft, maxSpaceWidth, globalWordDisplay } = props;
  const spaceWidth =
    numGuessLeft === 0 && !globalWordDisplay.includes("_")
      ? (1 / 10) * maxSpaceWidth
      : (numGuessLeft / 10) * maxSpaceWidth;
  const rightMargin = spaceWidth === 0 ? -50 : 0;

  const styles = {
    space: {
      width: `${spaceWidth}px`,
      height: "150px",
      position: "relative",
    },
    sprite: {
      width: "150px",
      height: "150px",
      objectFit: "contain",
    },
    sprite1: {
      marginRight: `${rightMargin}px`,
      zIndex: "1",
    },
    sprite2: {
      marginLeft: `${rightMargin}px`,
      zIndex: "0",
    },
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={sprite1Url}
        alt="Sprite 1"
        style={{ ...styles.sprite, ...styles.sprite1 }}
      />
      <div style={styles.space}></div>
      <img
        src={sprite2Url}
        alt="Sprite 2"
        style={{ ...styles.sprite, ...styles.sprite2 }}
      />
    </div>
  );
};

export default Sprite;
