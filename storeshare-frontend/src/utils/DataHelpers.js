import React from 'react'; 

export function ListingDataHelper({ store }) {
    React.useEffect(() => {
        if (new Date() - store.lastListingSyncTimestamp > 3000) {
            store.refreshListings(); 
            console.log("refreshed listings");
        }
    }); 
}