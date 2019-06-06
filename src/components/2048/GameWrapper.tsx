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
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  open?: boolean;
}

const GameWrapper: React.SFC<IProps> = ({ open = false, classes }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container} />
    </div>
  );
};

export { GameWrapper };

export default withStyles(styles)(GameWrapper);
