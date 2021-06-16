import { useState } from 'react';
import { addFavorite, removeFavorite } from '../../config/commands';

export default function useFavorites() {

    // Controls the administration of favorites, 
    // will be updating info to be displayed on the landing page

    const favoritesLimit = 10;
    const [favorites, setFavorites] = useState([]);

    async function handleFavorite(item) {
        if (isFavorited(item.item_name)) {
            await removeFavorite(item.item_name);

            // Removes the item that was favorites on the current page
            const removedFavorite = favorites.filter(fav_item => fav_item.item_name !== item.item_name);
            setFavorites(removedFavorite);
        } else {
            if (favorites.length + 1 > favoritesLimit) {
                return;
            }
            await addFavorite(item);

            // Records the item that was favorited on the current page
            const newFavorites = favorites.concat(item);
            setFavorites(newFavorites);
        }
    }

    function isFavorited(item_name) {
        return favorites.find(item => item.item_name === item_name);
    }

    function favoritesFull() {
        return (favorites.length >= favoritesLimit);
    }

    return {
        handleFavorite,
        isFavorited,
        favoritesFull,
        setFavorites
    };
}