function normalizeItemName(itemName) {
    const itemNameSplit = itemName.split(" ");
    const itemNameArray = itemNameSplit.map(name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    });
    return itemNameArray.join(" ");
}

export default normalizeItemName;