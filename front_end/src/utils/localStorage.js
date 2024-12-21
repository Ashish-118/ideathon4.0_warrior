// utils/LocalStorage.js

const LocalStorage = {
    // Save an item to localStorage
    set: (key, value) => {
        try {
            if (value) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    },

    // Retrieve an item from localStorage
    get: (key) => {
        try {
            const value = localStorage.getItem(key);
            if (!value) return null; // Return null if the key doesn't exist
            return JSON.parse(value); // Parse the value if it exists
        } catch (error) {
            console.error("Error retrieving from localStorage", error);
            return null; // Return null if JSON.parse fails
        }
    },


    // Remove an item from localStorage
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from localStorage", error);
        }
    },

    // Clear all items in localStorage
    clear: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Error clearing localStorage", error);
        }
    }
};

export { LocalStorage };
