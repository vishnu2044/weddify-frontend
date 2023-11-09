import React from 'react'

const UserPreferences = ({
    basicPreferences, 
    setComponent,
    professionalPreference,
    religiounalPreference
  }) => {

  return (
    <>
<div className="grid grid-cols-1 sm:grid-cols-12 gap-6 px-4">
  <div className="col-span-1 sm:col-span-6">
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <div className="flex justify-between items-center p-3">
        <h3 className="text-xl font-semibold text-[#a43f75]">Basic Preferences</h3>
        <p onClick={()=> setComponent("editBasicPreference")} className="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-gray-600 pt-3">
        <div className="text-right pr-3">
          <p><strong>Age:</strong></p>
          <p><strong>Mother Tongue:</strong></p>
          <p><strong>Eating Habit:</strong></p>
          <p><strong>Drinking Habit:</strong></p>
          <p><strong>Smoking Habit:</strong></p>
          <p><strong>Martial Status:</strong></p>
          <p><strong>Physical Type:</strong></p>
          <p><strong>Physical Status:</strong></p>
          <p><strong>Location:</strong></p>
          <p><strong>Citizenship:</strong></p>
        </div>
        <div className="px-3">
          {basicPreferences?.age_from ?  <p>{basicPreferences?.age_from} to {basicPreferences.age_to}</p> : <p>Not added yet</p>}
          {basicPreferences?.mother_tongue ? <p>{basicPreferences?.mother_tongue}</p> : <p>Not added yet</p>}
          {basicPreferences?.eating_habit ? <p>{basicPreferences?.eating_habit}</p> : <p>Not added yet</p>}
          {basicPreferences?.drinking_habit ? <p>{basicPreferences?.drinking_habit}</p> : <p>Not added yet</p>}
          {basicPreferences?.smoking_habit ? <p>{basicPreferences?.smoking_habit}</p> : <p>Not added yet</p>}
          {basicPreferences?.martial_status ? <p>{basicPreferences?.martial_status}</p> : <p>Not added yet</p>}
          {basicPreferences?.height || basicPreferences?.body_type ? <p>{basicPreferences?.height}  ({basicPreferences?.body_type})</p> : <p>Not added yet</p>}
          {basicPreferences?.physical_status ? <p>{basicPreferences?.physical_status}</p> : <p>Not added yet</p>}
          {basicPreferences?.location ? <p>{basicPreferences?.location}</p> : <p>Not added yet</p>}
          {basicPreferences?.citizenship ? <p>{basicPreferences?.citizenship}</p> : <p>Not added yet</p>}
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
    </div>
  </div>
  <div className="col-span-1 sm:col-span-6">
    <div className="bg-white shadow-xl rounded-2xl px-6">
    <div className="flex justify-between items-center px-3 pt-3">
        <h3 className="text-xl font-semibold text-[#a43f75]">Basic Preferences</h3>
        <p onClick={()=> setComponent('editProfessionalPreference') } className="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-gray-600">
        <div className="text-right pr-3">
          <p><strong>Education:</strong></p>
          <p><strong>College:</strong></p>
          <p><strong>Working Sector:</strong></p>
          <p><strong>Income (LPA):</strong></p>
          <p><strong>Occupation:</strong></p>
          <p><strong>Organization:</strong></p>
        </div>
        <div className="px-3">
          {professionalPreference?.education ? <p>{professionalPreference?.education}</p> : <p>Not added yet</p>}
          {professionalPreference?.college ? <p>{professionalPreference?.college}</p> : <p>Not added yet</p>}
          {professionalPreference?.working_sector ? <p>{professionalPreference?.working_sector}</p> : <p>Not added yet</p>}
          {professionalPreference?.income ? <p>{professionalPreference?.income}</p> : <p>Not added yet</p>}
          {professionalPreference?.occupation ? <p>{professionalPreference?.occupation}</p> : <p>Not added yet</p>}
          {professionalPreference?.organization ? <p>{professionalPreference?.organization}</p> : <p>Not added yet</p>}
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
    </div>
    
    <div className="bg-white shadow-xl rounded-2xl px-6 mt-2">
        <div className="flex justify-between items-center px-3 pt-2">
            <h3 className="text-xl font-semibold text-[#a43f75]">Religious Preferences</h3>
            <p onClick={()=>setComponent('editreligionalpreference')} className="bg-[#621a40] hover:bg-[#a43f75] cursor-pointer text-white font-bold py-2 px-4 rounded">Update</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-gray-600">
      <div class="text-right pr-3">
                                        <p><strong>Religion :</strong></p>
                                        <p><strong>Caste :</strong></p>
                                        <p><strong>Star :</strong></p>

                                    </div>
                                    <div class="px-3">

                                      {religiounalPreference?.religion ? <p>{religiounalPreference?.religion}</p> : <p> Not added yet</p> }
                                      {religiounalPreference?.caste ? <p>{religiounalPreference?.caste}</p> : <p> Not added yet</p> }
                                      {religiounalPreference?.star ? <p>{religiounalPreference?.star}</p> : <p> Not added yet</p> }

                                    </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
    </div>
  </div>
</div>


    </>
  )
}

export default UserPreferences