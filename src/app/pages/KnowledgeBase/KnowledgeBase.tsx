import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from '../../../_theme/components/Dropdown';
import IconChevronDown from '../../../_theme/components/Icon/IconChevronDown';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../../_theme/themeConfigSlice';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import IconEdit from '../../../_theme/components/Icon/IconEdit';

const initialData = {
    name: 'The Fine Restaurant',
    description: 'Premium Dining Experience',
    owner: 'John Doe',
    phone: '(555) 123-4567',
    email: 'john@restaurant.com',
    address: '123 Restaurant Street, NY 10001',
    businessHours: [
        { days: 'Monday - Friday', time: '11:00 AM - 10:00 PM' },
        { days: 'Saturday - Sunday', time: '10:00 AM - 11:00 PM' },
    ],
    aiSettings: {
        tone: 'Professional',
        reservationWindow: '7 days in advance',
        questions: ['Are you celebrating anything?', 'Any dietary restrictions?'],
    },
};
const toneOptions = [
    { value: 'Professional', label: 'Professional' },
    { value: 'Friendly', label: 'Friendly' },
    { value: 'Casual', label: 'Casual' },
];

const windowOptions = [
    { value: '7', label: '7 days in advance' },
    { value: '14', label: '14 days in advance' },
    { value: '30', label: '30 days in advance' },
];

const KnowledgeBase = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Knowledge Base'));
    });
    const [data, setData] = useState(initialData);

    const [editProfile, setEditProfile] = useState(false);
    const [editRestaurant, setEditRestaurant] = useState(false);

    const [active, setActive] = useState<string>('1');
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
    const [questionDraft, setQuestionDraft] = useState('');

    const togglePara = (value: string) => {
        setActive((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const handleInputChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const startEditingQuestion = (index) => {
        setEditingQuestionIndex(index);
        setQuestionDraft(data.aiSettings.questions[index]);
    };

    const saveQuestionEdit = () => {
        const updatedQuestions = [...data.aiSettings.questions];
        updatedQuestions[editingQuestionIndex] = questionDraft;

        setData((prev) => ({
            ...prev,
            aiSettings: {
                ...prev.aiSettings,
                questions: updatedQuestions,
            },
        }));

        toast.success('Question updated!');
        setEditingQuestionIndex(null);
        setQuestionDraft('');
    };

    const toggleEdit = (type) => {
        if (type === 'profile') {
            if (editProfile) toast.success('Profile changes saved!');
            setEditProfile((prev) => !prev);
        } else if (type === 'restaurant') {
            if (editRestaurant) toast.success('Restaurant settings saved!');
            setEditRestaurant((prev) => !prev);
        }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6">
            <ToastContainer />

            {/* Profile Header */}
            <form className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <img src="/assets/images/profile-34.jpeg" alt="Profile" className="w-16 h-16 rounded-md object-cover" />
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{data.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{data.description}</p>
                        </div>
                    </div>
                    <button type="button" className=" text-white text-sm px-4 py-2 rounded-md bg-gray-700 mt-4 sm:mt-0" onClick={() => toggleEdit('profile')}>
                        {editProfile ? 'Save Profile' : 'Edit Profile'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {['owner', 'phone', 'email', 'address'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                                {field}
                            </label>
                            <input
                                id={field}
                                type={field === 'email' ? 'email' : 'text'}
                                value={data[field]}
                                readOnly={!editProfile}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                                    editProfile ? 'cursor-text' : 'cursor-default'
                                }`}
                            />
                        </div>
                    ))}
                </div>
            </form>

            {/* Restaurant and AI Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Restaurant Info */}
                <div className=" dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md p-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Restaurant Details</h3>
                        <button className=" text-white px-4 py-2 text-sm rounded-md bg-gray-700" onClick={() => toggleEdit('restaurant')}>
                            {editRestaurant ? 'Save' : 'Edit Restaurant Details'}
                        </button>
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Business Hours</p>
                        {data.businessHours.map((item, index) => (
                            <p key={index} className="flex justify-between  p-1 rounded-md items-center text-sm text-gray-600 dark:text-gray-400">
                                {item.days}
                                <p>{item.time}</p>
                            </p>
                        ))}
                    </div>

                    {['address', 'phone', 'email'].map((field) => (
                        <div key={field}>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mt-3">{field[0].toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                value={data[field]}
                                onChange={(e) => handleInputChange(field, e.target.value)}
                                readOnly={!editRestaurant}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                    ))}
                </div>

                {/* AI Settings */}
                <div className="  border border-gray-200 dark:border-gray-700 rounded-md p-4 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Behavior Settings</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tone of Voice</label>
                        <Select defaultValue={toneOptions[0]} options={toneOptions} isSearchable={false} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reservation Window</label>
                        <Select defaultValue={windowOptions[0]} options={windowOptions} isSearchable={false} />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Special Questions</p>
                        <ul className="space-y-2 mt-2">
                            {data.aiSettings.questions.map((q, i) => (
                                <li key={i} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md">
                                    {editingQuestionIndex === i ? (
                                        <input
                                            type="text"
                                            value={questionDraft}
                                            onChange={(e) => setQuestionDraft(e.target.value)}
                                            onBlur={saveQuestionEdit}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') saveQuestionEdit();
                                                if (e.key === 'Escape') setEditingQuestionIndex(null);
                                            }}
                                            className="w-full mr-2 px-2 py-1 rounded bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white"
                                            autoFocus
                                        />
                                    ) : (
                                        <>
                                            <span className="text-sm text-gray-900 dark:text-white">{q}</span>
                                            <button type="button" className="text-blue-600 dark:text-blue-400 ml-2" onClick={() => startEditingQuestion(i)}>
                                                <IconEdit />
                                            </button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">FAQs and Templates</h3>
                <div className="mb-5">
                    <div className="space-y-2 font-semibold">
                        <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                            <button
                                type="button"
                                className={`p-4   w-full h-[60px] sm:h-[100px] lg:h-[50px] xl:h-[50px] md:h-[100px] flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                onClick={() => togglePara('1')}
                            >
                                Large Group Accommodations
                                <div className={`ltr:ml-auto rtl:mr-auto `}>
                                    <svg>...</svg>
                                </div>
                                <div>
                                    <IconChevronDown />
                                </div>
                            </button>
                            <div>
                                <AnimateHeight duration={300} height={active === '1' ? 'auto' : 0}>
                                    <div className="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </AnimateHeight>
                            </div>
                        </div>
                        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                            <button
                                type="button"
                                className={`p-4   w-full h-[60px] sm:h-[100px] lg:h-[50px] xl:h-[50px] md:h-[100px] flex items-center text-white-dark dark:bg-[#1b2e4b] `}
                                onClick={() => togglePara('2')}
                            >
                                Dietary Restrictions
                                <div className={`ltr:ml-auto rtl:mr-auto `}>
                                    <svg>...</svg>
                                </div>
                                <div>
                                    <IconChevronDown />
                                </div>
                            </button>
                            <div>
                                <AnimateHeight duration={300} height={active === '2' ? 'auto' : 0}>
                                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        <ul className="space-y-1">
                                            <li>
                                                <button type="button">Apple</button>
                                            </li>
                                            <li>
                                                <button type="button">Orange</button>
                                            </li>
                                            <li>
                                                <button type="button">Banana</button>
                                            </li>
                                            <li>
                                                <button type="button">list</button>
                                            </li>
                                        </ul>
                                    </div>
                                </AnimateHeight>
                            </div>
                        </div>
                        <div className="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                            <button
                                type="button"
                                className={`p-4   w-full h-[60px] sm:h-[100px] lg:h-[50px] xl:h-[50px] md:h-[100px] flex items-center text-white-dark `}
                                onClick={() => togglePara('3')}
                            >
                                Cancellation Policy
                                <div className={`ltr:ml-auto rtl:mr-auto `}>
                                    <svg>...</svg>
                                </div>
                                <div>
                                    <IconChevronDown />
                                </div>
                            </button>
                            <div>
                                <AnimateHeight duration={300} height={active === '3' ? 'auto' : 0}>
                                    <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                        <p>
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                                            brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda
                                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                                            Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </p>
                                    </div>
                                </AnimateHeight>
                            </div>
                        </div>
                    </div>
                </div>
                <button className=" text-white px-4 py-2 text-sm rounded-md bg-gray-700 mt-4">Add New Template</button>
            </div>
        </div>
    );
};
export default KnowledgeBase;
