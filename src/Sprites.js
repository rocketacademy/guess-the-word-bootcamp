import React from "react";

const Sprite = (props) => {
  const sprite1Url =
    "https://mario.wiki.gallery/images/c/c7/HM_Bowser_walk.gif";
  const sprite2Url =
    "https://mario.wiki.gallery/images/d/d2/Peach_and_Perry.gif";

  const { numGuessLeft, globalWordDisplay } = props;

  // Set the width of the viewport
  const viewportWidth = window.innerWidth;

  // spaceWidth determines the space between the sprites, shrinks with each guess
  const spaceWidth =
    numGuessLeft === 0 && !globalWordDisplay.includes("_")
      ? (1 / 10) * viewportWidth * 0.4
      : (numGuessLeft / 10) * viewportWidth * 0.4;

  // Added this spriteMargin to allow the sprites to overlap once the spaceWidth is zero
  const spriteMargin = spaceWidth === 0 ? -35 : 0;

  const styles = {
    space: {
      width: `${spaceWidth}px`,
      height: "150px",
      position: "relative",
    },
    sprite: {
      width: "125px",
      height: "125px",
      objectFit: "contain",
    },
    sprite1: {
      marginRight: `${spriteMargin}px`,
      zIndex: "1",
    },
    sprite2: {
      marginLeft: `${spriteMargin}px`,
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
