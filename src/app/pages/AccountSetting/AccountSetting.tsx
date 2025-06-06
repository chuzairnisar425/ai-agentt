import { useEffect, useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../_theme/themeConfigSlice';
import IconHome from '../../../_theme/components/Icon/IconHome';

const AccountSetting = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    }, [dispatch]);

    const [tabs, setTabs] = useState<'home'>('home');

    const toggleTabs = (name: 'home') => {
        setTabs(name);
    };

    const handleRestaurantSettingsSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // You can add logic to save form data here
        console.log('Restaurant settings saved.');
    };

    return (
        <div>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                Home
                            </button>
                        </li>
                    </ul>
                </div>

                {tabs === 'home' && (
                    <div className="space-y-6">
                        {/* Profile Form */}
                        <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <img src="/assets/images/profile-34.jpeg" alt="Profile" className="w-16 h-16 rounded-md object-cover" />
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">The Fine Restaurant</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Premium Dining Experience</p>
                                    </div>
                                </div>
                                <button type="button" className=" text-white text-sm px-4 py-2 rounded-md bg-gray-700 mt-4 sm:mt-0">
                                    Edit Profile
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {[
                                    { id: 'owner', label: 'Owner Name', placeholder: 'John Doe' },
                                    { id: 'phone', label: 'Phone', placeholder: '(555) 123-4567' },
                                    { id: 'email', label: 'Email', placeholder: 'john@restaurant.com' },
                                    { id: 'address', label: 'Address', placeholder: '123 Restaurant Street, NY 10001' },
                                ].map(({ id, label, placeholder }) => (
                                    <div key={id}>
                                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {label}
                                        </label>
                                        <input
                                            id={id}
                                            name={id}
                                            type={id === 'email' ? 'email' : 'text'}
                                            placeholder={placeholder}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        />
                                    </div>
                                ))}
                            </div>
                        </form>

                        {/* Restaurant Settings */}
                        <form onSubmit={handleRestaurantSettingsSubmit} className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">Restaurant Settings</h6>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Cuisine Type */}
                                <div>
                                    <label htmlFor="cuisineType" className="block mb-1 text-sm font-medium">
                                        Cuisine Type
                                    </label>
                                    <select
                                        id="cuisineType"
                                        name="cuisineType"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    >
                                        <option>Italian</option>
                                        <option>Chinese</option>
                                        <option>Mexican</option>
                                        <option>Indian</option>
                                        <option>French</option>
                                    </select>
                                </div>

                                {/* Reservation Policies */}
                                <div>
                                    <label htmlFor="reservationPolicies" className="block mb-1 text-sm font-medium">
                                        Reservation Policies
                                    </label>
                                    <textarea
                                        id="reservationPolicies"
                                        name="reservationPolicies"
                                        rows={3}
                                        defaultValue="24-hour cancellation policy. Large groups require deposit."
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* Special Instructions */}
                                <div>
                                    <label htmlFor="specialInstructions" className="block mb-1 text-sm font-medium">
                                        Special Instructions
                                    </label>
                                    <textarea
                                        id="specialInstructions"
                                        name="specialInstructions"
                                        rows={3}
                                        defaultValue="We offer valet parking. Please inform us of any dietary restrictions."
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* Save Button */}
                                <div className="flex items-center justify-center">
                                    <button type="submit" className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl w-full">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* AI Settings Summary */}
                        <div className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">AI Settings Summary</h6>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { label: 'Tone of Voice', value: 'Professional' },
                                    { label: 'Reservation Rules', value: '7 days in advance' },
                                    { label: 'Active FAQs', value: '12 templates' },
                                ].map((item, index) => (
                                    <div key={index} className="bg-[#f9fafb] dark:bg-[#1f2937] p-4 rounded-md shadow-sm">
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountSetting;
