import React, {useState} from "react";
import {TextInput, Text, View} from "react-native";
import useAppStyle from "../AppStyles";

const EmailInput = ({}) => {
    const [email, setEmail] = useState("");
    const [isValidMail, setIsValidMail] = useState(false);
    //const [isExistMail, setIsExistMail] = useState(false);

    const validateEmail = (input) => {
        setEmail(input);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setIsValidMail(emailRegex.test(input))
        //setIsExistMail()
    };

    const styles = useAppStyle();

    return (
        <View style={styles.mb}>
            <TextInput
                placeholder="Enter your email"
                onChangeText={validateEmail}
                value={email}
            />
            <Text style={{color: isValidMail ? "green" : "red"}}>
                {isValidMail
                    ? "Email format is valid"
                    : "Email format is not valid"}
            </Text>
            {/*<Text style={{ color: isExistMail ? "green" : "red" }}>
        {isExistMail
          ? "Email adress is valid"
          : "Email adress is not valid"}
        </Text>*/}
        </View>
    );
};

export default EmailInput;