import { makeStyles } from "@material-ui/core/styles";

const directions = { t: "Top", b: "Bottom", l: "Left", r: "Right" };

const useSpacing = () => {
  const styles = {};

  Array(15)
    .fill()
    .forEach((each, index) => {
      Object.keys(directions).forEach((key) => {
        // * * MARGIN * * //
        styles[`m${key}${index}`] = {
          [`margin${directions[key]}`]: `${index * 0.25}rem !important`,
        };

        styles[`ma${index}`] = {
          ...styles[`ma${index}`],
          [`margin${directions[key]}`]: `${index * 0.25}rem !important`,
        };

        // * * PADDING * * //
        styles[`p${key}${index}`] = {
          [`padding${directions[key]}`]: `${index * 0.25}rem !important`,
        };

        styles[`pa${index}`] = {
          ...styles[`pa${index}`],
          [`padding${directions[key]}`]: `${index * 0.25}rem !important`,
        };
      });

      // * * MARGIN * * //
      styles[`mx${index}`] = {
        marginLeft: `${index * 0.25}rem !important`,
        marginRight: `${index * 0.25}rem !important`,
      };

      styles[`my${index}`] = {
        marginTop: `${index * 0.25}rem !important`,
        marginBottom: `${index * 0.25}rem !important`,
      };

      // * * PADDING * * //
      styles[`px${index}`] = {
        paddingLeft: `${index * 0.25}rem !important`,
        paddingRight: `${index * 0.25}rem !important`,
      };

      styles[`py${index}`] = {
        paddingTop: `${index * 0.25}rem !important`,
        paddingBottom: `${index * 0.25}rem !important`,
      };
    });

  return makeStyles(styles)();
};

export default useSpacing;
