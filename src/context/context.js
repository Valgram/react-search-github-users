import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
//22
import axios from 'axios';
//THE OTHERS URL ARE IN THE README
const rootUrl = 'https://api.github.com';

//5
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    //6
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    //23
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' });

    const searchGithubUser = async (user) => {
        toggleError();
        setIsLoading(true);
        const response = await axios(`${rootUrl}/users/${user}`).catch((err) => console.log(err));

        if (response) {
            setGithubUser(response.data);
            const { login, followers_url } = response.data;
            //29
            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)])
                .then((results) => {
                    //30
                    const [repos, followers] = results;
                    const status = 'fulfilled';
                    if (repos.status === status) {
                        setRepos(repos.value.data);
                    }
                    if (followers.status === status) {
                        setFollowers(followers.value.data);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            toggleError(true, 'there is no user with that username');
        }
        checkRequests();
        setIsLoading(false);
    };

    const checkRequests = () => {
        //24
        axios(`${rootUrl}/rate_limit`)
            .then(({ data }) => {
                //25
                let {
                    rate: { remaining },
                } = data;
                setRequests(remaining);
                //26
                if (remaining === 0) {
                    toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
                }
            })
            .catch((err) => console.log(err));
    };
    function toggleError(show, msg) {
        setError({ show, msg });
    }
    useEffect(checkRequests, []);
    //27
    return <GithubContext.Provider value={{ githubUser, repos, followers, requests, error, searchGithubUser, isLoading }}>{children}</GithubContext.Provider>;
};
export { GithubProvider, GithubContext };

//5 creating the context
//remenber the whole application is children
//go to index js
//6 creating a state for the default the default
//22 axios if for fetching you can use fetch to
// 23 how many request we have
//24 axios is the library that allows to fetch, so we are using the rootUrl
//and we use the documentations values that are / rate_limit(because we are searching for the limit of requests)
//then (is like await) data (is value i created)
//25 we dstructure the value that is remaining, and the key is gonna be rate
//26 if the remaining request is 0 then throw an error
//27 we pass down the requests state

//go to search

//29 this is gonna make that all info that has await its gonna show once all the awaits are ready to render
//both or the parameter are my url, the results are the data that i am fetching form my array(api)

//30 i create my array with repos and followers that are going to be the results
//fron the fetch,  i created variable status that has a value, of fullfilled (those values are the same in my data from the fetch)
//then if the value of repos is equal to fullfilled then show the value of the repos
//the same is for the followers
