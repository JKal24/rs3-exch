import { useState } from 'react';
import { addFavorite, removeFavorite } from '../../config/commands';

export default function useFavorites() {

    // Controls the administration of favorites, 
    // will be updating info to be displayed on the landing page

    const [pageFavorites, setPageFavorites] = useState([]);

    async function handleFavorite(item_name, item) {
        if (isFavorited(item_name)) {
            await removeFavorite(item_name);

            // Removes the item that was favorites on the current page
            const removedFavorite = pageFavorites.filter(item => item.item_name === item_name);
            setPageFavorites(removedFavorite);
        } else {
            // Buttons will be set to disabled by the function favoritesFull
            if (pageFavorites.length + 1 > 10) {
                return;
            }
            await addFavorite(item);

            // Records the item that was favorited on the current page
            const newFavorites = pageFavorites.concat(item_name);
            setPageFavorites(newFavorites);
        }
    }

    function isFavorited(item_name) {
        return pageFavorites.find(item => item.item_name === item_name);
    }

    function favoritesFull() {
        return (pageFavorites.length >= 10);
    }

    return {
        handleFavorite,
        isFavorited,
        favoritesFull,
        setPageFavorites
    };
}