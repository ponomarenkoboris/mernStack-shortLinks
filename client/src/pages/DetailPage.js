import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try{
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Baerer ${token}`
            });
            setLink(fetched);
        }catch (e) {}
    }, [token, linkId, request]);

    useEffect(() => {
        getLink()
    }, [getLink]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    );
}