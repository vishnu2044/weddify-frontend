import React, { useState } from 'react'
import PremiumPlans from '../../components/admin/premium/PremiumPlans'
import EditPremiumPlans from '../../components/admin/premium/EditPremiumPlans'

const PremiumPage = () => {
    let [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const openEditPopup = () => {
        if (isPopUpOpen === false){
            setIsPopUpOpen(true);

        }
    };

    const closeEditPopUp = () => {
        if (isPopUpOpen === true){
            setIsPopUpOpen(false);

        }
    };

    return (
        <div className='mt-28 px-4'>
            <PremiumPlans openEditPopup={openEditPopup} />
            {isPopUpOpen && <EditPremiumPlans closeEditPopUp={closeEditPopUp} />}
        </div>
    );
};

export default PremiumPage;