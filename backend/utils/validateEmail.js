
const isValidEmailDomain = (email, domain) => {
    const regex = new RegExp(`@${domain}$`, 'i');
    return regex.test(email);
}

module.exports = isValidEmailDomain