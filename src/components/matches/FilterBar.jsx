import React, {useContext, useEffect, useState} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import AuthContext from '../../context/AuthContext';
import { ErrorMessge } from '../../alerts/UserAuthentication';
import cityObj from '../../jsonData/cities.json';
import religionCasteData from '../../jsonData/religions.json';
import { baseUrl} from '../../Configure/urls';

const FilterBar = ({
    submitFilterData,
    openPopup,
    isPopUpOpen,
    matchSearch


}) => {
    let [religionaldata, setReligionaldata] = useState(null)
    let [professionaldata, setProfessionaldata] = useState(null)
    let [basicData, setBasicData]  =useState(null)
    let {authTokens, logoutUser }  = useContext(AuthContext)
    let [cities, setCities] = useState([])
    const [religion, setReligion] = useState('');
    const [caste, setCaste] = useState('');
    const availableCastes = religionCasteData[religion] || []



    const handleReligionChangeFilter = (e) =>{
        const selectedReligion = e.target.value;
        setReligion(selectedReligion)
        console.log(availableCastes);
        setCaste('')
    }

    const handleCasteChangeFilter = (e) =>{
        const selectedCaste = e.target.value
        setCaste(selectedCaste)
    }

    let getFliterDetails = async () =>{
        try{
            let response = await fetch(`${baseUrl}/preferedmatches/get_filter_details/`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authTokens.access, 
                },
            });
            if (response.status === 200){
                let data = await response.json(); 
                setBasicData(data.basic_preference)
                setProfessionaldata(data.professional_preference)
                setReligionaldata(data.religional_preference)


            }else if (response.status === 401){
                ErrorMessge({message: "authentication failed!!"})
                logoutUser()
            }else if (response.status === 400){
                ErrorMessge({message: "data didnt get"})
            }else{
                ErrorMessge({message: "An error comes!!"})
                console.log(response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }


    useEffect(()=>{
        getFliterDetails()
        setCities(cityObj.mandals)
    }, [])
  return (
    <>
        <div className='bg-[#ffffff] shadow-md w-full mt-3 left-0'>
            <div className='md:flex py-0 md:px-4 items-center cursor-pointer justify-between'>
                <ul className={`md:flex md:items-center transition-all duration-500 ease-in`}>
                    <li onClick={openPopup} className='bg-[#6471b1] md:my-0 my-3 md:mx-4 mx-20 hover-bg-[#a43f75] cursor-pointer text-white py-2 px-3 mt-2 rounded '>Filter</li>
                </ul>
                <form onSubmit={matchSearch} class="mt- mx-auto max-w-xl py-1 pl-3 pr-2 shadow-sm rounded-full bg-[#e5e8f5] border flex focus-within:border-gray-950">
                    <input type="text" placeholder="Search match name or id" class="bg-transparent w-full focus:outline-none pr-5 px-5 font-semibold border-0 focus:ring-0 py-0" name="search_match" />
                    <button
                        className="py-1.5 px-5 text-center bg-[#6471b1] rounded-full text-white dark:bg-[#6471b1]"
                        type="submit"
                        >
                            Search
                    </button>
                </form>
            </div>

        </div>
        {
            isPopUpOpen &&
        <div className={`flex justify-center mt-20 px-8`}>
            <form className="max-w-4xl" onSubmit={submitFilterData}>
                <div className="flex flex-wrap border shadow rounded-lg p-3 bg-white">
                    <h2 className="text-xl text-gray-500 pb-2">Filter</h2>

                    <div className="flex flex-col gap-3 w-full border-gray-400">


                        <label className="text-gray-500 font-semibold">Age preference</label>
                        <div className="flex gap-2">

                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-500 font-semibold">From</label>
                                <input
                                defaultValue={basicData?.age_from}
                                    name = 'age_from'
                                    placeholder={basicData?.age_from}
                                    className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 shadow-md bg-white"
                                >
                                    
                                </input>
                            </div>

                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-500 font-semibold">To</label>
                                <input
                                    name='age_to'
                                    defaultValue={basicData?.age_to}
                                    placeholder={basicData?.age_to}
                                    className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow shadow-md bg-white"
                                >
                                    
                                </input>
                            </div>
                        </div>
                        <div>
                            <label className="text-gray-500 font-semibold">Martial status</label>
                            <select
                                name = 'martial_status'
                                defaultValue={basicData?.martial_status}
                                placeholder={basicData?.martial_status}
                                className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 shadow-md bg-white"
                                type="text"
                            >

                                <option value={basicData ? basicData.martial_status : ''}>{basicData ? basicData.martial_status : 'Select working sector'}</option>
                                <option value="Never-married">Never married</option>
                                <option value="widowed">widowed</option>
                                <option value="divorced">divorced</option>
                            </select>

                        </div>


                        <div>
                            <label className="text-gray-500 font-semibold">Location</label>
                            <select
                                name='location'
                                className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 shadow-md bg-white"
                                type="text"
                            >

                                <option value={basicData ? basicData.location : ''}>{basicData ? basicData.location : 'Select working sector'}</option>
                                {cities.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>

                        </div>

            
                        <div>
                            <label className="text-gray-500 font-semibold">Working sector</label>
                            <select
                                name='working_sector'
                                className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 shadow-md bg-white"
                                type="text"
                            >

                                <option value={professionaldata ? professionaldata.working_sector : ''}>{professionaldata ? professionaldata.working_sector : 'Select working sector'}</option>
                                <option value="Government">Government/PSU</option>
                                <option value="Private">Private</option>
                                <option value="Business">Business</option>
                                <option value="Defence">Defence</option>
                                <option value="Self-Employed">Self Employed</option>
                                <option value="Not-Working">Not Working</option>
                            </select>

                        </div>

                        <label className="text-gray-500 font-semibold">Religious preference</label>
                        <div className="flex gap-2">

                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-500 font-semibold">Religion</label>
                                <select
                                    name = 'religion'
                                    onChange={handleReligionChangeFilter}
                                    className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 shadow-md bg-white"
                                >
                                <option value={religionaldata ? religionaldata.religion : ''}>{religionaldata ? religionaldata.religion  : 'Select religion'}</option>
                                {
                                    Object.keys(religionCasteData).map((religion)=>(
                                        <option key={religion} value={religion}>
                                            {religion}
                                        </option>
                                    ))
                                }
                                </select>
                            </div>

                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-500 font-semibold">Caste</label>
                                <select
                                    name = 'caste'
                                    onChange={handleCasteChangeFilter}
                                    className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow shadow-md bg-white"
                                >
                                <option value={religionaldata ? religionaldata.caste: ''}>{religionaldata ? religionaldata.caste  : 'Select religion'}</option>
                                {
                                    availableCastes.map((caste)=>(
                                        <option key={caste} value={caste}>
                                            {caste}
                                            </option>
                                    ))
                                }
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                type="submit"
                            >
                                Apply
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
        }

    </>

  )
}

export default FilterBar;