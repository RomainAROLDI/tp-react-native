import {FlatList, Text, View} from "react-native";
import useAppStyle from "../../AppStyles";
import {useEffect, useState} from "react";
import {Button} from "../../components/Button";

export const Material = ({navigation}) => {
    const stylesMaterial = {
        padding: 15,
        margin: 5,
        backgroundColor: "#eee",
        borderRadius: 5,
        minHeight: 50,
        width: "100%",
        alignSelf: "center",
    };

    const styles = useAppStyle();

    const [material, setMaterial] = useState([]);

    useEffect(() => {
        console.log("send");
        fetch("http://192.168.43.58:3000/materials")
            .then((result) => result.json())
            .then((materials) => {
                setMaterial(materials);
                console.log("received");
            });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                style={{width: "100%", padding: 15}}
                data={material}
                renderItem={({item}) => (
                    <View
                        style={[
                            stylesMaterial,
                            item.complete ? {backgroundColor: "#beebc0"} : {},
                        ]}
                    >
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
            ></FlatList>
            <Button
                fab
                icon="plus"
                onPress={() => navigation.navigate("Add material")}
            ></Button>
        </View>
    );
};
