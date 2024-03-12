import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@FavoriteBooks';
const LIKE_STORAGE_KEY = '@LikedBooks';

export const getFavoritesAsync = async () => {
    try {
        const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        return parsedFavorites;
    } catch (error) {
        console.error('Error retrieving favorites:', error);
    }
};

export const getLikesAsync = async () => {
    try {
        const storedLikes = await AsyncStorage.getItem(LIKE_STORAGE_KEY);
        const parsedLikes = storedLikes ? JSON.parse(storedLikes) : [];
        return parsedLikes;
    } catch (error) {
        console.error('Error retrieving likes:', error);
    }
};

export const setFavoritesAsync = async (updatedFavorites: string[]) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
};

export const setLikesAsync = async (updatedLikes: string[]) => {
    try {
        await AsyncStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify(updatedLikes));
    } catch (error) {
        console.error('Error saving likes:', error);
    }
};