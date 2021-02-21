import React, { useContext, useEffect } from 'react';
import { Store } from '../../store/index';
import { fetchRelatedData } from '../../apis/index';

const SideList = () => {
    const { globalState, setGlobalState } = useContext(Store);
    const setRelatedVideo = async (id) => {
        await fetchRelatedData(id).then((res) => {
            setGlobalState({type: 'SET_RELATED', payload: {related: res.data.items}});
        });
    };
    useEffect(() => {
        setRelatedVideo(globalState.selected.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalState.selected]);
    return (
        <div>
            {
                globalState.related ? globalState.related.map((video) => {
                    return  (
                        <SideListItem
                            id={video.id.videoId}
                            key={video.id.videoId}
                            src={video.snippet.thumnails.medium.url}
                            title={video.snippet.title}
                        />
                    )
                }) : <span>no data</span>
            }
        </div>
    )
};

export default SideList
