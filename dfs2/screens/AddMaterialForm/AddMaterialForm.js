import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import useAppStyle from "../../AppStyles";
import * as Location from 'expo-location';
import {Input} from "react-native-elements";

const AddMaterialForm = ({navigation}) => {
    const [location, setLocation] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const styles = useAppStyle();

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});

            setLocation(location);
        })();
    }, []);

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    };

    const onAddPhoto = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.granted === false) {
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const {assets} = result;
            if (assets && assets.length > 0) {
                setPhoto(assets[0].uri);
            }
        }
    };

    const handleAddMaterial = () => {
        fetch("http://192.168.43.58:3000/material", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                material: {
                    name: name
                }
            }),
        }).then((result) => navigation.navigate("Material list"));
    };

    return (
        <View style={{padding: 20}}>
            <TextInput
                placeholder="Nom"
                value={name}
                onChangeText={text => setName(text)}
                style={styles.mb}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={text => setDescription(text)}
                multiline
                style={styles.mb}
            />
            <Input
                disabled={!!location}
                placeholder="Location"
                value={location ? JSON.stringify(location) : ''}
                onChangeText={text => setLocation(text)}
                style={styles.mb}
            />
            <View style={styles.mb}>
                <Button
                    title="Sélectionner une photo"
                    onPress={() => onAddPhoto()}
                />
                {photo && <Image source={{uri: photo}} style={{width: 200, height: 200, marginTop: 10}}/>}
            </View>
            <View style={styles.mb}>
                <Text>Date de disponibilité:</Text>
                <Button title="Sélectionner la date" onPress={() => setShowStartDatePicker(true)}/>
                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        onChange={handleStartDateChange}
                    />
                )}
                {startDate && (
                    <Text style={{marginTop: 10}}>{startDate.toLocaleDateString()}</Text>
                )}
            </View>
            <View style={{marginBottom: 60}}>
                <Text>Date de fin de disponibilité:</Text>
                <Button title="Sélectionner la date" onPress={() => setShowEndDatePicker(true)}/>
                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        onChange={handleEndDateChange}
                    />
                )}
                {endDate && (
                    <Text style={{marginTop: 10}}>{endDate.toLocaleDateString()}</Text>
                )}
            </View>
            <Button title="Ajouter le matériel" onPress={handleAddMaterial}/>
        </View>
    );
};

export default AddMaterialForm;
