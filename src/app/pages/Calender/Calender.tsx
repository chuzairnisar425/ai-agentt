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

    const [reservations, setReservations] = useState<any>([]);

    const [isAddReservationModal, setIsAddReservationModal] = useState(false);
    const [minStartDate, setMinStartDate] = useState<any>('');
    const defaultParams = {
        id: null,
        title: '',
        phone: '',
        partySize: '',
        start: '',

        description: '',
        type: 'primary',
    };
    const [params, setParams] = useState<any>(defaultParams);
    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        dt = dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
        return dt;
    };
    const editReservation = (data: any = null) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);
        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            setParams({
                id: obj.id ?? null,
                title: obj.title ?? '',
                phone: obj.extendedProps?.phone ?? '',
                partySize: obj.extendedProps?.partySize ?? '',
                start: dateFormat(obj.start),
                type: obj.classNames?.[0] ?? 'primary',
                description: obj.extendedProps?.description ?? '',
            });

            setMinStartDate(new Date());
        } else {
            setMinStartDate(new Date());
        }
        setIsAddReservationModal(true);
    };
    const editDate = (data: any) => {
        let obj = {
            reservation: {
                start: data.start,
            },
        };
        editReservation(obj);
    };

    const saveReservation = () => {
        if (!params.title) {
            return true;
        }
        if (!params.start) {
            return true;
        }

        if (params.id) {
            // Update event
            let datareservation = reservations || [];
            let reservation: any = datareservation.find((d: any) => d.id === parseInt(params.id));

            reservation.title = params.title;
            reservation.phone = params.phone;
            reservation.partySize = params.partySize;
            reservation.start = params.start;
            reservation.description = params.description;
            reservation.className = params.type;

            setReservations([]);
            setTimeout(() => {
                setReservations(datareservation);
            });
        } else {
            // Add Reservation
            let maxReservationId = 0;
            if (reservations && reservations.length > 0) {
                maxReservationId = reservations.reduce((max: number, character: any) => (character.id > max ? character.id : max), reservations[0].id);
            }

            maxReservationId += 1;

            let reservation = {
                id: maxReservationId,
                title: params.title,
                phone: params.phone,
                partySize: params.partySize,
                start: params.start,
                description: params.description,
                className: params.type,
            };

            let datareservation = reservations || [];
            datareservation = datareservation.concat([reservation]);

            setTimeout(() => {
                setReservations(datareservation);
            });
        }

        showMessage('Reservation has been saved successfully.');
        setIsAddReservationModal(false);
    };
    const startDateChange = (reservation: any) => {
        const dateStr = reservation.target.value;
        if (dateStr) {
            setParams({ ...params, start: dateStr });
        }
    };
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
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
                        eventClick={(event: any) => editReservation(event)}
                        select={(event: any) => editDate(event)}
                        events={reservations}
                    />
                </div>
            </div>

            {/* add event modal */}
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
                                    <div className="text-lg font-medium   ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{params.id ? 'Edit Reservation' : 'Add Reservation'}</div>
                                    <div className="p-5">
                                        <form className="space-y-6 text-sm ">
                                            {/* Reservation Title */}
                                            <div>
                                                <label htmlFor="title" className="block font-medium mb-1">
                                                    Name
                                                </label>
                                                <input
                                                    id="title"
                                                    type="text"
                                                    name="title"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                    placeholder="Enter reservation name"
                                                    value={params.title || ''}
                                                    onChange={changeValue}
                                                    required
                                                />
                                                <div className="text-red-500 mt-1 text-xs" id="titleErr"></div>
                                            </div>

                                            {/* Phone Number */}
                                            <div>
                                                <label htmlFor="phone" className="block font-medium mb-1">
                                                    Phone
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                    placeholder="+1 (555) 123-4567"
                                                    value={params.phone || ''}
                                                    onChange={changeValue}
                                                    required
                                                />
                                            </div>

                                            {/* Date & Time */}
                                            <div>
                                                <label htmlFor="start" className="block font-medium mb-1">
                                                    To
                                                </label>
                                                <input
                                                    id="start"
                                                    type="datetime-local"
                                                    name="start"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                    value={params.start || ''}
                                                    min={minStartDate}
                                                    onChange={startDateChange}
                                                    required
                                                />
                                                <div className="text-red-500 mt-1 text-xs" id="startDateErr"></div>
                                            </div>

                                            {/* Party Size */}
                                            <div>
                                                <label htmlFor="partySize" className="block font-medium mb-1">
                                                    Party Size
                                                </label>
                                                <input
                                                    id="partySize"
                                                    type="number"
                                                    name="partySize"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                                    placeholder="Number of people"
                                                    value={params.partySize || ''}
                                                    onChange={changeValue}
                                                    required
                                                />
                                            </div>

                                            {/* Notes */}
                                            <div>
                                                <label htmlFor="description" className="block font-medium mb-1">
                                                    Notes
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    className="w-full px-4 py-2 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
                                                    placeholder="Any special requests?"
                                                    value={params.description || ''}
                                                    onChange={changeValue}
                                                ></textarea>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex justify-end gap-3 pt-4 border-t">
                                                <button type="button" className="px-4 py-2 rounded-md border border-gray-300  hover:bg-gray-100" onClick={() => setIsAddReservationModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark" onClick={() => saveReservation()}>
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
