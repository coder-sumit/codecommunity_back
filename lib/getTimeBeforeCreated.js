const  TimeBeforeCreated = (postCreationTime)=> {
    const currentTime = new Date(); // Get the current time
    const timeDifference = currentTime - postCreationTime; // Calculate the time difference in milliseconds
    
    // Define the time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;
    
    // Calculate the time units
    const minutesAgo = Math.floor(timeDifference / minute);
    const hoursAgo = Math.floor(timeDifference / hour);
    const daysAgo = Math.floor(timeDifference / day);
    const monthsAgo = Math.floor(timeDifference / month);
    const yearsAgo = Math.floor(timeDifference / year);
    
    // Determine the appropriate time unit to display
    if (yearsAgo > 0) {
      return yearsAgo === 1 ? '1 year ago' : `${yearsAgo} years ago`;
    } else if (monthsAgo > 0) {
      return monthsAgo === 1 ? '1 month ago' : `${monthsAgo} months ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
    } else {
      return 'Just now';
    }
}

module.exports = TimeBeforeCreated;