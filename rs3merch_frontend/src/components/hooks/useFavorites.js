import { useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../../config/commands';

export default function useFavorites() {

    // Controls the administration of favorites, 
    // will be updating info to be displayed on the landing page

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        async function initFavorites() {
            setFavorites((await getFavorites()).data);
        }

        initFavorites();
    }, [])

    async function handleFavorite(item_name, item) {
        if (isFavorited(item_name)) {
            await removeFavorite(item_name);

            // Removes the item that was favorites on the current page
            const removedFavorite = favorites.filter(item => item.item_name === item_name);
            setFavorites(removedFavorite);
        } else {
            // Buttons will be set to disabled by the function favoritesFull
            if (favorites.length + 1 > 10) {
                return;
            }
            await addFavorite(item);

            // Records the item that was favorited on the current page
            const newFavorites = favorites.concat(item_name);
            setFavorites(newFavorites);
        }
    }

    function isFavorited(item_name) {
        return favorites.find(fav_item_name => fav_item_name === item_name);
    }

    function favoritesFull() {
        return (favorites.length >= 10);
    }

    return {
        handleFavorite,
        isFavorited,
        favoritesFull,
        setFavorites
    };
}