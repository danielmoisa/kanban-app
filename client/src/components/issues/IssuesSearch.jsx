import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './IssuesSearch.scss'
import IssuesResults from './IssuesResults'

import { BsSearch } from 'react-icons/bs'

const IssuesSearch = () => {
    const [data, setData] = useState([]);
    const [searchIssues, setSearchIssues] = useState('');

    useEffect(() => {
		const fetchData = async () => {
			const result = await axios('http://127.0.0.1:8080/api/issues');

			setData(result.data);
		};

		fetchData();
    }, []);

    const handleIssuesSearch = (e) => {
        setSearchIssues(e.target.value)
    }
    
    const userIssues = data.Issues
    
    const results = () => {
        if(searchIssues === '') {
            return userIssues;
        } 

        return [...userIssues].filter(
            issue => issue.title.toLowerCase().includes(searchIssues.toLowerCase())
        );
    }

    return (
        <div className="search-modal">
            <div className="search-input">
                <div className="search-icon">
                    <BsSearch />
                </div>
                <input 
                    type="text" 
                    autoFocus 
                    placeholder="Search issues here..." 
                    value={ searchIssues } 
                    onChange={ handleIssuesSearch }
                />
            </div>
            <IssuesResults userIssues={ results() } />
        </div>
    )
}

export default IssuesSearch
