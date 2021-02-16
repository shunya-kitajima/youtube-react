import React, { useEffect, useContext } from 'react'
import Layout from '../components/layout/Layout'
import { fetchPopularData } from '../apis/index';
import { Store } from '../store/index';

const Top = () => {
    const { globalState, setGlobalState } =  useContext(Store);
    useEffect(() => {
        fetchPopularData().then((resp) => {
            console.log('data', resp);
            setGlobalState({type: 'SET_POPULAR', payload: {popular: resp.data.items}})
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Layout>
            top page
        </Layout>
    );
}

export default Top
