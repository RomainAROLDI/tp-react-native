import React, {useState} from "react";
import {TextInput, Text, View} from "react-native";

const PasswordInput = ({
                           minPasswordLength = 8,
                           maxPasswordLength = 20,
                           minNumericChars = 1,
                           minSpecialChars = 1,
                       }) => {
    const [password, setPassword] = useState("");
    const [isValidLength, setIsValidLength] = useState(false);
    const [hasEnoughNumericChars, setHasEnoughNumericChars] = useState(false);
    const [hasEnoughSpecialChars, setHasEnoughSpecialChars] = useState(false);

    const validatePassword = (input) => {
        setPassword(input);
        setIsValidLength(input.length >= minPasswordLength && input.length <= maxPasswordLength);
        setHasEnoughNumericChars((input.match(/\d/g) || []).length >= minNumericChars);
        setHasEnoughSpecialChars((input.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/) || []).length >= minSpecialChars);
    };

    return (
        <View>
            <TextInput
                secureTextEntry
                placeholder="Enter your password"
                onChangeText={validatePassword}
                value={password}
            />
            <Text style={{color: isValidLength ? "green" : "red"}}>
                {isValidLength
                    ? "Password length is valid"
                    : `Password length should be between ${minPasswordLength} and ${maxPasswordLength} characters`}
            </Text>
            <Text style={{color: hasEnoughNumericChars ? "green" : "red"}}>
                {hasEnoughNumericChars
                    ? `Contains at least ${minNumericChars} numeric character(s)`
                    : `Requires at least ${minNumericChars} numeric character(s)`}
            </Text>
            <Text style={{color: hasEnoughSpecialChars ? "green" : "red"}}>
                {hasEnoughSpecialChars
                    ? `Contains at least ${minSpecialChars} special character(s)`
                    : `Requires at least ${minSpecialChars} special character(s)`}
            </Text>
        </View>
    );
};

export default PasswordInput;