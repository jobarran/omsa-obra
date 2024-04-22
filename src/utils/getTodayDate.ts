
export const getTodayDate = () => {
    
    const today = new Date();

    // Get the year, month, and day separately
    const year = today.getFullYear();
    // JavaScript months are zero-based (0 for January, 11 for December), so we add 1 to get the correct month
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero based
    const day = String(today.getDate()).padStart(2, '0');
    
    // Concatenate the year, month, and day with dashes to get the desired format
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
}