import React from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { Icons } from '../icons/icons';
import { Book } from '../common/types';

interface BookCardProps {
    book: Book;
    onPress?: () => void;
    isFavorite?: boolean; // Add an optional isFavorite prop
    onToggleFavorite?: (bookId: string) => void; // Add a function for toggling favorite
    isLiked?: boolean;
    onToggleLike?: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPress, isFavorite, onToggleFavorite, isLiked, onToggleLike }) => {
    const { title, authors, cover_id, first_publish_year, description, cover_i, author_name, key } = book;
    const handleFavoritePress = () => {
        if (onToggleFavorite) {
            onToggleFavorite(book.key.toString());
        }
    };

    const handleLikePress = () => {
        if (onToggleLike) {
            onToggleLike(book.key.toString());
        }
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: `https://covers.openlibrary.org/b/id/${cover_id || cover_i}-M.jpg` }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text>By:
                    {authors && authors.map(author => author.name)}
                    {author_name && author_name.join(',')}
                </Text>
                <Text>Published: {first_publish_year}</Text>
                <Text>{description}</Text>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={handleFavoritePress}>
                        <Image resizeMode='contain'
                            style={styles.icon}
                            source={isFavorite ? Icons.starFav : Icons.unstarFav} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLikePress}>
                        <Image resizeMode='contain'
                            style={[styles.icon, styles.likeIcon]}
                            source={isLiked ? Icons.like : Icons.unlike} />
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 150
    },
    infoContainer: {
        padding: 10
    },
    title: {
        fontWeight: 'bold'
    },
    actionsContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 24,
        marginRight: 10
    },
    likeIcon: {
        marginLeft: 10
    }
});

export default BookCard;
