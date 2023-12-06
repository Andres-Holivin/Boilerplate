import { StyleFunctionProps, ThemeConfig, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
  cssVarPrefix: "chakra-ui-",
};

// 3. extend the theme
const theme = extendTheme({
  config: config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("blue.800", "red.900")(props),
        bg: mode("blue", "red.800")(props),
      },
    }),
  },
});

export default theme;
