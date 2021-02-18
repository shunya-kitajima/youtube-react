import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSelectedData } from '../../apis';
import { Store } from '../../store/index';
import VideoPlay from '../VideoPlay/VideoPlay';

const VideoDetail = () => {
    const location = useLocation();
    const { globalState, setGlobalState } = useContext(Store);
    const setSelectedVideo = async () => {
        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('v');
        console.log('id', id);
        await fetchSelectedData(id).then((res) => {
            console.log(res);
            const item = res.data.items.shift();
            setGlobalState({ type: 'SET_SELECTED', payload: {selected: item} });
        });
    };
    useEffect(() => {
        setSelectedVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return globalState.selected ? (
        <div>
            <VideoPlay id={globalState.selected.id} />
        </div>
    ) : (<span>no data</span>)
};

export default VideoDetail
