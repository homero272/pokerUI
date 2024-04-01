const avatarContext = require.context('../FreeAvatars', false, /\.png$/);

const avatars = {};

avatarContext.keys().forEach(key => {
    const fileName = key.replace(/^.*[\\/]/, '').replace(/\..+$/, ''); // Extract filename without extension
    const avatar = avatarContext(key); // Import the module
    avatars[fileName] = avatar; // Use filename as key and imported module as value
});

export default avatars;
