import {Text, View} from "react-native";
import useAppStyle from "../../AppStyles";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import {Divider} from "react-native-elements";

export const Inscription = () => {
    const styles = useAppStyle();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <View style={styles.form}>
                <EmailInput/>
                <PasswordInput
                    minPasswordLength={6}
                    maxPasswordLength={15}
                    minNumericChars={2}
                    minSpecialChars={1}
                />
            </View>
        </View>
    );
};
