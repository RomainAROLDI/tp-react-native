import {StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import useTheme from "./theme";

export default () => {
    const insets = useSafeAreaInsets();

    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            alignItems: "center",
            paddingBottom: insets.bottom,
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right
        },
        text: {
            color: theme.text,
        },
        title: {
            color: theme.text,
            fontSize: 32,
            marginBottom: 30
        },
        form: {
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "baseline"
        },
        mb: {
            marginBottom: 20
        }
    });

    return styles;
};
