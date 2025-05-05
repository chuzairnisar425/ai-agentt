import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import IconX from '../../../_theme/components/Icon/IconX';
import { setPageTitle } from '../../../_theme/themeConfigSlice';
import IconPlus from '../../../_theme/components/Icon/IconPlus';

const Calender = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Calender'));
    });
    const now = new Date();
    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
        // return dt.getMonth() < 10 ? '0' + month : month;
    };

    const [reservations, setReservations] = useState<any>([
        {
            id: 1,
            name: 'All Day reservation',
            start: now.getFullYear() + '-' + getMonth(now) + '-01T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-02T14:30:00',

            description: 'Aenean fermentum quam vel sapien rutrum cursus. Vestibulum imperdiet finibus odio, nec tincidunt felis facilisis eu.',
        },
        {
            id: 2,
            name: 'Site Visit',
            start: now.getFullYear() + '-' + getMonth(now) + '-07T19:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-08T14:30:00',

            description: 'Etiam a odio eget enim aliquet laoreet. Vivamus auctor nunc ultrices varius lobortis.',
        },
        {
            id: 3,
            name: 'Product Lunching reservation',
            start: now.getFullYear() + '-' + getMonth(now) + '-17T14:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-18T14:30:00',

            description: 'Proin et consectetur nibh. Mauris et mollis purus. Ut nec tincidunt lacus. Nam at rutrum justo, vitae egestas dolor.',
        },
        {
            id: 4,
            name: 'Meeting',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T10:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T10:30:00',

            description: 'Mauris ut mauris aliquam, fringilla sapien et, dignissim nisl. Pellentesque ornare velit non mollis fringilla.',
        },
        {
            id: 5,
            name: 'Lunch',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T15:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T15:00:00',

            description: 'Integer fermentum bibendum elit in egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        },
        {
            id: 6,
            name: 'Conference',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T21:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T21:30:00',

            description:
                'Curabitur facilisis vel elit sed dapibus. Nunc sagittis ex nec ante facilisis, sed sodales purus rhoncus. Donec est sapien, porttitor et feugiat sed, eleifend quis sapien. Sed sit amet maximus dolor.',
        },
        {
            id: 7,
            name: 'Happy Hour',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T05:30:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T05:30:00',

            description: ' odio lectus, porttitor molestie scelerisque blandit, hendrerit sed ex. Aenean malesuada iaculis erat, vitae blandit nisl accumsan ut.',
        },
        {
            id: 8,
            name: 'Dinner',
            start: now.getFullYear() + '-' + getMonth(now) + '-12T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-13T20:00:00',

            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 9,
            name: 'Birthday Party',
            start: now.getFullYear() + '-' + getMonth(now) + '-27T20:00:00',
            end: now.getFullYear() + '-' + getMonth(now) + '-28T20:00:00',

            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 10,
            name: 'New Talent reservation',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-24T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-27T22:20:20',

            description: 'Sed purus urna, aliquam et pharetra ut, efficitur id mi. Pellentesque ut convallis velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 11,
            name: 'Other new',
            start: now.getFullYear() + '-' + getMonth(now, -1) + '-13T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, -1) + '-16T22:20:20',

            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 13,
            name: 'Upcoming reservation',
            start: now.getFullYear() + '-' + getMonth(now, 1) + '-15T08:12:14',
            end: now.getFullYear() + '-' + getMonth(now, 1) + '-18T22:20:20',

            description: 'Pellentesque ut convallis velit. Sed purus urna, aliquam et pharetra ut, efficitur id mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
    ]);
    const [isAddReservationModal, setIsAddReservationModal] = useState(false);
    const [minStartDate, setMinStartDate] = useState<any>('');
    const [minEndDate, setMinEndDate] = useState<any>('');
    const defaultParams = {
        id: '',
        name: '',
        phone: '',
        partySize: '',
        start: '',
        end: '',
        description: '',
    };

    const [params, setParams] = useState<any>(defaultParams);

    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        return `${dt.getFullYear()}-${month}-${date}T${hours}:${mins}`;
    };

    const editReservation = (data: any = null) => {
        const reset = JSON.parse(JSON.stringify(defaultParams));
        setParams(reset);

        if (data) {
            const obj = JSON.parse(JSON.stringify(data.reservation));
            setParams({
                id: obj.id || '',
                name: obj.name || '',
                phone: obj.phone || '',
                partySize: obj.partySize || '',
                start: dateFormat(obj.start),
                end: dateFormat(obj.end),
                description: obj.extendedProps?.description || '',
            });
            setMinStartDate(new Date());
            setMinEndDate(dateFormat(obj.start));
        } else {
            setMinStartDate(new Date());
            setMinEndDate(new Date());
        }

        setIsAddReservationModal(true);
    };

    const editDate = (data: any) => {
        editReservation({
            reservation: {
                start: data.start,
                end: data.end,
            },
        });
    };

    const saveReservation = () => {
        if (!params.start || !params.end || !params.name || !params.partySize) {
            showMessage('Please fill in all required fields.');
            return;
        }

        const updatedReservations = [...reservations];

        if (params.id) {
            const index = updatedReservations.findIndex((r) => r.id === parseInt(params.id));
            if (index > -1) {
                updatedReservations[index] = {
                    ...updatedReservations[index],
                    name: params.name,
                    phone: params.phone,
                    partySize: params.partySize,
                    start: params.start,
                    end: params.end,
                    description: params.description,
                };
            }
            setReservations([]);
            setTimeout(() => {
                setReservations(updatedReservations);
            });
        } else {
            const maxId = reservations.length > 0 ? Math.max(...reservations.map((r) => r.id)) : 0;
            const newReservation = {
                id: maxId + 1,
                name: params.name,
                phone: params.phone,
                partySize: params.partySize,
                start: params.start,
                end: params.end,
                description: params.description,
            };
            setReservations([...reservations, newReservation]);
        }

        showMessage('Reservation has been saved successfully.');
        setIsAddReservationModal(false);
    };

    const startDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateStr = e.target.value;
        if (dateStr) {
            setMinEndDate(dateFormat(dateStr));
            setParams({ ...params, start: dateStr, end: '' });
        }
    };

    const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setParams({ ...params, [name]: value });
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="panel mb-5">
                <div className="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <div className="sm:mb-0 mb-4">
                        <div className="text-lg font-semibold ltr:sm:text-left rtl:sm:text-right text-center">Calendar</div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => editReservation()}>
                        <IconPlus className="ltr:mr-2 rtl:ml-2" />
                        Create Reservation
                    </button>
                </div>
                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        editable={true}
                        dayMaxEvents={true}
                        selectable={true}
                        droppable={true}
                        eventClick={(reservation: any) => editReservation(reservation)}
                        select={(reservation: any) => editDate(reservation)}
                        events={reservations}
                    />
                </div>
            </div>

            {/* add reservation modal */}
            <Transition appear show={isAddReservationModal} as={Fragment}>
                <Dialog as="div" onClose={() => setIsAddReservationModal(false)} open={isAddReservationModal} className="relative z-[51]">
                    <Transition.Child
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        onClick={() => setIsAddReservationModal(false)}
                                    >
                                        <IconX />
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Edit Reservation' : 'Add Reservation'}
                                    </div>
                                    <div className="p-5">
                                        <form className="space-y-5">
                                            <div>
                                                <label htmlFor="name">Name:</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    className="form-input"
                                                    placeholder="Customer name"
                                                    value={params.name || ''}
                                                    onChange={(e) => changeValue(e)}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="phone">Phone:</label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    className="form-input"
                                                    placeholder="+1 (555) 123-4567"
                                                    value={params.phone || ''}
                                                    onChange={(e) => changeValue(e)}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="partySize">Party Size:</label>
                                                <input
                                                    id="partySize"
                                                    type="number"
                                                    name="partySize"
                                                    className="form-input"
                                                    placeholder="e.g., 4"
                                                    min={1}
                                                    value={params.partySize || ''}
                                                    onChange={(e) => changeValue(e)}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="start">Date & Time:</label>
                                                <input
                                                    id="start"
                                                    type="datetime-local"
                                                    name="start"
                                                    className="form-input"
                                                    value={params.start || ''}
                                                    min={minStartDate}
                                                    onChange={(e) => startDateChange(e)}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="end">To:</label>
                                                <input
                                                    id="end"
                                                    type="datetime-local"
                                                    name="end"
                                                    className="form-input"
                                                    value={params.end || ''}
                                                    min={minEndDate}
                                                    onChange={(e) => changeValue(e)}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="description">Reservation Notes:</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="form-textarea min-h-[100px]"
                                                    placeholder="e.g., Window seat preferred"
                                                    value={params.description || ''}
                                                    onChange={(e) => changeValue(e)}
                                                />
                                            </div>

                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddReservationModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" onClick={() => saveReservation()} className="btn btn-primary ml-4">
                                                    {params.id ? 'Update Reservation' : 'Create Reservation'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Calender;
