import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import BookCard from '../components/BookCard';
import { useNavigation } from '@react-navigation/native';
import { getBooks, searchBooks } from '../api/OpenLibraryApi';
import SearchBar from '../components/SearchBar';
import { Book } from '../common/types';
import { getFavoritesAsync, getLikesAsync, setFavoritesAsync, setLikesAsync } from '../common/async';


const HomeScreen = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [favoriteBooks, setFavoriteBooks] = useState<string[]>([]); // Store favorite book IDs
    const [isLoading, setIsLoading] = useState(true); // Add state for loading
    const [likedBooks, setLikedBooks] = useState<string[]>([]);

    const navigation = useNavigation();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedBooks = await getBooks();
                const favs = await getFavoritesAsync();
                const likes = await getLikesAsync();
                setBooks(fetchedBooks);
                setFavoriteBooks(favs);
                setLikedBooks(likes);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        if (query) {
            const searchedBooks = await searchBooks(query);
            setBooks(searchedBooks); // Update books list with search results
        } else {
            const fetchedBooks = await getBooks();
            setBooks(fetchedBooks);
        }
        setIsLoading(false);
    };

    const toggleFavorite = async (key: string) => {
        const updatedFavorites = favoriteBooks.includes(key)
            ? favoriteBooks.filter(id => id !== key)
            : [...favoriteBooks, key];

        setFavoriteBooks(updatedFavorites);
        setFavoritesAsync(updatedFavorites);
    };

    const toggleLike = async (key: string) => {
        const updatedLikes = likedBooks.includes(key)
            ? likedBooks.filter(id => id !== key)
            : [...likedBooks, key];

        setLikedBooks(updatedLikes);
        setLikesAsync(updatedLikes);
    };


    const renderBookItem = ({ item }: { item: Book }) => (
        <BookCard
            book={item}
            onPress={() => navigation.navigate('BookDetails', { book: item })}
            isFavorite={favoriteBooks.includes(item.key.toString())} // Check if book is favorited
            onToggleFavorite={toggleFavorite}
            isLiked={likedBooks.includes(item.key.toString())}
            onToggleLike={toggleLike}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <SearchBar onSearch={handleSearch} />
            {isLoading ? (
                <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />
            ) : (
                <FlatList
                    data={books}
                    renderItem={renderBookItem}
                    keyExtractor={(item) => item.key || item.title}
                />
            )}
        </View>
    );
};

export default HomeScreen;
