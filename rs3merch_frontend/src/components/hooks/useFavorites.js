import { useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../../config/commands';

export default function useFavorites() {

    // Controls the administration of favorites, will be updating on the landing page

    const [pageFavorites, setPageFavorites] = useState([]);
    const [favoritesSize, setFavoritesSize] = useState(10);
    const [favoritesFull, setFavoritesFull] = useState(false);

    useEffect(() => {
        async function initFavorites() {
            const currentSize = (await getFavorites()).data.length;
            if (currentSize >= 10) {
                setFavoritesFull(true);
            }
            setFavoritesSize(currentSize);
        }

        initFavorites();
    }, []);

    async function handleFavorite(item_name, item) {
        if (isFavorited(item_name)) {
            await removeFavorite(item_name);

            // Removes the item that was favorites on the current page
            const removeIndex = pageFavorites.indexOf(item_name);
            pageFavorites.splice(removeIndex, 1);
            setPageFavorites(pageFavorites);
            setFavoritesSize(favoritesSize - 1);
        } else {
            // Sets the other buttons to disabled
            if (favoritesSize + 1 > 10) {
                setFavoritesFull(true);
                return;
            }
            await addFavorite(item);

            // Records the item that was favorited on the current page
            const newFavorites = pageFavorites.concat(item_name);
            setPageFavorites(newFavorites);
            setFavoritesSize(favoritesSize + 1);
        }
    }

    function isFavorited(item_name) {
        return (pageFavorites.indexOf(item_name) !== -1);
    }

    return {
        handleFavorite,
        isFavorited,
        favoritesFull,
        setPageFavorites
    };
}