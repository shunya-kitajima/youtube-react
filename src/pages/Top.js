import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import {fetchPopularData} from '../apis/index';

const Top = () => {
    useEffect(() => {
        fetchPopularData().then((resp) => {
            console.log('data', resp);
        });
    }, []);
    return (
        <Layout>
            top page
        </Layout>
    );
}

export default Top
