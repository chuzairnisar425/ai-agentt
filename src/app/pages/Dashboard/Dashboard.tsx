import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '../../../_theme/themeConfigSlice';

import CallMinutes from './CallMinutes';
const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
    });

    return (
        <div>
            <CallMinutes />
        </div>
    );
};

export default Dashboard;
