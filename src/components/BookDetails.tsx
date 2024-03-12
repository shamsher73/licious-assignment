import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Book } from '../common/types';

interface BookCardProps {
    book: Book;
}

const BookDetails: React.FC<BookCardProps> = ({ book }) => {
    const { title, authors, cover_id, first_publish_year, description, cover_i, author_name } = book;

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `https://covers.openlibrary.org/b/id/${cover_id || cover_i}-M.jpg` }}
                style={styles.image}
            />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>By:
                {authors && authors.map(author => author.name)}
                {author_name && author_name.join(',')}
            </Text>
            <Text style={styles.publishYear}>Published: {first_publish_year}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    image: {
        width: 200,
        height: 250,
        alignSelf: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    author: {
        marginBottom: 10
    },
    publishYear: {
        marginBottom: 10
    }
});


export default BookDetails;
