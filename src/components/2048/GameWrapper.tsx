import React from "react";
import classNames from "classnames";
import {
  withStyles,
  createStyles,
  Theme,
  WithStyles
} from "@material-ui/core/styles";

const styles = ({ spacing, transitions }: Theme) =>
  createStyles({
    wrapper: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    },
    container: {
      width: 600,
      height: 600,
      backgroundColor: "white",
      borderRadius: 20,
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
      display: "flex",
      justifyContent: "start",
      flexFlow: "row wrap",
      overflow: "hidden"
    },
    tileWrapper: {
      width: "25%",
      height: "25%"
    },
    tile: {
      margin: 8,
      width: "calc(100% - 20px)",
      height: "calc(100% - 20px)",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#f6f7f9",
      borderRadius: 20,
      overflow: "hidden"
    },
    tileContent: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      fontSize: 32,
      fontWeight: "bold",
      color: "white"
    },
    logo: {
      fontSize: 64
    }
  });

interface IProps extends WithStyles<typeof styles> {
  open?: boolean;
}

const GameWrapper: React.SFC<IProps> = ({ open = false, classes }) => {
  const placeRandomTile = (tiles_: any) => {
    const freeTiles = [];

    for (let i = 0; i < tiles_.length; i++) {
      if (tiles_[i].value === 0) {
        freeTiles.push(i);
      }
    }

    const freeTileIndex = Math.floor(Math.random() * freeTiles.length);
    tiles_[freeTiles[freeTileIndex]].value = 2;

    freeTiles.splice(freeTileIndex, 1);
  };

  const buildTiles = () => {
    const tiles_ = [];

    for (let i = 0; i < 16; i++) {
      tiles_.push({
        value: 0
      });
    }

    placeRandomTile(tiles_);

    return tiles_;
  };

  const [tiles, setTiles] = React.useState(() => {
    return buildTiles();
  });

  const colors = [
    "#85144b", // 2
    "#FF4136", // 4
    "#FF851B", // 8
    "#3D9970", // 16
    "#39CCCC", // 32
    "#7FDBFF", // 64
    "#0074D9", // 128
    "#001f3f", // 256
    "#B10DC9", // 512
    "#2ECC40", // 1024
    "#FFDC00" // 2048
  ];

  const getColor = (value: number) => {
    let v = 2;

    for (let i = 0; i < colors.length; i++) {
      if (v === value) {
        return colors[i];
      }

      v *= 2;
    }

    return colors[colors.length - 1];
  };

  const convert1To2 = (i: number) => {
    return {
      x: i % 4,
      y: (i - (i % 4)) / 4
    };
  };

  const convert2To1 = (x: number, y: number) => {
    return y * 4 + x;
  };

  const renderTile = (i: number, tile: any) => {
    return (
      <div className={classes.tileWrapper} key={i}>
        <div className={classes.tile}>
          {tile.value >= 2 && (
            <div
              className={classes.tileContent}
              style={{ backgroundColor: getColor(tile.value) }}
            >
              {tile.value === 128 ? (
                <i className={classNames(classes.logo, "ic ic-brand-mark")} />
              ) : (
                tile.value
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTiles = () => {
    return (
      <React.Fragment>
        {tiles.map((tile, index) => renderTile(index, tile))}
      </React.Fragment>
    );
  };

  const shiftUp = React.useCallback(() => {
    const tiles_ = tiles.slice(0);

    for (let i = 0; i < tiles_.length; i++) {
      const pos = convert1To2(i);
      const x = pos.x;
      const y = pos.y;

      let currentIndex = i;

      if (tiles_[currentIndex].value > 0) {
        for (let a = y - 1; a >= 0; a--) {
          const indexAbove = convert2To1(x, a);

          if (tiles_[indexAbove].value === 0) {
            tiles_[indexAbove].value = tiles_[currentIndex].value;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          } else if (tiles_[indexAbove].value === tiles_[currentIndex].value) {
            tiles_[indexAbove].value = tiles_[currentIndex].value * 2;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          }
        }
      }
    }

    placeRandomTile(tiles_);

    setTiles(tiles_);
  }, []);

  const shiftDown = React.useCallback(() => {
    const tiles_ = tiles.slice(0);

    for (let i = 0; i < tiles_.length; i++) {
      const pos = convert1To2(i);
      const x = pos.x;
      const y = pos.y;

      let currentIndex = i;

      if (tiles_[currentIndex].value > 0) {
        for (let a = y + 1; a < 4; a++) {
          const indexAbove = convert2To1(x, a);

          if (tiles_[indexAbove].value === 0) {
            tiles_[indexAbove].value = tiles_[currentIndex].value;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          } else if (tiles_[indexAbove].value === tiles_[currentIndex].value) {
            tiles_[indexAbove].value = tiles_[currentIndex].value * 2;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          }
        }
      }
    }

    placeRandomTile(tiles_);

    setTiles(tiles_);
  }, []);

  const shiftLeft = React.useCallback(() => {
    const tiles_ = tiles.slice(0);

    for (let i = 0; i < tiles_.length; i++) {
      const pos = convert1To2(i);
      const x = pos.x;
      const y = pos.y;

      let currentIndex = i;

      if (tiles_[currentIndex].value > 0) {
        for (let a = x - 1; a >= 0; a--) {
          const indexAbove = convert2To1(a, y);

          if (tiles_[indexAbove].value === 0) {
            tiles_[indexAbove].value = tiles_[currentIndex].value;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          } else if (tiles_[indexAbove].value === tiles_[currentIndex].value) {
            tiles_[indexAbove].value = tiles_[currentIndex].value * 2;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          }
        }
      }
    }

    placeRandomTile(tiles_);

    setTiles(tiles_);
  }, []);

  const shiftRight = React.useCallback(() => {
    const tiles_ = tiles.slice(0);

    for (let i = 0; i < tiles_.length; i++) {
      const pos = convert1To2(i);
      const x = pos.x;
      const y = pos.y;

      let currentIndex = i;

      if (tiles_[currentIndex].value > 0) {
        for (let a = x + 1; a < 4; a++) {
          const indexAbove = convert2To1(a, y);

          if (tiles_[indexAbove].value === 0) {
            tiles_[indexAbove].value = tiles_[currentIndex].value;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          } else if (tiles_[indexAbove].value === tiles_[currentIndex].value) {
            tiles_[indexAbove].value = tiles_[currentIndex].value * 2;
            tiles_[currentIndex].value = 0;
            currentIndex = indexAbove;
          }
        }
      }
    }

    placeRandomTile(tiles_);

    setTiles(tiles_);
  }, []);

  const keydownListener = (event: KeyboardEvent) => {
    const key = event.key;

    console.log(tiles);

    if (key === "ArrowUp") {
      shiftUp();
      event.preventDefault();
    } else if (key === "ArrowDown") {
      shiftDown();
      event.preventDefault();
    } else if (key === "ArrowLeft") {
      shiftLeft();
      event.preventDefault();
    } else if (key === "ArrowRight") {
      shiftRight();
      event.preventDefault();
    }
  };

  const enableListeners = () => {
    document.addEventListener("keydown", keydownListener);
  };

  const disableListeners = () => {
    document.removeEventListener("keydown", keydownListener);
  };

  React.useEffect(() => {
    enableListeners();

    return () => {
      disableListeners();
    };
  });

  return (
    <React.Fragment>
      {open && (
        <div className={classes.wrapper}>
          <div className={classes.container}>{renderTiles()}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export { GameWrapper };

export default withStyles(styles)(GameWrapper);
