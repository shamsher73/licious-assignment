import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Button } from 'react-native';

interface SearchBarProps {
    onSearch: (query: string) => void; // Callback function for search query
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChangeText = (text: string) => {
        setQuery(text);
        // Call onSearch callback with the search query
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={query}
                onChangeText={handleChangeText}
                placeholder="Search Books..."
                style={styles.input}
            />
            <View>
                <Button onPress={() => { onSearch(query); }} title="Search" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        width: 200
    },
});

export default SearchBar;
