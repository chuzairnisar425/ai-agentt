import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import Dropdown from '../../../_theme/components/Dropdown';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../_theme/themeConfigSlice';
import IconHorizontalDots from '../../../_theme/components/Icon/IconHorizontalDots';
import IconUsersGroup from '../../../_theme/components/Icon/IconUsersGroup';
import IconDollar from '../../../_theme/components/Icon/IconDollarSign';
import IconMenuCharts from '../../../_theme/components/Icon/Menu/IconMenuCharts';
import IconArrowLeft from '../../../_theme/components/Icon/IconArrowLeft';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CallMinutes from './CallMinutes';
const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    });

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [loading] = useState(false);

    // uniqueVisitorSeriesOptions
    const uniqueVisitorSeries: any = {
        series: [
            {
                name: 'Direct',
                data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
            },
            {
                name: 'Organic',
                data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
            },
        ],
        options: {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            colors: ['#5c1ac3', '#ffbb44'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
            },
        },
    };

    //Sales By Category
    const salesByCategory: any = {
        series: [985, 737, 270],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Apparel', 'Sports', 'Others'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };
    return (
        <div>
            <CallMinutes />

            <div className="pt-5">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">Total Revenue</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconDollar className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 text-sm text-[#515365] ">
                            <div>
                                <div>
                                    <div className="font-bold">$24,500</div>
                                    <div className="text-gray-700 text-sm">+12.5% from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">Active Users</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconUsersGroup className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 text-sm text-[#515365] ">
                            <div>
                                <div>
                                    <div className="font-bold">1,234</div>
                                    <div className="text-gray-700 text-sm">+3.2% from last week</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg ">Conversion Rate</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconMenuCharts className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 text-sm text-[#515365] ">
                            <div>
                                <div>
                                    <div className="font-bold">2.4%</div>
                                    <div className="text-gray-700 text-sm">+0.8% from last week</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 mb-6">
                    <div className="panel h-full p-0 lg:col-span-2">
                        <div className="flex items-start justify-between dark:text-white-light mb-5 p-5 border-b  border-white-light dark:border-[#1b2e4b]">
                            <h5 className="font-semibold text-lg ">Revenue Overview</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View</button>
                                        </li>
                                        <li>
                                            <button type="button">Update</button>
                                        </li>
                                        <li>
                                            <button type="button">Delete</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>

                        <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} className="overflow-hidden" />
                    </div>

                    {/* Sales by category */}
                    <div className="panel h-full">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Sales By Category</h5>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                                )}
                            </div>{' '}
                        </div>
                    </div>
                </div>

                <div className="panel h-full sm:col-span-2 xl:col-span-1 pb-0">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-5">Recent Activities</h5>
                    <PerfectScrollbar className="relative h-[290px] ltr:pr-3 rtl:pl-3 ltr:-mr-3 rtl:-ml-3 mb-4">
                        <div className="text-sm cursor-pointer">
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-primary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Updated Server Logs</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">Just Now</div>

                                <span className="badge badge-outline-primary absolute ltr:right-0 rtl:left-0 text-xs bg-primary-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-success w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Send Mail to HR and Admin</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">2 min ago</div>

                                <span className="badge badge-outline-success absolute ltr:right-0 rtl:left-0 text-xs bg-success-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-danger w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Backup Files EOD</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">14:00</div>

                                <span className="badge badge-outline-danger absolute ltr:right-0 rtl:left-0 text-xs bg-danger-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Collect documents from Sara</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">16:00</div>

                                <span className="badge badge-outline-dark absolute ltr:right-0 rtl:left-0 text-xs bg-dark-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-warning w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Conference call with Marketing Manager.</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                <span className="badge badge-outline-warning absolute ltr:right-0 rtl:left-0 text-xs bg-warning-light dark:bg-black opacity-0 group-hover:opacity-100">
                                    In progress
                                </span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-info w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Rebooted Server</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                <span className="badge badge-outline-info absolute ltr:right-0 rtl:left-0 text-xs bg-info-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-secondary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Send contract details to Freelancer</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">18:00</div>

                                <span className="badge badge-outline-secondary absolute ltr:right-0 rtl:left-0 text-xs bg-secondary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                    Pending
                                </span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-primary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Updated Server Logs</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">Just Now</div>

                                <span className="badge badge-outline-primary absolute ltr:right-0 rtl:left-0 text-xs bg-primary-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-success w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Send Mail to HR and Admin</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">2 min ago</div>

                                <span className="badge badge-outline-success absolute ltr:right-0 rtl:left-0 text-xs bg-success-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-danger w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Backup Files EOD</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">14:00</div>

                                <span className="badge badge-outline-danger absolute ltr:right-0 rtl:left-0 text-xs bg-danger-light dark:bg-black opacity-0 group-hover:opacity-100">Pending</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-black w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Collect documents from Sara</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">16:00</div>

                                <span className="badge badge-outline-dark absolute ltr:right-0 rtl:left-0 text-xs bg-dark-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-warning w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Conference call with Marketing Manager.</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                <span className="badge badge-outline-warning absolute ltr:right-0 rtl:left-0 text-xs bg-warning-light dark:bg-black opacity-0 group-hover:opacity-100">
                                    In progress
                                </span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-info w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Rebooted Server</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">17:00</div>

                                <span className="badge badge-outline-info absolute ltr:right-0 rtl:left-0 text-xs bg-info-light dark:bg-black opacity-0 group-hover:opacity-100">Completed</span>
                            </div>
                            <div className="flex items-center py-1.5 relative group">
                                <div className="bg-secondary w-1.5 h-1.5 rounded-full ltr:mr-1 rtl:ml-1.5"></div>
                                <div className="flex-1">Send contract details to Freelancer</div>
                                <div className="ltr:ml-auto rtl:mr-auto text-xs text-white-dark dark:text-gray-500">18:00</div>

                                <span className="badge badge-outline-secondary absolute ltr:right-0 rtl:left-0 text-xs bg-secondary-light dark:bg-black opacity-0 group-hover:opacity-100">
                                    Pending
                                </span>
                            </div>
                        </div>
                    </PerfectScrollbar>
                    <div className="border-t border-white-light dark:border-white/10">
                        <Link to="/" className=" font-semibold group hover:text-primary p-4 flex items-center justify-center group">
                            View All
                            <IconArrowLeft className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
