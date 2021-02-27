import React, { useEffect, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { useLocation } from 'react-router-dom';
import { fetchSearchData } from '../apis';
import { Store } from '../store/index';

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
            Search page
        </Layout>  
    );
}

export default Search