import { useState } from 'react'

const UserInfo = () => {
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        saveDetails: false,
      });
      const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
  return (
    <div>
                  <div className=" space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium pb-4">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 rounded-xl "
                  placeholder="Sabbir"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium pb-4 ">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 rounded-xl"
                  placeholder="Rahman"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium pb-4 pt-3">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 rounded-xl"
                  placeholder="sabbir@example.com"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium pb-4 pt-3">Phone Number *</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 rounded-xl"
                  placeholder="+91 1234567890"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col pb-4 pt-3">
              <label className="font-medium">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 rounded-xl"
                placeholder="sabbir@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium pb-4 pt-3">Town/City *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 rounded-xl text-[#5A5C5F]"
                  required
                >
                 
                  <option value="" className="text-[#5A5C5F]">
                    City Name
                  </option>
                  <option value="Dhaka" className="text-[#5A5C5F]">
                    Dhaka
                  </option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-medium pb-4 pt-3">State/Country *</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-2 rounded-xl  text-[#5A5C5F]"
                  required
                >
                 <option value="" className="text-[#5A5C5F]">
                    Country Name
                  </option>
                  <option value="Dhaka" className="text-[#5A5C5F]">
                    Bangladesh
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-medium pb-4 pt-3">Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleFormChange}
                className="border border-gray-300 p-2 rounded-xl"
                placeholder="1234"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="saveDetails"
                checked={formData.saveDetails}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    saveDetails: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <span>Save your details for future order purpose</span>
            </div>
          </div>
    </div>
  )
}

export default UserInfo