import React, { useEffect, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { useLocation } from 'react-router-dom';
import { fetchSearchData } from '../apis';
import { Store } from '../store/index';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import VideoGridItem from '../components/VideoGridItem/VideoGridItem';

const Search = () => {
    const { globalState, setGlobalState} = useContext(Store);
    const location = useLocation();
    const setSearchResult = async () => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');
        if (query) {
            await fetchSearchData(query).then((resp) => {
                setGlobalState({type: 'SET_SEARCHED', payload: {searched: resp.data.items}});
            });
        }
    };
    useEffect(() => {
        setSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Layout>
            <VideoGrid>
                {
                    globalState.searched ? globalState.searched.map((search) => {
                        return (
                            <VideoGridItem
                                id={search.id.VideoId}
                                key={search.id.videoId}
                                src={search.snippet.thumbnails.medium.url}
                                title={search.snippet.title}/>
                        )
                    }) : <span>no data</span>
                }
            </VideoGrid>
        </Layout>  
    );
}

export default Search