import React from 'react'; 

export function ListingDataHelper({ store }) {
    React.useEffect(() => {
        if (new Date() - store.lastListingSyncTimestamp > 3000) {
            store.refreshListings(); 
            console.log("refreshed listings");
        }
    }); 
}

export function ContractDataHelper({ store }) {
    React.useEffect(() => {
        if (new Date() - store.lastContractSyncTimestamp > 3000) {
            store.refreshContracts(); 
            console.log("refreshed contracts");
        }
    }); 
}

export function SubletterDataHelper({ store, updateStore, id, tokenContext }) {
    React.useEffect(() => {
        if (new Date() - store.lastSubletterSyncTimestamp > 3000) {
            tokenContext.doGetSubletterRecord(id, (record) => {
                // console.log("subletter user data: "); 
                // console.log(record); 
                const newStore = store; 
                newStore.lastSubletterSyncTimestamp = new Date(); 
                newStore.sublettersList.set(record.subletterData.id, record); 
                updateStore(newStore); 
            }, (error) => {}); 
        }
    }); 
}