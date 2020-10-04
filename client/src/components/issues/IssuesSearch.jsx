import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './IssuesSearch.scss'
import IssuesResults from './IssuesResults'

import { BsSearch } from 'react-icons/bs'
import { VscFilter } from 'react-icons/vsc'

const IssuesSearch = ({ setIssuesModal }) => {
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
    
    const userIssues = data
    
    const results = (e) => {
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
                    placeholder="Search issues by title..." 
                    value={ searchIssues } 
                    onChange={ handleIssuesSearch }
                />
            </div>
            <h4 className="issues-title">
                { searchIssues === '' ? 
                    <span><VscFilter /> All issues</span> :
                    <span className="active-search"><VscFilter /> Matching issues</span>
                }
            </h4>
                <IssuesResults userIssues={ results() } setIssuesModal={ setIssuesModal }/> 
        </div>
    )
}

export default IssuesSearch
