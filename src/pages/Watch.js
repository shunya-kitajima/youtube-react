import React, { useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout';
import SideList from '../components/SideList/SideList';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import { Store } from '../store/index';
import { useLocation } from 'react-router-dom';
import { fetchSelectedData, fetchRelatedData } from '../apis/index';

const Watch = () => {
    const { setGlobalSate } = useContext(Store);
    const location = useLocation();
    const SetVideos = async () => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('v');
        if (id) {
            const [selected, related] = await Promise.all([fetchSelectedData(id), fetchRelatedData(id)]);
            setGlobalSate({type: 'SET_SELECTED', payload: {selected: selected.data.items.shift()}});
            setGlobalSate({type: 'SET_RELATED', payload: {related: related.data.items}});
        }
    };
    useEffect(() => {
        SetVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);
    return (
        <Layout>
            <VideoDetail />
            <SideList />
        </Layout>
    );
}

export default Watch
