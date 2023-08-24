import {StatusBar} from "expo-status-bar";
import {Connexion} from "./screens/Connexion/Connexion";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {Inscription} from "./screens/Inscription/Inscription";
import {Liste} from "./screens/Liste/Liste";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useState} from "react";
import {Material} from "./screens/Material/Material";
import {AjoutTache} from "./screens/AjoutTache/AjoutTache";
import AddMaterialForm from "./screens/AddMaterialForm/AddMaterialForm";

const App = () => {
    const Drawer = createDrawerNavigator();

    const [connected, setConnected] = useState(false);

    const ConnexionNavigator = createNativeStackNavigator();

    const ConnexionScreen = ({navigation}) => (
        <Connexion
            navigation={navigation}
            onConnexion={() => setConnected(true)}
        ></Connexion>
    );

    return connected ? (
        <Drawer.Navigator>
            <Drawer.Screen component={Liste} name="Stuff list"></Drawer.Screen>
            <Drawer.Screen component={AjoutTache} name="Add task"></Drawer.Screen>
            <Drawer.Screen component={Material} name="Material list"></Drawer.Screen>
            <Drawer.Screen component={AddMaterialForm} name="Add material"></Drawer.Screen>
        </Drawer.Navigator>
    ) : (
        <ConnexionNavigator.Navigator>
            <ConnexionNavigator.Screen
                component={ConnexionScreen}
                name="Login"
            ></ConnexionNavigator.Screen>
            <ConnexionNavigator.Screen
                component={Inscription}
                name="Sign in"
            ></ConnexionNavigator.Screen>
        </ConnexionNavigator.Navigator>
    );
};

export default () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar style="auto"/>
                <App></App>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};
