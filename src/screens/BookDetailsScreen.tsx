import React from 'react';
import { View, Text, Button } from 'react-native';
import BookDetails from '../components/BookDetails';
import { useNavigation } from '@react-navigation/native';

const BookDetailsScreen = ({ route }) => {
    const { book } = route.params;
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: 60 }}>
                <Button onPress={() => { navigation.goBack() }} title="Back" />
            </View>
            < BookDetails book={book} />
        </View>
    )

};

export default BookDetailsScreen;