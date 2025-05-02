import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import ReactApexChart from 'react-apexcharts';
import Dropdown from '../../../_theme/components/Dropdown';
import { setPageTitle } from '../../../_theme/themeConfigSlice';
import IconHorizontalDots from '../../../_theme/components/Icon/IconHorizontalDots';
import IconMenuCharts from '../../../_theme/components/Icon/Menu/IconMenuCharts';
import IconUsersGroup from '../../../_theme/components/Icon/IconUsersGroup';
import IconDollar from '../../../_theme/components/Icon/IconDollarSign';
import IconBookmark from '../../../_theme/components/Icon/IconBookmark';
import IconPhoneCall from '../../../_theme/components/Icon/IconPhoneCall';
import IconChartSquare from '../../../_theme/components/Icon/IconChartSquare';
import IconTrashLines from '../../../_theme/components/Icon/IconTrashLines';
import IconClock from '../../../_theme/components/Icon/IconClock';

const CallMinutes = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Income',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Expenses',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    return (
        <div>
            <div className="pt-5">
                <div className="grid xl:grid-cols-3 gap-6 mb-6 ">
                    <div className="panel h-full xl:col-span-2  ">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Total Call Minutes</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 1]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">Weekly</button>
                                        </li>
                                        <li>
                                            <button type="button">Monthly</button>
                                        </li>
                                        <li>
                                            <button type="button">Yearly</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <p className="text-lg dark:text-white-light/90">Updated in real-time</p>
                        <span className="font-normal">
                            1,234
                            <span className="text-sm text-gray-400">minutes</span>
                        </span>

                        <div className="relative">
                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-coles-3 lg:grid-cols-4 gap-6 mb-6">
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <h5 className="font-semibold text-base ">Total Reservations</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconBookmark className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 text-sm text-[#515365] ">
                            <div>
                                <div>
                                    <div className="font-bold text-lg">847</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <h5 className="font-semibold text-base ">Missed Calls</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconPhoneCall className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 text-sm text-[#515365] ">
                            <div>
                                <div>
                                    <div className="font-bold text-lg">23</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <h5 className="font-semibold text-base ">Peak Hours</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconChartSquare className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 text-sm text-[#515365] ">
                            <div>
                                <div>
                                    <div className="font-bold text-lg">2-4 PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full sm:col-span-2 lg:col-span-1">
                        {/* statistics */}
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <h5 className="font-semibold text-base ">Avg. Call Duration</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconClock className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                ></Dropdown>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 text-sm text-[#515365] ">
                            <div>
                                <div>
                                    <div className="font-bold text-lg">5.2 min</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallMinutes;
